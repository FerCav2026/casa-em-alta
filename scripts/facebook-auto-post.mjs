// Publica automaticamente no Facebook os artigos novos dos 3 blogs (Casa em Alta,
// Indica Casa, Mundo dos Sobrenomes). Guarda em state/facebook-posted.json quais
// artigos já foram publicados, para nunca postar o mesmo artigo duas vezes.
//
// Uso normal (roda pelo GitHub Actions em schedule): node scripts/facebook-auto-post.mjs
// Uso de setup inicial (marca artigos existentes como já postados, sem publicar nada):
//   node scripts/facebook-auto-post.mjs --bootstrap [--keep-new=N]
//   --keep-new=N deixa os N artigos mais recentes de fora do bootstrap, para serem
//   publicados de verdade na próxima chamada normal (serve para testar o fluxo real).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '..', 'state', 'facebook-posted.json');

const BLOGS = [
  {
    key: 'casaemalta',
    tokenEnv: 'FB_TOKEN_CASA_EM_ALTA',
    pageId: '1127065543834335',
    source: 'astro',
  },
  {
    key: 'indicacasa',
    tokenEnv: 'FB_TOKEN_INDICA_CASA',
    pageId: '1123441180863418',
    source: 'wp',
    apiUrl: 'https://indicacasa.com.br/wp-json/wp/v2/posts?per_page=20&_fields=id,slug,link,date,title,excerpt&orderby=date&order=desc',
  },
  {
    key: 'mundosobrenomes',
    tokenEnv: 'FB_TOKEN_MUNDO_SOBRENOMES',
    pageId: '1251226441405246',
    source: 'wp',
    apiUrl: 'https://www.mundodossobrenomes.com/wp-json/wp/v2/posts?per_page=20&_fields=id,slug,link,date,title,excerpt&orderby=date&order=desc',
  },
];

function loadState() {
  if (!fs.existsSync(STATE_PATH)) return {};
  return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
}

function saveState(state) {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
}

function stripHtml(html) {
  return html
    .replace(/<a[^>]*>.*?<\/a>/gs, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&#8230;/g, '…')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/﻿/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAstroPosts() {
  const filePath = path.join(__dirname, '..', 'src', 'pages', '[slug].astro');
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const posts: Record<string,[^{]*\{([\s\S]*?)\n\};/);
  if (!match) throw new Error('Não achei o bloco "const posts" em [slug].astro');
  const block = match[1];
  const entryRe = /'([a-z0-9-]+)':\s*\{\s*titulo:\s*'((?:[^'\\]|\\.)*)',\s*descricao:\s*'((?:[^'\\]|\\.)*)',\s*categoria:\s*'[^']*',\s*dataCriacao:\s*'(\d{4}-\d{2}-\d{2})'/g;
  const posts = [];
  let m;
  while ((m = entryRe.exec(block))) {
    posts.push({
      id: m[1],
      titulo: m[2].replace(/\\'/g, "'"),
      descricao: m[3].replace(/\\'/g, "'"),
      dataCriacao: m[4],
      link: `https://casaemalta.com.br/${m[1]}`,
    });
  }
  if (posts.length === 0) throw new Error('Bloco "const posts" encontrado, mas 0 artigos extraídos — regex desatualizada?');
  posts.sort((a, b) => a.dataCriacao.localeCompare(b.dataCriacao));
  return posts;
}

async function getWpPosts(apiUrl) {
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error(`Erro ${res.status} ao buscar ${apiUrl}`);
  const data = await res.json();
  return data
    .map((p) => ({
      id: String(p.id),
      titulo: stripHtml(p.title.rendered),
      descricao: stripHtml(p.excerpt.rendered),
      dataCriacao: p.date,
      link: p.link,
    }))
    .sort((a, b) => a.dataCriacao.localeCompare(b.dataCriacao));
}

async function postToFacebook(pageId, token, post) {
  const message = post.descricao ? `${post.titulo}\n\n${post.descricao}` : post.titulo;
  const params = new URLSearchParams({ message, link: post.link, access_token: token });
  const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/feed`, {
    method: 'POST',
    body: params,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Erro ao publicar "${post.titulo}": ${JSON.stringify(data)}`);
  return data;
}

async function run() {
  const bootstrap = process.argv.includes('--bootstrap');
  const keepNewArg = process.argv.find((a) => a.startsWith('--keep-new='));
  const keepNew = keepNewArg ? Number(keepNewArg.split('=')[1]) : 0;

  const state = loadState();
  let anyChange = false;

  for (const blog of BLOGS) {
    const posted = new Set(state[blog.key] || []);
    const posts = blog.source === 'astro' ? getAstroPosts() : await getWpPosts(blog.apiUrl);

    if (bootstrap) {
      const toMark = keepNew > 0 ? posts.slice(0, Math.max(0, posts.length - keepNew)) : posts;
      toMark.forEach((p) => posted.add(p.id));
      state[blog.key] = [...posted];
      console.log(`[bootstrap] ${blog.key}: ${toMark.length}/${posts.length} artigos marcados como já postados.`);
      anyChange = true;
      continue;
    }

    const novos = posts.filter((p) => !posted.has(p.id));
    if (novos.length === 0) {
      console.log(`${blog.key}: nada novo.`);
      continue;
    }

    const token = process.env[blog.tokenEnv];
    if (!token) throw new Error(`Faltando variável de ambiente ${blog.tokenEnv}`);

    for (const post of novos) {
      console.log(`${blog.key}: publicando "${post.titulo}" (${post.link})...`);
      const result = await postToFacebook(blog.pageId, token, post);
      console.log(`  -> post_id: ${result.id}`);
      posted.add(post.id);
      anyChange = true;
    }
    state[blog.key] = [...posted];
  }

  if (anyChange) {
    saveState(state);
    console.log('Estado salvo em state/facebook-posted.json.');
  } else {
    console.log('Nada para atualizar.');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

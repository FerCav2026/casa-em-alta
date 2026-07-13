// IndexNow — avisa Bing/Yandex automaticamente sobre as URLs do site.
// Roda no "postbuild": depois de `astro build`, lê o sitemap gerado em dist/
// e envia todas as URLs para a API do IndexNow.
//
// Importante: este script NUNCA derruba o deploy. Se algo falhar
// (rede, API fora do ar etc.), ele apenas avisa e termina com sucesso.

import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const HOST = 'www.casaemalta.com.br';
// Chave trocada em 13/07/2026: a anterior (449eded6...) passou a receber
// 403 UserForbiddedToAccessSite do Bing desde ~08/07. A chave antiga
// continua publicada em public/ de proposito, para nao quebrar nada.
const KEY = '09cde6955fa54154995ef86e8edb91ad';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DIST = 'dist';

async function collectUrls() {
  let files;
  try {
    files = await readdir(DIST);
  } catch {
    return [];
  }

  // Pega todos os sitemap-*.xml (menos o índice, que só aponta para os outros)
  const sitemaps = files.filter(
    (f) => /^sitemap-\d+\.xml$/.test(f) || (f === 'sitemap.xml')
  );
  if (sitemaps.length === 0) return [];

  const urls = new Set();
  for (const file of sitemaps) {
    const xml = await readFile(join(DIST, file), 'utf8');
    const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
    for (const m of matches) {
      const url = m[1].trim();
      if (url.includes('/sitemap')) continue; // ignora referências a outros sitemaps
      urls.add(url);
    }
  }
  return [...urls];
}

async function main() {
  const urlList = await collectUrls();

  if (urlList.length === 0) {
    console.log('[IndexNow] Nenhuma URL encontrada no sitemap — nada a enviar.');
    return;
  }

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    console.log(
      `[IndexNow] Enviadas ${urlList.length} URLs — resposta HTTP ${res.status} ${res.statusText}`
    );
  } catch (err) {
    console.log(`[IndexNow] Falha ao enviar (ignorado, não afeta o deploy): ${err.message}`);
  }
}

main().catch((err) => {
  console.log(`[IndexNow] Erro inesperado (ignorado): ${err.message}`);
});

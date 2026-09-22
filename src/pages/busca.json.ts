import type { APIRoute } from 'astro';
import { posts } from '../data/posts';

export const GET: APIRoute = () => {
  const dados = posts.map((p) => ({
    titulo: p.titulo,
    resumo: p.resumo,
    slug: p.slug,
    categoria: p.categoriaLabel,
    imagem: p.imagem,
  }));

  return new Response(JSON.stringify(dados), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  tempo: string;
  imagem: string | null;
  categoria: string;
  categoriaLabel: string;
  categoriaColor: string;
};

export type Categoria = {
  slug: string;
  label: string;
  descricao: string;
  color: string;
  bgColor: string;
  icon: string;
};

export const categorias: Categoria[] = [
  {
    slug: 'reviews',
    label: 'Reviews',
    descricao: 'Avaliações detalhadas depois de meses de uso real. Sem achismo, só o que foi testado de verdade.',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    icon: '★',
  },
  {
    slug: 'comparativos',
    label: 'Comparativos',
    descricao: 'Produto A vs Produto B: qual comprar? Analisamos lado a lado para você tomar a melhor decisão.',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: '⇄',
  },
  {
    slug: 'guias-de-compra',
    label: 'Guias de Compra',
    descricao: 'O que considerar antes de comprar? Guias práticos para você não errar na escolha.',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    icon: '◎',
  },
  {
    slug: 'rankings-e-listas',
    label: 'Rankings e Listas',
    descricao: 'Os melhores, os mais baratos e os que mais valem a pena. Listas curadas com os top produtos do mercado.',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: '▲',
  },
];

export const posts: Post[] = [
  {
    slug: 'melhores-aspiradores-po-2026',
    titulo: 'Os 7 Melhores Aspiradores de Pó de 2026',
    resumo: 'Testamos os modelos mais vendidos do mercado para descobrir qual realmente vale o preço. Confira nosso ranking.',
    tempo: '8 min de leitura',
    imagem: '/images/aspiradores/capa-aspiradores.png',
    categoria: 'rankings-e-listas',
    categoriaLabel: 'Rankings e Listas',
    categoriaColor: 'bg-green-100 text-green-700',
  },
  {
    slug: 'airfryer-philips-vs-mondial',
    titulo: 'Airfryer Philips vs Mondial: Qual Comprar em 2026?',
    resumo: 'Comparamos consumo de energia, capacidade, facilidade de limpeza e resultado final. A resposta vai te surpreender.',
    tempo: '6 min de leitura',
    imagem: '/images/airfryer/capa-airfryer.png',
    categoria: 'comparativos',
    categoriaLabel: 'Comparativo',
    categoriaColor: 'bg-blue-100 text-blue-700',
  },
  {
    slug: 'organizadores-armario-barato',
    titulo: '10 Organizadores de Armário Baratos que Valem Cada Centavo',
    resumo: 'Encontramos os melhores organizadores por menos de R$ 50 que transformam qualquer armário bagunçado.',
    tempo: '5 min de leitura',
    imagem: '/images/organizadores/capa-organizadores.png',
    categoria: 'rankings-e-listas',
    categoriaLabel: 'Rankings e Listas',
    categoriaColor: 'bg-green-100 text-green-700',
  },
  {
    slug: 'robos-aspirador-custo-beneficio',
    titulo: 'Robôs Aspiradores: Os 5 Melhores Custo-Benefício',
    resumo: 'Você realmente precisa gastar mais de R$ 1.000? Testamos opções de R$ 300 a R$ 2.000 para descobrir.',
    tempo: '10 min de leitura',
    imagem: '/images/robos/capa-robos.png',
    categoria: 'comparativos',
    categoriaLabel: 'Comparativo',
    categoriaColor: 'bg-blue-100 text-blue-700',
  },
  {
    slug: 'panela-pressao-eletrica-review',
    titulo: 'Panela de Pressão Elétrica: Review Completo após 6 Meses de Uso',
    resumo: 'Usamos por 6 meses e contamos tudo: pontos fortes, limitações e se realmente economiza tempo na cozinha.',
    tempo: '7 min de leitura',
    imagem: '/images/panela/capa-panela.png',
    categoria: 'reviews',
    categoriaLabel: 'Review',
    categoriaColor: 'bg-orange-100 text-orange-700',
  },
  {
    slug: 'itens-casa-30-reais-amazon',
    titulo: '14 Itens Incríveis para Casa por até R$ 30 na Amazon',
    resumo: 'Garimpos que valem muito mais do que custam. Atualizamos essa lista com os melhores achados.',
    tempo: '4 min de leitura',
    imagem: '/images/itens30/capa-itens30.png',
    categoria: 'rankings-e-listas',
    categoriaLabel: 'Rankings e Listas',
    categoriaColor: 'bg-green-100 text-green-700',
  },
  {
    slug: 'como-escolher-frigideira',
    titulo: 'Como Escolher a Frigideira Certa para Cada Tipo de Fogão',
    resumo: 'Indução, gás ou elétrico? Antiaderente ou inox? Este guia resolve de uma vez por todas essa dúvida.',
    tempo: '6 min de leitura',
    imagem: '/images/frigideira/capa-frigideira.png',
    categoria: 'guias-de-compra',
    categoriaLabel: 'Guia de Compra',
    categoriaColor: 'bg-purple-100 text-purple-700',
  },
  {
    slug: 'purificador-agua-vale-pena',
    titulo: 'Purificador de Água Realmente Vale a Pena? Testamos 4 Modelos',
    resumo: 'Fizemos testes de qualidade da água e calculamos o custo por litro de cada modelo. Os resultados são reveladores.',
    tempo: '9 min de leitura',
    imagem: '/images/purificador/capa-purificador.png',
    categoria: 'reviews',
    categoriaLabel: 'Review',
    categoriaColor: 'bg-orange-100 text-orange-700',
  },
  {
    slug: 'kit-organizacao-cozinha',
    titulo: 'Kit Organização de Cozinha: Monte o seu por R$ 150',
    resumo: 'Selecionamos os melhores produtos para organizar sua cozinha do zero sem gastar muito. Com links diretos.',
    tempo: '5 min de leitura',
    imagem: '/images/kit-cozinha/capa-kit-cozinha.png',
    categoria: 'guias-de-compra',
    categoriaLabel: 'Guia de Compra',
    categoriaColor: 'bg-purple-100 text-purple-700',
  },
  {
    slug: 'melhor-multiprocessador-de-alimentos',
    titulo: 'Melhor Multiprocessador de Alimentos 2026: Vale a Pena Ter um em Casa?',
    resumo: 'Comparamos os modelos mais vendidos da Amazon: Philips Walita, Mondial, Britania e Arno. Qual realmente vale o preço?',
    tempo: '7 min de leitura',
    imagem: '/images/multiprocessador/capa-multiprocessador.jpg',
    categoria: 'rankings-e-listas',
    categoriaLabel: 'Rankings e Listas',
    categoriaColor: 'bg-green-100 text-green-700',
  },
  {
    slug: 'vaporizador-de-roupas-portatil',
    titulo: 'Vaporizador de Roupas Portátil: os Melhores para Comprar em 2026',
    resumo: 'Os 4 melhores vaporizadores de roupas portáteis de 2026 com fichas técnicas, prós e contras.',
    tempo: '8 min de leitura',
    imagem: '/images/vaporizador/capa-vaporizador.jpg',
    categoria: 'rankings-e-listas',
    categoriaLabel: 'Rankings e Listas',
    categoriaColor: 'bg-green-100 text-green-700',
  },
  {
    slug: 'chaleira-eletrica-com-controle-de-temperatura',
    titulo: 'Chaleira Elétrica com Controle de Temperatura: a Melhor para Café, Chá e Chimarrão em 2026',
    resumo: 'Qual chaleira com controle de temperatura comprar? Comparamos 4 modelos para café, chá e chimarrão.',
    tempo: '7 min de leitura',
    imagem: '/images/chaleira/capa-chaleira.jpg',
    categoria: 'rankings-e-listas',
    categoriaLabel: 'Rankings e Listas',
    categoriaColor: 'bg-green-100 text-green-700',
  },
];

export function getPostsByCategoria(categoriaSlug: string): Post[] {
  return posts.filter((p) => p.categoria === categoriaSlug);
}

export function getCategoriaBySlug(slug: string): Categoria | undefined {
  return categorias.find((c) => c.slug === slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

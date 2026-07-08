/**
 * Dados da Calculadora de Consumo de Energia.
 *
 * ⚠️ ESTE É O ÚNICO ARQUIVO COM DADO PERECÍVEL DA CALCULADORA.
 *
 * A fórmula nunca muda. A potência de um modelo específico nunca muda.
 * O que envelhece é a tarifa média. Manutenção anual: trocar TARIFA_MEDIA
 * e ATUALIZADO_EM abaixo, e dar push. Nada mais.
 *
 * Regra: NÃO colocar preço de produto aqui. Preço fica no artigo.
 */

/** Tarifa média nacional em R$/kWh. Rede de segurança para quem não tem a conta em mãos. */
export const TARIFA_MEDIA = 0.98;

/** Exibido na interface e usado no dateModified do schema. Formato: 'mês/ano'. */
export const ATUALIZADO_EM = 'julho/2026';

/** Data ISO correspondente ao ATUALIZADO_EM, para o schema. */
export const ATUALIZADO_EM_ISO = '2026-07-13';

export type Categoria = {
  id: string;
  label: string;
  /** Horas de uso efetivo por dia, valor padrão realista */
  horasPadrao: number;
  /** Dias de uso por mês. Aspirador não roda todo dia; airfryer geralmente sim. */
  diasPadrao: number;
};

export type Produto = {
  categoria: string;
  nome: string;
  /** Potência em watts, conforme ficha técnica publicada no artigo */
  watts: number;
  /** Slug do artigo onde o produto é analisado (a calculadora leva até lá) */
  slugArtigo: string;
  observacao?: string;
};

export type Aparelho = {
  nome: string;
  watts: number;
  horas: number;
  dias: number;
  observacao?: string;
};

export const categorias: Categoria[] = [
  { id: 'airfryer', label: 'Airfryer', horasPadrao: 0.67, diasPadrao: 30 },
  { id: 'panela', label: 'Panela de pressão elétrica', horasPadrao: 0.5, diasPadrao: 12 },
  { id: 'chaleira', label: 'Chaleira elétrica', horasPadrao: 0.17, diasPadrao: 30 },
  { id: 'vaporizador', label: 'Vaporizador de roupas', horasPadrao: 0.17, diasPadrao: 12 },
  { id: 'aspirador', label: 'Aspirador vertical', horasPadrao: 0.33, diasPadrao: 8 },
  { id: 'multiprocessador', label: 'Multiprocessador', horasPadrao: 0.17, diasPadrao: 12 },
];

/**
 * Modelos já analisados no blog, com a potência da ficha técnica publicada.
 * Este é o diferencial: as calculadoras concorrentes exigem que a pessoa
 * saiba os watts do aparelho dela.
 *
 * Ausente de propósito: Britânia Redstone BFR50 (o fabricante não publica a
 * potência e o artigo não a informa; não inventar dado).
 */
export const produtos: Produto[] = [
  // Airfryers — artigos #26, #27, #28
  {
    categoria: 'airfryer',
    nome: 'Philips Walita Série 3000 XL (NA341)',
    watts: 2000,
    slugArtigo: 'melhores-airfryers-2026',
    observacao: '2.000 W em 220V. Em 110V a potência cai para 1.800 W.',
  },
  {
    categoria: 'airfryer',
    nome: 'Mondial Grand Family (AFN-50-RI)',
    watts: 1900,
    slugArtigo: 'melhores-airfryers-2026',
  },
  {
    categoria: 'airfryer',
    nome: 'Philips Walita Série 1000 XL',
    watts: 1700,
    slugArtigo: 'airfryer-philips-walita-serie-1000-xl-review',
  },
  {
    categoria: 'airfryer',
    nome: 'Philips Walita HD9252 (RI9252)',
    watts: 1400,
    slugArtigo: 'airfryer-philips-walita-hd9252-review',
  },
  {
    categoria: 'airfryer',
    nome: 'Britânia Oven (BAF16A)',
    watts: 1900,
    slugArtigo: 'melhores-airfryers-2026',
    observacao: '1.900 W em 110V. Em 220V sobe para 2.000 W.',
  },
  {
    categoria: 'airfryer',
    nome: 'Cadence Super Light Fryer (FRT555)',
    watts: 1500,
    slugArtigo: 'melhores-airfryers-2026',
  },

  // Panelas de pressão elétricas — artigo #5
  {
    categoria: 'panela',
    nome: 'Mondial Master Cooker PE-38',
    watts: 900,
    slugArtigo: 'panela-pressao-eletrica-review',
  },
  {
    categoria: 'panela',
    nome: 'Electrolux PCE15 (Rita Lobo)',
    watts: 700,
    slugArtigo: 'panela-pressao-eletrica-review',
  },
  {
    categoria: 'panela',
    nome: 'Elgin 4 Litros',
    watts: 840,
    slugArtigo: 'panela-pressao-eletrica-review',
  },

  // Chaleiras elétricas — artigo #12
  {
    categoria: 'chaleira',
    nome: 'Cadence CEL850 Inox',
    watts: 2200,
    slugArtigo: 'chaleira-eletrica-com-controle-de-temperatura',
  },
  {
    categoria: 'chaleira',
    nome: 'Black+Decker K2200 Inox',
    watts: 1500,
    slugArtigo: 'chaleira-eletrica-com-controle-de-temperatura',
  },
  {
    categoria: 'chaleira',
    nome: 'Philco PCH18B',
    watts: 2200,
    slugArtigo: 'chaleira-eletrica-com-controle-de-temperatura',
  },
  {
    categoria: 'chaleira',
    nome: 'Timemore Gooseneck 600ml',
    watts: 1000,
    slugArtigo: 'chaleira-eletrica-com-controle-de-temperatura',
  },

  // Vaporizadores de roupas — artigo #11
  {
    categoria: 'vaporizador',
    nome: 'Black+Decker BDV3000',
    watts: 900,
    slugArtigo: 'vaporizador-de-roupas-portatil',
  },
  {
    categoria: 'vaporizador',
    nome: 'Philips Walita STH3020',
    watts: 1000,
    slugArtigo: 'vaporizador-de-roupas-portatil',
  },
  {
    categoria: 'vaporizador',
    nome: 'Mallory Orion',
    watts: 1200,
    slugArtigo: 'vaporizador-de-roupas-portatil',
  },
  {
    categoria: 'vaporizador',
    nome: 'Mondial Fast Steam',
    watts: 1270,
    slugArtigo: 'vaporizador-de-roupas-portatil',
  },

  // Aspiradores verticais — artigo #1
  {
    categoria: 'aspirador',
    nome: 'Electrolux STK15',
    watts: 1450,
    slugArtigo: 'melhores-aspiradores-po-2026',
  },
  {
    categoria: 'aspirador',
    nome: 'WAP Power Speed',
    watts: 2000,
    slugArtigo: 'melhores-aspiradores-po-2026',
  },

  // Multiprocessadores — artigo #10
  {
    categoria: 'multiprocessador',
    nome: 'Philips Walita PowerChop 5000',
    watts: 1000,
    slugArtigo: 'melhor-multiprocessador-de-alimentos',
  },
  {
    categoria: 'multiprocessador',
    nome: 'Mondial Turbo Chef 9 em 1',
    watts: 1000,
    slugArtigo: 'melhor-multiprocessador-de-alimentos',
  },
  {
    categoria: 'multiprocessador',
    nome: 'Arno Multichef MP62',
    watts: 700,
    slugArtigo: 'melhor-multiprocessador-de-alimentos',
  },
];

/**
 * Aparelhos comuns da casa, para a tabela de referência.
 * Watts médios de mercado. Mudam muito pouco ao longo dos anos.
 */
export const aparelhos: Aparelho[] = [
  {
    nome: 'Chuveiro elétrico',
    watts: 5500,
    horas: 0.5,
    dias: 30,
    observacao: 'O maior vilão da conta. Meia hora por dia somando todos os banhos.',
  },
  {
    nome: 'Ar-condicionado (9.000 BTU)',
    watts: 900,
    horas: 8,
    dias: 30,
    observacao: 'Modelos inverter consomem bem menos depois que a temperatura estabiliza.',
  },
  {
    nome: 'Secadora de roupas',
    watts: 2500,
    horas: 1,
    dias: 8,
  },
  {
    nome: 'Chaleira elétrica',
    watts: 1800,
    horas: 0.17,
    dias: 30,
  },
  {
    nome: 'Forno elétrico',
    watts: 1500,
    horas: 0.67,
    dias: 30,
  },
  {
    nome: 'Airfryer',
    watts: 1700,
    horas: 0.67,
    dias: 30,
  },
  {
    nome: 'Ferro de passar',
    watts: 1200,
    horas: 0.5,
    dias: 8,
  },
  {
    nome: 'Micro-ondas',
    watts: 1200,
    horas: 0.25,
    dias: 30,
    observacao:
      'Atenção: os watts do rótulo (700 W, por exemplo) são a potência de aquecimento, não o consumo. Um micro-ondas de 700 W puxa cerca de 1.200 W da tomada.',
  },
  {
    nome: 'Lava-louças compacta',
    watts: 1200,
    horas: 1.5,
    dias: 20,
  },
  {
    nome: 'Geladeira frost free',
    watts: 150,
    horas: 8,
    dias: 30,
    observacao:
      'Fica ligada 24h, mas o compressor só trabalha parte do tempo. Contamos 8 horas de funcionamento efetivo por dia.',
  },
  {
    nome: 'Aspirador vertical',
    watts: 1450,
    horas: 0.33,
    dias: 8,
  },
  {
    nome: 'Televisão LED 50"',
    watts: 100,
    horas: 5,
    dias: 30,
  },
];

/** Custo mensal em reais. Fórmula da ANEEL: (W / 1000) × horas × dias × tarifa */
export function custoMensal(watts: number, horas: number, dias: number, tarifa: number): number {
  return (watts / 1000) * horas * dias * tarifa;
}

/** Consumo mensal em kWh */
export function consumoMensal(watts: number, horas: number, dias: number): number {
  return (watts / 1000) * horas * dias;
}

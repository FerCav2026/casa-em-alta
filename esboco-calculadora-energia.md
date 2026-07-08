# Esboço: Calculadora de Consumo de Energia (Casa em Alta)

Documento de planejamento. Rascunho de 08/07/2026, antes de escrever qualquer código.

---

## 1. O que é e o que não é

**É:** um artigo com uma ferramenta dentro, que responde "quanto esse aparelho pesa na minha conta de luz".

**Não é:** uma página de calculadora pelada. Essas perdem para Mobills, CalculadoraOnlineBR e para as empresas de energia (Bulbe, Órigo), que têm autoridade no assunto energia.

**Por que temos chance:** as calculadoras genéricas exigem que a pessoa saiba os watts do aparelho. A nossa traz os modelos já resenhados no blog com a potência real preenchida.

**Sem AdSense no site.** Só afiliado. Não há risco de "página fina" como no Mundo dos Sobrenomes.

---

## 2. Palavra-chave e título

- Keyword principal: `quanto gasta de energia`
- Keyword secundária: `calculadora de consumo de energia`
- Título proposto (58 caracteres): **Quanto Gasta de Energia Cada Eletrodoméstico? Calcule Aqui**
- Slug: `/quanto-gasta-de-energia-eletrodomesticos`
- Categoria: Guia de Compra

**Checagem de canibalização:** nenhum artigo atual disputa esse termo como principal. As menções a consumo dentro dos artigos #26, #27, #28 e #5 são comparações entre dois modelos específicos, intenção diferente. Risco baixo.

---

## 3. Estrutura da página

| Bloco | Conteúdo | Função |
|---|---|---|
| H1 + intro | Duas frases. A dor real: a conta subiu e você não sabe qual aparelho é o culpado. | Retenção |
| **A calculadora** | Logo após a intro, ainda perto do topo | Utilidade |
| Como a conta é feita | Fórmula da ANEEL explicada em linguagem simples | E-E-A-T |
| **Tabela de consumo** | Watts médios e custo mensal dos aparelhos comuns da casa | Snippet do Google, atrai link |
| Os vilões da conta | Chuveiro, ar-condicionado, geladeira, ferro, secadora | Tráfego (nenhum é produto nosso, mas é o que se busca) |
| Airfryer vs forno elétrico | A comparação mais buscada do nicho | Ponte para #15 e #28 |
| Como economizar de verdade | Dicas honestas, sem empurrar troca de aparelho | Confiança |
| FAQ (5 perguntas) | Com schema FAQPage | Rich result |
| Aviso de afiliados | No final, antes do AuthorBio (regra do blog) | Compliance |

---

## 4. A calculadora: dois modos

### Modo A: "Já tenho o aparelho"
Categoria → potência em watts (campo livre) → horas por dia → tarifa → resultado em R$/mês e R$/ano.

### Modo B: "Estou pensando em comprar" (é aqui que mora a conversão)
Categoria → menu com os modelos já resenhados no blog, potência preenchida → resultado comparativo.

### Produtos reais disponíveis hoje (extraídos do `[slug].astro`)

| Categoria | Modelo | Potência | Artigo |
|---|---|---|---|
| Airfryer | Philips Walita 1000 XL | 1.700 W | #26 |
| Airfryer | Mondial Grand Family AFN-50 | 1.900 W | #28 |
| Panela de pressão elétrica | Mondial Master Cooker PE-38 | 900 W | #5 |
| Panela de pressão elétrica | Electrolux PCE15 | 700 W | #5 |
| Panela de pressão elétrica | Elgin 4L | 840 W | #5 |
| Multiprocessador | modelos de 700 W e 1.000 W | 700 / 1.000 W | #10 |
| Vaporizador de roupas | Mallory Orion | 1.200 W | #11 |
| Vaporizador de roupas | outros três modelos | 900 / 1.000 / 1.270 W | #11 |
| Chaleira elétrica | modelos de 1.500 W e 2.200 W | 1.500 / 2.200 W | #12 |
| Aspirador vertical | dois modelos | 1.450 / 2.000 W | #1 |

Seis categorias com dado real. Nenhuma calculadora concorrente tem isso.

---

## 5. Como a calculadora conversa com o link de afiliado

**A regra de ouro: o CTA é consequência do número, nunca do desejo de vender.**

O caminho honesto é em duas etapas:

```
calculadora → artigo do produto → link de afiliado
```

Não `calculadora → link de afiliado`. Motivo: manda tráfego interno para os artigos que já rankeiam, e a recomendação chega depois do contexto, não antes.

### Exemplos do que a calculadora deve dizer

Quando a economia **não** justifica a compra:
> Trocar uma airfryer de 1.900 W por uma de 1.700 W economiza cerca de R$ 3 por mês, ou R$ 36 por ano. Não vale trocar de aparelho só por isso. Se a sua funciona, fique com ela.

Quando **justifica**:
> Seu forno elétrico de 2.000 W usado 40 min por dia custa cerca de R$ 39/mês. Uma airfryer de 1.700 W no mesmo tempo custa R$ 33/mês. A diferença real aparece mesmo é no tempo de preaquecimento. Veja o comparativo completo.

**Isso não é perder venda. É o que sustenta o E-E-A-T.** Uma calculadora que sempre conclui "compre" é percebida como propaganda e o número perde credibilidade. O ganho vem do Modo B, quando a pessoa já decidiu comprar e quer escolher.

---

## 6. Reaproveitamento nos artigos existentes

Componente reutilizável `src/components/CalculadoraEnergia.astro`, com propriedade `categoria`, para vir pré-filtrado dentro de cada artigo.

Artigos que recebem o embed:

- #26, #27, #28 (airfryers) → `categoria="airfryer"`
- #5 (panela de pressão) → `categoria="panela"`
- #15 (forno elétrico) → `categoria="forno"`
- #19, #25 (microondas) → `categoria="microondas"`
- #12 (chaleira) → `categoria="chaleira"`

**Importante: não remover o texto atual.** Os parágrafos que já trazem a conta feita à mão (R$ 27/mês da Philips, R$ 30/mês da Mondial) são conteúdo indexado. A calculadora entra **abaixo** deles, não no lugar.

---

## 7. Achado durante a apuração: a tarifa está defasada

Os artigos calculam com **R$ 0,80/kWh**, mas o próprio texto reconhece que a média nacional de 2025 está **próxima de R$ 0,98/kWh**. Ou seja, os valores publicados subestimam a conta em cerca de 20%.

Sugestão: a calculadora nasce com **R$ 0,98 como valor padrão**, campo editável, e um aviso de que a tarifa varia por distribuidora e bandeira. Vale considerar atualizar os artigos depois.

---

## 8. Cuidados técnicos

- Página própria em `src/pages/`, não passa pelo `[slug].astro`
- Entrada em `posts.ts` para aparecer nas listagens (avaliar se deve aparecer no feed)
- JavaScript roda no navegador. Sem servidor, sem dependência nova.
- **CLS:** o componente precisa de altura mínima reservada. O blog está com CLS zerado no celular e não pode regredir. Ver `feedback_casa_em_alta_performance`.
- Schema: `WebApplication` + `FAQPage`
- Sitemap e IndexNow entram sozinhos no build
- Imagens (se houver) em WebP, com `width`/`height`

---

## 9. Estratégia evergreen (como isso não apodrece)

**Princípio:** o que envelhece num blog é texto com número cravado dentro, não a ferramenta. A calculadora não afirma valores, ela calcula com o valor que a pessoa fornece. Ela é a parte mais durável da página.

Objetivo do desenho: reduzir ao mínimo a quantidade de número cravado.

### O que muda e o que não muda

| Dado | Muda? | Frequência |
|---|---|---|
| Fórmula (kW × horas × dias × tarifa) | Não | Norma da ANEEL |
| Potência de um modelo específico | **Não** | A Philips 1000 XL sempre terá 1.700 W |
| Watts médios de aparelhos comuns | Praticamente não | Estável por décadas |
| Tarifa média nacional | Sim | 1x por ano |
| Bandeira tarifária | Sim | Todo mês |
| ICMS | Sim | Varia por estado |
| Preço dos produtos | Sim | Toda semana |

### As três decisões que garantem o evergreen

**1. A tarifa vem da conta de luz da pessoa, não do nosso código.**
A tarifa impressa na fatura já contém bandeira tarifária e ICMS embutidos, já é do estado e do mês dela. Um dado impossível de manter para 27 estados chega pronto e sempre correto.
Texto na interface: "Pegue o valor do kWh na sua última conta de luz. Não achou? Use R$ 0,98, a média nacional."
O valor padrão é rede de segurança, não fonte da verdade.

**2. Preço de produto não entra na calculadora.**
A calculadora fala de watts e conta de luz. Preço fica no artigo, onde já existe revisão. Colocar preço aqui criaria dívida de manutenção eterna.

**3. Todo dado perecível mora em um arquivo só: `src/data/energia.ts`**

```ts
export const TARIFA_MEDIA = 0.98
export const ATUALIZADO_EM = 'julho/2026'
export const APARELHOS = [ /* chuveiro 5500W, geladeira 150W, ... */ ]
export const PRODUTOS  = [ /* { nome, watts, slugArtigo } */ ]
```

Nenhum número solto espalhado pelo código. A manutenção anual é abrir esse arquivo, trocar duas linhas e dar push.

### Rotina de manutenção

| Quando | O que fazer | Tempo |
|---|---|---|
| 1x por ano (sugestão: janeiro) | Atualizar `TARIFA_MEDIA` e `ATUALIZADO_EM` | 5 minutos |
| Ao publicar review nova | Adicionar o modelo em `PRODUTOS` | 1 minuto |
| Se um modelo sair de linha | Remover de `PRODUTOS` | 1 minuto |

Criar tarefa recorrente anual na SmartAgenda.

### Sinal de frescor para o Google

- Exibir "Tarifa média atualizada em julho/2026" visível na página, perto do campo
- `dateModified` no schema sempre que o arquivo for atualizado
- Isso transforma a manutenção anual em sinal positivo de conteúdo vivo, não em passivo

### Dívida que já existe hoje

Os artigos atuais têm valores cravados (R$ 27/mês, R$ 30/mês) calculados com tarifa de R$ 0,80/kWh. Estão subestimando em cerca de 20%. Não é urgente, mas a calculadora deixa essa defasagem mais visível. Considerar datar esses trechos ("valores de julho/2026") em vez de reescrevê-los.

---

## 10. Esforço e encaixe no calendário

Construir isso bem feito custa mais ou menos o mesmo que um artigo do calendário.

**Recomendação:** não substituir o pilar Shopee de 10/07 (é abertura de frente nova de comissão). O candidato natural a ceder a vaga é **13/07 (Utilidades Shopee até R$ 30)**, que é o de menor ticket e menor comissão da fila.

Alternativa: publicar como quarto artigo de uma semana, fora da cadência de três.

Decisão pendente da Fernanda.

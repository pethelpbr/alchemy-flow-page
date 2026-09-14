# Ajuste de tipografia: textos de 14px para 16px

## Objetivo
Aumentar todos os textos que hoje estão em `14px` (`text-sm`) nas seções de conteúdo da landing page para `16px` (`text-base`), mantendo botões, menus e componentes de UI em 14px.

## O que será alterado

Percorrer os componentes de conteúdo e substituir `text-sm` por `text-base` nos seguintes locais:

```text
StorySection.tsx       → descrição dos tópicos ("Pó fino de dissolução...")
HowToUse.tsx           → textos dos 3 passos
TrustBadgesStrip.tsx   → títulos e descrições dos 4 selos
HeroSection.tsx        → linha "4,9 · mais de 12.000 clientes satisfeitos"
ReviewsCarousel.tsx    → total de avaliações, contagens do gráfico, nomes dos clientes
StatsBanner.tsx        → descrições dos percentuais
ProductVideoFeedback.tsx → descrição do accordion, botão "Ver tabela...", nome do produto no modal
Footer.tsx             → descrição da marca e links das colunas
PricingCard.tsx        → "Escolha seu ritual", preço riscado, parcelamento, economia, total com adicionais
KitBooster.tsx         → "Turbine seu kit"
RoutineResultsSection.tsx → descrições dos marcos, legendas "Antes"/"Depois", disclaimer, tarja marquee
BenefitsSection.tsx    → título e descrição dos cards no mobile (desktop já usa tamanhos maiores)
FAQAccordion.tsx       → respostas do accordion
ProductSelector.tsx    → nome da unidade e preço em cada opção
ComparisonSection.tsx  → "Fórmula comum" e textos da coluna comum na tabela
```

## Tratamento de overrides responsivos

Onde existir `text-sm ... sm:text-[15px]` ou `text-sm ... sm:text-sm`, o override também será ajustado para `text-base` para evitar que o texto fique maior no mobile do que no desktop. Exemplos:
- `text-sm ... sm:text-[15px]` → `text-base ... sm:text-base`
- `text-xs ... sm:text-sm` → mantém `text-xs` no mobile e passa para `sm:text-base`
- `text-[11px] ... sm:text-sm` → mantém `text-[11px]` no mobile e passa para `sm:text-base`

## O que NÃO será alterado

- Componentes de UI do shadcn (`button.tsx`, `select.tsx`, `label.tsx`, `navigation-menu.tsx`, `dropdown-menu.tsx`, `menubar.tsx`, `accordion.tsx` etc.).
- Botões de navegação de carrossel e menus do header.
- Labels intencionalmente pequenos: badges de desconto, selos de compra, contadores, captions de imagem.
- Textos que já usam tamanhos fixos como `text-[13px]`, `text-[15px]` ou `text-xs`.

## Validação

1. `bunx tsc --noEmit` para garantir que não houve erro de tipo.
2. Screenshots via Playwright nos viewports 1280x1800 e 390x844 para confirmar legibilidade e que nada quebrou.

# Aumentar fontes dos adicionais do kit no desktop

## Objetivo
Aumentar em 4 px cada texto dos cards de adicionais no `KitBooster`, mantendo o tamanho atual no mobile.

## O que será alterado

Em `src/components/KitBooster.tsx`, aplicar variação desktop (`lg:`) nos três textos de cada card:

- Nome do produto: `text-[11px]` → `text-[11px] lg:text-[15px]`
- Preço riscado: `text-[10px]` → `text-[10px] lg:text-[14px]`
- Preço atual: `text-xs` → `text-xs lg:text-base`

O mobile permanece inalterado (`text-[11px]`, `text-[10px]`, `text-xs`).

## Validação

1. `bunx tsc --noEmit` para garantir que não houve erro de tipo.
2. Screenshot via Playwright no desktop (1280x1800) para confirmar que o card continua legível e sem quebra.
3. Screenshot no mobile (390x844) para confirmar que as fontes ficaram iguais à versão atual.

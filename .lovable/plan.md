# Alteração de tipografia na landing page

## Objetivo
Trocar a família tipográfica dos textos da landing page Nutraflow (títulos e corpo), mantendo a estética premium e clean beauty.

## Como a tipografia está organizada hoje

```text
src/routes/__root.tsx   -> carrega as fontes do Google Fonts
src/styles.css          -> define as variáveis --font-display e --font-sans
src/components/*.tsx    -> usam essas variáveis via classes utilitárias
```

- **Títulos** usam a variável `--font-display` (atualmente `Cormorant Garamond`).
- **Texto corrido, botões e navegação** usam `--font-sans` (atualmente `Karla`).

## Passos do ajuste

1. **Escolher as novas fontes** (necessário confirmar com você).
   - Indicar a fonte para títulos (`--font-display`).
   - Indicar a fonte para corpo (`--font-sans`).

2. **Atualizar o carregamento das fontes**
   - Trocar o `<link>` das Google Fonts em `src/routes/__root.tsx` para as novas famílias e pesos desejados.

3. **Atualizar as variáveis CSS**
   - Em `src/styles.css`, dentro do bloco `@theme inline`, alterar:
     - `--font-display`
     - `--font-sans`

4. **Ajustar pesos e tamanhos, se necessário**
   - Revisar `@layer base` onde `h1, h2, h3` têm `font-weight: 300`.
   - Avaliar se a nova fonte de título precisa de peso diferente para ficar legível.

5. **Verificar visualmente**
   - Conferir hero, cards de preço, botões e FAQ nos viewports desktop e mobile.

## O que preciso de você
Me confirme quais duas fontes você quer usar (títulos + corpo). Se quiser, posso sugerir combinações premium que combinam com a marca.

## Escopo
- Somente alteração de tipografia.
- Nenhuma mudança de estrutura, cores ou animação está inclusa.

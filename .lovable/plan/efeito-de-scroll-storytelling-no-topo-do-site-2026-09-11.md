# Efeito de scroll storytelling no topo do site

## Objetivo
Replicar na primeira dobra a mesma lógica da seção de Benefícios: a galeria de imagens fica "travada" na tela enquanto o conteúdo da direita (headline, avaliações, card de compra) rola para baixo.

## O que muda

**Desktop:**
- A seção hero ganha uma área de scroll estendida (cerca de 1,8–2 telas de altura).
- A galeria de produto (imagem grande + miniaturas) fica fixa (sticky) na lateral esquerda enquanto o usuário rola.
- A coluna da direita sobe/desce naturalmente com o scroll, passando pela tela.
- Efeitos sutis na galeria durante o scroll (mesma linguagem dos benefícios):
  - zoom leve e progressivo na imagem principal;
  - a imagem principal pode trocar automaticamente entre as 4 fotos da galeria conforme o scroll avança (transição suave de fade), mantendo as miniaturas clicáveis.

**Mobile e usuários com "reduzir movimento":**
- Layout atual preservado (empilhado, sem travamento), igual ao fallback da seção de benefícios.

## O que NÃO muda
- Textos, preços, card de compra, bloco "Turbine seu kit", avaliações e selos.
- Cores, tipografia e demais seções da página.
- As miniaturas continuam funcionando por clique.

## Detalhes técnicos
- Arquivos: `src/components/HeroSection.tsx` (wrapper com altura estendida + `useScroll`/`useTransform` do motion) e ajuste pontual em `src/components/ProductGallery.tsx` para aceitar a imagem ativa controlada pelo scroll no modo desktop.
- Reuso do mesmo padrão já usado em `BenefitsSection.tsx` (sticky + scroll progress), com easing suave.
- Validação com screenshots em vários pontos de scroll no desktop e verificação do mobile.

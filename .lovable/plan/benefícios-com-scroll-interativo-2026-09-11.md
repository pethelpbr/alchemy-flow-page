# Benefícios com scroll interativo

A seção de benefícios ganha um efeito de rolagem em que a foto de fundo fica travada na tela enquanto os quatro cards entram um a um, como uma pequena narrativa.

## Como vai funcionar

- Ao chegar na seção, a foto de fundo e o título ficam parados na tela por cerca de uma tela e meia de rolagem.
- Durante essa parada, os quatro cards de benefício entram em sequência, deslizando de baixo com leve desfoque saindo de foco.
- A foto de fundo faz um zoom bem leve e o véu escuro escurece um pouco conforme a rolagem avança, dando profundidade.
- No fim, a seção se solta normalmente e o site continua a rolagem.

## No celular

- Efeito mais simples: os cards aparecem em sequência conforme entram na tela, sem travar a rolagem, para não atrapalhar a navegação com o dedo.
- Se a pessoa tiver a opção de "reduzir animações" ligada no aparelho, tudo aparece direto, sem movimento.

## Detalhes técnicos

- `src/components/BenefitsSection.tsx`: envolver a seção em um wrapper alto (`h-[250vh]`) com um bloco interno `sticky top-0 h-screen`.
- Usar `useScroll` do `motion/react` com `target` no wrapper e `offset: ["start start", "end end"]`, derivando `useTransform` para: escala da imagem (1 → 1.08), opacidade do gradiente e progresso dos cards.
- Cada card recebe opacidade/translateY/blur mapeados de faixas escalonadas do progresso (0.1–0.3, 0.25–0.45, 0.4–0.6, 0.55–0.75), com `useSpring` para suavizar.
- Abaixo de `md`, desativar o sticky e o mapeamento por scroll, mantendo os `Reveal` atuais; usar `useIsMobile` de `@/hooks/use-mobile` e `useReducedMotion` do motion.
- Nenhuma mudança em textos, imagens, cores ou nas demais seções; a posição da seção na página permanece a mesma.

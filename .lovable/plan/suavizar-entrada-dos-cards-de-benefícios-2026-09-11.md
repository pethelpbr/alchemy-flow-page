# Suavizar entrada dos cards de benefícios

Ajustar o efeito de scroll storytelling na seção de benefícios para que os cards apareçam de forma mais limpa, suave e gradual, sem a sensação de "surgir do nada".

## O que vai mudar

- Reduzir o deslocamento vertical dos cards ao entrarem para uma transição mais sutil.
- Diminuir/remover o desfoque (blur) de entrada, priorizando um fade-in puro.
- Ampliar as faixas de scroll de cada card para que o aparecimento seja mais gradual.
- Ajustar a mola do `useSpring` para amortecer melhor o movimento, ou trocar por uma curva de easing suave.
- Manter a estrutura sticky, a imagem de fundo, o título e os cards na mesma posição.

## Detalhes técnicos

- Em `src/components/BenefitsSection.tsx`, ajustar os `useTransform` de `ScrollCard`:
  - `y`: de `[56, 0]` para `[28, 0]` ou `[20, 0]`.
  - `blur`: reduzir de `[10, 0]` para `[4, 0]` ou remover o blur, mantendo só opacidade e leve deslocamento.
  - `opacity`: manter `[0, 1]`.
  - `ranges`: expandir as janelas para que cada card tenha mais tempo de scroll para aparecer (ex.: `[0.08, 0.28]`, `[0.22, 0.42]`, `[0.38, 0.58]`, `[0.54, 0.74]`).
  - `useSpring`: reduzir `stiffness` e aumentar `damping` para movimento mais pesado e controlado.
- Preservar `useReducedMotion` e `useIsMobile`: mobile continua com `StaticBenefits` e reduced motion desativa animações.
- Não alterar textos, cores, imagens, ordem das seções nem outros componentes.

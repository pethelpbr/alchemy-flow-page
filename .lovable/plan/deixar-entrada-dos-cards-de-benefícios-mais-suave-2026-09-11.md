# Deixar entrada dos cards de benefícios mais suave

Ajustar o efeito scroll-linked na seção de benefícios para que a entrada dos cards pareça fluida e elegante, sem sensação de "pulo" ou aparição brusca.

## O que vai mudar

- Reduzir drasticamente o deslocamento vertical dos cards (de 24px para 12px), mantendo um leve movimento ascendente.
- Remover o blur de entrada para deixar o efeito mais limpo.
- Trocar a interpolação linear por uma curva de ease-out suave no fade de opacidade e no movimento, fazendo os cards permanecerem invisíveis um pouco mais no início e entrarem de forma gradual.
- Amolecer ou remover a mola (`useSpring`) para evitar elasticidade/balanço na entrada.
- Manter as faixas de scroll contínuas e sobrepostas, sem pausas grandes entre os cards.
- Preservar a estrutura sticky, a imagem de fundo, o título e a posição da seção.

## Detalhes técnicos

- Em `src/components/BenefitsSection.tsx`, dentro de `ScrollCard`:
  - Remover o `blur` e o `filter`.
  - `y`: de `[24, 0]` para `[12, 0]`.
  - `opacity`: aplicar uma curva ease-out na interpolação (mapear o progresso por `1 - (1 - t)^3` ou similar), mantendo `[0, 1]` nos extremos.
  - Opcionalmente adicionar `scale` sutil `[0.98, 1]` combinado com opacidade para reforçar o fade clean.
- Ajustar `useSpring` para muito mais amortecimento (`stiffness` ~40, `damping` ~30) ou usar `scrollYProgress` diretamente com `useTransform` se a mola ainda parecer elástica.
- Manter `useReducedMotion` e `useIsMobile`: mobile e reduced motion continuam com versão estática.
- Não alterar textos, cores, imagens, ordem das seções ou outros componentes.

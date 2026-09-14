# Plano: loop infinito sem vazio na tarja marquee (desktop)

## Problema
Na tarja laranja abaixo do bloco de resultados ("ENERGIA • FOCO • DISPOSIÇÃO..."), o trilho repete os 7 tópicos apenas 2 vezes e anima de 0 até -50%. Em telas desktop largas, uma metade do trilho fica mais estreita que a largura da tela — então o último tópico termina, aparece um espaço vazio grande e o loop reinicia com um "pulo", em vez de um movimento contínuo e infinito.

## Correção
Em `src/components/RoutineResultsSection.tsx` (componente `MarqueeStrip`):

1. **Repetir o conteúdo 4 vezes** (em vez de 2), mantendo a animação de `x: [0, "-50%"]` com `repeat: Infinity`. Como as 4 cópias são idênticas, a metade do trilho (2 cópias) passa a ser bem mais larga que qualquer tela desktop, eliminando o vazio e tornando o loop visualmente contínuo.
2. **Manter o autolayout atual**: mesmos espaçamentos (`gap-6 sm:gap-8`), tipografia Fields, cores e velocidade (22s) — nada muda no visual além do fim do espaço vazio.
3. Mobile permanece igual (já funciona porque a tela é estreita).

## Validação
- Rodar typecheck (`bunx tsc --noEmit`).
- Conferir no preview desktop (1280px+) que a tarja rola continuamente sem lacuna nem salto, e que o mobile segue igual.

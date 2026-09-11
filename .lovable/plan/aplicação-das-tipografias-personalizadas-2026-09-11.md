# Aplicação das tipografias personalizadas

## Objetivo
Adicionar ao site os três arquivos enviados e aplicar cada fonte conforme definido:

- **Fields Bold** — títulos principais e títulos de seção.
- **Gabarito Variable** — subtítulos, textos corridos, menus, botões, preços e demais informações.
- **Firula Test Regular** — pequenos destaques editoriais, usados com moderação.

## Aplicação visual

1. **Títulos com Fields**
   - Headline principal.
   - Títulos das seções.
   - Títulos dos cards quando fizer sentido na hierarquia.

2. **Textos com Gabarito**
   - Parágrafos e descrições.
   - Subtítulos e títulos menores.
   - Menu, botões, valores, avaliações e FAQ.
   - Aproveitar os pesos disponíveis na fonte variável para preservar contraste e legibilidade.

3. **Destaques discretos com Firula**
   - Aplicar somente em pequenas chamadas editoriais selecionadas.
   - Evitar menus, botões, preços e textos longos.
   - Manter os rótulos pequenos em caixa alta com Gabarito quando Firula prejudicar a leitura.

## Implementação

- Hospedar os três arquivos como recursos próprios do site, sem depender do Google Fonts.
- Registrar as famílias e pesos corretos com `@font-face`.
- Criar três papéis tipográficos no sistema visual: título, texto e apoio.
- Remover o carregamento atual de Cormorant Garamond e Karla.
- Ajustar pesos e espaçamentos onde a Fields Bold alterar a ocupação dos títulos.
- Aplicar Firula pontualmente nas chamadas de apoio mais adequadas, sem mudar conteúdo, cores ou estrutura.

## Verificação

- Conferir títulos longos, botões, card de compra, FAQ e menu.
- Validar a página em computador e celular, garantindo que nenhum texto corte ou sobreponha outros elementos.
- Confirmar que todos os arquivos de fonte carregam corretamente e que não há erros na página.

## Escopo

Somente tipografia. Estrutura, textos, imagens, cores e funcionamento de compra permanecem iguais.

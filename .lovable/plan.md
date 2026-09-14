# Aumentar a legibilidade dos textos nos cards de ativos (desktop)

## Objetivo
Ajustar o card de ingredientes para que os textos curtos fiquem mais legíveis na versão desktop, sem perder a hierarquia e o visual clean.

## Ajustes
- Aumentar o título do card (`h3`) em telas grandes, mantendo caixa alta e a fonte `font-display`.
- Aumentar a descrição (`p`) em telas grandes, mantendo `font-sans` (Gabarito) e o limite de 3 linhas.
- Ampliar proporcionalmente a altura da faixa inferior fosca (`h-[36%]`) no desktop para acomodar o texto maior sem cortes.
- Reforçar o contraste dos textos sobre o blur, se necessário.

## Pontos de atenção
- Preservar os tamanhos atuais no mobile para não quebrar a proporção do card.
- Manter o `line-clamp-3` para evitar textos longos extrapolem a faixa.
- Garantir que as alinhamos das linhas e o espaçamento entre título e descrição continuem uniformes.

## Validação
- Conferir no desktop (≥1024 px) se os textos curtos como “Café verde”, “Guaraná” e “Gengibre” ficam bem legíveis.
- Verificar mobile e tablet para confirmar que não ficou grande demais.
- Validar o último card provisório (“Novo ativo”) com o mesmo tratamento.

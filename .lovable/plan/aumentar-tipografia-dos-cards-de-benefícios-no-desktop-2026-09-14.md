# Aumentar tipografia dos cards de benefícios no desktop

## Objetivo
Aumentar a legibilidade dos títulos e descrições nos cards de benefícios da seção "Por que esse produto virou parte da rotina?" sem perder a hierarquia visual e mantendo o mobile intacto.

## Ajustes
- Título (`h3`): passar de `text-sm` (14px) para **18px no desktop**; continuar uppercase, `font-display`, tracking ajustado proporcionalmente.
- Descrição (`p`): passar de `text-sm` (14px) para **16px no desktop**; manter `font-sans` e `leading-relaxed`.
- Ícone do card: aumentar proporcionalmente (de 20px para ~24px no desktop) para acompanhar os textos.
- Espaçamento interno (`p-6` → `md:p-8`) e margens (`mt-5`, `mt-3`) ajustadas proporcionalmente no desktop.
- Mobile continua no tamanho atual para não estourar a altura dos cards.

## Validação
- Conferir no desktop (≥768px) se os cards ficam legíveis e alinhados.
- Verificar no mobile se o tamanho permanece compacto.
- Garantir que o `line-clamp-3` e o efeito de scroll (se houver) não cortem textos.

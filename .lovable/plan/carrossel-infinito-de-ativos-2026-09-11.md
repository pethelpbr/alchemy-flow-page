# Carrossel infinito de ativos

## Alterações
- Criar uma imagem de fundo premium relacionada aos ingredientes e aplicá-la à seção com contraste adequado para os textos.
- Transformar a lista em um carrossel circular: ao avançar além do último card, continuar pelo primeiro sem interrupção perceptível.
- Manter as setas existentes e adicionar navegação por arraste com mouse e gesto de toque.
- Preservar o comportamento responsivo e a leitura dos cards em telas menores.

## Detalhes técnicos
- Duplicar visualmente os itens nas extremidades e reposicionar o trilho sem animação após cada transição de borda.
- Implementar pointer events com captura de ponteiro para arraste consistente e bloqueio de seleção acidental.
- Respeitar `prefers-reduced-motion` e manter textos alternativos na imagem de fundo decorativa via CSS.

## Validação
- Testar avanço e retorno pelas setas, reinício contínuo e arraste em desktop.
- Conferir visualmente desktop e mobile, incluindo contraste e ausência de erros.

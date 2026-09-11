# Nova paleta de cores

## O que muda
Aplicar a paleta enviada em `src/styles.css`, substituindo os tons atuais (oliva/areia/dourado). Nada de textos, imagens ou estrutura muda.

## Mapeamento dos tokens
| Token atual | Nova cor | Onde aparece |
|---|---|---|
| `--primary` | `#FF6A1B` (laranja) | Botões de compra, selos, badges, ícones de benefícios, descontos |
| `--secondary` / seções de confiança | `#2F5FF2` (azul) | Blocos de fórmula/ingredientes, informações técnicas, elementos de saúde |
| Hover / detalhes premium | `#B43F02` (terracota) | Hover dos botões, divisores, títulos especiais |
| `--background` | `#F9F7F2` (off-white) | Fundo da página e seções educativas |
| `--card` | `#FFFFFF` | Cards de benefícios, reviews, FAQ e oferta (com sombra leve) |
| `--ink` (texto principal) | `#504333` | Headlines e títulos |
| `--muted-foreground` | `#353534` | Descrições, FAQ, informações técnicas |

## Ajustes pontuais
- `--ring` e `--destructive` reajustados para combinar com a paleta.
- `--sand` (fundo de seções alternadas) vira um tom levemente mais quente que o fundo, mantendo separação suave entre blocos.
- `--primary-foreground` branco para contraste nos botões laranja.
- Sombras recalibradas para tons quentes da nova paleta.
- Badges "Mais vendido" / "Maior economia" em laranja; bloco de fórmula/ingredientes e selos técnicos passam a usar azul.

## Validação
Conferir desktop e mobile no preview: contraste dos botões, legibilidade dos textos e consistência entre seções.

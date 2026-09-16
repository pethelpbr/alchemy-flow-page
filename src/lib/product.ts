/**
 * Camada de dados do produto.
 *
 * Ponto único de integração futura com Shopify / Yampi:
 * basta preencher `externalId` de cada variante com o variant_id da
 * plataforma e implementar `buildCheckoutUrl` (ou trocar por uma chamada
 * ao carrinho da loja). Nenhum componente de UI precisa mudar.
 */

export type Variant = {
  id: string;
  units: number;
  label: string;
  sublabel: string;
  badge?: string;
  unitPrice: number;
  installments: number;
  /** Valor fixo da parcela (quando o parcelamento tem juros). */
  installmentValue?: number;
  /** Frete exibido junto ao preço (ex.: pote único). */
  shipping?: number;
  /** Linha de destaque abaixo do preço (ex.: frete grátis e economia). */
  note?: string;
  /** Valor por pote exibido abaixo do preço. */
  perPot?: number;
  /** Oculta a linha de parcelamento abaixo do preço. */
  hideInstallments?: boolean;
...
  {
    id: "2-un",
    units: 2,
    label: "2 potes",
    sublabel: "2 meses de cuidado",
    badge: "Mais vendido",
    unitPrice: 99.5,
    installments: 12,
    note: "Frete grátis · economize R$ 98",
    perPot: 99.5,
    hideInstallments: true,
    externalId: null,
  },
  {
    id: "5-un",
    units: 5,
    label: "Kit 5 unidades",
    sublabel: "150 doses · 5 meses de ritual",
    badge: "Maior economia",
    unitPrice: 127,
    installments: 12,
    externalId: null,
  },
];

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export type Addon = {
  id: string;
  name: string;
  price: number;
  image: string;
};

/** Produtos complementares exibidos no bloco "Turbine seu kit". */
export const addonCatalog: Omit<Addon, "image">[] = [
  { id: "collagen", name: "Colágeno", price: 49.9 },
  { id: "vitc", name: "Colágeno", price: 29.9 },
];

/** Soma dos adicionais selecionados no bloco "Turbine seu kit". */
export function addonsTotal(selectedIds: string[]) {
  return addonCatalog
    .filter((a) => selectedIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
}

export function variantTotals(variant: Variant) {
  const total = variant.unitPrice * variant.units;
  const installmentValue = variant.installmentValue ?? total / variant.installments;
  return { total, installmentValue };
}

/** Substituir pela URL de checkout da Shopify/Yampi na integração. */
export function buildCheckoutUrl(variant: Variant) {
  return variant.externalId ? `/checkout?variant=${variant.externalId}` : "#comprar";
}

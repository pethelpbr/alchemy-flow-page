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
  fullPrice: number;
  installments: number;
  /** Valor fixo da parcela (quando o parcelamento tem juros). */
  installmentValue?: number;
  /** Frete exibido junto ao preço (ex.: pote único). */
  shipping?: number;
  /** ID da variante na Shopify/Yampi (preencher na integração). */
  externalId: string | null;
};

export const BRAND = "Nutraflow";
export const PRODUCT_NAME = "Daily Greens";

export const variants: Variant[] = [
  {
    id: "1-un",
    units: 1,
    label: "1 pote",
    sublabel: "1 mês de cuidado",
    unitPrice: 139,
    fullPrice: 247,
    installments: 6,
    installmentValue: 24.82,
    shipping: 9.9,
    externalId: null,
  },
  {
    id: "3-un",
    units: 3,
    label: "Kit 3 unidades",
    sublabel: "90 doses · 3 meses de ritual",
    badge: "Mais vendido",
    unitPrice: 157,
    fullPrice: 247,
    installments: 12,
    externalId: null,
  },
  {
    id: "5-un",
    units: 5,
    label: "Kit 5 unidades",
    sublabel: "150 doses · 5 meses de ritual",
    badge: "Maior economia",
    unitPrice: 127,
    fullPrice: 247,
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
  fullPrice: number;
  image: string;
};

/** Produtos complementares exibidos no bloco "Turbine seu kit". */
export const addonCatalog: Omit<Addon, "image">[] = [
  { id: "collagen", name: "Colágeno", price: 49.9, fullPrice: 129.9 },
  { id: "vitc", name: "Colágeno", price: 29.9, fullPrice: 79.9 },
];

/** Soma dos adicionais selecionados no bloco "Turbine seu kit". */
export function addonsTotal(selectedIds: string[]) {
  return addonCatalog
    .filter((a) => selectedIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
}

/** Soma dos adicionais pelo preço cheio (para o valor riscado). */
export function addonsFullTotal(selectedIds: string[]) {
  return addonCatalog
    .filter((a) => selectedIds.includes(a.id))
    .reduce((sum, a) => sum + a.fullPrice, 0);
}

export function variantTotals(variant: Variant) {
  const total = variant.unitPrice * variant.units;
  const oldTotal = variant.fullPrice * variant.units;
  const savings = oldTotal - total;
  const discount = Math.round((savings / oldTotal) * 100);
  const installmentValue = variant.installmentValue ?? total / variant.installments;
  return { total, oldTotal, savings, discount, installmentValue };
}

/** Substituir pela URL de checkout da Shopify/Yampi na integração. */
export function buildCheckoutUrl(variant: Variant) {
  return variant.externalId ? `/checkout?variant=${variant.externalId}` : "#comprar";
}

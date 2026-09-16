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
  sublabel?: string;
  badge?: string;
  unitPrice: number;
  /** Preço total fixo da oferta (quando não é unitPrice * units). */
  total?: number;
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
    installments: 6,
    installmentValue: 24.82,
    shipping: 9.9,
    externalId: null,
  },
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
    id: "3-un-brinde",
    units: 3,
    label: "3 potes + PataHelp de brinde",
    badge: "Maior economia",
    unitPrice: 89.7,
    total: 269,
    installments: 12,
    note: "Frete grátis · economize R$ 277",
    perPot: 89.7,
    hideInstallments: true,
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
  const total = variant.total ?? variant.unitPrice * variant.units;
  const installmentValue = variant.installmentValue ?? total / variant.installments;
  return { total, installmentValue };
}

/** Substituir pela URL de checkout da Shopify/Yampi na integração. */
export function buildCheckoutUrl(variant: Variant) {
  return variant.externalId ? `/checkout?variant=${variant.externalId}` : "#comprar";
}

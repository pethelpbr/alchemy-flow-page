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
  /** Preço anterior exibido riscado na oferta. */
  compareAt?: number;
  /** Economia exibida no card da oferta. */
  savings?: number;
  /** Frete exibido junto ao preço (ex.: pote único). */
  shipping?: number;
  /** Linha de destaque abaixo do preço (ex.: frete grátis e economia). */
  note?: string;
  /** Valor por pote exibido abaixo do preço. */
  perPot?: number;
  /** Oculta a linha de parcelamento abaixo do preço. */
  hideInstallments?: boolean;
  /** URL de checkout externo para a variante (quando já existe link pronto). */
  checkoutUrl?: string;
  /** ID da variante na Shopify/Yampi (preencher na integração). */
  externalId: string | null;
};

export const BRAND = "Nutraflow";
export const PRODUCT_NAME = "Daily Greens";

export const variants: [Variant, ...Variant[]] = [
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
    checkoutUrl: "https://seguro.pethelpoficial.com.br/r/DFGJ3DQ0P9",
  },
  {
    id: "2-un",
    units: 2,
    label: "2 potes",
    sublabel: "2 meses de cuidado",
    badge: "Maior economia",
    unitPrice: 99.5,
    total: 199,
    installments: 6,
    installmentValue: 33.17,
    compareAt: 297.8,
    savings: 98,
    note: "Frete grátis · economize R$ 98",
    perPot: 99.5,
    externalId: null,
    checkoutUrl: "https://seguro.pethelpoficial.com.br/r/CZWG2GDYLT",
  },
  {
    id: "3-un-brinde",
    units: 3,
    label: "3 potes",
    sublabel: "+ PataHelp de brinde",
    badge: "Mais vendido",
    unitPrice: 89.7,
    total: 269,
    installments: 10,
    installmentValue: 26.9,
    compareAt: 546.5,
    savings: 277,
    note: "Frete grátis · economize R$ 277",
    perPot: 89.66,
    externalId: null,
    checkoutUrl: "https://seguro.pethelpoficial.com.br/r/6HTGX082TZ",
  },
];

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export type Addon = {
  id: string;
  name: string;
  price: number;
  /** Preço original exibido riscado no card do adicional. */
  compareAt?: number;
  image: string;
};

/** Produtos complementares exibidos no bloco "Turbine seu kit". */
export const addonCatalog: Omit<Addon, "image">[] = [
  { id: "collagen", name: "Contra mau hálito e tártaro", price: 49.9, compareAt: 89.9 },
  { id: "vitc", name: "Protege patas, focinho e pele", price: 29.9, compareAt: 59.9 },
];

/** Economia exibida no card do adicional. */
export function addonSavings(addon: Addon) {
  if (addon.compareAt == null) return 0;
  return Math.round((addon.compareAt - addon.price) * 100) / 100;
}

/** Soma dos adicionais selecionados no bloco "Turbine seu kit". */
export function addonsTotal(selectedIds: string[]) {
  return addonCatalog
    .filter((a) => selectedIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
}

/** Soma dos preços originais (riscados) dos adicionais selecionados. */
export function addonsCompareAtTotal(selectedIds: string[]) {
  return addonCatalog
    .filter((a) => selectedIds.includes(a.id))
    .reduce((sum, a) => sum + (a.compareAt ?? a.price), 0);
}

export function variantTotals(variant: Variant) {
  const total = variant.total ?? variant.unitPrice * variant.units;
  const installmentValue = variant.installmentValue ?? total / variant.installments;
  return { total, installmentValue };
}

/** URL de checkout da variante (checkout pronto vence; substituir na integração). */
export function buildCheckoutUrl(variant: Variant) {
  if (variant.checkoutUrl) return variant.checkoutUrl;
  return variant.externalId ? `/checkout?variant=${variant.externalId}` : "#comprar";
}

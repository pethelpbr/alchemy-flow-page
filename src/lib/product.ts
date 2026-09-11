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
  /** ID da variante na Shopify/Yampi (preencher na integração). */
  externalId: string | null;
};

export const BRAND = "Nutraflow";
export const PRODUCT_NAME = "Daily Greens";

export const variants: Variant[] = [
  {
    id: "1-un",
    units: 1,
    label: "1 unidade",
    sublabel: "30 doses · 1 mês de ritual",
    unitPrice: 197,
    fullPrice: 247,
    installments: 6,
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

export function variantTotals(variant: Variant) {
  const total = variant.unitPrice * variant.units;
  const oldTotal = variant.fullPrice * variant.units;
  const savings = oldTotal - total;
  const discount = Math.round((savings / oldTotal) * 100);
  const installmentValue = total / variant.installments;
  return { total, oldTotal, savings, discount, installmentValue };
}

/** Substituir pela URL de checkout da Shopify/Yampi na integração. */
export function buildCheckoutUrl(variant: Variant) {
  return variant.externalId ? `/checkout?variant=${variant.externalId}` : "#comprar";
}

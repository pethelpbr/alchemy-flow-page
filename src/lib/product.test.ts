import { describe, expect, it } from "vitest";
import {
  addonCatalog,
  addonsTotal,
  pataAddonCatalog,
  pataVariants,
  variantTotals,
  pataSelectorPricing,
  variants,
} from "./product";

describe("bloco Complete o cuidado na /pata", () => {
  it("mostra BocaHelp e NutraHelp, não PataHelp", () => {
    expect(pataAddonCatalog.map((addon) => addon.id)).toEqual(["collagen", "nutra"]);
    expect(pataAddonCatalog.map((addon) => addon.name)).toEqual([
      "Contra mau hálito e tártaro",
      "Cuida de pele, pelo e imunidade",
    ]);
  });

  it("usa o preço do pote avulso de NutraHelp, sem desconto inventado", () => {
    const nutra = pataAddonCatalog.find((addon) => addon.id === "nutra");
    expect(nutra?.price).toBe(139);
    expect(nutra?.compareAt).toBeUndefined();
  });

  it("soma os adicionais com o catálogo da própria página", () => {
    expect(addonsTotal(["collagen", "nutra"], pataAddonCatalog)).toBeCloseTo(188.9, 2);
    expect(addonsTotal(["nutra"], addonCatalog)).toBe(0);
  });

  it("mantém os adicionais da /pele com BocaHelp e PataHelp", () => {
    expect(addonCatalog.map((addon) => addon.id)).toEqual(["collagen", "vitc"]);
  });
});

describe("ofertas da página /pata", () => {
  it("oferece só dois kits: compre 2 leve 3 e 1 pote", () => {
    expect(pataVariants.map((variant) => variant.id)).toEqual(["pata-3", "pata-1"]);
    expect(pataVariants.map((variant) => variant.label)).toEqual(["3 potes", "1 pote"]);
  });

  it("usa os preços informados para cada kit", () => {
    expect(pataVariants.map((variant) => variantTotals(variant).total)).toEqual([159.8, 79.9]);
  });

  it("dá frete grátis ao compre 2, leve 3", () => {
    const trio = pataVariants.find((variant) => variant.id === "pata-3");
    expect(trio?.freeShipping).toBe(true);
    expect(trio?.tag).toBe("Compre 2, leve 3");
  });

  it("cobra no PataHelp avulso o mesmo frete do pote único da /pele", () => {
    const single = pataVariants.find((variant) => variant.id === "pata-1");
    const peleSingle = variants.find((variant) => variant.id === "1-un");
    expect(single?.shipping).toBe(9.9);
    expect(single?.shipping).toBe(peleSingle?.shipping);
    expect(single?.freeShipping).toBe(false);
  });

  it("soma o frete ao preço e à parcela do PataHelp avulso", () => {
    const single = pataVariants.find((variant) => variant.id === "pata-1");
    if (!single) throw new Error("Kit de um PataHelp não encontrado");
    expect(variantTotals(single).total + (single.shipping ?? 0)).toBeCloseTo(89.8, 2);
    expect(variantTotals(single).installmentValue).toBe(29.93);
  });

  it("mostra a economia de um PataHelp no compre 2 leve 3", () => {
    const trio = pataVariants.find((variant) => variant.id === "pata-3");
    if (!trio) throw new Error("Kit de três não encontrado");
    const pricing = pataSelectorPricing(trio, pataVariants);
    expect(pricing?.compareAt).toBeCloseTo(239.7);
    expect(pricing?.savings).toBe(79.9);
    expect(pricing?.perPot).toBeCloseTo(53.2667, 4);
  });

  it("não mostra 'por pote' no PataHelp avulso, para sobrar a linha de frete", () => {
    const single = pataVariants.find((variant) => variant.id === "pata-1");
    if (!single) throw new Error("Kit de um PataHelp não encontrado");
    expect(pataSelectorPricing(single, pataVariants)).toBeNull();
  });

  it("mantém os três kits da /pele inalterados", () => {
    expect(variants.map((variant) => variant.id)).toEqual(["1-un", "2-un", "3-un-brinde"]);
    expect(variants.find((variant) => variant.id === "1-un")?.shipping).toBe(9.9);
    expect(variants.find((variant) => variant.id === "2-un")?.freeShipping).toBeUndefined();
  });
});

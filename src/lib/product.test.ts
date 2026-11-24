import { describe, expect, it } from "vitest";
import {
  addonCatalog,
  addonsCompareAtTotal,
  addonsTotal,
  pataAddonCatalog,
  pataVariants,
  variantTotals,
  pataSelectorPricing,
  variants,
} from "./product";

describe("ofertas da página /pata", () => {
  it("compara o combo com os produtos avulsos sem incluir frete", () => {
    const combo = pataVariants[0];
    expect(pataSelectorPricing(combo, pataVariants)).toEqual({ perPot: 84.95, compareAt: 218.9, savings: 49 });
  });

  it("mostra a economia de um PataHelp no compre 2 leve 3", () => {
    const trio = pataVariants[1];
    if (!trio) throw new Error("Kit de três não encontrado");
    const pricing = pataSelectorPricing(trio, pataVariants);
    expect(pricing?.compareAt).toBeCloseTo(239.7);
    expect(pricing?.savings).toBe(79.9);
    expect(pricing?.perPot).toBeCloseTo(53.2667, 4);
  });

  it("mantém os três kits na ordem definida", () => {
    expect(pataVariants.map((variant) => variant.id)).toEqual([
      "pata-nutra",
      "pata-3",
      "pata-1",
    ]);
    expect(pataVariants.map((variant) => variant.label)).toEqual([
      "1 PataHelp + 1 NutraHelp",
      "3 PataHelps",
      "1 PataHelp",
    ]);
  });

  it("usa os preços informados para cada kit", () => {
    expect(pataVariants.map((variant) => variantTotals(variant).total)).toEqual([
      169.9,
      159.8,
      79.9,
    ]);
  });

  it("não oferece frete grátis em nenhum kit", () => {
    expect(pataVariants.every((variant) => variant.freeShipping === false)).toBe(true);
  });

  it("parcela o kit mais caro em 6x, o médio em 5x e o mais barato em 3x", () => {
    expect(pataVariants.map((variant) => variant.installments)).toEqual([6, 5, 3]);
    expect(pataVariants.map((variant) => variantTotals(variant).installmentValue)).toEqual([
      169.9 / 6,
      31.96,
      79.9 / 3,
    ]);
  });

  it("aplica o compre 2, leve 3 somente ao kit de três PataHelps", () => {
    expect(pataVariants[1]?.units).toBe(3);
    expect(pataVariants[1]?.tag).toBe("Compre 2, leve 3");
    expect(pataVariants[0]?.tag).toBe("Brinde");
    expect(pataVariants[2]?.tag).toBeUndefined();
  });
});

describe("adicionais do bloco Complete o cuidado", () => {
  it("mostra BocaHelp e NutraHelp na /pata, sem PataHelp", () => {
    expect(pataAddonCatalog.map((a) => a.id)).toEqual(["collagen", "nutra"]);
    expect(pataAddonCatalog.map((a) => a.name)).toEqual([
      "Contra mau hálito e tártaro",
      "Nutre a pele, o pelo e o intestino",
    ]);
  });

  it("cobra o NutraHelp pelo preço de um pote avulso, sem desconto inventado", () => {
    const nutra = pataAddonCatalog.find((a) => a.id === "nutra");
    const singlePot = variants.find((v) => v.id === "1-un");
    expect(nutra?.price).toBe(139);
    expect(nutra?.price).toBe(singlePot?.unitPrice);
    expect(nutra?.compareAt).toBeUndefined();
  });

  it("soma os adicionais da /pata pelo catálogo dela", () => {
    expect(addonsTotal(["collagen", "nutra"], pataAddonCatalog)).toBeCloseTo(188.9);
    expect(addonsCompareAtTotal(["collagen", "nutra"], pataAddonCatalog)).toBeCloseTo(228.9);
  });

  it("mantém BocaHelp e PataHelp no bloco da página da pele", () => {
    expect(addonCatalog.map((a) => a.id)).toEqual(["collagen", "vitc"]);
    expect(addonsTotal(["collagen", "vitc"])).toBeCloseTo(79.8);
  });
});

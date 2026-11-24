import { describe, expect, it } from "vitest";
import {
  addonCatalog,
  addonsTotal,
  pataAddonCatalog,
  pataVariants,
  variantTotals,
  pataSelectorPricing,
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

import { describe, expect, it } from "vitest";
import kitDuo1 from "@/assets/bf-duo-kit-1-potes.png.asset.json";
import kitDuo2 from "@/assets/bf-duo-kit-2-potes.png.asset.json";
import kitDuo3 from "@/assets/bf-duo-kit-3-potes.png.asset.json";
import {
  addonCatalog,
  addonSavings,
  addonsTotal,
  blackFridayDuoVariants,
  pataAddonCatalog,
  pataVariants,
  variantTotals,
  pataSelectorPricing,
  variants,
} from "./product";

describe("bloco Complete o cuidado na /pata", () => {
  it("mostra BocaHelp e NutraHelp, não PataHelp", () => {
    expect(pataAddonCatalog.map((addon) => addon.id)).toEqual(["nutra", "collagen"]);
    expect(pataAddonCatalog.map((addon) => addon.name)).toEqual([
      "Cuida da pele, pelos e intestino",
      "Contra mau hálito e tártaro",
    ]);
  });

  it("mostra o NutraHelp de R$ 139,00 por R$ 79,90, com a economia", () => {
    const nutra = pataAddonCatalog.find((addon) => addon.id === "nutra");
    expect(nutra?.price).toBe(79.9);
    expect(nutra?.compareAt).toBe(139);
    if (!nutra) throw new Error("NutraHelp não encontrado nos adicionais da /pata");
    expect(addonSavings({ ...nutra, image: "" })).toBe(59.1);
  });

  it("soma os adicionais com o catálogo da própria página", () => {
    expect(addonsTotal(["collagen", "nutra"], pataAddonCatalog)).toBeCloseTo(129.8, 2);
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

describe("fotos dos kits da /black-friday-duo", () => {
  it("usa as fotos novas enviadas pelo usuário nos três kits", () => {
    expect(blackFridayDuoVariants.map((variant) => variant.image)).toEqual([
      kitDuo1.url,
      kitDuo2.url,
      kitDuo3.url,
    ]);
  });
});

import { describe, expect, it } from "vitest";
import { pataVariants, variantTotals } from "./product";

describe("ofertas da página /pata", () => {
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
    expect(pataVariants[0]?.tag).toBeUndefined();
    expect(pataVariants[2]?.tag).toBeUndefined();
  });
});

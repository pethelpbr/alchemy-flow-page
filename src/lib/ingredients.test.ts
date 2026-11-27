import { describe, expect, it } from "vitest";
import { ingredientsDialogTitle, ingredientsProducts } from "./ingredients";

describe("modal de ingredientes da página /pata", () => {
  it("mostra só o bloco do PataHelp", () => {
    expect(ingredientsProducts("pata")).toEqual(["pata"]);
  });

  it("mantém os três blocos nas outras páginas", () => {
    expect(ingredientsProducts("default")).toEqual(["nutra", "pata", "boca"]);
  });

  it("mostra só NutraHelp e PataHelp na Black Friday Duo (sem BocaHelp)", () => {
    expect(ingredientsProducts("bf-duo")).toEqual(["nutra", "pata"]);
    expect(ingredientsDialogTitle("bf-duo")).toBe("Informação nutricional e ingredientes");
  });

  it("troca o título quando não há tabela nutricional", () => {
    expect(ingredientsDialogTitle("pata")).toBe("Composição e ingredientes");
    expect(ingredientsDialogTitle("default")).toBe("Informação nutricional e ingredientes");
  });
});

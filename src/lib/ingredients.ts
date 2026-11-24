export type IngredientsVariant = "default" | "pata";
export type ProductKey = "nutra" | "pata" | "boca";

// Cada página mostra no modal de ingredientes só os produtos dela:
// na do PataHelp entram apenas as informações do PataHelp.
export function ingredientsProducts(variant: IngredientsVariant): ProductKey[] {
  return variant === "pata" ? ["pata"] : ["nutra", "pata", "boca"];
}

export function ingredientsDialogTitle(variant: IngredientsVariant): string {
  return variant === "pata" ? "Composição e ingredientes" : "Informação nutricional e ingredientes";
}

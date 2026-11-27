export type IngredientsVariant = "default" | "pata" | "bf-duo";
export type ProductKey = "nutra" | "pata" | "boca";

// Cada página mostra no modal de ingredientes só os produtos dela:
// na do PataHelp entram apenas as informações do PataHelp;
// na Black Friday Duo entram NutraHelp e PataHelp (sem BocaHelp).
export function ingredientsProducts(variant: IngredientsVariant): ProductKey[] {
  if (variant === "pata") return ["pata"];
  if (variant === "bf-duo") return ["nutra", "pata"];
  return ["nutra", "pata", "boca"];
}

export function ingredientsDialogTitle(variant: IngredientsVariant): string {
  return variant === "pata" ? "Composição e ingredientes" : "Informação nutricional e ingredientes";
}

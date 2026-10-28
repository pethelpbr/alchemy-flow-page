import { createFileRoute, Link } from "@tanstack/react-router";
import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";

const title = "PetHelp | Suplementos para cães e gatos";
const description = "PetHelp: cuidado completo para cães e gatos. Conheça o NutraHelp para a pele e os pelos do seu pet.";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Home,
});

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-background px-6 text-center">
      <img src={petHelpLogo.url} alt="PetHelp" className="h-20 w-auto" />
      <Link to="/pele" className="rounded-full bg-primary px-8 py-4 font-sans text-base font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90">
        Cuidar da pele do meu pet
      </Link>
    </main>
  );
}

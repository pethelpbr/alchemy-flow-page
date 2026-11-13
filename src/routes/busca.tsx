import { createFileRoute, Link } from "@tanstack/react-router";

const items = [
  { name: "NutraHelp", desc: "Pele, pelos, coceira e imunidade", to: "/pele", tags: "nutrahelp coceira pele pelo queda dermatite alergia" },
  { name: "PataHelp", desc: "Patinhas ressecadas e lambedura", to: "/black-friday", tags: "patahelp pata patas ressecada lambe focinho coxim" },
  { name: "BocaHelp", desc: "Mau hálito e tártaro", to: "/black-friday", tags: "bocahelp boca halito hálito tartaro tártaro dente gengiva" },
] as const;

export const Route = createFileRoute("/busca")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({ meta: [
    { title: "Buscar | PetHelp" },
    { name: "description", content: "Encontre o produto PetHelp certo para o seu pet." },
    { property: "og:title", content: "Buscar | PetHelp" },
    { property: "og:description", content: "Encontre o produto PetHelp certo para o seu pet." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Busca,
});

function Busca() {
  const { q } = Route.useSearch();
  const term = q.trim().toLowerCase();
  const found = term ? items.filter((i) => (i.name + " " + i.tags).toLowerCase().includes(term)) : items;
  return (
    <main className="container-x min-h-screen bg-background py-14 text-foreground">
      <Link to="/home" className="text-sm font-semibold text-primary">← Voltar</Link>
      <h1 className="mt-6 font-display text-3xl text-ink">{term ? `Resultados para "${q}"` : "Nossos produtos"}</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {(found.length ? found : items).map((i) => (
          <Link key={i.name} to={i.to} className="rounded-2xl border border-border bg-card p-6 hover:border-primary">
            <p className="font-display text-xl text-ink">{i.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{i.desc}</p>
          </Link>
        ))}
      </div>
      {!found.length && <p className="mt-6 text-sm text-muted-foreground">Nada encontrado — veja nossos produtos acima.</p>}
    </main>
  );
}

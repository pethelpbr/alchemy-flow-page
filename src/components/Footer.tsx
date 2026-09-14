import { Instagram, Facebook, Youtube, Lock } from "lucide-react";
import { BRAND } from "@/lib/product";

const columns = [
  {
    title: "Produto",
    links: ["Benefícios", "Ingredientes", "Como usar", "Avaliações"],
  },
  {
    title: "Institucional",
    links: ["Sobre a marca", "Ciência", "Contato", "Trabalhe conosco"],
  },
  {
    title: "Ajuda",
    links: ["Entrega e frete", "Trocas e devoluções", "Rastrear pedido", "FAQ"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-sand/60">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <p className="font-display text-xl tracking-[0.32em] uppercase text-ink">{BRAND}</p>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-muted-foreground">
              Suplementos de dose única para rituais diários simples.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Rede social"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={16} strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((c) => (
            <nav key={c.title}>
              <h3 className="eyebrow">{c.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-base text-muted-foreground hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND}. Este produto não é medicamento e não substitui
            uma alimentação equilibrada.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <a href="#" className="hover:text-ink">Política de privacidade</a>
            <a href="#" className="hover:text-ink">Termos de uso</a>
            <span className="inline-flex items-center gap-1.5">
              <Lock size={12} strokeWidth={1.5} /> Site seguro
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

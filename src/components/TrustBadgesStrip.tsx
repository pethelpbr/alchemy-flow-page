import { Lock, Truck, Headphones, Clock } from "lucide-react";

const badges = [
  {
    icon: Lock,
    title: "COMPRA SEGURA",
    description: "Ambiente protegido com criptografia de dados.",
  },
  {
    icon: Truck,
    title: "ENTREGA GARANTIDA",
    description: "Envios para todo o Brasil com logística expressa.",
  },
  {
    icon: Headphones,
    title: "ATENDIMENTO",
    description: "Suporte online pra te acompanhar em cada etapa.",
  },
  {
    icon: Clock,
    title: "ENVIO EM 24H",
    description: "Para pedidos na região de São Paulo.",
  },
];

export function TrustBadgesStrip() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <badge.icon className="h-7 w-7 text-terracotta" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-sans text-base font-semibold tracking-[0.12em] text-ink">
                {badge.title}
              </h3>
              <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-muted-foreground">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

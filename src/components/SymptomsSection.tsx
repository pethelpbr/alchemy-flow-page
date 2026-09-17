import { AlertTriangle } from "lucide-react";
import sintoma1 from "@/assets/sintoma-1.jpg";
import sintoma2 from "@/assets/sintoma-2.jpg";
import sintoma3 from "@/assets/sintoma-3.jpg";
import sintoma4 from "@/assets/sintoma-4.jpg";
import sintoma5 from "@/assets/sintoma-5.jpg";
import sintoma6 from "@/assets/sintoma-6.jpg";

const symptoms = [
  {
    img: sintoma1,
    alt: "Cachorro golden retriever se coçando com a pele vermelha",
    title: "Se coça o dia inteiro",
    text: "E se coça com força, até a pele ficar vermelha e quente. Você já mandou parar mil vezes. Ele volta.",
  },
  {
    img: sintoma2,
    alt: "Shih tzu lambendo a pata no sofá",
    title: "Lambe a pata sem parar",
    text: "Sempre a mesma pata, até o pelo ali ficar avermelhado. De noite você escuta o barulhinho da lambida.",
  },
  {
    img: sintoma3,
    alt: "Golden retriever com falhas de pelo deitado no tapete",
    title: "Está ficando careca em pedaços",
    text: "Começa com uma falha pequena e vira um buraco no pelo. Toda semana parece um pouco maior.",
  },
  {
    img: sintoma4,
    alt: "Pastor alemão sacudindo a cabeça no sofá",
    title: "Sacode a cabeça e a orelha fede",
    text: "Você limpa, melhora uns dias, e duas semanas depois aquele cheiro está de volta.",
  },
  {
    img: sintoma5,
    alt: "Golden retriever coçando a barriga vermelha",
    title: "A barriga vive vermelha",
    text: "A pele da barriga e da virilha fica rosada e quente, às vezes com pontinhos escuros.",
  },
  {
    img: sintoma6,
    alt: "Shih tzu se esfregando no sofá",
    title: "Se esfrega no sofá e no tapete",
    text: "Esfrega o corpo, o focinho e o bumbum em tudo que aparece pela frente para aliviar.",
  },
];

export function SymptomsSection() {
  return (
    <section className="section bg-background">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Você vê o seu pet <span className="text-primary">sofrendo</span> com algum dos sintomas abaixo?
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
            A coceira não pega o corpo todo de uma vez. Ela escolhe um cantinho e volta sempre no mesmo lugar.
            Veja se o seu cachorro faz algum desses:
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {symptoms.map((s, i) => (
            <article
              key={s.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  width={944}
                  height={704}
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <h3 className="text-[15px] font-bold leading-snug text-primary">{s.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-start justify-center gap-2.5 rounded-xl bg-gift px-5 py-4 text-center sm:items-center">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-gift-foreground sm:mt-0" />
          <p className="text-[14px] font-medium leading-snug text-gift-foreground">
            <span className="font-bold">Atenção!</span> Se você reconheceu o seu cachorro em algum
            desses sintomas, continue lendo esta página.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="#comprar"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-card transition-colors hover:bg-terracotta"
          >
            Comprar agora
          </a>
        </div>
      </div>
    </section>
  );
}

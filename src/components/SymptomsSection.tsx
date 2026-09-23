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
    text: "Se coça com força, até a pele ficar ferida. Você já mandou parar mil vezes e ele volta.",
  },
  {
    img: sintoma2,
    alt: "Shih tzu lambendo a pata no sofá",
    title: "Lambe a pata sem parar",
    text: "De madrugada você escuta o barulho da lambida. O pelo das patas vai ficando escuro e úmido.",
  },
  {
    img: sintoma3,
    alt: "Golden retriever com falhas de pelo deitado no tapete",
    title: "Está com queda de pelos",
    text: "A escova enche em um minuto. O pelo fica opaco, quebradiço e ralo até abrir falha.",
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
    <section className="bg-background py-10 md:py-12">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-primary">Indicação</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
            Você vê algum desses sinais?
          </h2>
        </div>



        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {symptoms.map((s) => (
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
                <h3 className="text-[20px] font-bold leading-snug text-primary">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-start justify-center gap-2.5 rounded-xl bg-gift px-5 py-4 text-center sm:items-center">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-gift-foreground sm:mt-0" />
          <p className="text-[14px] font-medium leading-snug text-gift-foreground">
            <span className="font-bold">Atenção!</span> Se você reconheceu o seu cachorro em algum
            desses sinais, continue lendo esta página.
          </p>
        </div>
      </div>
    </section>
  );
}

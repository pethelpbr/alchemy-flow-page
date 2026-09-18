import { X } from "lucide-react";
import failedTreatments from "@/assets/failed-treatments.jpg";

const previousAttempts = [
  "Cone da vergonha",
  "Consulta atrás de consulta",
  "Corticoide",
  "Antibiótico",
  "Antialérgicos caros",
  "Troca de ração",
  "Pomada",
  "Shampoo medicamentoso",
];

export function PreviousAttemptsSection() {
  return (
    <section className="bg-background py-10 md:py-12" aria-labelledby="previous-attempts-title">
      <div className="container-x">
        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(26rem,1.05fr)] lg:gap-12">
          <div className="flex flex-col justify-center">
            <h2
              id="previous-attempts-title"
              className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Você já tentou.
              <br />
              E gastou.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground md:mt-6 md:text-lg">
              Cada um funcionou por um tempo. Melhorou, você respirou aliviada, e três semanas
              depois estava tudo de volta.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tentativas anteriores">
              {previousAttempts.map((attempt) => (
                <li
                  key={attempt}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm leading-none text-foreground"
                >
                  <X className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.8} aria-hidden="true" />
                  {attempt}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative min-h-72 overflow-hidden rounded-xl sm:min-h-96 lg:min-h-0">
            <img
              src={failedTreatments}
              alt="Cone de recuperação, shampoo, pomada e comprimidos usados nos cuidados de um cachorro"
              loading="lazy"
              width={1200}
              height={960}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
        </div>

        <div className="mt-8 rounded-xl bg-sand/60 px-6 py-8 sm:px-8 md:px-12 md:py-10">
          <h3 className="font-display text-2xl leading-snug text-ink md:text-3xl">
            E vamos ser sinceras: não é só ele que sofre com isso.
          </h3>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-foreground md:text-lg">
            É você que acorda às três da manhã com o barulho da coceira. É o sofá molhado de
            lambida. É a sua própria pele que começou a coçar junto. É a sensação horrível de
            estar fazendo tudo e nada funcionar — e de se sentir a pior mãe do mundo por já não
            aguentar mais.
          </p>
          <p className="mt-5 text-lg font-bold leading-snug text-primary md:text-xl">
            Isso não te faz egoísta. Te faz humana, e cansada.
          </p>
        </div>
      </div>
    </section>
  );
}
import sintoma1Asset from "@/assets/sintoma-1-nova.jpg.asset.json";
import sintoma2Asset from "@/assets/sintoma-2-lambendo.webp.asset.json";
import sintoma3Asset from "@/assets/sintoma-3-sofa.jpg.asset.json";
import sintoma4Asset from "@/assets/sintoma-4-sacudindo.jpg.asset.json";
import sintoma5Asset from "@/assets/sintoma-5-feridas.png.asset.json";
import sintoma6Asset from "@/assets/sintoma-6-scooting.jpg.asset.json";

type Symptom = { img: string; alt: string; title: string; text: string; pos?: string };

const symptoms: Symptom[] = [
  { img: sintoma1Asset.url, alt: "Cachorro de pelo branco se coçando na grama", title: "Se coça o dia inteiro", text: "Se coça com força, até a pele ficar ferida. Você já mandou parar mil vezes e ele volta." },
  { img: sintoma2Asset.url, alt: "Cachorro lambendo a pata", title: "Lambe a pata sem parar", text: "De madrugada você escuta o barulho da lambida. O pelo das patas vai ficando escuro e úmido." },
  { img: sintoma3Asset.url, alt: "Cachorro sentado no sofá cinza", title: "Está com queda de pelos", text: "A escova enche em um minuto. O pelo fica opaco, quebradiço e com falhas." },
  { img: sintoma5Asset.url, alt: "Cachorro deitado de barriga para cima no colo da tutora, com a pele do peito avermelhada", title: "Sofre com feridas e irritações", text: "Especialmente na barriga, na virilha e entre os dedos: a pele fica vermelha e quente." },
  { img: sintoma4Asset.url, alt: "Cachorro sacudindo a cabeça no sol", title: "Sacode a cabeça", text: "A orelha fica com cheiro forte. Você limpa, melhora uns dias, e logo volta.", pos: "object-[0%_center]" },
  { img: sintoma6Asset.url, alt: "Cachorro se esfregando no chão", title: "Vive se esfregando", text: "Esfrega o corpo, o focinho ou o bumbum em qualquer coisa que apareça pela frente para aliviar." },
];

export function SymptomsSection() {
  return (
    <section className="bg-background py-10 md:py-12 lg:py-6">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <p className="eyebrow text-primary">Indicação</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl lg:mt-2 lg:text-4xl">
            Reconhece algum desses sinais?
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-5 lg:grid-cols-3 lg:gap-3">
          {symptoms.map((s) => (
            <article key={s.title} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative">
                <img src={s.img} alt={s.alt} loading="lazy" width={944} height={704} className={`aspect-4/3 w-full object-cover lg:aspect-auto lg:h-[min(18vh,152px)] ${s.pos ?? ""}`} />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4 lg:p-3">
                <h3 className="text-[20px] font-bold leading-snug text-primary lg:text-[18px]">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground lg:leading-snug">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

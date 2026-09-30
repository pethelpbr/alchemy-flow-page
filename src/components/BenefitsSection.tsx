import benefitsBgAsset from "@/assets/benefits-bg-2.png.asset.json";
const benefitsBg = benefitsBgAsset.url;

const benefits = [
  { title: "Ele dorme a noite toda", text: "E você também. Sem o barulho da coceira e da lambida de madrugada." },
  { title: "Menos vermelhidão e irritação", text: "A pele fica mais calma e as feridinhas param de abrir no mesmo lugar." },
  { title: "O pelo volta a crescer", text: "Cai menos, o fio fica mais forte e as falhas começam a fechar." },
  { title: "Ele volta a brincar", text: "Mais disposição e menos tempo parado se coçando num canto." },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="scroll-mt-20 overflow-hidden">
      <div className="relative h-[430px] overflow-hidden bg-[#2E251D]">
        <img src={benefitsBg} alt="Tutor e pet durante a noite" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center md:px-16">
          <h2 className="mb-5 font-display text-4xl font-bold leading-tight text-card md:text-5xl">Você já tentou de tudo.</h2>
          <p className="mb-4 max-w-3xl text-base leading-relaxed text-card/85 md:text-lg">Foi consulta atrás de consulta, foi remédio que só resolveu por um tempo, foi o cone que ele odeia.</p>
          <p className="max-w-3xl text-base leading-relaxed text-card/85 md:text-lg"><strong className="text-primary">E o preço não foi só o dinheiro.</strong> É acordar de madrugada com o barulho da coceira. É ver ele sofrendo e não poder fazer nada. É se sentir o pior tutor do mundo por já não aguentar mais. <strong className="font-display text-xl text-card">Nada disso é culpa sua!</strong></p>
        </div>
      </div>
      <div className="bg-background-secondary px-6 py-12 md:px-16">
        <h2 className="mb-8 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">O que muda na sua casa quando a coceira diminui</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-primary">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-ink/80 md:text-base">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

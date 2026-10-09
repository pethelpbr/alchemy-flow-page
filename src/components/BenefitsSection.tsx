import benefitsBg from "@/assets/benefits-bg-oct1.png";

const benefits = [
  { title: "Dorme a noite toda", text: "A coceira e as lambeduras param de interromper o descanso dele — e o seu." },
  { title: "Fica calmo durante o dia", text: "Com a pele menos irritada e avermelhada, ele se livra daquela agonia." },
  { title: "Menos pelos pela casa", text: "Sem pelo espalhado no sofá e na roupa, e a pelagem fica cada vez mais forte e bonita." },
  { title: "Volta a brincar", text: "Mais disposto, ele volta a correr, brincar e ser como era antes das alergias." },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="scroll-mt-20 overflow-hidden">
      <div className="relative w-full overflow-hidden bg-[#2E251D] md:min-h-0">
        <img src={benefitsBg} alt="Tutora sentada no chão da sala de madrugada, mão na testa, com o cachorro deitado exausto ao lado" className="block h-[720px] w-full object-contain object-center md:h-auto md:object-contain" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,19,13,0)_0%,rgba(26,19,13,0.04)_20%,rgba(26,19,13,0.26)_32%,rgba(26,19,13,0.56)_46%,rgba(26,19,13,0.58)_70%,rgba(26,19,13,0.22)_100%),rgba(26,19,13,0.14)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center md:px-[72px]">
          <h2 className="mb-5 font-display text-4xl font-bold leading-tight tracking-tight text-[#FDFAF7] md:text-5xl">Você já tentou de tudo</h2>
          <p className="mb-4 max-w-3xl text-base leading-relaxed text-[#E3D8C9] md:text-lg">Foi consulta atrás de consulta, foi remédio que só resolveu por um tempo, foi o cone que ele odeia.</p>
          <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#E3D8C9] md:text-lg"><strong className="text-[#FFDF78]">E o preço não foi só o dinheiro.</strong> É acordar de madrugada com o barulho da coceira. É ver ele sofrendo e não poder fazer nada. É se sentir o pior tutor do mundo por já não aguentar mais. <strong className="font-display text-xl text-[#FDFAF7]">Nada disso é culpa sua!</strong></p>
        </div>
      </div>
      <div className="bg-background-secondary px-6 pt-10 pb-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center font-display text-3xl font-bold leading-tight text-ink md:text-4xl">É isso que muda com o NutraHelp</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-primary">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-ink/80 md:text-base">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

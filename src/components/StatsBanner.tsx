import { motion } from "framer-motion";

const stats = [
  {
    value: "98%",
    text: "notaram o pet se coçando e se lambendo menos",
  },
  {
    value: "97%",
    text: "viram as irritações e feridinhas cicatrizando mais rápido",
  },
  {
    value: "96%",
    text: "viram o pelo voltar a crescer sem falhas",
  },
];

export function StatsBanner() {
  return (
    <section className="bg-primary py-4 md:py-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl px-6 py-6 md:px-9 md:py-7"
      >
        <div className="grid gap-6 px-2 text-center md:grid-cols-3 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center"
            >
              <span className="font-display text-5xl font-semibold leading-none tracking-tight text-primary-foreground md:text-6xl">
                {stat.value}
              </span>
              <p className="mt-1 max-w-sm text-base leading-snug text-primary-foreground/90">
                {stat.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 px-2 text-center text-xs leading-relaxed text-primary-foreground/80">
          Percepção relatada por tutores após 30 dias ou mais de uso contínuo do NutraHelp. Pesquisa interna com [N] respondentes, [mês/ano]. Os resultados podem variar de acordo com cada pet.
        </p>
      </motion.div>
    </section>
  );
}

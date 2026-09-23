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
    <section className="bg-primary py-10 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full px-8 py-8 md:px-12 md:py-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className={`flex items-center justify-center gap-4 px-2 md:px-10 ${
                index < stats.length - 1 ? "md:border-r md:border-primary-foreground/20" : ""
              }`}
            >
              <span className="font-display text-5xl font-semibold leading-none tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                {stat.value}
              </span>
              <p className="max-w-[220px] text-base leading-snug text-primary-foreground/90">
                {stat.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-primary-foreground/20 pt-4">
          <p className="text-xs leading-relaxed text-primary-foreground/80">
            Percepção relatada por tutores após 30 dias ou mais de uso contínuo do NutraHelp. Pesquisa interna com [N] respondentes, [mês/ano]. Os resultados podem variar de acordo com cada pet.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

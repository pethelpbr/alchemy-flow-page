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
    <section className="bg-background py-10 md:py-12">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl bg-secondary px-8 py-8 md:px-10 md:py-10"
        >
          <div className="grid gap-8 md:grid-cols-3 md:gap-0">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                className={`px-2 md:px-8 ${
                  index < stats.length - 1 ? "md:border-r md:border-ink/10" : ""
                }`}
              >
                <span className="font-display text-5xl font-semibold leading-none tracking-tight text-primary md:text-6xl">
                  {stat.value}
                </span>
                <p className="mt-3 max-w-[260px] text-base leading-snug text-ink">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted-text">
            Percepção relatada por tutores após 30 dias ou mais de uso contínuo do NutraHelp. Pesquisa interna com [N] respondentes, [mês/ano]. Os resultados podem variar de acordo com cada pet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

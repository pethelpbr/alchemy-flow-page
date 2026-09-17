import { motion } from "framer-motion";

const stats = [
  {
    value: "98%",
    text: "notaram o pet se coçando menos",
  },
  {
    value: "97%",
    text: "relataram menos lambedura de patas e noites mais tranquilas",
  },
  {
    value: "96%",
    text: "observaram a pelagem mais forte e com menos falhas",
  },
];

export function StatsBanner() {
  return (
    <section className="bg-primary py-10 sm:py-12 lg:py-14">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-8 sm:grid-cols-3 sm:gap-0"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className={`flex items-center justify-center gap-4 px-4 sm:px-6 lg:px-10 ${
                index < stats.length - 1
                  ? "border-b border-primary-foreground/20 pb-8 sm:border-b-0 sm:border-r sm:pb-0"
                  : ""
              }`}
            >
              <span className="font-display text-5xl font-semibold leading-none tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
                {stat.value}
              </span>
              <p className="max-w-[220px] text-base leading-snug text-primary-foreground/90 sm:text-base">
                {stat.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";

const items = [
  "Frete grátis a partir de 2 potes",
  "Garantia de 60 dias",
  "Registrado no MAPA",
  "+150 mil pets atendidos",
];

export function MarqueeStrip() {
  const content = (
    <>
      {items.map((word) => (
        <span key={word} className="flex items-center gap-3 sm:gap-8">
          <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground sm:text-base">
            {word}
          </span>
          <span className="h-1 w-1 rounded-full bg-primary-foreground/80 sm:h-1.5 sm:w-1.5" />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative overflow-hidden bg-primary py-3 sm:py-4">
      <motion.div
        className="flex w-max items-center gap-3 sm:gap-8"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 32,
            ease: "linear",
          },
        }}
      >
        {content}
        {content}
        {content}
        {content}
      </motion.div>
    </div>
  );
}
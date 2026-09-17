import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const items = [
  "Frete Grátis nos Combos",
  "Garantia de 60 dias",
  "Registrado no MAPA",
  "+150 mil pets atendidos",
];

type Tone = "primary" | "gift";

const tones: Record<Tone, { strip: string; text: string; dot: string }> = {
  primary: {
    strip: "bg-primary",
    text: "text-primary-foreground",
    dot: "bg-primary-foreground/80",
  },
  gift: {
    strip: "bg-gift",
    text: "text-gift-foreground",
    dot: "bg-gift-foreground/70",
  },
};

export function MarqueeStrip({ tone = "primary" }: { tone?: Tone }) {
  const colors = tones[tone];

  const content = (
    <>
      {items.map((word) => (
        <span key={word} className="flex items-center gap-3 sm:gap-8">
          <span
            className={cn(
              "whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.18em] sm:text-base",
              colors.text,
            )}
          >
            {word}
          </span>
          <span
            className={cn("h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5", colors.dot)}
          />
        </span>
      ))}
    </>
  );

  return (
    <div
      className={cn("relative overflow-hidden py-3 sm:py-4", colors.strip)}
    >
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

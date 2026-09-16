import { motion } from "motion/react";

const items = [
  "Energia",
  "Foco",
  "Disposição",
  "Bem-estar",
  "Nutrição",
  "Equilíbrio",
  "Rotina",
];

export function MarqueeStrip() {
  const content = (
    <>
      {items.map((word) => (
        <span key={word} className="flex items-center gap-5 sm:gap-7">
          <span className="whitespace-nowrap font-sans text-[11px] font-semibold text-primary-foreground sm:text-[13px]">
            {word}
          </span>
          <span className="h-1 w-1 bg-primary-foreground/80" />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative flex h-8 items-center overflow-hidden bg-primary sm:h-9">
      <motion.div
        className="flex w-max items-center gap-5 sm:gap-7"
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
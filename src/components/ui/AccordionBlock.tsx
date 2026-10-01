import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionEntry = {
  title: string;
  content: ReactNode;
};

export function AccordionBlock({
  items,
  openIndex,
  onOpenChange,
  className,
  startIndex = 0,
  variant = "lines",
}: {
  items: AccordionEntry[];
  openIndex: number | null;
  onOpenChange: (index: number | null) => void;
  className?: string;
  startIndex?: number;
  variant?: "lines" | "cards";
}) {
  return (
    <div className={cn(variant === "cards" ? "grid gap-3" : "border-t border-border", className)}>
      {items.map((item, index) => {
        const itemIndex = startIndex + index;
        const isOpen = openIndex === itemIndex;

        return (
          <div key={item.title} className={cn(variant === "cards" ? "overflow-hidden rounded-2xl border border-border bg-card shadow-sm" : "border-b border-border")}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => onOpenChange(isOpen ? null : itemIndex)}
              className={cn("grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-left text-ink", variant === "cards" ? "px-5 py-4" : "px-1 py-4")}
            >
              <span className="min-w-0 text-base font-semibold">{item.title}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn("max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base", variant === "cards" ? "px-5 pb-5 pr-8" : "px-1 pb-4 pr-8")}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

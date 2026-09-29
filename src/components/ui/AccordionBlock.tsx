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
}: {
  items: AccordionEntry[];
  openIndex: number | null;
  onOpenChange: (index: number | null) => void;
  className?: string;
  startIndex?: number;
}) {
  return (
    <div className={cn("border-t border-border", className)}>
      {items.map((item, index) => {
        const itemIndex = startIndex + index;
        const isOpen = openIndex === itemIndex;
        const isLast = index === items.length - 1;

        return (
          <div key={item.title}>
            <div
              className={cn(
                "border-b border-border",
                isLast && isOpen && "border-b-0",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => onOpenChange(isOpen ? null : itemIndex)}
                className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-1 py-4 text-left text-ink"
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
                    <div className="max-w-2xl px-1 pb-4 pr-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

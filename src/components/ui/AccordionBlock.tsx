import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionEntry = {
  title: string;
  content: string;
};

/**
 * Single source of truth for every accordion on the page.
 * Each panel uses the same internal auto-layout: identical header row,
 * padding, typography, max width and minimum content height, so switching
 * between tabs never changes the shape of the block.
 */
export function AccordionBlock({
  items,
  openIndex,
  onOpenChange,
  icon = "chevron",
  className,
}: {
  items: AccordionEntry[];
  openIndex: number | null;
  onOpenChange: (index: number | null) => void;
  icon?: "chevron" | "plus";
  className?: string;
}) {
  return (
    <div className={cn("border-y border-border", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} className="border-b border-border last:border-b-0">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => onOpenChange(isOpen ? null : index)}
              className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-1 py-4 text-left text-ink transition-colors hover:text-primary"
            >
              <span className="min-w-0 text-base font-semibold">{item.title}</span>
              {icon === "chevron" ? (
                <ChevronDown
                  size={18}
                  className={cn(
                    "shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              ) : (
                <Plus
                  size={18}
                  strokeWidth={1.3}
                  className={cn(
                    "shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              )}
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
                  <p className="min-h-[76px] px-1 pb-5 pr-8 text-sm leading-relaxed text-muted-foreground sm:min-h-[64px] sm:text-base">
                    {item.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

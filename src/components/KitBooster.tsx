import { Check } from "lucide-react";
import { brl, addonCatalog, type Addon } from "@/lib/product";
import { cn } from "@/lib/utils";
import addonCollagen from "@/assets/addon-collagen.jpg";
import addonOmega from "@/assets/addon-omega.jpg";
import addonVitc from "@/assets/addon-vitc.jpg";

const images: Record<string, string> = {
  collagen: addonCollagen,
  omega: addonOmega,
  vitc: addonVitc,
};

export const addons: Addon[] = addonCatalog.map((a) => ({
  ...a,
  image: images[a.id]!,
}));

export function KitBooster({
  selectedIds,
  onToggle,
}: {
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="mt-6">
      <p className="flex items-center gap-2 text-lg font-medium text-ink md:text-xl">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          2
        </span>
        Turbine seu kit
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 md:gap-4">
        {addons.map((a) => {
          const isActive = selectedIds.includes(a.id);
          return (
            <button
              key={a.id}
              onClick={() => onToggle(a.id)}
              aria-pressed={isActive}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-3 text-left transition-all duration-300 md:p-4",
                isActive
                  ? "border-primary/70 shadow-card"
                  : "border-border hover:border-primary/30",
              )}
            >
              <span className="relative block overflow-hidden rounded-xl bg-sand">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="aspect-square w-full object-cover"
                />
                <span
                  className={cn(
                    "absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full border transition-colors",
                    isActive
                      ? "border-primary bg-primary"
                      : "border-clay bg-card/90",
                  )}
                >
                  {isActive && (
                    <Check size={14} strokeWidth={3} className="text-primary-foreground" />
                  )}
                </span>
              </span>

              <span className="mt-3 block text-sm font-semibold leading-snug text-ink md:text-base">
                {a.name}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground line-through md:text-sm">
                {brl(a.fullPrice)}
              </span>
              <span className="block text-base font-bold text-ink md:text-lg">{brl(a.price)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function addonsTotal(selectedIds: string[]) {
  return addons
    .filter((a) => selectedIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
}

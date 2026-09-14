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
      <p className="flex items-center gap-2 text-base font-medium text-ink">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          2
        </span>
        Turbine seu kit
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {addons.map((a) => {
          const isActive = selectedIds.includes(a.id);
          return (
            <button
              key={a.id}
              onClick={() => onToggle(a.id)}
              aria-pressed={isActive}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-2.5 text-left transition-all duration-300",
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
                    "absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full border transition-colors",
                    isActive
                      ? "border-primary bg-primary"
                      : "border-clay bg-card/90",
                  )}
                >
                  {isActive && (
                    <Check size={11} strokeWidth={3} className="text-primary-foreground" />
                  )}
                </span>
              </span>

              <span className="mt-2 block text-[11px] font-medium leading-snug text-ink">
                {a.name}
              </span>
              <span className="mt-1 block text-[10px] text-muted-foreground line-through">
                {brl(a.fullPrice)}
              </span>
              <span className="block text-xs font-semibold text-ink">{brl(a.price)}</span>
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

import { Check } from "lucide-react";
import { brl, addonCatalog, type Addon } from "@/lib/product";
import { cn } from "@/lib/utils";
import addonCollagen from "@/assets/addon-collagen.jpg";
import addonVitc from "@/assets/addon-vitc.jpg";

const images: Record<string, string> = {
  collagen: addonCollagen,
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

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {addons.map((a) => {
          const isActive = selectedIds.includes(a.id);
          return (
            <div
              key={a.id}
              className={cn(
                "relative flex flex-col rounded-xl border bg-card p-2.5 text-left transition-all duration-300",
                isActive
                  ? "border-primary/70 shadow-card"
                  : "border-border hover:border-primary/30",
              )}
            >
              <span
                onClick={() => onToggle(a.id)}
                className="relative block cursor-pointer overflow-hidden rounded-lg bg-sand"
              >
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="aspect-square w-full object-cover"
                />
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(a.id);
                  }}
                  className={cn(
                    "absolute right-1.5 top-1.5 grid h-5 w-5 cursor-pointer place-items-center rounded-full border transition-colors",
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

              <span className="mt-2 block text-[11px] font-medium leading-snug text-ink lg:text-[15px]">
                {a.name}
              </span>
              <span className="mt-1 block text-[10px] text-muted-foreground line-through lg:text-[14px]">
                {brl(a.fullPrice)}
              </span>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs font-semibold text-ink lg:text-base">{brl(a.price)}</span>
                <div className="flex flex-1 justify-center">
                  <button
                    type="button"
                    onClick={() => onToggle(a.id)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-wider transition-colors lg:text-[13px]",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary hover:bg-primary/20",
                    )}
                  >
                    {isActive ? "ADICIONADO" : "ADICIONAR"}
                  </button>
                </div>
              </div>
            </div>
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

import { useCallback, useState } from "react";
import {
  addonCatalog,
  addonsTotal,
  buildCheckoutUrl,
  variants,
  type Addon,
  type Variant,
} from "./product";
import { goToCheckout, kitFromVariant } from "./tracking";

/**
 * Estado de seleção de oferta. Concentra a ação de compra para que a
 * integração com Shopify/Yampi aconteça em um único lugar.
 */
export function useCart(
  list: Variant[] = variants,
  addonList: Omit<Addon, "image">[] = addonCatalog,
) {
  const [selected, setSelected] = useState<Variant>(() => {
    const first = list[0];
    if (first?.id.startsWith("pata-")) return first;
    return list[2] ?? first!;
  });
  const [addonIds, setAddonIds] = useState<string[]>([]);

  const toggleAddon = useCallback((id: string) => {
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }, []);

  const addonsExtra = addonsTotal(addonIds, addonList);

  const checkout = useCallback((variantOverride?: Variant) => {
    // Botões passam o evento de clique como primeiro argumento; ignora
    // qualquer coisa que não seja de fato uma variante.
    const v =
      variantOverride && typeof variantOverride === "object" && "id" in variantOverride
        ? variantOverride
        : selected;
    const url = buildCheckoutUrl(v);
    if (url.startsWith("#")) {
      document.querySelector(url)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    void goToCheckout(url, kitFromVariant(v));
  }, [selected]);

  return { selected, setSelected, checkout, addonIds, toggleAddon, addonsExtra };
}

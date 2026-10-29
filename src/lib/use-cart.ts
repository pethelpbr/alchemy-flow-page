import { useCallback, useState } from "react";
import { addonsTotal, buildCheckoutUrl, variants, type Variant } from "./product";

/**
 * Estado de seleção de oferta. Concentra a ação de compra para que a
 * integração com Shopify/Yampi aconteça em um único lugar.
 */
export function useCart() {
  const [selected, setSelected] = useState<Variant>(() => variants[2] ?? variants[0]);
  const [addonIds, setAddonIds] = useState<string[]>([]);

  const toggleAddon = useCallback((id: string) => {
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }, []);

  const addonsExtra = addonsTotal(addonIds);

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
    window.location.href = url;
  }, [selected]);

  return { selected, setSelected, checkout, addonIds, toggleAddon, addonsExtra };
}

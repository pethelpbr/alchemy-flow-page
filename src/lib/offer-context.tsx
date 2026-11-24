import { createContext, useContext, type ReactNode } from "react";
import {
  addonCatalog,
  variants as defaultVariants,
  type Addon,
  type Variant,
} from "./product";

export type Offer = {
  variants: Variant[];
  /** Mostra o bloco de adicionais ("Complete o cuidado") no card de compra. */
  showAddons: boolean;
  /** Catálogo de adicionais exibido no bloco; padrão: os da página /pele. */
  addons?: Omit<Addon, "image">[];
  /** Fotos extras exibidas junto ao kit (ex.: PataHelp e BocaHelp). */
  bundleImages?: { src: string; alt: string }[];
  buyLabel?: string;
};

const OfferContext = createContext<Offer>({
  variants: defaultVariants,
  showAddons: true,
  addons: addonCatalog,
});

export function OfferProvider({ offer, children }: { offer: Offer; children: ReactNode }) {
  return <OfferContext.Provider value={offer}>{children}</OfferContext.Provider>;
}

export const useOffer = () => useContext(OfferContext);

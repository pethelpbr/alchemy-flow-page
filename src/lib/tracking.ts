/**
 * Rastreamento de campanha da PetHelp.
 *
 * Guarda as UTMs e os IDs de clique da URL de entrada e os leva até o checkout,
 * dispara ViewContent/AddToCart no Meta e no Google, e concentra o
 * redirecionamento para o checkout em um só lugar.
 *
 * O pixel do Meta já existe em `src/lib/meta-pixel.ts` — nada aqui instala um
 * segundo pixel: os eventos passam pelo dispatcher dele, que só libera o
 * rastreio fora das regiões que exigem consentimento. A tag do Google
 * (GA4 + Google Ads) é carregada em `src/routes/__root.tsx` sob a mesma regra.
 */
import { trackAddToCart as metaAddToCart, trackMetaEvent, trackingAllowed } from "./meta-pixel";
import { variantTotals, type Variant } from "./product";

const KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",
  "fbclid", "gclid", "gbraid", "wbraid", "ttclid", "src", "sck",
];
const STORAGE = "ph_tracking_params";
const TTL_DAYS = 30;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type Stored = { params: Record<string, string>; ts: number };

/**
 * Roda ao abrir a página: se a URL tiver UTMs, guarda (a visita mais recente
 * substitui a anterior). Só grava quando o rastreio está liberado para a
 * região do visitante — a mesma regra do pixel do Meta.
 */
export function captureTrackingParams() {
  void trackingAllowed().then((ok) => {
    if (!ok) return;
    try {
      const url = new URL(window.location.href);
      const found: Record<string, string> = {};
      KEYS.forEach((k) => {
        const v = url.searchParams.get(k);
        if (v) found[k] = v;
      });
      if (!Object.keys(found).length) return;
      const data: Stored = { params: found, ts: Date.now() };
      localStorage.setItem(STORAGE, JSON.stringify(data));
      const secure = window.location.protocol === "https:" ? "Secure; " : "";
      document.cookie =
        `${STORAGE}=${encodeURIComponent(JSON.stringify(found))}; max-age=${TTL_DAYS * 86400}; ` +
        `path=/; domain=.pethelpoficial.com.br; SameSite=Lax; ${secure}`;
    } catch {}
  });
}

/** UTMs guardadas na visita (localStorage primeiro, depois o cookie). */
export function getTrackingParams(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) {
      const d = JSON.parse(raw) as Stored;
      if (Date.now() - d.ts < TTL_DAYS * 86400000) return d.params;
    }
    const m = document.cookie.match(new RegExp(`(?:^|; )${STORAGE}=([^;]*)`));
    const value = m?.[1];
    if (value) return JSON.parse(decodeURIComponent(value));
  } catch {}
  return {};
}

/** Acrescenta as UTMs guardadas à URL do checkout sem apagar o que já existe. */
export function withTracking(checkoutUrl: string): string {
  try {
    const u = new URL(checkoutUrl, window.location.href);
    const p = getTrackingParams();
    Object.entries(p).forEach(([k, v]) => {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    });
    return u.toString();
  } catch {
    return checkoutUrl;
  }
}

export type Kit = { id: string; name: string; price: number; quantity?: number };

function pushGtag(...args: unknown[]) {
  if (window.gtag) window.gtag(...args);
  else (window.dataLayer ||= []).push(args);
}

/** Visualização da página do produto (uma vez por carregamento). */
export function trackViewContent(kit: Kit) {
  trackMetaEvent("ViewContent", {
    value: kit.price,
    currency: "BRL",
    content_name: kit.name,
    content_ids: [kit.id],
    content_type: "product",
  });
  pushGtag("event", "view_item", {
    currency: "BRL",
    value: kit.price,
    items: [{ item_id: kit.id, item_name: kit.name, price: kit.price, quantity: 1 }],
  });
}

/**
 * Carrinho no clique de compra. Resolve quando os dois envios tiverem saída:
 * o do Meta espera o pixel liberar e já aguarda ~300 ms antes de devolver.
 */
export async function trackAddToCart(kit: Kit) {
  const qty = kit.quantity ?? 1;
  pushGtag("event", "add_to_cart", {
    currency: "BRL",
    value: kit.price * qty,
    items: [{ item_id: kit.id, item_name: kit.name, price: kit.price, quantity: qty }],
  });
  await metaAddToCart({ id: kit.id, name: kit.name, value: kit.price * qty, quantity: qty });
}

/** Dispara o carrinho e só então vai para o checkout, com as UTMs anexadas. */
export async function goToCheckout(checkoutUrl: string, kit: Kit) {
  try {
    await trackAddToCart(kit);
  } finally {
    window.location.href = withTracking(checkoutUrl);
  }
}

/** Nomes de kit exibidos na página, usados nos eventos de produto. */
const BF_KIT_NAMES: Record<string, string> = {
  "bf-1": "Kit Black Friday 1 NutraHelp + 1 PataHelp + 1 BocaHelp",
  "bf-2": "Kit Black Friday 2 NutraHelps + 1 PataHelp + 1 BocaHelp",
  "bf-3": "Kit Black Friday 3 NutraHelps + 2 PataHelps + 1 BocaHelp",
};

/** Kit de rastreamento a partir da variante selecionada na página. */
export function kitFromVariant(v: Variant): Kit {
  return {
    id: v.id,
    name: BF_KIT_NAMES[v.id] ?? `NutraHelp ${v.label}`,
    price: variantTotals(v).total,
    quantity: v.units,
  };
}

/** Tag do Google (GA4 + Google Ads). Só é carregada quando o rastreio é liberado. */
const GA4_IDS = ["G-3W1H0TVXYW", "G-37YXSDY2KW"];
const GOOGLE_ADS_ID = "AW-966294266";
let googleTagLoading = false;

export function loadGoogleTag() {
  if (typeof window === "undefined" || googleTagLoading) return;
  googleTagLoading = true;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }
  const g = window.gtag;
  g("js", new Date());
  g("set", "developer_id.dZjgwMW", true);
  GA4_IDS.forEach((id) => g("config", id));
  g("config", GOOGLE_ADS_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_IDS[0]}`;
  document.head.appendChild(s);
}

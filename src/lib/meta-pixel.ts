/**
 * Meta Pixel (PetHelp). Sem banner de cookies: visitantes em regiões que exigem
 * consentimento (UE/EEE, Reino Unido, Suíça) ou de região desconhecida não são
 * rastreados. No Brasil o rastreio fica ativo.
 */
export const META_PIXEL_ID = "1277564260241336";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const CONSENT_REGIONS = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU",
  "MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH",
]);

let allowedPromise: Promise<boolean> | null = null;

async function resolveAllowed(): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2000);
    const res = await fetch("/cdn-cgi/trace", { signal: ctrl.signal, cache: "no-store" });
    clearTimeout(t);
    if (!res.ok) return false;
    const text = await res.text();
    const get = (k: string) => text.match(new RegExp(`^${k}=(.*)$`, "m"))?.[1]?.trim();
    const loc = get("loc");
    const host = get("h");
    if (host && host !== window.location.host) return false;
    if (!loc || loc === "XX" || loc === "T1") return false;
    return !CONSENT_REGIONS.has(loc);
  } catch {
    return false;
  }
}

function dispatch(...args: unknown[]) {
  const f = window.fbq;
  if (!f) return;
  if (f.callMethod) f.callMethod.apply(f, args);
  else f.queue.push(args);
}

function loadPixel() {
  if (window.fbq) return;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod.apply(n, args);
    else n.queue.push(args);
  } as Fbq;
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  dispatch("init", META_PIXEL_ID, {}, { agent: "lovable" });
}

function ensure(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (!allowedPromise) {
    allowedPromise = resolveAllowed().then((ok) => {
      if (ok) loadPixel();
      return ok;
    });
  }
  return allowedPromise;
}

/** PageView — chamado a cada carregamento/navegação de página. */
export function trackPageView() {
  void ensure().then((ok) => ok && dispatch("track", "PageView"));
}

/**
 * AddToCart — só no clique que leva ao checkout. Espera até ~400 ms para o
 * envio sair antes do redirecionamento.
 */
export async function trackAddToCart(data: {
  id: string;
  name: string;
  value: number;
  quantity: number;
}) {
  const ok = await Promise.race([ensure(), new Promise<boolean>((r) => setTimeout(() => r(false), 400))]);
  if (!ok) return;
  dispatch(
    "track",
    "AddToCart",
    {
      content_ids: [data.id],
      content_name: data.name,
      content_type: "product",
      contents: [{ id: data.id, quantity: data.quantity }],
      value: data.value,
      currency: "BRL",
    },
    { eventID: `atc-${data.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
  );
  await new Promise((r) => setTimeout(r, 300));
}

/** Dispara AddToCart da variante e então vai para o checkout. */
export async function goToCheckout(
  url: string,
  v: { id: string; label: string; units: number; total: number },
) {
  try {
    await trackAddToCart({ id: v.id, name: `NutraHelp ${v.label}`, value: v.total, quantity: v.units });
  } finally {
    window.location.href = url;
  }
}

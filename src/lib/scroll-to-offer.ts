/** Rola suavemente até o card de compra (#comprar) de qualquer landing page. */
export function scrollToOffer(selector = "#comprar", offset?: number) {
  const card = document.querySelector(selector);
  if (!card) return;
  // Interrompe o embalo do arraste antes de animar, senão a rolagem suave é cortada no celular.
  window.scrollTo({ top: window.scrollY, behavior: "auto" });
  // Usa a altura da faixa fixa, não sua posição atual (a tarja do topo some ao rolar).
  const header = document.querySelector("header > div");
  const clearance = offset ?? (header?.getBoundingClientRect().height ?? 64) + 6;
  const top = Math.max(0, window.scrollY + card.getBoundingClientRect().top - clearance);
  window.scrollTo({ top, behavior: "smooth" });
}

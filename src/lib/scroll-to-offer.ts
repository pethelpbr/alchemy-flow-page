/** Rola suavemente até o card de compra (#comprar) de qualquer landing page. */
export function scrollToOffer(selector = "#comprar", offset = 112) {
  const card = document.querySelector(selector);
  if (!card) return;
  // Interrompe o embalo do arraste antes de animar, senão a rolagem suave é cortada no celular.
  window.scrollTo({ top: window.scrollY, behavior: "auto" });
  const top = Math.max(0, window.scrollY + card.getBoundingClientRect().top - offset);
  window.scrollTo({ top, behavior: "smooth" });
}

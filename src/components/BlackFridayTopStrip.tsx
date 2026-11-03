const bolt = (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

/** Tarja do topo Black Friday — réplica do código de referência (Renova Be): fundo escuro
 * com brilho laranja, feixe de luz inferior animado, filete superior, reflexo diagonal
 * e raios pulsando. Conteúdo centrado e estático (sem rolagem). */
export function BlackFridayTopStrip() {
  return (
    <div className="bf-top">
      <span className="bf-top__luz bf-top__luz--base" aria-hidden="true" />
      <span className="bf-top__luz bf-top__luz--topo" aria-hidden="true" />
      <span className="bf-top__reflexo" aria-hidden="true" />
      <div className="bf-top__container">
        <span className="bf-top__frase">
          {bolt} Black Friday PetHelp <i aria-hidden="true">·</i> até <b>67%</b> de desconto{" "}
          <i aria-hidden="true">·</i> Frete grátis <i aria-hidden="true">·</i> 60 dias de garantia {bolt}
        </span>
      </div>
    </div>
  );
}

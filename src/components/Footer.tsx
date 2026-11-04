import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";

const linkCls = "text-sm text-white/70 transition-colors hover:text-white";
const titleCls = "m-0 text-sm font-normal uppercase tracking-[0.1em] text-[#FDDB7A]";

export function Footer() {
  return (
    <footer className="bg-[#5A4936] text-white">
      <div className="container-x py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 border-b border-white/15 pb-11 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr] lg:gap-12">
          <div>
            <a href="/" aria-label="PetHelp">
              <img
                src={petHelpLogo.url}
                alt="PetHelp"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="mt-[22px] max-w-[16ch] font-display text-[clamp(1.5rem,2.8vw,2.125rem)] leading-[1.2] text-white">
              Cuidar do seu pet, por dentro e por fora.
            </p>
          </div>

          <div>
            <h4 className={titleCls}>Ajuda</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li><span className={linkCls}>Central de ajuda</span></li>
              <li><span className={linkCls}>Rastrear pedido</span></li>
              <li><span className={linkCls}>Trocas e devoluções</span></li>
              <li><a href="/privacidade" className={linkCls}>Política de privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className={titleCls}>Fale conosco</h4>
            <p className="mt-4 text-sm leading-[1.7] text-white/70">
              <strong className="text-white">Horário de atendimento:</strong>
              <br />
              segunda a sexta - 9h às 16h
              <br />
              WhatsApp · telefone · e-mail
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-white/60">
          O NutraHelp é um suplemento alimentar para cães e gatos. Não é
          medicamento e não substitui o tratamento indicado por médico
          veterinário. Os resultados podem variar de acordo com cada pet.
        </p>
      </div>
    </footer>
  );
}

import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";
import { Facebook, Instagram, Lock, ShieldCheck } from "lucide-react";

const linkCls = "text-white/75 transition-colors hover:text-white";
const titleCls = "font-display text-base text-white";

export function Footer() {
  return (
    <footer className="bg-[#17120E] text-white">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={petHelpLogo.url}
              alt="PetHelp"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/usepethelp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da PetHelp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/patahelp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da PetHelp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-5 text-sm text-white/60">Segunda a sexta, 9h às 16h</p>
          </div>

          <div>
            <p className={titleCls}>Dúvidas?</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block text-white/50">E-mail</span>
                <a href="mailto:contato@pethelp.com.br" className={linkCls}>
                  contato@pethelp.com.br
                </a>
              </li>
              <li>
                <span className="block text-white/50">Central de Atendimento</span>
                <a
                  href="https://api.whatsapp.com/send?phone=5581999132620"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  Clique aqui
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=5581983109180&text=Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20compra%20em%20atacado."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Seja Revendedor
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={titleCls}>Institucional</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="https://pethelpoficial.com.br/termos-e-condicoes/" target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Termos e Condições
                </a>
              </li>
              <li>
                <a href="/privacidade" className={linkCls}>
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="https://pethelpoficial.com.br/politicas-de-troca/" target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Políticas de Troca
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={titleCls}>Formas de Pagamento</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
              {["Pix", "Cartão de crédito", "Boleto"].map((m) => (
                <span key={m} className="rounded-md border border-white/20 px-2.5 py-1 text-white/80">
                  {m}
                </span>
              ))}
            </div>
            <p className={`${titleCls} mt-6`}>Loja Segura</p>
            <a
              href="https://transparencyreport.google.com/safe-browsing/search?url=https:%2F%2Fpethelpoficial.com.br&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-xs text-white/80 hover:text-white"
            >
              <ShieldCheck className="h-4 w-4 text-primary" />
              Google Safe Browsing
              <Lock className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-white/55">
            O NutraHelp é um suplemento alimentar para cães e gatos. Não é
            medicamento e não substitui o tratamento indicado por médico
            veterinário. Os resultados podem variar de acordo com cada pet.
          </p>
        </div>
      </div>
    </footer>
  );
}

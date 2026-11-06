import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";
import seloSeguro from "@/assets/selo-site-seguro-google.png.asset.json";
import { Facebook, Instagram, Mail, Youtube } from "lucide-react";

const linkCls = "text-white/75 transition-colors hover:text-white";
const titleCls = "font-display text-base text-white";

export function Footer() {
  return (
    <footer className="bg-[#17120E] text-white">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.25fr_1fr]">
          <div>
            <img
              src={petHelpLogo.url}
              alt="PetHelp"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <div className="mt-5 flex flex-wrap gap-3">
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
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok da PetHelp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.77a5.7 5.7 0 1 0 4.91 5.63V9.13a7.33 7.33 0 0 0 4.29 1.38V7.42a4.28 4.28 0 0 1-3.23-1.6z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube da PetHelp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@pethelp.com.br"
                aria-label="E-mail da PetHelp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5581999132620"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da PetHelp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47a9.47 9.47 0 0 1 9.47 9.48c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.33 11.33 0 0 0 12.05.63C5.77.63.66 5.74.66 12.02c0 2 .52 3.96 1.52 5.69L.57 23.6l6.03-1.58a11.37 11.37 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z" />
                </svg>
              </a>
            </div>
            <p className="mt-5 max-w-[260px] text-sm leading-relaxed text-white/60">Cuidado completo para o seu pet, por dentro e por fora.</p>
          </div>

          <div>
            <p className={titleCls}>Atendimento</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="text-white/60">Segunda a sexta, 9h às 16h</li>
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
            <div className="mt-4 grid w-fit grid-cols-3 gap-1.5">
              {[
                { name: "Visa", el: <span className="text-[13px] font-black italic tracking-tight text-[#1A1F71]">VISA</span> },
                { name: "Mastercard", el: (
                  <svg viewBox="0 0 36 22" className="h-5 w-8" aria-hidden="true">
                    <circle cx="13" cy="11" r="9" fill="#EB001B" />
                    <circle cx="23" cy="11" r="9" fill="#F79E1B" fillOpacity="0.9" />
                  </svg>
                ) },
                { name: "Elo", el: <span className="text-[13px] font-black text-[#000]">elo</span> },
                { name: "American Express", el: <span className="rounded-sm bg-[#2E77BC] px-1 text-[9px] font-black text-white">AMEX</span> },
                { name: "Hipercard", el: <span className="text-[10px] font-black italic text-[#B3131B]">Hipercard</span> },
                { name: "Pix", el: (
                  <span className="flex items-center gap-1 text-[12px] font-bold text-[#32BCAD]">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true"><path fill="#32BCAD" d="M8 0l3.2 3.2-3.2 3.2-3.2-3.2zM8 9.6l3.2 3.2L8 16l-3.2-3.2zM0 8l3.2-3.2L6.4 8 3.2 11.2zM9.6 8l3.2-3.2L16 8l-3.2 3.2z"/></svg>
                    pix
                  </span>
                ) },
              ].map((m) => (
                <span key={m.name} title={m.name} aria-label={m.name} className="flex h-8 w-[56px] items-center justify-center rounded-md bg-white">
                  {m.el}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className={titleCls}>Loja Segura</p>
            <a
              href="https://transparencyreport.google.com/safe-browsing/search?url=https:%2F%2Fpethelpoficial.com.br&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Site 100% seguro - Site verificado Google"
              className="mt-4 inline-block rounded-md transition-opacity hover:opacity-90"
            >
              <img src={seloSeguro.url} alt="Site 100% seguro - Site verificado Google" className="h-auto w-[180px]" loading="lazy" />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-1.5 text-center text-xs leading-relaxed text-white/50 md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © 2026 <span className="font-semibold text-white/70">PETHELP COMERCIO LTDA</span>
              <span className="mx-2 hidden md:inline">·</span>
              <br className="md:hidden" />
              CNPJ: 33.562.236/0001-70
            </p>
            <p>Av. Eng. Domingos Ferreira, 2050, Sala 06 – Boa Viagem, Recife – PE, 51111-020</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

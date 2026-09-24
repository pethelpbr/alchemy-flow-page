import { BRAND } from "@/lib/product";
import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-[#5A4936] text-white">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-start">
          <div>
            <img
              src={petHelpLogo.url}
              alt="PetHelp"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <div className="mt-5 space-y-1 text-sm leading-relaxed text-white/75">
              <p>WhatsApp · telefone · e-mail</p>
              <p>Segunda a sexta, 9h às 16h</p>
              <p>Rastrear pedido</p>
            </div>
          </div>

          <div className="max-w-md md:justify-self-end">
            <p className="text-sm leading-relaxed text-white/70">
              O NutraHelp é um suplemento alimentar para cães e gatos. Não é
              medicamento e não substitui o tratamento indicado por médico
              veterinário. Os resultados podem variar de acordo com cada pet.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

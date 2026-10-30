import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade | PetHelp" },
      { name: "description", content: "Como a PetHelp usa dados de navegação e o Meta Pixel neste site." },
      { property: "og:title", content: "Política de privacidade | PetHelp" },
      { property: "og:description", content: "Como a PetHelp usa dados de navegação e o Meta Pixel neste site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="container-x max-w-3xl py-16 text-foreground">
      <h1 className="text-3xl font-bold">Política de privacidade</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed">
        <p>
          Este site usa o Meta Pixel, ferramenta da Meta Platforms (Facebook e Instagram), para medir
          o desempenho dos nossos anúncios e otimizar sua entrega.
        </p>
        <p>
          <strong>Dados coletados:</strong> páginas visitadas, cliques no botão de compra (kit escolhido
          e valor), endereço IP, informações do navegador e identificadores de cookies da Meta.
          Não enviamos nome, e-mail ou telefone por este site.
        </p>
        <p>
          <strong>Finalidades:</strong> mensuração de anúncios e otimização de campanhas na Meta.
        </p>
        <p>
          <strong>Destinatário:</strong> Meta Platforms, conforme a{" "}
          <a className="underline" href="https://www.facebook.com/privacy/policy" target="_blank" rel="noreferrer">
            política de privacidade da Meta
          </a>
          .
        </p>
        <p>
          <strong>Como recusar:</strong> você pode bloquear cookies de terceiros no seu navegador ou
          ajustar suas preferências de anúncios na sua conta do Facebook/Instagram. Visitantes da União
          Europeia, Reino Unido e Suíça não são rastreados.
        </p>
      </div>
    </main>
  );
}

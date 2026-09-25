import vetPhoto from "@/assets/veterinaria-1.png.asset.json";

export function VeterinaryAuthoritySection() {
  const cards = [
    {
      quote: "A maior parte dos casos de pele que eu atendo melhora quando a gente olha a alimentação e o intestino junto, e não só a pele.",
      image: vetPhoto.url,
      alt: "Veterinária de jaleco segurando o pote do NutraHelp",
    },
    {
      quote: "O resultado vem do uso contínuo. O que mais atrapalha no consultório é o tutor parar na terceira semana, quando a pele ainda está se recuperando.",
    },
  ];

  const Card = ({ quote, image, alt }: { quote: string; image?: string | undefined; alt?: string | undefined }) => (
    <article className="overflow-hidden rounded-2xl border border-border bg-white">
      {image ? (
        <img src={image} alt={alt} loading="lazy" className="w-full object-cover" />
      ) : (
        <div className="flex h-48 items-center justify-center bg-secondary px-6 text-center text-sm text-muted-text">
          FOTO: retrato em consultório real, jaleco, com um cão no colo ou na mesa. Olhando para a câmera, expressão acessível.
        </div>
      )}
      <div className="p-6">
        <p className="font-display text-xl leading-relaxed text-ink">“{quote}”</p>
        <div className="mt-6 border-t pt-4 text-sm">
          <strong className="block">[NOME DA VETERINÁRIA]</strong>
          <span className="mt-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs">CRMV-[UF] [número]</span>
        </div>
      </div>
    </article>
  );

  return (
    <section className="bg-background px-6 pb-16 pt-10 sm:pb-20 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Aprovado por veterinários</p>
        <h2 className="max-w-4xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          Desenvolvido por quem vê esses casos todo dia
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {cards.map((card, index) => (
            <Card key={index} quote={card.quote} image={"image" in card ? card.image : undefined} alt={"alt" in card ? card.alt : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}

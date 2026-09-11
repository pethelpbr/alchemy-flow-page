import { Reveal } from "@/components/ui/Reveal";
import productHero from "@/assets/product-hero.jpg";
import lifestyle from "@/assets/lifestyle-1.jpg";
import ingredients from "@/assets/ingredients.jpg";
import galleryHand from "@/assets/gallery-hand.jpg";
import galleryDrink from "@/assets/gallery-drink.jpg";

const shots = [
  { src: productHero, alt: "Pote do suplemento em fundo bege", span: "md:col-span-2 md:row-span-2" },
  { src: galleryDrink, alt: "Bebida pronta em copo de vidro", span: "" },
  { src: galleryHand, alt: "Pote sendo segurado na mão", span: "" },
  { src: lifestyle, alt: "Rotina matinal na cozinha", span: "md:col-span-2" },
  { src: ingredients, alt: "Ingredientes botânicos da fórmula", span: "" },
];

export function GallerySection() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Galeria</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            O produto na vida real
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-[13rem] grid-cols-2 gap-4 md:auto-rows-[15rem] md:grid-cols-4">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.06} className={s.span}>
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="h-full w-full rounded-3xl object-cover"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

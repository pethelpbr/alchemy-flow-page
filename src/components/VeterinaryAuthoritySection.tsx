import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export function VeterinaryAuthoritySection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  const cards = [
    "A pele e o pelo refletem muito do que acontece dentro do organismo. Por isso, cuidar da nutrição faz parte de uma rotina completa.",
    "Suplementação não substitui tratamento. Ela entra como um complemento diário para ajudar o organismo a receber nutrientes importantes.",
    "Cada pet tem uma necessidade diferente. Uma fórmula completa ajuda a complementar a alimentação e apoiar uma rotina mais saudável.",
  ];

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap() + 1);
    update();
    api.on("select", update);
    return () => api.off("select", update);
  }, [api]);

  return (
    <section className="bg-background px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">Desenvolvido com quem entende de saúde pet</h2>

        <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-3">
          {cards.map((quote, index) => (
            <article key={index} className="rounded-2xl border border-border bg-white p-6">
              <div className="h-52 rounded-xl bg-secondary flex items-center justify-center text-sm text-muted-text">Foto de acompanhamento veterinário</div>
              <p className="mt-6 font-display text-xl">“{quote}”</p>
              <div className="mt-6 border-t pt-4">Dr(a). [Nome]<br />CRMV-[UF] [número]</div>
            </article>
          ))}
        </div>

        <div className="lg:hidden">
          <Carousel setApi={setApi} opts={{ align: "start", dragFree: true }} className="mt-10 cursor-grab select-none active:cursor-grabbing">
            <CarouselContent>
              {cards.map((quote, index) => (
                <CarouselItem key={index} className="basis-[92%] pl-5 sm:basis-[54%]">
                  <article className="rounded-2xl border border-border bg-white p-6">
                    <div className="h-52 rounded-xl bg-secondary flex items-center justify-center text-sm text-muted-text">Foto de acompanhamento veterinário</div>
                    <p className="mt-6 font-display text-xl">“{quote}”</p>
                    <div className="mt-6 border-t pt-4">Dr(a). [Nome]<br />CRMV-[UF] [número]</div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-3 flex items-center justify-between gap-3 md:mt-8">
            <span className="text-[13px] font-medium tracking-[0.08em] text-foreground">{String(current).padStart(2, '0')} / 03</span>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" onClick={() => api?.scrollPrev()} className="h-11 w-11 rounded-full border"><ChevronLeft /></Button>
              <Button size="icon" variant="ghost" onClick={() => api?.scrollNext()} className="h-11 w-11 rounded-full border"><ChevronRight /></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

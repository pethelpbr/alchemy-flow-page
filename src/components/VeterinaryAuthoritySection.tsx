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
    return () => {
      api.off("select", update);
    };
  }, [api]);

  const Card = ({ quote }: { quote: string }) => (
    <article className="h-full min-h-[510px] rounded-2xl border border-border bg-white p-6 flex flex-col">
      <div className="h-52 shrink-0 rounded-xl bg-secondary flex items-center justify-center text-sm text-muted-text">Foto de acompanhamento veterinário</div>
      <p className="mt-6 flex-1 font-display text-xl">“{quote}”</p>
      <div className="mt-6 border-t pt-4">Dr(a). [Nome]<br />CRMV-[UF] [número]</div>
    </article>
  );

  return (
    <section className="bg-background px-6 pb-16 pt-10 sm:pb-20 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl leading-tight text-ink sm:text-5xl md:mx-0 md:text-left">Desenvolvido com quem entende de saúde pet</h2>
        <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-3">
          {cards.map((quote,index)=><Card key={index} quote={quote}/>) }
        </div>
        <div className="lg:hidden">
          <Carousel setApi={setApi} opts={{ align:"start", dragFree:true }} className="mt-10 cursor-grab select-none active:cursor-grabbing">
            <CarouselContent>
              {cards.map((quote,index)=>(
                <CarouselItem key={index} className="basis-[78%] pl-5 sm:basis-[54%]"><Card quote={quote}/></CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-3 flex items-center justify-between gap-3 md:mt-8">
            <span className="text-[13px] font-medium tracking-[0.08em] text-foreground">{String(current).padStart(2,'0')} / 03</span>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" onClick={()=>api?.scrollPrev()} className="h-11 w-11 rounded-full border"><ChevronLeft/></Button>
              <Button size="icon" variant="ghost" onClick={()=>api?.scrollNext()} className="h-11 w-11 rounded-full border"><ChevronRight/></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

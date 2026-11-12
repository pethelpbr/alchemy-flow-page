import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccordionBlock } from "@/components/ui/AccordionBlock";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { BuyButton } from "@/components/ui/BuyButton";
import depo1Cover from "@/assets/depoimento-1-capa.jpg.asset.json";
import depo2Cover from "@/assets/depoimento-2-capa.jpg.asset.json";
import depo1Video from "@/assets/depoimento-1.mp4.asset.json";
import depo2Video from "@/assets/depoimento-2.mp4.asset.json";

import depo3Video from "@/assets/depoimento-3.mp4.asset.json";
import depo3Cover from "@/assets/depoimento-3-capa.jpg.asset.json";
import amoraVideo from "@/assets/depoimento-amora.mp4.asset.json";
import amoraCover from "@/assets/depoimento-amora-capa.jpg.asset.json";
import mikeVideo from "@/assets/depoimento-mike.mp4.asset.json";
import mikeCover from "@/assets/depoimento-mike-capa.jpg.asset.json";

type Feedback = { image: string; name: string; caption: string; problem: string; video?: string };

const feedbacks: Feedback[] = [
  { image: depo3Cover.url, name: "Júlia", caption: "Leve e fácil de preparar", problem: "Queda de pelos", video: depo3Video.url },
  { image: depo2Cover.url, name: "Rodrigo", caption: "Prático para todos os dias", problem: "Dermatite", video: depo2Video.url },
  { image: depo1Cover.url, name: "Marina", caption: "Virou parte da minha manhã", problem: "Mau hálito", video: depo1Video.url },
];

// Os relatos da Amora e do Mike entram só na página /pele, no lugar do primeiro
// e do segundo card. A Black Friday continua com os três originais.
const peleFeedbacks: Feedback[] = [
  { image: amoraCover.url, name: "Amora", caption: "Cuidado diário", problem: "Lágrima ácida", video: amoraVideo.url },
  { image: mikeCover.url, name: "Mike", caption: "Antes e depois", problem: "Dermatite", video: mikeVideo.url },
  ...feedbacks.slice(2),
];

function VideoTags({ problem, className }: { problem: string; className?: string }) {
  return (
    <span className={cn("pointer-events-none absolute inset-0", className)}>
      <span className="absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-0.75rem)] items-center gap-1.5 rounded-[10px] bg-card py-1.5 pl-2 pr-2.5 text-[10px] font-semibold leading-none text-ink shadow-card md:text-[13px]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
        <span className="whitespace-normal leading-tight">{problem}</span>
      </span>
    </span>
  );
}


const whoForBullets = [
  "Cães e gatos de todas as raças e tamanhos.",
  "Filhotes a partir de 3 meses, adultos ou idosos.",
  "Fêmeas gestantes e lactantes.",
];

function WhoForList() {
  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {whoForBullets.map((text) => (
          <li key={text} className="flex gap-2 leading-relaxed"><span aria-hidden="true" className="shrink-0">&ndash;</span><span className="min-w-0">{text}</span></li>
        ))}
      </ul>
      <p className="leading-relaxed">Serve para o pet que precisa de suporte na pele e na pelagem e também para o pet saudável, como cuidado preventivo.</p>
      <p className="leading-relaxed">Se houver alguma condição especial de saúde, vale usar com acompanhamento do veterinário.</p>
    </div>
  );
}

const doses = [
  { weight: "Até 5 kg", grams: "1 g", scoop: "½ dosador" },
  { weight: "6 a 10 kg", grams: "2 g", scoop: "1 dosador" },
  { weight: "11 a 20 kg", grams: "4 g", scoop: "2 dosadores" },
  { weight: "21 a 30 kg", grams: "6 g", scoop: "3 dosadores" },
  { weight: "Mais de 30 kg", grams: "8 g", scoop: "4 dosadores" },
];

function HowToUse() {
  return (
    <div className="space-y-3">
      <p className="leading-relaxed">Misture o pó em qualquer alimento, ração seca, ração úmida ou comida natural, uma vez por dia, na dose do peso do seu pet. O uso é contínuo e não tem tempo máximo.</p>
      <p className="text-sm opacity-80">Acompanha dosador de 2 g</p>
      <div className="overflow-hidden rounded-lg bg-dosage">
        {doses.map((d) => (
          <div key={d.weight} className="grid grid-cols-[minmax(0,1.2fr)_2rem_minmax(0,1fr)] items-center gap-1.5 border-b border-ink/10 px-3 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] sm:gap-2 sm:px-4">
            <p className="whitespace-nowrap text-xs sm:text-sm">{d.weight}</p>
            <p className="text-center text-lg font-bold leading-tight text-foreground">{d.grams}</p>
            <p className="whitespace-nowrap text-right text-xs sm:text-sm">{d.scoop}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const details = [
  { title: "O que é o NutraHelp?", content: "Um suplemento alimentar em pó com sabor de carne, para cães e gatos, que pode ser misturado em qualquer alimento. Cada dose reúne 44 nutrientes numa fórmula 8 em 1: vitaminas, minerais, aminoácidos, ômega 3, pré e probióticos. O foco principal é pele, pelos e intestino." },
  { title: "Para quem é?", content: <WhoForList /> },
  { title: "Como usar", content: <HowToUse /> },
];

function Thumbnails({ className, items, onSelect, paused = false, store = false }: { className?: string; items: Feedback[]; onSelect: (f: Feedback) => void; paused?: boolean; store?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    trackRef.current?.querySelectorAll("video").forEach((v) => { if (paused) v.pause(); else { v.muted = true; void v.play().catch(() => {}); } });
  }, [paused]);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = true; drag.current.startX = e.clientX; drag.current.scrollLeft = el.scrollLeft; drag.current.moved = false;
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > 6) { drag.current.moved = true; el.setPointerCapture(e.pointerId); }
    if (drag.current.moved) { e.preventDefault(); el.scrollLeft = drag.current.scrollLeft - dx; }
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current; const wasActive = drag.current.active; drag.current.active = false;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    if (!el || !wasActive) return;
  };
  return (
    <div ref={trackRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }} className={cn("-mx-4 flex gap-2.5 overflow-x-auto scroll-smooth px-4 pb-1 [touch-action:pan-x_pan-y] [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", store ? "md:mx-0 md:justify-center md:overflow-visible md:px-0 md:pb-0" : "md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0", className)}>
      {items.map((feedback) => (
        <div key={feedback.name} className={store ? "w-[46%] shrink-0 sm:w-[30%] md:w-[22%] lg:w-[17%]" : "w-[62%] shrink-0 md:w-auto md:shrink"}>
          <Button type="button" variant="ghost" aria-label={`Assistir ao relato de ${feedback.name}`} onClick={() => onSelect(feedback)} className="group relative block h-auto w-full overflow-hidden rounded-xl p-0 shadow-none">
            {feedback.video ? (
              <video src={feedback.video} poster={feedback.image} autoPlay muted loop playsInline preload="metadata" aria-label={`Relato de ${feedback.name}`} className={cn("w-full object-cover", store ? "aspect-[5/3]" : "aspect-[9/14]")} />
            ) : (
              <img src={feedback.image} alt={`Relato de ${feedback.name}`} loading="lazy" draggable={false} className={cn("w-full object-cover", store ? "aspect-[5/3]" : "aspect-[9/14]")} />
            )}
            <span className="absolute inset-0 rounded-xl border border-transparent bg-ink/15 transition-colors group-hover:border-primary" />
            <VideoTags problem={feedback.problem} />
            <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-card/70 bg-card/80 text-primary shadow-card backdrop-blur-sm"><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
          </Button>
        </div>
      ))}
    </div>
  );
}

const guaranteeLevels: [string, string][] = [
  ["Cromo (mín.)", "10,0000 mg/kg"], ["Iodo (mín.)", "62,0000 mg/kg"], ["Magnésio (mín.)", "41,9000 g/kg"], ["Cobalto (mín.)", "200,0000 mg/kg"], ["Zinco (mín.)", "700,0000 mg/kg"], ["Ferro (mín.)", "600,0000 mg/kg"], ["Manganês (mín.)", "520,0000 mg/kg"], ["Selênio (mín.)", "135,0000 mg/kg"], ["Cálcio (mín./máx.)", "186,0000 / 207,0000 g/kg"], ["Enxofre (mín.)", "9.900,0000 mg/kg"], ["Fósforo (mín.)", "1.850,0000 mg/kg"], ["Ômega 3 (mín.)", "750,0000 mg/kg"], ["Extrato de Yucca (mín.)", "2.000,0000 mg/kg"], ["Sulfato de Condroitina (mín.)", "4.900,0000 mg/kg"], ["Taurina (mín.)", "10,8000 g/kg"], ["Cobre (mín.)", "500,0000 mg/kg"], ["L-Treonina (mín.)", "98,5000 mg/kg"], ["L-Glutamina (mín.)", "20,0000 mg/kg"], ["L-Ácido Glutâmico (mín.)", "20,0000 mg/kg"], ["Flúor (máx.)", "18,5000 mg/kg"], ["Vitamina A (mín.)", "100.000,0000 UI/kg"], ["Vitamina B1 (mín.)", "980,0000 mg/kg"], ["Vitamina B2 (mín.)", "800,0000 mg/kg"], ["Vitamina B3 (mín.)", "990,0000 mg/kg"], ["Vitamina B6 (mín.)", "980,0000 mg/kg"], ["Vitamina B12 (mín.)", "100,0000 µg/kg"], ["Vitamina C (mín.)", "891,0000 mg/kg"], ["Vitamina D3 (mín.)", "100.000,0000 UI/kg"], ["Vitamina E (mín.)", "100,0000 UI/kg"], ["Vitamina K3 (mín.)", "200,4000 mg/kg"], ["Biotina (mín.)", "20,0000 mg/kg"], ["Inositol (mín.)", "980,0000 mg/kg"], ["Colina (mín.)", "652,0000 mg/kg"], ["Lisina (mín.)", "3.900,0000 mg/kg"], ["Metionina (mín.)", "3.960,0000 mg/kg"], ["Triptofano (mín.)", "1.534,5000 mg/kg"], ["Proteína Bruta (mín.)", "30,0000 g/kg"], ["Aroma de Carne de Panela (mín.)", "2.000,0000 mg/kg"], ["Beta Glucanas (mín.)", "3.000,0000 mg/kg"], ["Mananoligossacarídeo (mín.)", "1.700,0000 mg/kg"], ["Saccharomyces cerevisiae (mín.)", "1,0000 x 10E09 ufc/kg"], ["Bacillus subtilis (mín.)", "2,0000 x 10E09 ufc/kg"], ["Bacillus cereus (mín.)", "2,0000 x 10E09 ufc/kg"], ["Lactobacillus acidophilus (mín.)", "1,0000 x 10E09 ufc/kg"], ["Enterococcus faecium (mín.)", "1,0000 x 10E09 ufc/kg"],
];

const qualitativeComposition = "Levedura de Cana de Açúcar Inativada e Desidratada, Ômega 3 (0,5%), Sulfato de Condroitina (0,5%), Calcário Magnesiano, Flor de Enxofre, Fosfato Bicálcico, Óxido de Magnésio, Cromo Aminoácido Quelato, Iodato de Cálcio, Selenito de Sódio, Sulfato de Cobalto, Sulfato de Cobre, Sulfato de Ferro, Sulfato de Manganês, Sulfato de Zinco Monohidratado, Vitamina A, Vitamina B1, Vitamina B2, Vitamina B6, Vitamina B12, Vitamina C, Vitamina D3, Vitamina E, Vitamina K3, Niacina, Biotina, Inositol, Cloreto de Colina, L-Lisina, DL-Metionina, L-Glutamina, L-Ácido Glutâmico, Taurina, Treonina, Triptofano, Extrato de Yucca, Aroma de Carne de Panela, Aditivo Prebiótico (1%) e Aditivo Probiótico (0,5%).";

const pataComposition = "Manteiga de Karité, Cera de Abelha, Óleo de Coco, Óleo de Girassol, Óleo de Calêndula, Óleo de Oliva, Óleo de Jojoba, Óleo de Melaleuca e Vitamina E.";

const bocaComposition = "Água purificada, Glicerina, Sorbitol, Eritriol, Extrato de Aloe Vera, Extrato de Menta, Gluconato de Clorexidina, Polisorbato 20, EDTA Dissódico, Benzoato de Sódio, Sorbato de Potássio e Corante Azul Brilhante.";

const productAccents = {
  nutra: { bar: "bg-primary", text: "text-primary", soft: "bg-[color-mix(in_oklab,var(--primary)_8%,var(--card))]" },
  pata: { bar: "bg-pata", text: "text-pata", soft: "bg-[color-mix(in_oklab,var(--pata)_9%,var(--card))]" },
  boca: { bar: "bg-boca", text: "text-boca", soft: "bg-[color-mix(in_oklab,var(--boca)_10%,var(--card))]" },
};

function ProductSection({ name, accent, children }: { name: string; accent: keyof typeof productAccents; children: React.ReactNode }) {
  const a = productAccents[accent];
  return (
    <section className="overflow-hidden rounded-xl border border-border">
      <div className={cn("flex items-center gap-3 border-b border-border px-4 py-4 sm:px-5", a.soft)}>
        <span aria-hidden="true" className={cn("h-11 w-2.5 shrink-0 rounded-full sm:h-12 sm:w-3", a.bar)} />
        <div className="min-w-0">
          <p className={cn("font-display text-lg font-bold uppercase tracking-wide sm:text-xl", a.text)}>{name}</p>
        </div>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </section>
  );
}

function TableTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border bg-muted px-4 py-2.5 text-center">
      <p className="text-xs font-bold uppercase tracking-wide text-ink sm:text-sm">{children}</p>
    </div>
  );
}

function CompositionList({ text }: { text: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <TableTitle>Composição</TableTitle>
      <div className="px-4 pb-3 pt-1.5"><p className="text-sm leading-relaxed text-muted-foreground">{text}</p></div>
    </div>
  );
}

function GuaranteeTableDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onOpenAutoFocus={(event) => event.preventDefault()} className="flex max-h-[92dvh] w-[calc(100%_-_1.25rem)] max-w-[720px] flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-soft [&>button]:right-4 [&>button]:top-4 [&>button]:text-ink [&>button]:opacity-100">
        <div className="border-b border-border px-6 py-5">
          <DialogTitle className="pr-10 font-display text-lg font-bold uppercase tracking-wide text-ink sm:text-xl">Informação nutricional e ingredientes</DialogTitle>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            <ProductSection name="NutraHelp" accent="nutra">
              <div className="overflow-hidden rounded-lg border border-border">
                <TableTitle>Níveis de garantia por kg do produto</TableTitle>
                <ul className="grid sm:grid-cols-2">
                  {guaranteeLevels.map(([name, value], index) => (
                    <li key={name} className={cn("flex items-baseline justify-between gap-4 border-border px-4 py-2 text-sm", index % 2 === 0 && "bg-muted/40", Math.floor(index / 2) % 2 === 0 ? "md:bg-muted/40" : "md:bg-transparent", index % 2 === 1 && "sm:border-l sm:border-border", "border-b sm:[&:nth-last-child(-n+2)]:border-b-0")}>
                      <span className="font-semibold text-ink">{name}</span><span className="shrink-0 tabular-nums text-muted-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
                <TableTitle>Composição qualitativa</TableTitle>
                <div className="px-4 pb-3 pt-1.5"><p className="text-sm leading-relaxed text-muted-foreground">{qualitativeComposition}</p></div>
              </div>
            </ProductSection>

            <ProductSection name="PataHelp" accent="pata">
              <CompositionList text={pataComposition} />
            </ProductSection>

            <ProductSection name="BocaHelp" accent="boca">
              <CompositionList text={bocaComposition} />
            </ProductSection>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function IngredientsButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BuyButton type="button" onClick={() => setOpen(true)} className="mt-4 h-12 w-full text-base normal-case tracking-normal">Ver tabela completa e ingredientes</BuyButton>
      <GuaranteeTableDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function DialogVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => { const v = ref.current; if (!v) return; if (v.paused) void v.play(); else v.pause(); };
  useEffect(() => {
    const v = ref.current; if (!v) return;
    v.currentTime = 0; v.muted = false;
    void v.play().catch(() => { v.muted = true; void v.play().catch(() => {}); });
  }, [src]);
  return (
    <>
      <video ref={ref} src={src} poster={poster} playsInline onClick={toggle} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} className="absolute inset-0 h-full w-full cursor-pointer object-cover" />
      {!playing && (
        <button type="button" aria-label="Reproduzir vídeo" onClick={toggle} className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink/40 text-primary-foreground backdrop-blur-sm">
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </button>
      )}
    </>
  );
}

export function ProductVideoFeedback({ onBuy, showDetails = true, kitCta, storeLayout = false }: { onBuy: () => void; showDetails?: boolean; kitCta?: string | undefined; storeLayout?: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // Black Friday (kitCta definido) mantém os três relatos originais; /pele ganha o da Amora.
  const items = kitCta ? feedbacks : peleFeedbacks;
  const contentRef = useRef<HTMLDivElement>(null);
  const goingToKits = useRef(false);
  const pauseVideos = () => contentRef.current?.querySelectorAll("video").forEach((v) => v.pause());
  const closeDialog = () => { pauseVideos(); setSelectedIndex(null); };
  const goToKits = () => {
    goingToKits.current = true;
    closeDialog();
  };
  const afterClose = (event: Event) => {
    if (!goingToKits.current) return;
    event.preventDefault();
    goingToKits.current = false;
    // Espera o modal sair do DOM e o scroll do body ser destravado.
    window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>("[data-kit-selector]");
      if (!target) return;
      const header = document.querySelector("header > div");
      const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - ((header?.getBoundingClientRect().height ?? 64) + 16));
      window.scrollTo({ top, behavior: "smooth" });
      let done = false;
      const highlight = () => {
        if (done) return; done = true;
        const card = target.querySelector<HTMLElement>('button[aria-pressed="true"]');
        if (!card) return;
        card.classList.remove("kit-highlight"); void card.offsetWidth; card.classList.add("kit-highlight");
        window.setTimeout(() => card.classList.remove("kit-highlight"), 1000);
      };
      window.addEventListener("scrollend", highlight, { once: true });
      window.setTimeout(highlight, 1200);
    }, 50);
  };
  const [openDetail, setOpenDetail] = useState<number | null>(0);
  const selectedVideo = selectedIndex === null ? null : items[selectedIndex];
  const selectFeedback = (feedback: Feedback) => { const index = items.indexOf(feedback); setSelectedIndex(index >= 0 ? index : 0); };
  const showPrevious = () => { setSelectedIndex((current) => current === null ? 0 : (current - 1 + items.length) % items.length); };
  const showNext = () => { setSelectedIndex((current) => current === null ? 0 : (current + 1) % items.length); };

  return (
    <div>
      <div>
        {!storeLayout && <h3 className="text-base font-semibold text-ink">Tutores que já passaram por isso</h3>}
        <Thumbnails items={items} store={storeLayout} className={storeLayout ? "" : cn("mt-2 grid-cols-3", items.length > 3 && "md:grid-cols-4")} onSelect={selectFeedback} paused={selectedVideo !== null} />
        {!storeLayout && <IngredientsButton />}
      </div>
      {showDetails && (
        <div id="duvidas-compra" className="mt-7 pt-2">
          <AccordionBlock items={details} openIndex={openDetail} onOpenChange={setOpenDetail} />
        </div>
      )}
      <Dialog open={selectedVideo !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent ref={contentRef} onCloseAutoFocus={afterClose} className="flex h-[100dvh] max-h-[100dvh] w-full max-w-none flex-col justify-center gap-0 overflow-hidden rounded-none border-0 bg-card p-4 shadow-soft sm:h-auto sm:max-h-[96dvh] sm:w-[92vw] sm:max-w-[min(420px,calc((96dvh_-_130px)*0.5625_+_32px))] sm:rounded-[16px] sm:border sm:border-border [&>button]:right-4 [&>button]:top-4 [&>button]:z-40 [&>button]:text-ink [&>button]:opacity-100">
          {selectedVideo && (
            <>
              <div className="mx-auto w-full max-w-[calc((100dvh_-_130px)*0.5625)] shrink-0 pb-3">
                <DialogTitle className="pr-10 font-display text-lg font-bold text-ink sm:text-xl">{kitCta ? "Feedbacks" : "Tutores que já passaram por isso"}</DialogTitle>
                <DialogDescription className="sr-only">Relatos em vídeo de clientes PetHelp</DialogDescription>
                <div className="mt-2 flex gap-2">
                  {items.map((feedback, index) => (
                    <Button key={feedback.name} type="button" variant="ghost" aria-label={`Ver relato de ${feedback.name}`} aria-pressed={selectedIndex === index} onClick={() => setSelectedIndex(index)} className={cn("h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 p-0 transition-opacity hover:opacity-90", selectedIndex === index ? "border-primary" : "border-transparent")}>
                      <img src={feedback.image} alt="" className="h-full w-full object-cover" />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[calc((100dvh_-_130px)*0.5625)] shrink-0 overflow-hidden rounded-[12px] bg-muted">
                {selectedVideo.video ? (
                  <DialogVideo key={selectedVideo.video} src={selectedVideo.video} poster={selectedVideo.image} />
                ) : (
                  <>
                    <img src={selectedVideo.image} alt={`Prévia do relato de ${selectedVideo.name}`} className="absolute inset-0 h-full w-full object-cover" />
                    <VideoTags problem={selectedVideo.problem} className="md:inset-1.5" />
                  </>
                )}
                <Button type="button" variant="ghost" aria-label="Relato anterior" onClick={showPrevious} className="absolute left-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border border-transparent bg-card/90 p-0 text-ink shadow-card transition-colors hover:border-primary"><ChevronLeft className="h-5 w-5" /></Button>
                {!selectedVideo.video && <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink/85 text-primary-foreground shadow-card"><Play className="ml-0.5 h-5 w-5 fill-current" /></span>}
                <Button type="button" variant="ghost" aria-label="Próximo relato" onClick={showNext} className="absolute right-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border border-transparent bg-card/90 p-0 text-ink shadow-card transition-colors hover:border-primary"><ChevronRight className="h-5 w-5" /></Button>
                <button type="button" onClick={kitCta ? goToKits : () => { closeDialog(); onBuy(); }} className="absolute bottom-4 right-4 z-30 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-transform hover:scale-[1.03] active:scale-95">Comprar agora</button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

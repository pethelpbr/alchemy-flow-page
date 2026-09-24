import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { AccordionBlock } from "@/components/ui/AccordionBlock";

const faqs = [
  {
    q: "Meu pet já faz tratamento com remédio. Posso dar junto?",
    a: "Sim. É um suplemento alimentar e entra no cuidado diário junto com o que o veterinário indicou.",
  },
  {
    q: "Serve para gatos?",
    a: "Sim, para cães e gatos, de todas as raças e portes, a partir de 3 meses.",
  },
  {
    q: "Em quanto tempo eu vejo resultado?",
    a: "Os primeiros sinais costumam aparecer entre a segunda e a terceira semana, com menos coceira e menos lambedura. A pele muda mais visivelmente ao longo do primeiro mês, e o pelo volta a preencher as falhas a partir do segundo. Cada pet responde no seu tempo.",
  },
  {
    q: "Serve só para coceira ou também para queda de pelo?",
    a: "Para os dois. A queda de pelo e as falhas normalmente andam junto com a irritação da pele, e as duas frentes da fórmula trabalham nisso — a flora intestinal e os nutrientes que formam o fio.",
  },
  {
    q: "E se ele não gostar do sabor?",
    a: "O sabor é de carne e a maioria aceita de primeira, misturado na ração. Se o seu pet for muito seletivo, comece com meia dose por alguns dias e aumente aos poucos. Se ainda assim não aceitar, a garantia de 60 dias cobre.",
  },
  {
    q: "Tem corticoide?",
    a: "Não. É um suplemento alimentar, sem corticoide e sem princípio ativo medicamentoso.",
  },
  {
    q: "Tem efeito colateral?",
    a: "Não há contraindicações conhecidas. Por ser um suplemento alimentar, pode ser usado de forma contínua. Em caso de condição específica, consulte o veterinário.",
  },
  {
    q: "Pode dar todo dia, sem parar?",
    a: "Sim, e é assim que funciona melhor. Pele saudável não é cuidado pontual — é cuidado diário.",
  },
  {
    q: "Posso dar para filhote? E para cadela gestante?",
    a: "Sim, a partir de 3 meses. Cadelas gestantes e lactantes também podem, preferencialmente com acompanhamento veterinário.",
  },
  {
    q: "Engorda?",
    a: "Não. A dose diária é pequena e entra junto da alimentação normal do seu pet.",
  },
  {
    q: "O produto tem registro?",
    a: "Sim. É produzido em estabelecimento registrado no MAPA, seguindo boas práticas de fabricação.",
  },
  {
    q: "Quanto tempo dura um pote?",
    a: "Depende do peso do seu pet, porque a dose é proporcional. Na dúvida, fale com a gente no WhatsApp que calculamos para o seu caso.",
  },
  {
    q: "Como funciona a garantia?",
    a: "Você tem 60 dias de uso contínuo, na dose indicada para o peso. Se não notar diferença, fala com a gente no WhatsApp e devolvemos o valor.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section scroll-mt-20">
      <div className="container-x grid gap-10 lg-grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Dúvidas</p>
          <h2 className="mt-4 text-center font-display text-4xl leading-tight text-ink md:text-left">
            Perguntas frequentes
          </h2>
        </Reveal>

        <AccordionBlock
          items={faqs.map((f) => ({ title: f.q, content: f.a }))}
          openIndex={open}
          onOpenChange={setOpen}
        />
      </div>
    </section>
  );
}

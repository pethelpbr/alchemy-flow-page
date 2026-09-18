import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { AccordionBlock } from "@/components/ui/AccordionBlock";

const faqs = [
  {
    q: "Como usar?",
    a: "Dissolva um dosador raso em 200 ml de água gelada, misture por 10 segundos e consuma. Pode ser tomado com o estômago vazio ou junto do café da manhã.",
  },
  {
    q: "Qual quantidade devo tomar?",
    a: "Uma dose por dia é suficiente. O dosador vem dentro do pote e já corresponde à porção diária indicada no rótulo.",
  },
  {
    q: "Quanto tempo dura um pote?",
    a: "Cada pote tem 360 g, o equivalente a 30 doses — um mês de ritual com uso diário.",
  },
  {
    q: "Quem pode consumir?",
    a: "Adultos saudáveis. Gestantes, lactantes e pessoas em tratamento médico devem consultar um profissional de saúde antes de iniciar o uso.",
  },
  {
    q: "Como funciona a entrega?",
    a: "Enviamos em até 1 dia útil após a confirmação do pagamento. O prazo médio é de 2 a 5 dias úteis nas capitais e até 9 dias para demais regiões, com código de rastreio.",
  },
  {
    q: "Existe garantia?",
    a: "Sim. Você tem 30 dias para testar. Se não fizer sentido para a sua rotina, devolvemos o valor integral da compra.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section scroll-mt-20">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Dúvidas</p>
          <h2 className="mt-4 text-center font-display text-4xl leading-tight text-ink lg:text-left">
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

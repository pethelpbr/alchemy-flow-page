import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { AccordionBlock } from "@/components/ui/AccordionBlock";

const faqs = [
  { q: "Meu pet já faz tratamento com remédio. Posso dar junto?", a: "Sim. É um suplemento alimentar e entra no cuidado diário junto com o que o veterinário indicou." },
  { q: "Serve para gatos?", a: "Sim, para cães e gatos, de todas as raças e portes, a partir de 3 meses." },
  { q: "Em quanto tempo eu vejo resultado?", a: "Os primeiros sinais costumam aparecer entre a segunda e a terceira semana. O pelo volta a preencher as falhas a partir do segundo mês." },
  { q: "Serve só para coceira ou também para queda de pelo?", a: "Sim. A queda e as falhas normalmente andam junto com a irritação da pele, e as duas frentes
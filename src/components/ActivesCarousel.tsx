import activeGreentea from "@/assets/active-greentea.jpg";
import activeCreatine from "@/assets/active-creatine.jpg";
import activeOrange from "@/assets/active-orange.jpg";
import activeGuarana from "@/assets/active-guarana.jpg";

const actives = [
  { image: activeGreentea, name: "Probióticos e prebióticos", description: "5 cepas boas mais o alimento delas. Sem o prebiótico, o probiótico chega e não se fixa." },
  { image: activeCreatine, name: "Zinco", description: "Participa da formação da pele e da cicatrização." },
  { image: activeOrange, name: "Biotina", description: "Entra na produção da queratina, que é o material do fio de pelo." },
  { image: activeGuarana, name: "Ômega 3", description: "Ajuda na maciez e no brilho do pelo." },
];

const nutrients = [["13","vitaminas"],["13","minerais"],["7","aminoácidos"],["5","probióticos"],["2","prebióticos"]];

export function ActivesCarousel() {
  return (
    <section className="bg-background py-10 md:py-12">
      <div className="container-x">
        <p className="eyebrow text-primary">O que tem dentro de cada dose</p>
        <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">44 nutrientes. Um pote.</h2>

        <div className="mt-6 rounded-2xl bg-ink px-6 py-6 text-primary-foreground">
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-[repeat(5,1fr)_1.4fr] lg:items-center">
            {nutrients.map(([amount,label]) => (
              <div key={label} className="text-center"><strong className="block font-display text-4xl leading-none text-gift">{amount}</strong><span className="text-xs">{label}</span></div>
            ))}
            <div className="border-t border-primary-foreground/20 pt-4 text-center text-xs lg:border-l lg:border-t-0 lg:pt-0 lg:pl-6">+ ômega 3, condroitina, yucca e proteína</div>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">13 + 13 + 7 + 5 + 2 + 4 = <strong className="text-primary">44.</strong> Todos declarados na tabela de níveis de garantia, nenhum arredondado para fechar a conta.</p>

        <div className="mt-7 grid grid-cols-2 gap-5 md:grid-cols-4">
          {actives.map((active) => <article key={active.name}><img src={active.image} alt={active.name} className="aspect-[4/3] w-full rounded-lg object-cover" /><h3 className="mt-3 font-display text-xl text-ink">{active.name}</h3><p className="mt-2 text-sm text-foreground">{active.description}</p></article>)}
        </div>
      </div>
    </section>
  );
}

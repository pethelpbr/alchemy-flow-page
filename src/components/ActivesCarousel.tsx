import activeGreentea from "@/assets/active-greentea.jpg";
import activeCreatine from "@/assets/active-creatine.jpg";
import activeOrange from "@/assets/active-orange.jpg";
import activeGuarana from "@/assets/active-guarana.jpg";

const actives = [
  { image: activeGreentea, name: "Probióticos e prebióticos", description: "5 cepas boas mais o alimento delas. Sem o prebiótico, o probiótico chega e não se fixa." },
  { image: activeCreatine, name: "Zinco", description: "Participa da formação da pele e da cicatrização. É o que mais costuma faltar quando o pet vive com a pele irritada." },
  { image: activeOrange, name: "Biotina", description: "Entra na produção da queratina, que é o material do fio de pelo." },
  { image: activeGuarana, name: "Ômega 3", description: "O organismo não fabrica sozinho, só recebe pela comida. Ajuda na maciez e no brilho do pelo." },
];

const nutrientGroups = [
  { amount: "13", label: "vitaminas" },
  { amount: "13", label: "minerais" },
  { amount: "7", label: "aminoácidos" },
  { amount: "5", label: "probióticos" },
  { amount: "2", label: "prebióticos" },
];

export function ActivesCarousel() {
  return (
    <section className="bg-background py-10 md:py-12">
      <div className="container-x">
        <div className="text-center md:text-left">
          <p className="eyebrow text-primary">O que tem dentro de cada dose</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">44 nutrientes. Um pote.</h2>
        </div>

        <div className="mt-6 rounded-lg bg-ink px-4 py-5 text-primary-foreground sm:px-6">
          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-3 lg:grid-cols-[repeat(5,1fr)_1.35fr] lg:items-center">
            {nutrientGroups.map((group) => (
              <div key={group.label} className="text-center">
                <strong className="block font-display text-3xl leading-none text-gift">{group.amount}</strong>
                <span className="mt-1 block text-xs">{group.label}</span>
              </div>
            ))}
            <p className="col-span-2 border-t border-primary-foreground/25 pt-4 text-center text-xs leading-relaxed sm:col-span-1 lg:border-l lg:border-t-0 lg:px-6 lg:pt-0">
              + ômega 3, condroitina, yucca e proteína
            </p>
          </div>
        </div>

        <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground md:text-left">
          13 + 13 + 7 + 5 + 2 + 4 = <strong className="text-primary">44.</strong> Todos declarados na tabela de níveis de garantia, nenhum arredondado para fechar a conta.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-5">
          {actives.map((active) => (
            <article key={active.name}>
              <img src={active.image} alt={active.name} loading="lazy" width={800} height={1067} className="aspect-[4/3] w-full rounded-lg object-cover" />
              <h3 className="mt-3 font-display text-xl leading-tight text-ink">{active.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{active.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-border pt-5 text-center text-xs leading-relaxed text-muted-foreground md:flex-row md:items-center md:justify-between md:text-left">
          <p>Mais enxofre, aminoácidos, vitaminas A, C e E, selênio e cobre. <span className="font-bold text-primary underline underline-offset-2">Ver a tabela completa</span></p>
          <p className="shrink-0">Registrado no MAPA · Sem corticoide · A partir de 3 meses</p>
        </div>
      </div>
    </section>
  );
}

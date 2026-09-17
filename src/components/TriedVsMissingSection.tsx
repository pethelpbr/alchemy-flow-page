const rows = [
  {
    name: "Shampoo medicamentoso",
    where: "Superfície da pele",
    duration: "Dias",
    daily: "Não",
    flora: "Não",
    barrier: "Não",
  },
  {
    name: "Pomada",
    where: "Onde passou",
    duration: "Horas a dias",
    daily: "Não",
    flora: "Não",
    barrier: "Não",
  },
  {
    name: "Antialérgicos caros",
    where: "No sintoma",
    duration: "Enquanto usa",
    daily: "Uso controlado",
    flora: "Não",
    barrier: "Não",
  },
  {
    name: "Troca de ração",
    where: "Alimentação",
    duration: "Variável",
    daily: "Sim",
    flora: "Em parte",
    barrier: "Em parte",
  },
  {
    name: "Suplemento só de pelo",
    where: "Fio e pele",
    duration: "Uso contínuo",
    daily: "Sim",
    flora: "Não",
    barrier: "Sim",
  },
];

const columns = [
  "O que você usou",
  "Onde age",
  "Quanto dura",
  "Todo dia",
  "Cuida da flora",
  "Cuida da barreira",
];

export function TriedVsMissingSection() {
  return (
    <section className="bg-[#F9F7F2] py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <h2 className="font-display text-2xl font-bold text-[#353534] md:text-4xl">
          O que você já tentou, e o que falta em cada um
        </h2>

        <div className="mt-8 overflow-x-auto md:overflow-visible">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="border-b border-[#e5ddd0] px-3 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[#8a7c66]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <td className="border-b border-[#e5ddd0] px-3 py-4 font-sans text-sm text-[#353534]">
                    {row.name}
                  </td>
                  <td className="border-b border-[#e5ddd0] px-3 py-4 font-sans text-sm text-[#353534]">
                    {row.where}
                  </td>
                  <td className="border-b border-[#e5ddd0] px-3 py-4 font-sans text-sm text-[#353534]">
                    {row.duration}
                  </td>
                  <td className="border-b border-[#e5ddd0] px-3 py-4 font-sans text-sm text-[#353534]">
                    {row.daily}
                  </td>
                  <td className="border-b border-[#e5ddd0] px-3 py-4 font-sans text-sm text-[#353534]">
                    {row.flora}
                  </td>
                  <td className="border-b border-[#e5ddd0] px-3 py-4 font-sans text-sm text-[#353534]">
                    {row.barrier}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#FBE3C8]">
                <td className="rounded-l-xl bg-[#FBE3C8] px-3 py-4 font-sans text-sm font-bold text-[#353534]">
                  NutraHelp
                </td>
                <td className="bg-[#FBE3C8] px-3 py-4 font-sans text-sm text-[#353534]">
                  Flora, pele e pelo
                </td>
                <td className="bg-[#FBE3C8] px-3 py-4 font-sans text-sm text-[#353534]">
                  Uso contínuo
                </td>
                <td className="bg-[#FBE3C8] px-3 py-4 font-sans text-sm text-[#353534]">Sim</td>
                <td className="bg-[#FBE3C8] px-3 py-4 font-sans text-sm text-[#353534]">Sim</td>
                <td className="rounded-r-xl bg-[#FBE3C8] px-3 py-4 font-sans text-sm text-[#353534]">
                  Sim
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

import { describe, expect, it } from "vitest";
import { pataFeedbacks } from "@/components/ProductVideoFeedback";
import pataVideo from "@/assets/depoimento-pata.mp4.asset.json";
import pataCover from "@/assets/depoimento-pata-capa.jpg.asset.json";
import mikeVideo from "@/assets/depoimento-mike.mp4.asset.json";

const first = pataFeedbacks[0];
const second = pataFeedbacks[1];
const third = pataFeedbacks[2];
if (!first || !second || !third) throw new Error("a fileira de relatos da /pata precisa de três cards");

// Regra: o segundo relato da fileira "Tutores que já passaram por isso" na
// página /pata é o vídeo gravado para o PataHelp. As outras páginas não mudam.
describe("relatos em vídeo da página /pata", () => {
  it("mostra o vídeo do PataHelp no segundo card", () => {
    expect(second.video).toBe(pataVideo.url);
    expect(second.image).toBe(pataCover.url);
  });

  it("não reaproveita o vídeo do Mike na /pata", () => {
    expect(second.video).not.toBe(mikeVideo.url);
  });

  it("não mostra nome no segundo card da /pata, só a etiqueta", () => {
    expect(second.name).toBeUndefined();
    expect(second.problem).toBe("Dermatite");
  });

  it("mantém o primeiro e o terceiro relato no lugar", () => {
    expect(first.name).toBe("Amora");
    expect(third.name).toBe("Marina");
  });
});

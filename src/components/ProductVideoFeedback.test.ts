import { describe, expect, it } from "vitest";
import { pataFeedbacks } from "@/components/ProductVideoFeedback";
import pataVideo from "@/assets/depoimento-pata.mp4.asset.json";
import pataCover from "@/assets/depoimento-pata-capa.jpg.asset.json";
import pata2Video from "@/assets/depoimento-pata-2.mp4.asset.json";
import pata2Cover from "@/assets/depoimento-pata-2-capa.jpg.asset.json";
import mikeVideo from "@/assets/depoimento-mike.mp4.asset.json";
import depo1Video from "@/assets/depoimento-1.mp4.asset.json";

const first = pataFeedbacks[0];
const second = pataFeedbacks[1];
const third = pataFeedbacks[2];
if (!first || !second || !third) throw new Error("a fileira de relatos da /pata precisa de três cards");

// Regra: na fileira "Tutores que já passaram por isso" da página /pata, o
// segundo relato é o vídeo do PataHelp e o terceiro é o vídeo de feridas.
// As outras páginas não mudam.
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

  it("mostra o vídeo de feridas no terceiro card, com a etiqueta Feridas", () => {
    expect(third.video).toBe(pata2Video.url);
    expect(third.image).toBe(pata2Cover.url);
    expect(third.problem).toBe("Feridas");
    expect(third.name).toBeUndefined();
  });

  it("não reaproveita o vídeo da Marina no terceiro card da /pata", () => {
    expect(third.video).not.toBe(depo1Video.url);
  });

  it("mantém o primeiro relato no lugar", () => {
    expect(first.name).toBe("Amora");
  });
});

import { describe, expect, it } from "vitest";
import { pataFeedbacks } from "@/components/ProductVideoFeedback";
import pataVideo from "@/assets/depoimento-pata.mp4.asset.json";
import pataCover from "@/assets/depoimento-pata-capa.jpg.asset.json";
import pata2Video from "@/assets/depoimento-pata-2.mp4.asset.json";
import pata2Cover from "@/assets/depoimento-pata-2-capa.jpg.asset.json";
import pata3Video from "@/assets/depoimento-pata-3.mp4.asset.json";
import pata3Cover from "@/assets/depoimento-pata-3-capa.jpg.asset.json";
import ressecamentoVideo from "@/assets/depoimento-pata-ressecamento.mp4.asset.json";
import ressecamentoCover from "@/assets/depoimento-pata-ressecamento-capa.jpg.asset.json";
import mikeVideo from "@/assets/depoimento-mike.mp4.asset.json";
import amoraVideo from "@/assets/depoimento-amora.mp4.asset.json";
import depo1Video from "@/assets/depoimento-1.mp4.asset.json";

// Regra: na fileira "Tutores que já passaram por isso" da página /pata, a ordem
// é dermatite, feridas, lambedura e ressecamento — todos sem nome no card, só a
// etiqueta laranja. As outras páginas não mudam.
const first = pataFeedbacks[0];
const second = pataFeedbacks[1];
const third = pataFeedbacks[2];
const fourth = pataFeedbacks[3];
if (!first || !second || !third || !fourth) throw new Error("a fileira de relatos da /pata precisa de quatro cards");

describe("relatos em vídeo da página /pata", () => {
  it("mostra o vídeo do PataHelp no primeiro card, com a etiqueta Dermatite", () => {
    expect(first.video).toBe(pataVideo.url);
    expect(first.image).toBe(pataCover.url);
    expect(first.problem).toBe("Dermatite");
    expect(first.name).toBeUndefined();
  });

  it("mostra o vídeo de feridas no segundo card, com a etiqueta Feridas", () => {
    expect(second.video).toBe(pata2Video.url);
    expect(second.image).toBe(pata2Cover.url);
    expect(second.problem).toBe("Feridas");
    expect(second.name).toBeUndefined();
  });

  it("mostra o vídeo da lambedura no terceiro card, com a etiqueta Lambedura", () => {
    expect(third.video).toBe(pata3Video.url);
    expect(third.image).toBe(pata3Cover.url);
    expect(third.problem).toBe("Lambedura");
    expect(third.name).toBeUndefined();
  });

  it("mostra o vídeo de Ressecamento no quarto card", () => {
    expect(fourth.video).toBe(ressecamentoVideo.url);
    expect(fourth.image).toBe(ressecamentoCover.url);
    expect(fourth.problem).toBe("Ressecamento");
    expect(fourth.name).toBeUndefined();
  });

  it("não reaproveita os vídeos das outras páginas na /pata", () => {
    expect(pataFeedbacks.map((f) => f.video)).not.toContain(mikeVideo.url);
    expect(pataFeedbacks.map((f) => f.video)).not.toContain(amoraVideo.url);
    expect(pataFeedbacks.map((f) => f.video)).not.toContain(depo1Video.url);
  });

  it("mantém a fileira com exatamente quatro cards", () => {
    expect(pataFeedbacks).toHaveLength(4);
  });
});

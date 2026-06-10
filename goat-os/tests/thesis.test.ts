import { describe, expect, it } from "vitest";
import { createThesis, getThesisById } from "@/lib/theses/create";
import { resolveThesis } from "@/lib/theses/resolve";

describe("thesis registry", () => {
  it("creates and resolves a thesis", async () => {
    const thesis = await createThesis({ agentId: "risk-01", tokenMint: "test-mint", actionType: "WATCHLIST", confidence: 0.5, riskScore: 20, reasons: ["reason"], invalidations: ["invalid"], sourceLinks: [] });
    expect(await getThesisById(thesis.id)).toBeTruthy();
    const resolved = await resolveThesis(thesis.id, "NEUTRAL");
    expect(resolved?.status).toBe("RESOLVED");
  });
});

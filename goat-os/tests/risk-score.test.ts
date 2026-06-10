import { describe, expect, it } from "vitest";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";
import { mockTokens } from "@/lib/tokens/mock-data";

describe("risk score", () => {
  it("scores a lower risk token", () => expect(scoreTokenRisk(mockTokens[0]).score).toBeLessThanOrEqual(40));
  it("detects high holder concentration", () => expect(scoreTokenRisk({ ...mockTokens[0], top10HolderPercent: 70 }).score).toBeGreaterThan(20));
  it("detects low liquidity", () => expect(scoreTokenRisk({ ...mockTokens[0], liquidityUsd: 10000 }).reasons.join(" ")).toContain("Liquidity"));
  it("detects suspicious dev wallet", () => expect(scoreTokenRisk({ ...mockTokens[0], devWalletStatus: "SUSPICIOUS" }).reasons.join(" ")).toContain("suspicious"));
  it("detects bundle risk", () => expect(scoreTokenRisk({ ...mockTokens[0], bundleRisk: 90 }).reasons.join(" ")).toContain("Bundle"));
  it("detects social velocity mismatch", () => expect(scoreTokenRisk({ ...mockTokens[0], liquidityUsd: 20000, socialVelocity: 95 }).reasons.join(" ")).toContain("Social"));
});

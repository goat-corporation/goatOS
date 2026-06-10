export type AnalyticsEvent = {
  name: string;
  userId?: string;
  agentId?: string;
  tokenMint?: string;
  thesisId?: string;
  bountyId?: string;
  properties?: Record<string, unknown>;
  createdAt: Date;
};

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  console.info("[analytics]", JSON.stringify({ ...event, createdAt: event.createdAt.toISOString() }));
}

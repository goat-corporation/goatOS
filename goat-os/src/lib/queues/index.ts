import { env } from "@/lib/env";
import type { QueueJob } from "@/lib/queues/jobs";

const inProcessJobs: QueueJob[] = [];

export async function enqueueJob(job: QueueJob) {
  if (!env.REDIS_URL) {
    inProcessJobs.push(job);
    return { id: `local-${inProcessJobs.length}`, backend: "in-process" };
  }
  inProcessJobs.push(job);
  return { id: `redis-placeholder-${inProcessJobs.length}`, backend: "redis-configured" };
}

export async function getQueuedJobs() {
  return inProcessJobs;
}

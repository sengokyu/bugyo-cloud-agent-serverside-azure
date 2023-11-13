import { ClockType } from "bugyo-cloud-client";

export interface queueItem {
  tenantCode: string;
  username: string;
  password: string;
  clockType: ClockType;
}

// タイプガード
export const isQueueItem = (x: any): x is queueItem =>
  x !== undefined &&
  x !== null &&
  "tenantCode" in x &&
  "username" in x &&
  "password" in x &&
  "clockType" in x;

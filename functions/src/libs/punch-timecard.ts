import {
  BugyoCloudClientService,
  Logger,
  LoggerFactory,
} from "bugyo-cloud-client";
import { queueItem } from "./queue-item";

// LoggerFactory
const loggerFactory: LoggerFactory = {
  getLogger(_: string): Logger {
    return {
      trace: console.log,
      debug: console.log,
      info: console.log,
      error: console.log,
    };
  },
};

export const punchTimeCard = async (param: queueItem): Promise<void> => {
  const service = new BugyoCloudClientService(loggerFactory);

  const loginTask = service.createLoginTask({
    loginId: param.username,
    password: param.password,
  });
  const punchTask = service.createPunchTask({
    clockType: param.clockType,
    longitude: 35.5,
    latitude: 139.5,
  });
  const logoutTask = service.createLogoutTask();

  const client = service.createClient(param.tenantCode);

  await client.doA(loginTask);

  try {
    await client.doA(punchTask);
  } finally {
    await client.doA(logoutTask);
  }
};

import {
  BugyoCloudClient,
  Logger,
  LoggerFactory,
  LoginTask,
  LogoutTask,
  PunchTask,
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
  const loginTask = new LoginTask(
    { loginId: param.username, password: param.password },
    loggerFactory
  );
  const punchTask = new PunchTask(
    {
      clockType: param.clockType,
      longitude: 35.6812,
      latitude: 139.7742,
    },
    loggerFactory
  );
  const logoutTask = new LogoutTask(loggerFactory);

  const client = new BugyoCloudClient(param.tenantCode);

  await client.doA(loginTask);

  try {
    await client.doA(punchTask);
  } finally {
    await client.doA(logoutTask);
  }
};

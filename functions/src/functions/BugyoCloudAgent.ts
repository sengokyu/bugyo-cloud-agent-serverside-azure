import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { punchTimeCard } from "../libs/punch-timecard";
import { isQueueItem } from "../libs/queue-item";

const createRes = (status: number, body: string) => ({
  status,
  body,
});

export async function BugyoCloudAgent(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const myQueueItem = request.body;

  if (isQueueItem(myQueueItem)) {
    try {
      context.log(`Trying to punch of ${myQueueItem.username}`);
      await punchTimeCard(myQueueItem);
      return createRes(200, "OK");
    } catch (e) {
      context.error(e);
      return createRes(500, e);
    }
  } else {
    const msg = `Unsupported input. ${request.body}`;
    context.log(msg);
    return createRes(400, msg);
  }
}

app.http("BugyoCloudAgent", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: BugyoCloudAgent,
});

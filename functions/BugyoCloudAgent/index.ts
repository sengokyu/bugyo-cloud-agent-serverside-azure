import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { punchTimeCard } from "./punch-timecard";
import { isQueueItem } from "./queue-item";

const createRes = (status: number, body: string) => ({
  status,
  body,
});

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const myQueueItem = req.body;

  if (isQueueItem(myQueueItem)) {
    try {
      context.log(`Trying to punch of ${myQueueItem.username}`);
      await punchTimeCard(myQueueItem);
      context.res = createRes(200, "OK");
    } catch (e) {
      context.log.error(e);
      context.res = createRes(500, e);
    }
  } else {
    const msg = `Unsupported input. ${req.body}`;
    context.log(msg);
    context.res = createRes(400, msg);
  }
};

export default httpTrigger;

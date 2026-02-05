import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});
const TABLE = "bf_ws_connections";

export const handler = async (event) => {
  const connectionId = event.requestContext.connectionId;

  await ddb.send(
    new DeleteItemCommand({
      TableName: TABLE,
      Key: {
        connection_id: { S: connectionId },
      },
    }),
  );

  return { statusCode: 200 };
};

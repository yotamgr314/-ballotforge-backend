import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});
const TABLE = "bf_ws_connections";

export const handler = async (event) => {
  const connectionId = event.requestContext.connectionId;

  await ddb.send(
    new PutItemCommand({
      TableName: TABLE,
      Item: {
        connection_id: { S: connectionId },
        role: { S: "admin" },
        connected_at: { N: Date.now().toString() },
      },
    }),
  );

  return { statusCode: 200 };
};

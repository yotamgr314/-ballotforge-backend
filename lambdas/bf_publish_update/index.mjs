import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

const ddb = new DynamoDBClient({});
const ws = new ApiGatewayManagementApiClient({
  endpoint: process.env.WS_ENDPOINT,
});

const CONNECTIONS_TABLE = "bf_ws_connections";

export const handler = async (event) => {
  const connections = await ddb.send(
    new ScanCommand({
      TableName: CONNECTIONS_TABLE,
    }),
  );

  const message = JSON.stringify({
    type: "TALLY_UPDATE",
    data: event.tally,
  });

  for (const item of connections.Items || []) {
    try {
      await ws.send(
        new PostToConnectionCommand({
          ConnectionId: item.connection_id.S,
          Data: message,
        }),
      );
    } catch (err) {
      // חיבור מת – נתעלם (אפשר לנקות בהמשך)
    }
  }

  return { sent: true };
};

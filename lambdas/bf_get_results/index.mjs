import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});

export const handler = async () => {
  const result = await ddb.send(
    new ScanCommand({ TableName: "bf_live_tallies" }),
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      results: result.Items,
    }),
  };
};

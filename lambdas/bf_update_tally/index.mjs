import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});

export const handler = async (event) => {
  const { choice } = event;

  if (!choice) {
    throw new Error("Missing choice");
  }

  await ddb.send(
    new UpdateItemCommand({
      TableName: "bf_live_tallies",
      Key: {
        option_code: { S: choice },
      },
      UpdateExpression: "ADD vote_count :inc",
      ExpressionAttributeValues: {
        ":inc": { N: "1" },
      },
    }),
  );

  return {
    success: true,
    choice,
  };
};

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});

export const handler = async (event) => {
  const { voter_id, choice } = event;

  if (!voter_id || !choice) {
    throw new Error("Invalid input to register vote");
  }

  try {
    await ddb.send(
      new PutItemCommand({
        TableName: "bf_vote_registry",
        Item: {
          voter_id: { S: voter_id },
          choice: { S: choice },
          cast_at: { S: new Date().toISOString() },
        },
        ConditionExpression: "attribute_not_exists(voter_id)",
      }),
    );

    return {
      registered: true,
      voter_id,
      choice,
    };
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      return {
        registered: false,
        reason: "DUPLICATE_VOTE",
      };
    }
    throw err;
  }
};

import { SFNClient, StartExecutionCommand } from "@aws-sdk/client-sfn";

const sfn = new SFNClient({});
const STATE_MACHINE_ARN = process.env.STATE_MACHINE_ARN;

export const handler = async (event) => {
  const payload =
    typeof event.body === "string" ? JSON.parse(event.body) : event;

  // validation בסיסית
  if (!payload.voter_id || !payload.choice) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing voter_id or choice" }),
    };
  }

  await sfn.send(
    new StartExecutionCommand({
      stateMachineArn: STATE_MACHINE_ARN,
      input: JSON.stringify(payload),
    }),
  );

  return {
    statusCode: 202,
    body: JSON.stringify({ message: "Vote accepted for processing" }),
  };
};

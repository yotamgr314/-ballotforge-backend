export const handler = async (event) => {
  const { voter_id, choice } = event;

  if (!voter_id || !choice) {
    return {
      valid: false,
      reason: "MISSING_FIELDS",
    };
  }

  return {
    valid: true,
    voter_id: voter_id.trim().toLowerCase(),
    choice: choice.trim(),
  };
};

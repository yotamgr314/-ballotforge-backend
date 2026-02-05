alert("THIS IS THE LOADED app.js");
// 🔧 כתובת ה־API האמיתית שלך
const API_BASE_URL =
  "https://i1rkcln8y7.execute-api.eu-west-1.amazonaws.com/prod";

function getVoterId() {
  let id = localStorage.getItem("voter_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("voter_id", id);
  }
  return id;
}

async function submitVote() {
  const choice = document.querySelector("input[name='choice']:checked");
  const msg = document.getElementById("message");

  if (!choice) {
    msg.innerText = "❗ בחר אפשרות";
    return;
  }

  const payload = {
    voter_id: getVoterId(),
    choice: choice.value,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      msg.innerText = "✅ ההצבעה נקלטה!";
    } else {
      msg.innerText = "⚠️ כבר הצבעת או שגיאה במערכת";
    }
  } catch (err) {
    console.error(err);
    msg.innerText = "❌ שגיאת רשת";
  }
}

const API_BASE_URL =
  "https://i1rkcln8y7.execute-api.eu-west-1.amazonaws.com/prod";

const ADMIN_HEADERS = {
  // "x-api-key": "XXXX"
};

const ctx = document.getElementById("resultsChart");

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "מספר הצבעות",
        data: [],
        backgroundColor: ["#4caf50", "#2196f3"],
      },
    ],
  },
  options: {
    scales: { y: { beginAtZero: true } },
  },
});

async function fetchResults() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/results`, {
      headers: ADMIN_HEADERS,
      cache: "no-store",
    });

    const data = await res.json();

    const labels = data.results.map((r) => r.option_code);
    const votes = data.results.map((r) => Number(r.vote_count));

    chart.data.labels = labels;
    chart.data.datasets[0].data = votes;
    chart.update();
  } catch (err) {
    console.error("Failed to fetch results", err);
  }
}

fetchResults();
setInterval(fetchResults, 2000);

const user = localStorage.getItem("user");

async function getBalance() {
  const res = await fetch("/balance", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username: user })
  });
  const data = await res.json();
  document.getElementById("balance").innerText = data.balance.toFixed(2);
}

async function bet() {
  const amount = Number(document.getElementById("betAmount").value);
  await fetch("/bet", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username: user, amount })
  });
}

async function cashout() {
  const amount = Number(document.getElementById("betAmount").value);
  const res = await fetch("/cashout", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username: user, amount })
  });
  const data = await res.json();
  if (data.success) alert("Won: " + data.win.toFixed(2));
}

async function updateGame() {
  const res = await fetch("/game");
  const data = await res.json();
  document.getElementById("multiplier").innerText =
    data.multiplier.toFixed(2) + "x";
}

async function loadLeaderboard() {
  const res = await fetch("/leaderboard");
  const data = await res.json();
  const list = document.getElementById("leaderboard");
  list.innerHTML = "";
  data.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.username}: ${item.win.toFixed(2)}`;
    list.appendChild(li);
  });
}

setInterval(() => {
  updateGame();
  getBalance();
  loadLeaderboard();
}, 500);

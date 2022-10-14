const cells = document.querySelectorAll(".box");
const statusT = document.querySelector("#status");
const restart = document.querySelector("#restart");
const winCon = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let op = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let running = false;

initGame();
function initGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellclick));
  restart.addEventListener("click", restartBtn);
  statusT.textContent = `${currPlayer}'s turn`;
  running = true;
}
function cellclick() {
  const cellindex = this.getAttribute("cellindex");
  if (op[cellindex] != "" || !running) {
    return;
  }
  cellUpdate(this, cellindex);
  checkwinner();
}
function cellUpdate(cell, index) {
  op[index] = currPlayer;
  cell.textContent = currPlayer;
}
function changePlayer() {
  currPlayer = currPlayer == "X" ? "O" : "X";
  statusT.textContent = `${currPlayer}'s turn`;
}
function checkwinner() {
  let won = false;
  for (let i = 0; i < winCon.length; i++) {
    const con = winCon[i];
    const cellA = op[con[0]];
    const cellB = op[con[1]];
    const cellC = op[con[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      won = true;
      break;
    }
  }

  if (won) {
    statusT.textContent = `${currPlayer}'s Winning`;
    running = false;
  } else if (!op.includes("")) {
    statusT.textContent = `Draw`;
    running = false;
  } else {
    changePlayer();
  }
}
function restartBtn() {
  currPlayer = "X";
  op = ["", "", "", "", "", "", "", "", ""];
  statusT.textContent = `${currPlayer}'s turn `;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}

// 1. Inisialisasi Variable Penyimpan Nilai Initial
let countGame = 20;
let countStore = 19;
let countTodo = 18;
let countQuiz = 16;

// 2. Seleksi Elemen DOM Tempat Angka Ditampilkan
const gameVotesEl = document.querySelector("#gameVotes");
const storeVotesEl = document.querySelector("#storeVotes");
const todoVotesEl = document.querySelector("#todoVotes");
const quizVotesEl = document.querySelector("#quizVotes");
const totalVotesEl = document.querySelector("#totalVotes");
const feedbackEl = document.querySelector("#feedback");

// 3. Seleksi Elemen Tombol Vote
const btnGame = document.querySelector("#btnGame");
const btnStore = document.querySelector("#btnStore");
const btnTodo = document.querySelector("#btnTodo");
const btnQuiz = document.querySelector("#btnQuiz");

// 4. Fungsi Pembantu untuk Mengupdate Total Vote Keseluruhan
function updateTotalVotes() {
  const total = countGame + countStore + countTodo + countQuiz;
  totalVotesEl.textContent = total;
}

// 5. Event Listener untuk Masing-masing Tombol

// Mini Game Button Event
btnGame.addEventListener("click", function () {
  countGame++;
  gameVotesEl.textContent = countGame;
  updateTotalVotes();
  feedbackEl.textContent = "✅ Kamu memilih Mini Game 🎮";
});

// Mini Store Button Event
btnStore.addEventListener("click", function () {
  countStore++;
  storeVotesEl.textContent = countStore;
  updateTotalVotes();
  feedbackEl.textContent = "✅ Kamu memilih Mini Store 🛒";
});

// To-Do App Button Event
btnTodo.addEventListener("click", function () {
  countTodo++;
  todoVotesEl.textContent = countTodo;
  updateTotalVotes();
  feedbackEl.textContent = "✅ Kamu memilih To-Do App 📝";
});

// Quiz App Button Event
btnQuiz.addEventListener("click", function () {
  countQuiz++;
  quizVotesEl.textContent = countQuiz;
  updateTotalVotes();
  feedbackEl.textContent = "✅ Kamu memilih Quiz App 🧠";
});
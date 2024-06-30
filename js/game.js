let totalCoins = 250; // Memulai permainan dengan 250 koin
let inGame = false;
let cardsClickable = false;
let userGuessed = false;

document.getElementById("play-button").addEventListener("click", function () {
  if (inGame) return;

  const coinInput = document.getElementById("coins");
  const coins = parseInt(coinInput.value);

  if (!coins || coins <= 0) {
    alert("Please enter a valid amount of coins.");
    return;
  }

  if (totalCoins < coins) {
    alert("You do not have enough coins.");
    return;
  }

  totalCoins -= coins; // Kurangi koin saat permainan dimulai
  updateTotalCoins();

  inGame = true;
  cardsClickable = false;
  userGuessed = false; // Set flag userGuessed ke false
  this.disabled = true;
  this.textContent = "In Game";

  shuffleCards().then(() => {
    cardsClickable = true;
  });
});

function shuffleCards() {
  return new Promise((resolve) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.add("shuffling");
      // Sembunyikan gambar saat kartu diacak
      card.style.backgroundImage = `url('img/BELAKANG.jpg')`;
    });

    setTimeout(() => {
      cards.forEach((card) => {
        card.classList.remove("shuffling");
      });
      resolve();
    }, 2000);
  });
}

function handleCardClick(card, bet) {
  if (!inGame || !cardsClickable || userGuessed) return;

  cardsClickable = false; // Mencegah klik berulang
  userGuessed = true; // Set flag userGuessed ke true setelah kartu diklik
  const isWinningCard = Math.random() < 0.1; // Probabilitas kemenangan di bawah 15 persen
  const message = document.getElementById("message");

  if (isWinningCard) {
    totalCoins += bet + 10;
    message.textContent = "You won! Your coins are multiplied by 10.";
    card.style.backgroundImage = `url('img/Default_Create_an_illustration_of_the_Taurus_zodiac_sign_featu_3 (1).jpg')`;
  } else {
    totalCoins -= 5; // Kurangi 5 koin jika kalah
    message.textContent = "You lost! Better luck next time.";
    card.style.backgroundImage = `url('img/PDIP.jpg')`;
  }

  updateTotalCoins();
  endGame(); // Panggil fungsi endGame untuk menyelesaikan permainan
}

function endGame() {
  setTimeout(() => {
    inGame = false;
    document.getElementById("play-button").disabled = false;
    document.getElementById("play-button").textContent = "Play";
  }, 1000); // Tunggu sebentar sebelum reset permainan
}

function updateTotalCoins() {
  document.getElementById("total-coins").textContent =
    "Total Coins: " + totalCoins;
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const coinInput = document.getElementById("coins");
    const bet = parseInt(coinInput.value);
    handleCardClick(card, bet);
  });
});

const introLines = [
  "Hari ini...",
  "ada satu orang yang ulang tahun.",
  "",
  "Dan aku bersyukur,",
  "karena orang itu adalah kamu."
];

let index = 0;

function startIntro() {
  const el = document.getElementById("introText");
  el.innerHTML = "";

  const interval = setInterval(() => {
    el.innerHTML += introLines[index] + "<br/>";
    index++;
    if (index === introLines.length) {
      clearInterval(interval);
      setTimeout(showMain, 1800);
    }
  }, 900);
}

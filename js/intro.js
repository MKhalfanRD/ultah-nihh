const intro = document.getElementById("intro");
const main = document.getElementById("main");

if (!localStorage.getItem("opened")) {
  new Typed("#intro-text", {
    strings: [
      "Hari ini…<br>ada satu orang yang ulang tahun.<br><br>Dan aku bersyukur…<br>orang itu adalah kamu."
    ],
    typeSpeed: 45,
    showCursor: false,
    onComplete: () => {
      setTimeout(() => {
        intro.classList.add("hidden");
        main.classList.remove("hidden");
      }, 1200);
    }
  });

  localStorage.setItem("opened", "true");
} else {
  intro.classList.add("hidden");
  main.classList.remove("hidden");
}

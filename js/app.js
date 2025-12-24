window.addEventListener("DOMContentLoaded", () => {
    showGate(); 
});

function showGate() {
  const gate = document.getElementById("gate");
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

  // Pastikan yang lain tersembunyi
  intro.classList.add("hidden");
  main.classList.add("hidden");
  
  // Munculkan Gate
  gate.classList.remove("hidden");
  gsap.fromTo("#gate .glass-card", 
    { opacity: 0, scale: 0.8 }, 
    { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
  );
}

function showMain() {
  const gate = document.getElementById("gate");
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

  // Pastikan gate dan intro hilang
  gate.classList.add("hidden");
  intro.classList.add("hidden");
  
  // Munculkan Main dengan lembut
  main.classList.remove("hidden");
  gsap.fromTo(main, { opacity: 0 }, { opacity: 1, duration: 2 });

  // Jalankan Mode Ulang Tahun
  if (isBirthday()) {
    activateBirthdayMode();
  }
}

function isBirthday() {
  const d = new Date();
  // Contoh: 24 Desember (Bulan 11 karena Januari = 0)
  return d.getDate() === 24 && d.getMonth() === 11;
}

function activateBirthdayMode() {
  birthdayConfetti(); // Dari confetti.js
  const bg = document.getElementById("bgMusic");
  bg.volume = 0;
  bg.play().catch(() => {});
  gsap.to(bg, { volume: 0.4, duration: 5 }); // Fade in musik
  playVoice(); // Dari voice.js
}
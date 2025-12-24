function checkAnswer() {
  const a = document.getElementById("answer").value.toLowerCase();
  const msg = document.getElementById("gateMsg");

  if (a.includes("marugame") || a.includes("kokas")) {
    // Animasi keluar untuk Gate
    gsap.to("#gate .glass-card", { 
      opacity: 0, 
      y: -50, 
      duration: 0.8, 
      onComplete: () => {
        document.getElementById("gate").classList.add("hidden");
        // Mulai transisi Intro puitis
        if (typeof startIntroFlow === "function") {
          startIntroFlow();
        }
      }
    });
  } else {
    msg.innerText = "Hehe, masa lupa? Coba ingat lagi... 🤍";
    gsap.fromTo(msg, { x: -10 }, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
  }
}
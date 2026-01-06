function checkAnswer() {
    const a = document.getElementById("answer").value.toLowerCase();
    if (a.includes("marugame") || a.includes("kokas")) {
        gsap.to("#gate", { opacity: 0, duration: 1, onComplete: () => {
            document.getElementById("gate").style.display = "none";
            unlockContent();
        }});
    } else {
        document.getElementById("gateMsg").innerText = "Coba ingat lagi... 🤍";
    }
}

function unlockContent() {
    const wrapper = document.getElementById("content-wrapper");
    wrapper.classList.remove("hidden");
    document.body.style.overflowY = "auto"; // Aktifkan scroll
    
    // Mulai Intro Otomatis
    startIntroFlow();
    
    // Mulai Musik
    const bg = document.getElementById("bgMusic");
    bg.play();
    gsap.to(bg, { volume: 0.4, duration: 4 });
}
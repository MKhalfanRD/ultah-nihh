const FOTO_MAIN = [
    "assets/img/dulu1.jpeg",
    "assets/img/dulu2.jpeg",
    "assets/img/now1.jpeg",
    "assets/img/now2.jpeg"
];

const FOTO_PENUTUP = [
    "assets/img/cuma bobo.jpg",
    "assets/img/jan mikir aneh.jpg",
    "assets/img/love u.jpg",
    "assets/img/udah punya.jpg"
];

function initiateExperience() {
    const overlay = document.getElementById("start-overlay");
    gsap.to(overlay, { opacity: 0, duration: 1, onComplete: () => {
        overlay.style.display = "none";
        startGateAnimation();
    }});
    document.querySelectorAll("audio").forEach(a => {
        a.play().then(() => { a.pause(); a.currentTime = 0; }).catch(() => {});
    });
}

function startGateAnimation() {
    // 1. Tampilkan section gate
    const gateSec = document.getElementById("sec-gate");
    gateSec.style.display = "flex";
    gateSec.classList.add("active-sec");

    // 2. Pastikan question-box dan semua greet tersembunyi total sebelum animasi mulai
    document.getElementById("question-box").style.display = "none";
    document.querySelectorAll(".anim-text").forEach(el => {
        el.style.display = "none";
        el.style.opacity = "0";
    });

    const tl = gsap.timeline();
    const vHalo = document.getElementById("v-halo");
    const vMemastikan = document.getElementById("v-memastikan");
    const vPastiTau = document.getElementById("v-pasti-tau");
    
    // 3. Jalankan urutan animasi
    tl.to("#greet-1", { display: "block", opacity: 1, y: -10, duration: 1, onStart: () => vHalo.play() })
      .to("#greet-1", { opacity: 0, y: -20, duration: 0.5, delay: 2.5, display: "none" })
      
      .to("#greet-2", { display: "block", opacity: 1, y: -10, duration: 1, onStart: () => vMemastikan.play() })
      .to("#greet-2", { opacity: 0, y: -20, duration: 0.5, delay: 2.5, display: "none" })
      
      .to("#greet-3", { display: "block", opacity: 1, y: -10, duration: 1, onStart: () => vPastiTau.play() })
      .to("#greet-3", { opacity: 0, y: -20, duration: 0.5, delay: 1.5, display: "none" })
      
      // Munculkan Question Box HANYA setelah greet-3 selesai
      .to("#question-box", { 
          display: "block", 
          opacity: 1, 
          y: 0, 
          duration: 1,
          onStart: () => {
              // Sembunyikan container sapaan agar input bisa di tengah
              document.getElementById("gate-text-container").style.display = "none";
          }
      });
}

function checkAnswer() {
    const ans = document.getElementById("answer").value.toLowerCase();
    if (ans.includes("marugame") || ans.includes("udon") || ans.includes("kokas" || ans.includes("marugame udon"))) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        document.getElementById("v-sukses").play();
        setTimeout(() => {
            showSection("sec-birthday");
            setTimeout(startSinging, 1200);
        }, 2000);
    } else {
        document.getElementById("v-salah").play();
        gsap.fromTo("#gate-card", { x: -10 }, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
    }
}

function startSinging() {
    const sing = document.getElementById("audio-sing");
    const story = document.getElementById("audio-story");
    const container = document.getElementById("playing-photos");
    
    document.getElementById("btn-sing").style.display = "none";
    sing.play();

    let storyStarted = false;
    sing.ontimeupdate = () => {
        if (sing.currentTime >= 24 && !storyStarted) {
            storyStarted = true;
            gsap.to(sing, { volume: 0.05, duration: 2 });
            story.play();
        }
    };

    FOTO_MAIN.forEach((src, i) => {
        setTimeout(() => {
            const img = document.createElement("img");
            img.src = src;
            img.className = "memory-photo";
            container.appendChild(img);

            gsap.fromTo(img, 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1.1, duration: 10, ease: "power1.out" }
            );
        }, i * 6000);
    });

    story.onended = () => {
        const btn = document.createElement("button");
        btn.innerHTML = "Buka Surat Terakhir 💌";
        btn.style.marginTop = "30px";
        btn.onclick = showLetter;
        document.getElementById("sec-birthday").appendChild(btn);
    };
}

function showLetter() {
    showSection("sec-letter");
    const letterBox = document.querySelector(".letter-box");
    const finalText = document.getElementById("final-text");

    let photoContainer = document.getElementById("letter-photos-container");
    if(!photoContainer) {
        photoContainer = document.createElement("div");
        photoContainer.id = "letter-photos-container";
        letterBox.insertBefore(photoContainer, finalText);
    }

    FOTO_PENUTUP.forEach((src, i) => {
        setTimeout(() => {
            const img = document.createElement("img");
            img.src = src;
            img.className = "mini-photo";
            photoContainer.appendChild(img);
            gsap.to(img, { opacity: 1, duration: 2, y: -5 });
        }, i * 2000);
    });

    const text = "Ternyata semesta punya caranya sendiri ya... Terima kasih sudah hadir kembali di hidupku setelah 9 tahun ini. Selamat ulang tahun, semoga kita terus satu orbit. 🤍";
    finalText.innerHTML = "";
    let j = 0;
    function type() {
        if (j < text.length) {
            finalText.innerHTML += text.charAt(j);
            j++; 
            setTimeout(type, 60);
        }
    }
    setTimeout(type, 1500);
}

function showSection(id) {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        sec.classList.remove('active-sec');
        sec.style.display = "none";
    });

    const target = document.getElementById(id);
    target.style.display = "flex";
    target.classList.add("active-sec");
    gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration: 1 });
    window.scrollTo(0, 0);
}
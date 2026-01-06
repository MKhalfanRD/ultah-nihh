// Konfigurasi Link Gambar
const FOTO_SMP = "assets/img/smp.jpg";
const FOTO_MARUGAME = "assets/img/marugame.jpg";
const FOTO_MAIN = ["assets/img/main1.jpg", "assets/img/main2.jpg", "assets/img/main3.jpg"];

// 1. Fungsi Membuka Kado (Trigger Utama)
function initiateExperience() {
    const overlay = document.getElementById("start-overlay");
    gsap.to(overlay, { opacity: 0, duration: 1, onComplete: () => {
        overlay.style.display = "none";
        startGateAnimation();
    }});

    // Unlock semua audio untuk browser mobile
    const audios = document.querySelectorAll("audio");
    audios.forEach(a => {
        a.play().then(() => { a.pause(); a.currentTime = 0; }).catch(() => {});
    });
}

// 2. Gate Animation (Sapaan & Voice)
function startGateAnimation() {
    const tl = gsap.timeline();
    const vHalo = document.getElementById("v-halo");
    const vMemastikan = document.getElementById("v-memastikan");
    const vPastiTau = document.getElementById("v-pasti-tau");
    const sfxCeria = document.getElementById("sfx-ceria");
    const sfxDegdegan = document.getElementById("sfx-heartbeat");

    document.getElementById("sec-gate").classList.add("active-sec");

    tl.to("#greet-1", { 
        display: "block", opacity: 1, y: -10, duration: 1, 
        onStart: () => { sfxCeria.play(); vHalo.play(); } 
    })
    .to("#greet-1", { opacity: 0, y: -20, duration: 0.5, delay: 2.5, display: "none" })
    .to("#greet-2", { 
        display: "block", opacity: 1, y: -10, duration: 1, 
        onStart: () => vMemastikan.play() 
    })
    .to("#greet-2", { opacity: 0, y: -20, duration: 0.5, delay: 2.5, display: "none" })
    .to("#greet-3", { 
        display: "block", opacity: 1, y: -10, duration: 1, 
        onStart: () => vPastiTau.play() 
    })
    .to("#greet-3", { opacity: 0, y: -20, duration: 0.5, delay: 1.5, display: "none" })
    .to("#question-box", { 
        display: "block", opacity: 1, y: 0, duration: 1, 
        onStart: () => { sfxDegdegan.volume = 0.3; sfxDegdegan.play(); } 
    });
}

// 3. Verifikasi Jawaban
function checkAnswer() {
    const ans = document.getElementById("answer").value.toLowerCase();
    const sfxDegdegan = document.getElementById("sfx-heartbeat");
    const vSukses = document.getElementById("v-sukses");
    const vSalah = document.getElementById("v-salah");
    const msg = document.getElementById("gateMsg");

    if (ans.includes("marugame") || ans.includes("udon")) {
        sfxDegdegan.pause();
        vSukses.play();
        gsap.to("#question-box", { opacity: 0, scale: 0.8, duration: 0.5 });
        msg.style.color = "#d2b48c";
        msg.innerHTML = "🎉 Yey beneran Ayang! Bentar ya...";
        setTimeout(startStory, 3000);
    } else {
        vSalah.play();
        msg.innerText = "Salah... coba ingat lagi ya 😤";
        gsap.fromTo("#gate-card", { x: -10 }, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
    }
}

// 4. Phase: Story
function startStory() {
    showSection("sec-story");
    const audio = document.getElementById("audio-story");
    const img = document.getElementById("story-img");
    const cap = document.getElementById("story-caption");
    const prog = document.querySelector(".progress");

    audio.play();
    img.src = FOTO_SMP;
    cap.innerText = "Dulu kita cuma sebatas tahu nama di SMP...";

    audio.ontimeupdate = () => {
        prog.style.width = (audio.currentTime / audio.duration) * 100 + "%";
        // Ganti foto di detik ke-10 (sesuaikan durasi)
        if (Math.floor(audio.currentTime) === 10) {
            img.src = FOTO_MARUGAME;
            cap.innerText = "9 tahun kemudian, kita ketemu lagi di Marugame Udon.";
        }
    };

    audio.onended = () => setTimeout(() => showSection("sec-birthday"), 1000);
}

// 5. Phase: Birthday Singing
function startSinging() {
    const sing = document.getElementById("audio-sing");
    document.getElementById("btn-sing").style.display = "none";
    sing.play();

    FOTO_MAIN.forEach((src, i) => {
        setTimeout(() => {
            const img = document.createElement("img");
            img.src = src;
            img.style.width = "100px";
            img.style.borderRadius = "10px";
            img.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
            document.getElementById("playing-photos").appendChild(img);
            gsap.from(img, { scale: 0, opacity: 0, duration: 0.5 });
        }, i * 3000);
    });

    sing.onended = () => {
        const btn = document.createElement("button");
        btn.innerText = "Buka Surat 💌";
        btn.style.marginTop = "20px";
        btn.onclick = showLetter;
        document.getElementById("sec-birthday").appendChild(btn);
    };
}

// 6. Phase: Final Letter
function showLetter() {
    showSection("sec-letter");
    const text = "Ternyata semesta punya caranya sendiri ya... Terima kasih sudah hadir kembali di hidupku setelah 9 tahun ini. Selamat ulang tahun, semoga kita terus satu orbit. 🤍";
    const el = document.getElementById("final-text");
    let i = 0;
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++; setTimeout(type, 50);
        }
    }
    setTimeout(type, 1000);
}

// Helper: Navigasi Antar Section
function showSection(id) {
    const current = document.querySelector(".active-sec");
    if(current) {
        gsap.to(current, { opacity: 0, duration: 0.8, onComplete: () => {
            current.classList.remove("active-sec");
            current.style.visibility = "hidden";
        }});
    }
    
    setTimeout(() => {
        const next = document.getElementById(id);
        next.classList.add("active-sec");
        gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 1, visibility: "visible" });
    }, 850);
}
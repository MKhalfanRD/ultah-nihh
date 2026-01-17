const FOTO_MAIN = [
    "assets/img/dulu1.jpeg", "assets/img/dulu2.jpeg", "assets/img/now1.jpeg", "assets/img/now2.jpeg",
    "assets/img/marugame1.jpeg", "assets/img/marugame2.jpeg", "assets/img/roblox1.jpeg", "assets/img/roblox2.jpeg",
    "assets/img/roblox3.jpeg", "assets/img/takeichi1.jpeg", "assets/img/takeichi2.jpeg", "assets/img/kado1.jpeg",
    "assets/img/urbanForest1.jpeg", "assets/img/urbanForest2.jpeg", "assets/img/urbanForest3.jpeg",
    "assets/img/blokm1.jpeg", "assets/img/natsuka1.jpeg", "assets/img/natsuka2.jpeg", "assets/img/filosofikopi.jpeg",
    "assets/img/filosofikopi2.jpeg", "assets/img/neduh.jpeg", "assets/img/bakmipiring.jpeg", "assets/img/kamuu.jpeg", "assets/img/marugame.jpeg", "assets/img/natsuka3.jpeg", "assets/img/gramed.jpeg", "assets/img/kucing.jpeg",
];

const FOTO_PENUTUP = [
    "assets/img/cuma bobo.jpg", "assets/img/jan mikir aneh.jpg",
    "assets/img/love u.jpg", "assets/img/udah punya.jpg"
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
    showSection("sec-gate");
    
    const qBox = document.getElementById("question-box");
    qBox.style.display = "none"; 

    const tl = gsap.timeline();
    const audios = {
        h: document.getElementById("v-halo"),
        m: document.getElementById("v-memastikan"),
        p: document.getElementById("v-pasti-tau")
    };
    
    tl.to("#greet-1", { display: "block", opacity: 1, y: -10, duration: 1, onStart: () => audios.h.play() })
      .to("#greet-1", { opacity: 0, y: -20, duration: 0.5, delay: 2.5, display: "none" })
      .to("#greet-2", { display: "block", opacity: 1, y: -10, duration: 1, onStart: () => audios.m.play() })
      .to("#greet-2", { opacity: 0, y: -20, duration: 0.5, delay: 2.5, display: "none" })
      .to("#greet-3", { display: "block", opacity: 1, y: -10, duration: 1, onStart: () => audios.p.play() })
      .to("#greet-3", { opacity: 0, y: -20, duration: 0.5, delay: 1.5, display: "none" })
      .to("#question-box", { 
          display: "block", opacity: 1, y: 0, duration: 1,
          onStart: () => { document.getElementById("gate-text-container").style.display = "none"; }
      });
}

function checkAnswer() {
    const ans = document.getElementById("answer").value.toLowerCase();
    const vSukses = document.getElementById("v-sukses");

    if (ans.includes("marugame") || ans.includes("udon") || ans.includes("kokas")) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        
        // 1. Langsung munculkan halaman Happy Birthday
        showSection("sec-birthday");
        
        // 2. Putar suara sukses
        vSukses.play();

        // 3. Lagu dan foto baru mulai setelah suara sukses selesai
        vSukses.onended = () => {
            startSinging();
        };

        // Backup jika audio error/tidak load, tetap jalankan fungsinya
        vSukses.onerror = () => {
            startSinging();
        };

    } else {
        document.getElementById("v-salah").play();
        gsap.fromTo("#gate-card", { x: -10 }, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
    }
}

function checkAnswer() {
    const ans = document.getElementById("answer").value.toLowerCase();
    const vSukses = document.getElementById("v-sukses");
    const gateMsg = document.getElementById("gateMsg");

    // Pastikan ID gateMsg ada di HTML kamu
    if (ans.includes("marugame") || ans.includes("udon") || ans.includes("kokas")) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        showSection("sec-birthday");
        vSukses.play();
        vSukses.onended = () => startSinging();
        vSukses.onerror = () => startSinging();
    } else {
        if(gateMsg) gateMsg.innerText = "Hmm, masa lupa? Coba ingat lagi! 🤔";
        document.getElementById("v-salah").play();
        gsap.fromTo("#gate-card", { x: -10 }, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
    }
}

function startSinging() {
    const sing = document.getElementById("audio-sing");
    const story = document.getElementById("audio-story");
    const container = document.getElementById("playing-photos");
    
    // Pastikan container bersih
    container.innerHTML = "";
    sing.play();

    let storyStarted = false;
    sing.ontimeupdate = () => {
        // Menurunkan volume lagu utama saat suara cerita masuk di detik ke-24
        if (sing.currentTime >= 24 && !storyStarted) {
            storyStarted = true;
            gsap.to(sing, { volume: 0.1, duration: 2 });
            story.play();
        }
    };

    const delayFotoPertama = 1500; // Foto pertama baru muncul 3 detik setelah lagu mulai
    const intervalAntarFoto = 10000; // Foto selanjutnya muncul tiap 6 detik

    FOTO_MAIN.forEach((src, i) => {
        setTimeout(() => {
            const img = document.createElement("img");
            img.src = src;
            img.className = "memory-photo";
            container.appendChild(img);
            
            gsap.fromTo(img, 
                { opacity: 0, scale: 0.5, rotation: i % 2 === 0 ? -5 : 5 }, 
                { opacity: 1, scale: 1, rotation: i % 2 === 0 ? -2 : 2, duration: 1.5, ease: "back.out(1.7)" }
            );
            img.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, delayFotoPertama + (i * intervalAntarFoto));
    });

    story.onended = () => {
        const modal = document.getElementById("modal-penutupan");
        modal.classList.remove("hidden");
        gsap.fromTo(".modal-content", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
    };
}

function closeModalAndShowLetter() {
    const modal = document.getElementById("modal-penutupan");
    gsap.to(modal, { opacity: 0, duration: 0.5, onComplete: () => {
        modal.classList.add("hidden");
        showLetter();
    }});
}

function showLetter() {
    showSection("sec-letter");
    const letterBox = document.querySelector(".letter-box");
    const finalText = document.getElementById("final-text");

    let photoContainer = document.getElementById("letter-photos-container");
    if (!photoContainer) {
        photoContainer = document.createElement("div");
        photoContainer.id = "letter-photos-container";
        letterBox.insertBefore(photoContainer, finalText);
    }
    photoContainer.innerHTML = "";

    FOTO_PENUTUP.forEach((src, i) => {
        setTimeout(() => {
            const img = document.createElement("img");
            img.src = src;
            img.className = "mini-photo";
            photoContainer.appendChild(img);
            // Animasi masuk
            gsap.to(img, { opacity: 1, duration: 2, y: -5 });
        }, i * 2000);
    });

    const text = "🤍🤍🤍🤍🤍🤍🤍"; // Masukkan pesan teks kamu di sini
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
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active-sec');
        sec.style.display = "none";
    });
    const target = document.getElementById(id);
    target.style.display = "flex";
    target.classList.add("active-sec");
    gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration: 1 });
    window.scrollTo(0, 0);
}
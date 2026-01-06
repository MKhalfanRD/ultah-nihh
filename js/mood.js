function changeMood(type) {
    const body = document.body;
    const msg = document.getElementById("moodMessage");
    
    const settings = {
        happy: { bg: "#2d3436", color: "#f5f5f4", t: "Melihatmu bahagia adalah alasan aku membuat web ini. ✨" },
        tired: { bg: "#1e272e", color: "#d2dae2", t: "Dunia kerja memang berat, tapi ingat ada aku di sini. Istirahatlah. 😌" },
        touched: { bg: "#2c3e50", color: "#f5f5f4", t: "Aku yang berterima kasih karena kamu sudah hadir kembali. 🤍" }
    };

    gsap.to(body, { backgroundColor: settings[type].bg, duration: 1.5 });
    msg.innerHTML = settings[type].t;
    gsap.fromTo(msg, { opacity: 0 }, { opacity: 1, duration: 1 });
}
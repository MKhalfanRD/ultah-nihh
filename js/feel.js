function feel(type) {
  const container = document.body;
  const msg = document.getElementById("message");
  
  const moods = {
    senang: {
      bg: "#e2c792", // Warna emas hangat
      color: "#2d241e",
      msg: "Melihatmu bahagia adalah hal terbaik yang pernah ada. ✨"
    },
    capek: {
      bg: "#2c3e50", // Biru gelap
      color: "#ecf0f1",
      msg: "Dunia mungkin melelahkan, tapi aku di sini. Istirahatlah. 🫂"
    },
    terharu: {
      bg: "#5c4033", // Cokelat kayu dalam
      color: "#f5f5f4",
      msg: "Terima kasih sudah memilihku untuk menemanimu. 🤍"
    }
  };

  const selected = moods[type];
  
  gsap.to(container, { backgroundColor: selected.bg, color: selected.color, duration: 1.5 });
  
  // Tampilkan pesan dengan typewriter
  msg.innerHTML = "";
  let i = 0;
  function typewriter() {
    if (i < selected.msg.length) {
      msg.innerHTML += selected.msg.charAt(i);
      i++;
      setTimeout(typewriter, 40);
    }
  }
  typewriter();
}

const allLinks = document.querySelectorAll('.nav-link');
allLinks.forEach(link => {
  gsap.to(link, { color: moods[type].color, borderColor: moods[type].color, duration: 1 });
});
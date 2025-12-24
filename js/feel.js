function feel(type) {
  const message = document.getElementById("message");

  if (type === "capek") {
    message.innerText =
      "Kalau capek, kamu nggak harus kuat sendirian. Aku di sini.";
    gsap.from(message, { opacity: 0, y: 20, duration: 1 });
  }

  if (type === "senang") {
    message.innerText =
      "Aku suka cara kamu bahagia. Senyummu selalu bikin hangat.";
    gsap.from(message, { scale: 0.9, opacity: 0, duration: 0.8 });
  }

  if (type === "terharu") {
    message.innerText =
      "Terima kasih sudah jadi kamu. Aku serius sama perasaan ini.";
    gsap.from(message, { opacity: 0, duration: 1.2 });
  }
}

function feel(type) {
  const msg = document.getElementById("message");

  if (type === "capek") {
    msg.innerText =
      "Kalau capek, kamu nggak harus kuat sendirian.\nAku di sini.";
  }

  if (type === "senang") {
    msg.innerText =
      "Aku suka cara kamu bahagia.\nSerius, itu bikin aku ikut senyum.";
  }

  if (type === "terharu") {
    msg.innerText =
      "Terima kasih sudah jadi kamu.\nDan terima kasih sudah ada.";
  }

  gsap.from(msg, { opacity: 0, y: 20, duration: 1 });
}

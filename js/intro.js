async function startIntroFlow() {
  const intro = document.getElementById("intro");
  const el = document.getElementById("introText");
  intro.classList.remove("hidden");
  gsap.to(intro, { opacity: 1, duration: 1 });

  const lines = [
    "Sembilan tahun lalu...",
    "Sebuah pertemuan yang awalnya biasa saja,",
    "Menjadi awal dari cerita paling indah dalam hidupku.",
    "Aku bersyukur kamu ada.",
    "Dan hari ini...",
    "Dunia merayakan hadirmu."
  ];

  for (let line of lines) {
    el.innerHTML = line;
    await gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2 });
    await new Promise(r => setTimeout(r, 2000));
    await gsap.to(el, { opacity: 0, y: -20, duration: 0.8 });
  }

  showMain();
}
async function startIntroFlow() {
    const el = document.getElementById("introText");
    const lines = [
        "Tiga tahun sekelas di SMP...",
        "Kita hanya dua orang yang sebatas tahu nama.",
        "Lalu 9 tahun berlalu tanpa suara.",
        "Siapa sangka...",
        "Saat kita mulai mengejar mimpi masing-masing,",
        "Gravitasi membawa kita kembali bertemu.",
        "Dan kali ini, rasanya berbeda."
    ];

    for (let line of lines) {
        el.innerHTML = line;
        await gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2 });
        await new Promise(r => setTimeout(r, 2500));
        await gsap.to(el, { opacity: 0, y: -20, duration: 0.8 });
    }
    
    // Auto scroll ke Main Section setelah intro
    document.getElementById("birthday").scrollIntoView({ behavior: 'smooth' });
}
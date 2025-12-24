function isBirthday() {
  const now = new Date();
  return now.getDate() === 18 && now.getMonth() === 0;
}

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("opened")) {
    document.getElementById("intro").classList.remove("hidden");
    startIntro();
    localStorage.setItem("opened", "true");
  } else {
    showMain();
  }

  if (isBirthday()) {
    document.getElementById("bgMusic").play().catch(()=>{});
  }
});

function showMain() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("main").classList.remove("hidden");
}

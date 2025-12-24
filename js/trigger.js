function isBirthday() {
  const now = new Date();
  return now.getDate() === 18 && now.getMonth() === 0;
}

if (isBirthday()) {
  document.body.style.background =
    "radial-gradient(circle at top, #5c4033, #3b2f2f)";
}

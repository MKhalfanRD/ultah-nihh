function playVoice() {
  const v = new Audio("assets/audio/voice.mp3");
  v.volume = 0.9;
  v.play().catch(()=>{});
}

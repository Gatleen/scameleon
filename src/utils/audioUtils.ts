export const playAudio = (url: string) => {
  const audio = new Audio(url);
  audio
    .play()
    .catch((e) =>
      console.log("Audio play failed (user interaction needed first):", e)
    );
  return audio;
};

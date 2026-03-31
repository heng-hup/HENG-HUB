export const exec = (text) => {
  const url = `https://translate.google.com/?text=${encodeURIComponent(text)}&op=translate`;
  window.open(url, '_blank');
};

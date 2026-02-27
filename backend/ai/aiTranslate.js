export async function translateText(text, language) {
  const translations = {
    en: "Hello from HENG!",
    th: "สวัสดีจาก HENG!",
    jp: "HENG からこんにちは！",
  };
  return translations[language] || text;
}
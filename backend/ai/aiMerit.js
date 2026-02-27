// heng/backend/ai/aiMerit.js

export function analyzeMerit(actions = []) {
  let merit = 0;
  let energy = 50;

  actions.forEach((act) => {
    switch (act.type) {
      case "donate":
        merit += act.amount * 2;
        energy += 10;
        break;
      case "help":
        merit += 5;
        energy += 5;
        break;
      case "share":
        merit += 3;
        energy += 2;
        break;
      case "negative":
        merit -= 5;
        energy -= 10;
        break;
      default:
        merit += 1;
    }
  });

  return {
    meritScore: merit,
    energyLevel: Math.min(100, energy),
    rank:
      merit > 100
        ? "💎 HENG LEGEND"
        : merit > 50
        ? "🔥 HENG STAR"
        : merit > 20
        ? "💫 HENG ACTIVE"
        : "🌱 BEGINNER",
  };
}

// ✅ เพิ่ม alias function เพื่อให้ชื่อ calculateMerit ใช้ได้ด้วย
export const calculateMerit = analyzeMerit;
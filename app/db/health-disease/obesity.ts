import { of, delay } from "rxjs";

const data = [
  {
    title: "1. 健康问题：",
    content:
      "肥胖与多种健康问题相关，包括心血管疾病、高血压、糖尿病、关节问题、脂肪肝等。长期处于肥胖状态可能增加患这些疾病的风险。",
  },
  {
    title: "2. 代谢紊乱：",
    content:
      "肥胖可能导致代谢紊乱，包括胰岛素抵抗和脂质代谢异常。这可能导致体重管理困难、能量平衡失调和其他潜在的健康问题。",
  },
  {
    title: "3. 脊柱负担：",
    content:
      "肥胖增加了脊柱的负担，特别是腰椎部位。这可能导致腰痛、脊柱问题和运动受限。",
  },
  {
    title: "4. 心理健康问题：",
    content:
      "肥胖可能对个人的心理健康产生负面影响，包括自尊心下降、抑郁和焦虑等。",
  },
];

const op_data = [
  {
    content:
      "健康饮食：保持均衡的饮食，包括摄入足够的蔬菜、水果、全谷物、蛋白质和健康脂肪，避免过多的加工食品和高糖饮料。",
  },
  {
    content:
      "控制食量：注意食物摄入量，避免过度进食和暴饮暴食。尽量遵循适量的饮食原则。",
  },
  {
    content:
      "规律运动：定期进行身体活动，包括有氧运动和力量训练，以增加能量消耗和促进新陈代谢。",
  },
  {
    content: "休息和放松：确保有足够的休息时间和睡眠，维护身体的平衡和健康。",
  },
  {
    content: "身体姿势：保持正确的坐姿，避免长时间保持不良的姿势。",
  },
  {
    content:
      "心理健康护理：关注心理健康，应对压力和情绪问题，寻求必要的支持和帮助。",
  },
];

export const getObesityData = () => {
  return of({ data, op_data }).pipe(delay(20));
};
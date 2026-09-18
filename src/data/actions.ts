import { GameAction } from "@/types/game";
export const actions: GameAction[] = [
  { id: "hunt", name: "사냥", description: "숲 가장자리의 뿔토끼를 추적합니다.", icon: "✧", skill: "combat", baseXp: 24, baseGold: 12, color: "#f07a68" },
  { id: "mine", name: "채광", description: "루미르 광맥의 균열을 살피고 광석을 캡니다.", icon: "◈", skill: "mining", baseXp: 22, baseGold: 10, color: "#8f9de8" },
  { id: "log", name: "벌목", description: "바람을 읽어 오래된 풍결목을 쓰러뜨립니다.", icon: "♣", skill: "logging", baseXp: 20, baseGold: 9, color: "#78c18b" },
  { id: "rest", name: "휴식", description: "모닥불 곁에서 숨을 고르고 기억을 정리합니다.", icon: "☾", baseXp: 8, baseGold: 0, color: "#d0a7f5" },
  { id: "travel", name: "마을 이동", description: "다음 용맥으로 이어지는 길을 걷습니다.", icon: "➜", baseXp: 0, baseGold: -5, color: "#eabf6d" },
  { id: "investigate", name: "드래곤 조사", description: "등불상 하르가와 에온의 흔적을 관찰합니다.", icon: "◉", baseXp: 30, baseGold: 0, color: "#ff9a5a" },
];

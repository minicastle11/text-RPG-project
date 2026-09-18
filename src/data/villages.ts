import { Village } from "@/types/game";
export const villages: Village[] = [
  { id: "lumir", name: "루미르 변경마을", region: "V01 · 원룡의 안전권", description: "잠든 원룡 에온의 박동이 닿는 작은 마을. 모든 기록은 이곳의 우물에서 시작된다.", accent: "#61d5c6", icon: "⌂" },
  { id: "emberfall", name: "엠버폴", region: "V06 · 염룡 라그하트", description: "불꽃과 욕망이 공존하는 교역 마을. 등불상 하르가가 여행자의 선택을 지켜본다.", accent: "#ff8b5c", icon: "♨", unlockText: "루미르에서 3번 행동하면 이동할 수 있습니다." },
];
export const getVillage = (id: Village["id"]) => villages.find((village) => village.id === id) ?? villages[0];

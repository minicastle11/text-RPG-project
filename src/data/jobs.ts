import { Job } from "@/types/game";
export const jobs: Job[] = [
  { id: "adventurer", name: "모험가", tagline: "어떤 길도 기록으로 바꾸는 사람", icon: "✦", favoredSkill: "gathering", bonus: "모든 행동의 경험치 +5%" },
  { id: "warrior", name: "전사", tagline: "위험 앞에 먼저 서는 수호자", icon: "⚔", favoredSkill: "combat", bonus: "사냥 성공 시 HP 회복 +4" },
  { id: "miner", name: "광부", tagline: "땅속의 기억을 읽는 사람", icon: "◆", favoredSkill: "mining", bonus: "채광 재료 획득 +1" },
  { id: "lumberjack", name: "벌목꾼", tagline: "숲과 함께 길을 내는 사람", icon: "♣", favoredSkill: "logging", bonus: "벌목 숙련도 획득 +2" },
];
export const getJob = (id: Job["id"]) => jobs.find((job) => job.id === id) ?? jobs[0];

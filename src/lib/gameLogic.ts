import { ActionId, GameState, LogEntry } from "@/types/game";
import { actions } from "@/data/actions";
import { getJob } from "@/data/jobs";
export const STORAGE_KEY = "dragon-text-rpg-save-v1";
export const initialState: GameState = { name: "이름 없는 견습", level: 1, experience: 0, hp: 72, maxHp: 72, gold: 86, villageId: "lumir", jobId: "adventurer", skills: { combat: 8, mining: 5, logging: 5, gathering: 10 }, materials: { "기억 조각": 0, "붉은 광석": 0, "풍결목": 0, "약초": 0 }, dragonAffinity: 0, dragonUnlocked: false, log: [{ id: 1, text: "루미르의 우물에서 낮은 심장박동이 들려옵니다.", type: "story", time: "방금 전" }] };
const now = () => new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
const makeLog = (text: string, type: LogEntry["type"] = "story"): LogEntry => ({ id: Date.now() + Math.random(), text, type, time: now() });
export function performAction(state: GameState, actionId: ActionId): GameState {
  const action = actions.find((item) => item.id === actionId); if (!action) return state;
  const next = structuredClone(state) as GameState; const job = getJob(state.jobId); const skillId = action.skill; const skillLevel = skillId ? state.skills[skillId] : 0;
  const skillGain = skillId ? (job.favoredSkill === skillId ? 3 : 2) : 0; const xpGain = Math.round(action.baseXp * (job.id === "adventurer" ? 1.05 : 1)); next.experience += xpGain; next.gold = Math.max(0, next.gold + action.baseGold);
  if (skillId) next.skills[skillId] = Math.min(100, skillLevel + skillGain); if (actionId === "rest") next.hp = Math.min(next.maxHp, next.hp + 22);
  if (actionId === "hunt") { next.hp = Math.max(1, next.hp - Math.max(2, 10 - Math.floor(skillLevel / 12))); next.materials["약초"] += 1; }
  if (actionId === "mine") next.materials["붉은 광석"] += 1 + (job.id === "miner" ? 1 : 0); if (actionId === "log") next.materials["풍결목"] += 1;
  if (actionId === "investigate") { next.materials["기억 조각"] += 1; next.dragonAffinity = Math.min(100, next.dragonAffinity + 8); }
  if (actionId === "travel") next.villageId = state.villageId === "lumir" ? "emberfall" : "lumir";
  while (next.experience >= next.level * 100) { next.experience -= next.level * 100; next.level += 1; next.maxHp += 8; next.hp = next.maxHp; } if (next.dragonAffinity >= 80) next.dragonUnlocked = true;
  const messages: Record<ActionId, string> = { hunt: `뿔토끼의 흔적을 따라 사냥에 성공했습니다. 약초 1개와 ${xpGain} 경험치를 얻었습니다.`, mine: `균열의 박자를 맞췄습니다. 붉은 광석을 캐내고 ${xpGain} 경험치를 얻었습니다.`, log: "나무는 계곡 쪽으로 조용히 쓰러졌습니다. 풍결목을 얻었습니다.", rest: "모닥불이 흐트러진 호흡을 가라앉혔습니다. HP가 회복되었습니다.", travel: `길 위에서 새로운 용맥의 냄새가 납니다. ${next.villageId === "emberfall" ? "엠버폴" : "루미르"}에 도착했습니다.`, investigate: "하르가의 불꽃이 당신의 손을 비췄습니다. 라그하트의 관심도가 올랐습니다." };
  next.log = [makeLog(messages[actionId], actionId === "travel" ? "travel" : actionId === "rest" ? "story" : "reward"), ...state.log].slice(0, 12); return next;
}
export function saveGame(state: GameState) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
export function loadGame(): GameState | null { try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as GameState : null; } catch { return null; } }
export function resetGame() { localStorage.removeItem(STORAGE_KEY); }

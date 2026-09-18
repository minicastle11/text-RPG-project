export type VillageId = "lumir" | "emberfall";
export type JobId = "adventurer" | "warrior" | "miner" | "lumberjack";
export type SkillId = "combat" | "mining" | "logging" | "gathering";
export type ActionId = "hunt" | "mine" | "log" | "rest" | "travel" | "investigate";
export interface Village { id: VillageId; name: string; region: string; description: string; accent: string; icon: string; unlockText?: string; }
export interface Job { id: JobId; name: string; tagline: string; icon: string; favoredSkill: SkillId; bonus: string; }
export interface GameAction { id: ActionId; name: string; description: string; icon: string; skill?: SkillId; baseXp: number; baseGold: number; color: string; }
export interface Skill { id: SkillId; name: string; description: string; icon: string; }
export interface LogEntry { id: number; text: string; type: "story" | "reward" | "warning" | "travel"; time: string; }
export interface GameState { name: string; level: number; experience: number; hp: number; maxHp: number; gold: number; villageId: VillageId; jobId: JobId; skills: Record<SkillId, number>; materials: Record<string, number>; dragonAffinity: number; dragonUnlocked: boolean; log: LogEntry[]; }

"use client";
import { useEffect, useState } from "react";
import { ActionId, GameState } from "@/types/game";
import { initialState, loadGame, performAction, resetGame, saveGame } from "@/lib/gameLogic";
import { getVillage } from "@/data/villages";
import StatusPanel from "@/components/StatusPanel";
import ActionPanel from "@/components/ActionPanel";
import LogPanel from "@/components/LogPanel";
import VillagePanel from "@/components/VillagePanel";

export default function Home() {
  const [state, setState] = useState<GameState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setState(loadGame() ?? initialState); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) saveGame(state); }, [state, hydrated]);
  const act = (id: ActionId) => setState((current) => performAction(current, id));
  const handleReset = () => { if (window.confirm("모든 기록을 초기화할까요?")) { resetGame(); setState(initialState); } };
  const village = getVillage(state.villageId);
  return <main className="game-shell"><header className="topbar"><div className="brand"><div className="brand-mark">✦</div><div><span>ETHER CHRONICLE</span><h1>용맥의 기록</h1></div></div><div className="story-status"><span className="status-dot" /> 제1막 · 작은 선택의 흔적</div><button className="reset-button" onClick={handleReset}>↻ 새 기록</button></header><div className="hero"><div><div className="eyebrow">A TEXT-BASED 2D RPG PROTOTYPE</div><h2>{village.name}<span>에서 시작되는 이야기</span></h2><p>{village.description}</p></div><div className="hero-symbol">{village.icon}</div></div><div className="game-layout"><aside><StatusPanel state={state} /><VillagePanel state={state} /></aside><section className="main-column"><ActionPanel state={state} onAction={act} /><LogPanel logs={state.log} /></section></div><footer><span>LOCAL SAVE · 브라우저에 자동 저장됩니다</span><span>DRAGON-TEXT-RPG / VERTICAL PROTOTYPE</span></footer></main>;
}

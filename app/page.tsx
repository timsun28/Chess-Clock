"use client";

import { useRef, useState } from "react";

import Timer from "@/components/Timer";
import GameTypeSelection from "@/components/GameTypeSelection";
import PlayerInput from "@/components/PlayerInput";
import AdditionInput from "@/components/AdditionInput";
import DelayInput from "@/components/DelayInput";

import { PauseCircle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export type Player = "player1" | "player2";
export type GameType = "fischerBlitz" | "delayBullet" | "fischer" | "fischerRapid" | "tournament";

export type GameState = {
  player1: number;
  player2: number;
  addition: number;
  delay: number;
  active: Player | undefined;
  setup: boolean;
  selectedGameType: GameType;
};

export default function App() {
  const initialState: GameState = {
    player1: 300,
    player2: 300,
    addition: 5,
    delay: 0,
    active: undefined as Player | undefined,
    setup: true,
    selectedGameType: "fischer" as GameType,
  };

  const [gameState, setGameState] = useState<GameState>(initialState);
  const currentDelay = useRef(0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();

  function click(player: Player) {
    if (gameState.setup) {
      return;
    }

    if (!gameState.active) {
      // First Round (no active players)
      const firstActivePlayer = player === "player1" ? "player2" : "player1";
      setGameState((prevState) => ({ ...prevState, active: firstActivePlayer }));
      currentDelay.current = gameState.delay;
      const newIntervalID = setInterval(() => tick(firstActivePlayer), 1000);
      setIntervalID(newIntervalID);
      return;
    }

    // Prevent action if it's not their turn
    if (player !== gameState.active) {
      return;
    }

    clearInterval(intervalID);
    const newActive = gameState.active === "player1" ? "player2" : "player1";
    setGameState((prevState) => ({
      ...prevState,
      active: newActive,
      [player]: prevState[player] + prevState.addition,
    }));
    currentDelay.current = gameState.delay;
    const newIntervalID = setInterval(() => tick(newActive), 1000);
    setIntervalID(newIntervalID);
  }

  function tick(player: Player) {
    if (currentDelay.current <= 0) {
      setGameState((prevState) => ({
        ...prevState,
        [player]: prevState[player] === 0 ? 0 : prevState[player] - 1,
      }));
    } else {
      currentDelay.current = currentDelay.current - 1;
    }
  }

  function setGameType(newGameType: GameType) {
    const gameTypes: {
      [Property in GameType]: { playerTime: number; addition: number; delay: number };
    } = {
      fischerBlitz: { playerTime: 300, addition: 0, delay: 0 },
      delayBullet: { playerTime: 60, addition: 0, delay: 2 },
      fischer: { playerTime: 300, addition: 5, delay: 0 },
      fischerRapid: { playerTime: 600, addition: 5, delay: 0 },
      tournament: { playerTime: 7200, addition: 5, delay: 5 },
    };
    setGameState((prevState) => ({
      ...prevState,
      player1: gameTypes[newGameType].playerTime,
      player2: gameTypes[newGameType].playerTime,
      addition: gameTypes[newGameType].addition,
      delay: gameTypes[newGameType].delay,
      selectedGameType: newGameType,
    }));
  }

  function resetGame() {
    clearInterval(intervalID);
    currentDelay.current = 0;
    setGameState({ ...initialState });
  }

  function pauseGame() {
    clearInterval(intervalID);
    currentDelay.current = 0;
    setGameState((prevState) => ({ ...prevState, active: undefined }));
  }

  return (
    <main className="max-h-svh min-h-svh overflow-y-auto bg-linear-to-b from-orange-50 via-white to-neutral-100 text-neutral-900">
      <div className="mx-auto flex min-h-svh w-full max-w-4xl flex-col px-4 pt-3 pb-4">
        <header className="mb-2 flex flex-none items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] text-orange-600 uppercase">Chess clock</p>
            <h1 className="text-xl font-semibold text-neutral-900">Keep matches moving</h1>
          </div>
          {!gameState.setup && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={resetGame} aria-label="Reset clock">
                <RotateCcw className="size-5" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
              <Button variant="outline" onClick={pauseGame} aria-label="Pause clock">
                <PauseCircle className="size-5" />
                <span className="hidden sm:inline">Pause</span>
              </Button>
            </div>
          )}
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
          <Timer
            player="player1"
            secondsLeft={gameState.player1}
            active={gameState.active}
            click={click}
          />

          {gameState.setup ? (
            <section className="flex-none rounded-3xl border border-orange-100 bg-white/80 p-3 shadow-sm backdrop-blur sm:p-5">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <GameTypeSelection
                    setGameType={setGameType}
                    selectedGameType={gameState.selectedGameType}
                  />
                </div>
                <AdditionInput addition={gameState.addition} setGameState={setGameState} />
                <DelayInput delay={gameState.delay} setGameState={setGameState} />
              </div>
              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                <PlayerInput
                  playerTitle="Player 1"
                  playerKey="player1"
                  setGameState={setGameState}
                  playerValue={gameState.player1}
                />
                <PlayerInput
                  playerTitle="Player 2"
                  playerKey="player2"
                  setGameState={setGameState}
                  playerValue={gameState.player2}
                />
              </div>
              <Button
                className="mt-5 w-full"
                onClick={() => setGameState((prevState) => ({ ...prevState, setup: false }))}
              >
                Start match
              </Button>
            </section>
          ) : (
            <div className="mx-auto flex w-full max-w-md flex-none items-center justify-center gap-3">
              <Button variant="outline" className="flex-1" onClick={resetGame}>
                <RotateCcw className="size-5" />
                Reset
              </Button>
              <Button variant="outline" className="flex-1" onClick={pauseGame}>
                <PauseCircle className="size-5" />
                Pause
              </Button>
            </div>
          )}

          <Timer
            player="player2"
            secondsLeft={gameState.player2}
            active={gameState.active}
            click={click}
          />
        </div>
      </div>
    </main>
  );
}

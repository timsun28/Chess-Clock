"use client";

import React, { useRef, useState } from "react";

import Timer from "@/components/Timer";
import GameTypeSelection from "@/components/GameTypeSelection";
import PlayerInput from "@/components/PlayerInput";
import AdditionInput from "@/components/AdditionInput";
import DelayInput from "@/components/DelayInput";

import RestoreIcon from "@mui/icons-material/Restore";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

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
    const [gameState, setGameState] = useState<GameState>({
        player1: 300,
        player2: 300,
        addition: 5,
        delay: 0,
        active: undefined as Player | undefined,
        setup: true,
        selectedGameType: "fischer" as GameType,
    });
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
        const gameTypes: { [Property in GameType]: { playerTime: number; addition: number; delay: number } } = {
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

    return (
        <div className="flex flex-col h-screen ">
            <Timer player="player1" secondsLeft={gameState.player1} active={gameState.active} click={click} />

            {gameState.setup ? (
                <div className="m-8 flex flex-col gap-4">
                    <GameTypeSelection setGameType={setGameType} selectedGameType={gameState.selectedGameType} />
                    <PlayerInput playerTitle="Player 1" setGameState={setGameState} playerValue={gameState.player1} />
                    <AdditionInput addition={gameState.addition} setGameState={setGameState} />
                    <DelayInput delay={gameState.delay} setGameState={setGameState} />
                    <PlayerInput playerTitle="Player 2" setGameState={setGameState} playerValue={gameState.player2} />
                    <button
                        className="bg-orange-500 w-full border border-gray-400 rounded-lg py-4"
                        onClick={() => setGameState((prevState) => ({ ...prevState, setup: false }))}
                    >
                        Start
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <RestoreIcon
                        className="text-7xl"
                        onClick={() => {
                            setGameState({
                                player1: 300,
                                player2: 300,
                                addition: 5,
                                delay: 0,
                                active: undefined,
                                setup: true,
                                selectedGameType: "fischer",
                            });
                            clearInterval(intervalID);
                        }}
                    />
                    <PauseCircleOutlineIcon
                        className="text-7xl"
                        onClick={() => {
                            clearInterval(intervalID);
                            setGameState((prevState) => ({ ...prevState, active: undefined }));
                        }}
                    />
                </div>
            )}

            <Timer player="player2" secondsLeft={gameState.player2} active={gameState.active} click={click} />
        </div>
    );
}

import React, { Component, useRef } from "react";

import Timer from "../components/Timer/Timer";
import GameTypeSelection from "../components/GameTypeSelection/GameTypeSelection";
import PlayerInput from "../components/PlayerInput/PlayerInput";
import AdditionInput from "../components/AdditionInput/AdditionInput";
import DelayInput from "../components/DelayInput/DelayInput";

import RestoreIcon from "@mui/icons-material/Restore";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Head from "next/head";

export type Player = "player1" | "player2";
export type GameType = "fischerBlitz" | "delayBullet" | "fischer" | "fischerRapid" | "tournament";

export default function App() {
    const [player1, setPlayer1] = React.useState(300);
    const [player2, setPlayer2] = React.useState(300);
    const [addition, setAddition] = React.useState(5);
    const [delay, setDelay] = React.useState(0);
    const currentDelay = useRef(0);
    const [active, setActive] = React.useState<Player>();
    const [setup, setSetup] = React.useState(true);
    const [selectedGameType, setSelectedGameType] = React.useState<GameType>("fischer");

    const [intervalID, setIntervalID] = React.useState<NodeJS.Timeout>();

    function click(player: Player) {
        if (setup) {
            return;
        }

        if (!active) {
            // First Round (no active players)
            const firstActivePlayer = player === "player1" ? "player2" : "player1";
            setActive(firstActivePlayer);
            currentDelay.current = delay;
            const newIntervalID = setInterval(() => tick(firstActivePlayer), 1000);
            setIntervalID(newIntervalID);
            return;
        }

        // Prevent action if it's not their turn
        if (player !== active) {
            return;
        }

        clearInterval(intervalID);
        const newActive = active === "player1" ? "player2" : "player1";
        setActive(newActive);
        if (player === "player1") {
            setPlayer1((prevState) => {
                return prevState + addition;
            });
        } else {
            setPlayer2((prevState) => {
                return prevState + addition;
            });
        }
        currentDelay.current = delay;
        const newIntervalID = setInterval(() => tick(newActive), 1000);
        setIntervalID(newIntervalID);
    }

    function tick(player: Player) {
        if (currentDelay.current <= 0) {
            if (player === "player1") {
                setPlayer1((prevState) => {
                    return prevState === 0 ? 0 : prevState - 1;
                });
            } else {
                setPlayer2((prevState) => {
                    return prevState === 0 ? 0 : prevState - 1;
                });
            }
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
        setPlayer1(gameTypes[newGameType].playerTime);
        setPlayer2(gameTypes[newGameType].playerTime);
        setAddition(gameTypes[newGameType].addition);
        setDelay(gameTypes[newGameType].delay);
        setSelectedGameType(newGameType);
    }

    return (
        <>
            <Head>
                <title key="title">Chess Clock</title>
                <meta name="description" content="Chess Clock" />
            </Head>
            <div className="flex flex-col h-screen ">
                <Timer player="player1" secondsLeft={player1} active={active} click={click} />

                {setup ? (
                    <div className="m-8 flex flex-col gap-4">
                        <GameTypeSelection setGameType={setGameType} selectedGameType={selectedGameType} />
                        <PlayerInput playerTitle="Player 1" setPlayer={setPlayer1} playerValue={player1} />
                        <AdditionInput addition={addition} setAddition={setAddition} />
                        <DelayInput delay={delay} setDelay={setDelay} />
                        <PlayerInput playerTitle="Player 2" setPlayer={setPlayer2} playerValue={player2} />
                        <button
                            className="bg-orange-500 w-full border border-gray-400 rounded-lg py-4"
                            onClick={() => setSetup(false)}
                        >
                            Start
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <RestoreIcon
                            className="text-7xl"
                            onClick={() => {
                                setPlayer1(300);
                                setPlayer2(300);
                                setSetup(true);
                                clearInterval(intervalID);
                                setActive(undefined);
                            }}
                        />
                        <PauseCircleOutlineIcon
                            className="text-7xl"
                            onClick={() => {
                                clearInterval(intervalID);
                                setActive(undefined);
                            }}
                        />
                    </div>
                )}

                <Timer player="player2" secondsLeft={player2} active={active} click={click} />
            </div>
        </>
    );
}

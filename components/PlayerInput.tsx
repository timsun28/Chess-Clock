import { Dispatch, SetStateAction } from "react";

import { GameState, Player } from "@/app/page";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function PlayerInput({
  playerTitle,
  playerKey,
  playerValue,
  setGameState,
}: {
  playerTitle: string;
  playerKey: Player;
  playerValue: number;
  setGameState: Dispatch<SetStateAction<GameState>>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={`minutes-input-${playerTitle}`}>{playerTitle} minutes</Label>
      <Input
        id={`minutes-input-${playerTitle}`}
        type="number"
        inputMode="numeric"
        min={0}
        value={playerValue / 60}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setGameState((prevState) => ({
            ...prevState,
            [playerKey]: Number.isFinite(value) ? value * 60 : prevState[playerKey],
          }));
        }}
      />
    </div>
  );
}

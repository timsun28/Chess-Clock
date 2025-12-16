import { Dispatch, SetStateAction } from "react";

import { GameState } from "@/app/page";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function DelayInput({
    delay,
    setGameState,
}: {
    delay: number;
    setGameState: Dispatch<SetStateAction<GameState>>;
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor="outlined-number-delay">Clock delay after switch (seconds)</Label>
            <Input
                id="outlined-number-delay"
                type="number"
                inputMode="numeric"
                min={0}
                value={delay}
                onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setGameState((prevState) => ({ ...prevState, delay: Number.isFinite(value) ? value : 0 }));
                }}
            />
        </div>
    );
}

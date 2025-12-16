import { Dispatch, SetStateAction } from "react";

import { GameState } from "@/app/page";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function AdditionInput({
    addition,
    setGameState,
}: {
    addition: number;
    setGameState: Dispatch<SetStateAction<GameState>>;
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor="outlined-number-addition">Seconds added per move</Label>
            <Input
                id="outlined-number-addition"
                type="number"
                inputMode="numeric"
                min={0}
                value={addition}
                onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setGameState((prevState) => ({ ...prevState, addition: Number.isFinite(value) ? value : 0 }));
                }}
            />
        </div>
    );
}

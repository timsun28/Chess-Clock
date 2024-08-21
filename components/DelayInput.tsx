import React from "react";

import { TextField } from "@mui/material";
import { GameState } from "@/app/page";

export default function DelayInput({
    delay,
    setGameState,
}: {
    delay: number;
    setGameState: (value: React.SetStateAction<GameState>) => void;
}) {
    return (
        <TextField
            id="outlined-number-delay"
            label="Clock delay after switch in seconds"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={delay}
            onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setGameState((prevState) => ({ ...prevState, delay: value ? value : 0 }));
            }}
        />
    );
}

import { TextField } from "@mui/material";
import React from "react";

interface DelayInputProps {
    delay: number;
    setDelay: (value: React.SetStateAction<number>) => void;
}

export default function DelayInput({ delay, setDelay }: DelayInputProps) {
    return (
        <>
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
                    setDelay(value ? value : 0);
                }}
            />
        </>
    );
}

import { TextField } from "@mui/material";

interface PlayerInputProps {
    playerTitle: string;
    playerValue: number;
    setPlayer: (value: React.SetStateAction<number>) => void;
}

export default function PlayerInput({ playerTitle, playerValue, setPlayer }: PlayerInputProps) {
    return (
        <TextField
            id={`minutes-input-${playerTitle}`}
            label={`${playerTitle} Minutes`}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={playerValue / 60}
            onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setPlayer(value * 60);
            }}
        />
    );
}

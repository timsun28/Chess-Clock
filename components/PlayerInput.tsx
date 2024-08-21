import { GameState } from "@/app/page";
import { TextField } from "@mui/material";

export default function PlayerInput({
    playerTitle,
    playerValue,
    setGameState,
}: {
    playerTitle: string;
    playerValue: number;
    setGameState: (value: React.SetStateAction<GameState>) => void;
}) {
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
                setGameState((prevState) => ({ ...prevState, player1: value * 60 }));
            }}
        />
    );
}

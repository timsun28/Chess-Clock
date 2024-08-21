import { GameState } from "@/app/page";
import { TextField } from "@mui/material";

export default function AdditionInput({
    addition,
    setGameState,
}: {
    addition: number;
    setGameState: (value: React.SetStateAction<GameState>) => void;
}) {
    return (
        <TextField
            id="outlined-number-addition"
            label="Additional seconds added per move"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={addition}
            onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setGameState((prevState) => ({ ...prevState, addition: value ? value : 0 }));
            }}
        />
    );
}

import { TextField } from "@mui/material";

interface AdditionInputProps {
    addition: number;
    setAddition: (value: React.SetStateAction<number>) => void;
}

export default function AdditionInput({ addition, setAddition }: AdditionInputProps) {
    return (
        <>
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
                    setAddition(value ? value : 0);
                }}
            />
        </>
    );
}

import { GameType } from "../../pages";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface GameTypeSelectionProps {
    selectedGameType: GameType;
    setGameType: (gameType: GameType) => void;
}

export default function GameTypeSelection({ selectedGameType, setGameType }: GameTypeSelectionProps) {
    const gameTypes: Array<{ key: GameType; value: string }> = [
        { key: "fischerBlitz", value: "Fischer Blitz 5|0" },
        { key: "delayBullet", value: "Delay Bullet 1|2" },
        { key: "fischer", value: "Fischer 5|5" },
        { key: "fischerRapid", value: "Fischer Rapid 10|5" },
        { key: "tournament", value: "Tournament 40/2hr, G60, 5s delay" },
    ];
    return (
        <FormControl variant="outlined" className="w-full">
            <InputLabel id="select-gametypes-label">Formats</InputLabel>
            <Select
                labelId="select-gametypes-label"
                id="select-gametypes"
                value={selectedGameType}
                onChange={(event) => setGameType(event.target.value as GameType)}
                label="Formats"
            >
                {gameTypes.map((item) => {
                    return (
                        <MenuItem key={item.key} value={item.key}>
                            {item.value}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}

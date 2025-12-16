import { GameType } from "@/app/page";

import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function GameTypeSelection({
    selectedGameType,
    setGameType,
}: {
    selectedGameType: GameType;
    setGameType: (gameType: GameType) => void;
}) {
    const gameTypes: Array<{ key: GameType; value: string }> = [
        { key: "fischerBlitz", value: "Fischer Blitz 5|0" },
        { key: "delayBullet", value: "Delay Bullet 1|2" },
        { key: "fischer", value: "Fischer 5|5" },
        { key: "fischerRapid", value: "Fischer Rapid 10|5" },
        { key: "tournament", value: "Tournament 40/2hr, G60, 5s delay" },
    ];
    const selectId = "select-gametypes";

    return (
        <div className="space-y-2">
            <Label htmlFor={selectId}>Formats</Label>
            <Select value={selectedGameType} onValueChange={(value) => setGameType(value as GameType)}>
                <SelectTrigger id={selectId} aria-label="Select game format" className="w-full justify-between">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {gameTypes.map((item) => (
                        <SelectItem key={item.key} value={item.key}>
                            {item.value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className="text-xs text-neutral-500">Pick a preset or fine-tune the numbers below.</p>
        </div>
    );
}

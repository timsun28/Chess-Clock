import { cn } from "@/lib/utils";
import { Player } from "@/app/page";

export default function Timer({
    secondsLeft,
    active,
    player,
    click,
}: {
    secondsLeft: number;
    active: Player | undefined;
    player: Player;
    click: (player: Player) => void;
}) {
    function formatTime(totalAmountOfSeconds: number) {
        const minutes = Math.floor(totalAmountOfSeconds / 60);
        const seconds = totalAmountOfSeconds % 60;
        return `${minutes} : ${seconds.toString().padStart(2, "0")}`;
    }
    const isActive = active === player;

    return (
        <button
            type="button"
            onClick={() => click(player)}
            className={cn(
                "flex h-full min-h-0 flex-1 items-center justify-center rounded-3xl border px-3 text-4xl font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 sm:min-h-[28vh] sm:px-4 sm:text-6xl",
                isActive
                    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-white/80 text-neutral-800 shadow-sm",
                player === "player1" && "rotate-180",
            )}
        >
            <span className="tabular-nums">{formatTime(secondsLeft)}</span>
        </button>
    );
}

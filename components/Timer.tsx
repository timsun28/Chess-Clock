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
    return (
        <div
            onClick={() => click(player)}
            className={`flex items-center text-6xl justify-center h-full  ${
                active === player ? "bg-orange-500" : "bg-gray-400"
            } ${player === "player1" && "rotate-180"}`}
        >
            {formatTime(secondsLeft)}
        </div>
    );
}

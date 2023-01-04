import { Player } from "../../pages";

interface TimerProps {
    secondsLeft: number;
    active: Player;
    player: Player;
    click: (player: string) => void;
}

export default function Timer({ secondsLeft, active, player, click }: TimerProps) {
    function formatTime(totalAmountOfSeconds: number) {
        const minutes = Math.floor(totalAmountOfSeconds / 60);
        const seconds = totalAmountOfSeconds % 60;
        return `${minutes} : ${seconds.toString().padStart(2, "0")}`;
    }
    return (
        <div
            onClick={() => click(player)}
            className={`flex items-center justify-center h-full  ${
                active === player ? "bg-orange-500" : "bg-gray-400"
            } ${player === "player1" && "rotate-180"}`}
        >
            {formatTime(secondsLeft)}
        </div>
    );
}

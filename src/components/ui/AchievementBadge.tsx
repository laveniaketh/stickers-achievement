import StickerMedal from "@/assets/sticker-medal.png"
import { cn } from "@/lib/utils";
import type { AchievementBadgeProps } from "@/types";

const AchievementBadge = ({ className, children }: AchievementBadgeProps) => {
    return (
        <div className="flex items-center gap-3 justify-center ">
            <img
                src={StickerMedal}
                alt="medal"
                className="absolute -left-4 -top-1 w-14 h-14 md:w-18 md:h-18 z-20 drop-shadow-md -rotate-12 "
            />
            <div className={cn([
                "flex flex-col items-center text-center justify-center cursor-pointer",
                "h-16 w-2xs px-2 py-1 md:h-18 md:w-xl md:px-6 md:py-2",
                "bg-action border-border-strong text-action-text shadow-card",
                "font-arcade font-semibold rounded-full border-2 tracking-tighter transition-[transform,box-shadow] duration-100 ease-in active:translate-x-1 active:translate-y-1 active:shadow-none",
                className,
            ])}>
                <span className="text-[0.3rem] md:text-[0.6rem] font-md opacity-70 tracking-tighter uppercase">Achievement Unlocked</span>
                <span className="text-[0.6rem] md:text-[1.2rem] mt-1 md:mt-2 ">{children}</span>
            </div>
        </div>
    )
}

export default AchievementBadge
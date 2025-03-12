import {ArrowRightIcon} from "@radix-ui/react-icons";
import {ComponentPropsWithoutRef, ReactNode, useState} from "react";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Info} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
    className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
    name: string;
    className: string;
    background: ReactNode;
    description: string;
    category: string;
    tooltip: string;
    href: string;
    cta: string;
}

const BentoGrid = ({children, className, ...props}: BentoGridProps) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
                       name,
                       className,
                       background,
                       description,
                       category,
                       tooltip,
                       href,
                       cta,
                       ...props
                   }: BentoCardProps) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipTimer, setTooltipTimer] = useState<NodeJS.Timeout | null>(null);

    const handleTooltipClick = () => {
        setTooltipVisible(!isTooltipVisible);
    };

    const handleMouseEnter = () => {
        const timer = setTimeout(() => {
            setTooltipVisible(true);
        }, 300);
        setTooltipTimer(timer);
    };

    const handleMouseLeave = () => {
        if (tooltipTimer) {
            clearTimeout(tooltipTimer);
            setTooltipTimer(null);
        }
        setTooltipVisible(false);
    };

    return (
        <div
            key={name}
            className={cn(
                "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                className,
            )}
            {...props}
        >
            <div>{background}</div>
            <div className="absolute p-3 flex flex-wrap w-full justify-between items-center z-10">
                <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-white/70">
                        {(category || "").toUpperCase()}
                    </p>
                    <p className="text-4xl font-semibold text-white">
                        {name}
                    </p>
                </div>
                {tooltip && (
                    <div className="mr-3">
                        <TooltipProvider>
                            <Tooltip open={isTooltipVisible}>
                                <TooltipTrigger
                                    onClick={handleTooltipClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Info color="#BBBBBB"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )}
            </div>
            <div
                className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
                <p className="max-w-lg text-white/90">{description}</p>
            </div>

            <div
                className={cn(
                    "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
                )}
            >
                <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
                    <a href={href} className="text-white/90">
                        {cta}
                        <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180"/>
                    </a>
                </Button>
            </div>
            <div
                className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] dark:group-hover:bg-neutral-800/10"/>
        </div>
    );
};

export {BentoCard, BentoGrid};

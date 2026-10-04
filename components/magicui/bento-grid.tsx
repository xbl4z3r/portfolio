import {ComponentPropsWithoutRef, ReactNode, useState} from "react";
import {cn} from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
    className?: string;
}

const BentoGrid = ({children, className, ...props}: BentoGridProps) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export {BentoGrid};

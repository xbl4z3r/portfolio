"use client";

import { cn } from "@/lib/utils";
import React, { MouseEvent, useEffect, useState, useRef } from "react";

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: number;
}

export const RippleButton = React.forwardRef<
  HTMLButtonElement,
  RippleButtonProps
>(
  (
    {
      className,
      children,
      rippleColor = "#ffffff",
      duration = 600,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; id: number }>
    >([]);

    const nextId = useRef(0);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    };

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const id = nextId.current++;

      // Limit total ripples to prevent performance issues
      setButtonRipples(prev => {
        const newRipples = [...prev, { x, y, size, id }];
        return newRipples.slice(-10); // Keep only the last 10 ripples
      });

      // Schedule removal
      setTimeout(() => {
        setButtonRipples(prev => prev.filter(ripple => ripple.id !== id));
      }, duration + 50); // Small buffer to ensure animation completes
    };

    return (
      <button
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 bg-background px-4 py-2 text-center text-primary",
          className,
        )}
        onClick={handleClick}
        ref={(el) => {
          // Handle both forwarded ref and local ref
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
          buttonRef.current = el;
        }}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full opacity-30"
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                animation: `rippleButton ${duration}ms linear forwards`,
                pointerEvents: "none",
              }}
            />
          ))}
        </span>
      </button>
    );
  },
);

RippleButton.displayName = "RippleButton";
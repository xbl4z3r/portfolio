"use client"

import { cn } from "@/lib/utils"
import React, { useState, useEffect, useRef } from "react"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  colors?: string[]
  className?: string
}

interface MeteorStyle extends React.CSSProperties {
  originalColor?: string
  animationDuration?: string
  animationDelay?: string
}

function MeteorsComponent({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 120,
  colors = ["#ffffff"],
  className,
}: MeteorsProps) {
  const [meteorStyles, setMeteorStyles] = useState<MeteorStyle[]>([])
  const initializedRef = useRef<boolean>(false)
  const [meteorCount, setMeteorCount] = useState(number)
  const [opacity, setOpacity] = useState(0)
  const prevNumberRef = useRef<number>(0)
  const pendingUpdates = useRef<number[]>([])
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  let defaultColors = true
  colors.forEach((color) => {
    if (color != "#000000") defaultColors = false
  })
  const isUsingDefaultColors = defaultColors

  useEffect(() => {
    if (isUsingDefaultColors) return
    const timer = setTimeout(() => {
      setOpacity(1)
    }, 100)
    return () => clearTimeout(timer)
  }, [isUsingDefaultColors])

  useEffect(() => {
    const updateMeteorCount = () => {
      const width = window.innerWidth
      const baseCount = number

      if (width < 640) {
        // Mobile
        setMeteorCount(Math.floor(baseCount * 0.5))
      } else if (width < 1024) {
        // Tablet
        setMeteorCount(Math.floor(baseCount * 0.75))
      } else {
        // Desktop
        setMeteorCount(baseCount)
      }
    }

    updateMeteorCount()
    window.addEventListener("resize", updateMeteorCount)
    return () => window.removeEventListener("resize", updateMeteorCount)
  }, [number])

  const createMeteorStyle = (useColors: string[]): MeteorStyle => {
    const color = useColors[Math.floor(Math.random() * useColors.length)]
    return {
      "--angle": angle + "deg",
      position: "absolute",
      transform: `rotate(${angle}deg)`,
      top: `${Math.floor((Math.random() - 0.1) * 50)}%`,
      left: `${Math.floor((Math.random() - 0.5) * 200)}%`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * 2 * (maxDuration - minDuration) + minDuration) + "s",
      backgroundColor: color,
      boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
      originalColor: color,
      willChange: "transform, opacity",
    } as MeteorStyle
  }

  const scheduleMeteorUpdate = (idx: number) => {
    pendingUpdates.current.push(idx)
    if (!updateTimeoutRef.current) {
      updateTimeoutRef.current = setTimeout(() => {
        if (pendingUpdates.current.length > 0) {
          const newStyles = pendingUpdates.current.map(() => createMeteorStyle(colors))

          setMeteorStyles((prev) => {
            const updatedStyles = [...prev]
            pendingUpdates.current.forEach((i, index) => {
              updatedStyles[i] = newStyles[index]
            })
            return updatedStyles
          })

          pendingUpdates.current = []
        }
        updateTimeoutRef.current = null
      }, 50)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined" || isUsingDefaultColors) return

    if (!initializedRef.current) {
      setMeteorStyles(Array.from({ length: meteorCount }, () => createMeteorStyle(colors)))
      prevNumberRef.current = meteorCount
      initializedRef.current = true
      return
    }

    if (meteorCount > prevNumberRef.current) {
      const newMeteors = Array.from({ length: meteorCount - prevNumberRef.current }, () =>
        createMeteorStyle(colors)
      )
      setMeteorStyles((prev) => [...prev, ...newMeteors])
    } else if (meteorCount < prevNumberRef.current) {
      setMeteorStyles((prev) => prev.slice(0, meteorCount))
    }
    prevNumberRef.current = meteorCount
  }, [meteorCount, colors, isUsingDefaultColors])

  if (defaultColors) return <></>

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        opacity: opacity,
        transition: "opacity 3s ease-in-out",
      }}
    >
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={
            {
              ...style,
              "--meteor-delay": style?.animationDelay || "0s",
              "--meteor-duration": style?.animationDuration || "0s",
            } as React.CSSProperties
          }
          onAnimationIteration={() => scheduleMeteorUpdate(idx)}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-[var(--angle)] animate-meteor rounded-full",
            className
          )}
        >
          <div
            className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2"
            style={{
              background: `linear-gradient(to right, ${style?.backgroundColor || "#000000"}, transparent)`,
            }}
          />
        </span>
      ))}
    </div>
  )
}

export const Meteors = React.memo(MeteorsComponent)

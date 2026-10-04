import React from "react"
import { cn } from "@/lib/utils"

export const FeatureCard = ({
  name,
  className,
  background,
  description,
  icon,
}: {
  name: string
  className: string
  background: React.ReactNode
  description: string
  icon: React.ReactNode
}) => {
  return (
    <div
      key={name}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-8 min-h-[220px]",
        "bg-card/50 backdrop-blur-sm border border-border/60 hover:border-purple-500/40",
        "shadow-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300",
        className
      )}
    >
      <div className="absolute inset-0 pointer-events-none">{background}</div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">{name}</h3>
        </div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-purple-500/5 to-transparent" />
    </div>
  )
}

"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, Sparkles, X, Volume2, Monitor, Eye, Zap, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

const KONAMI_CODE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
]

export const EasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [crtEnabled, setCrtEnabled] = useState(false)
  const [matrixEnabled, setMatrixEnabled] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const getAudioContext = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return null
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume()
      }
      return audioCtxRef.current
    } catch {
      return null
    }
  }, [])

  // Web Audio 8-bit sound synthesizers
  const playSfx = useCallback(
    (type: "coin" | "laser" | "jump" | "powerup" | "fanfare") => {
      const ctx = getAudioContext()
      if (!ctx) return
      const now = ctx.currentTime

      if (type === "coin") {
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = "sine"
        osc2.type = "square"
        osc1.frequency.setValueAtTime(987.77, now) // B5
        osc2.frequency.setValueAtTime(1318.51, now + 0.08) // E6

        gain.gain.setValueAtTime(0.12, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start(now)
        osc1.stop(now + 0.08)
        osc2.start(now + 0.08)
        osc2.stop(now + 0.35)
      } else if (type === "laser") {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(880, now)
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.15)

        gain.gain.setValueAtTime(0.15, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now)
        osc.stop(now + 0.15)
      } else if (type === "jump") {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = "square"
        osc.frequency.setValueAtTime(150, now)
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.18)

        gain.gain.setValueAtTime(0.12, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now)
        osc.stop(now + 0.18)
      } else if (type === "powerup") {
        const notes = [330, 392, 659, 523, 587, 784]
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()

          osc.type = "triangle"
          osc.frequency.setValueAtTime(freq, now + idx * 0.06)

          gain.gain.setValueAtTime(0.12, now + idx * 0.06)
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.1)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now + idx * 0.06)
          osc.stop(now + idx * 0.06 + 0.1)
        })
      } else if (type === "fanfare") {
        const melody = [523.25, 659.25, 783.99, 1046.5]
        melody.forEach((freq, idx) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()

          osc.type = "square"
          osc.frequency.setValueAtTime(freq, now + idx * 0.09)

          gain.gain.setValueAtTime(0.1, now + idx * 0.09)
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.2)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now + idx * 0.09)
          osc.stop(now + idx * 0.09 + 0.2)
        })
      }
    },
    [getAudioContext]
  )

  // Matrix Digital Rain effect
  useEffect(() => {
    if (!matrixEnabled) return
    const canvas = matrixCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = "0123456789ABCDEF<>/*+=-_~$#"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#1db954"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [matrixEnabled])

  // Konami code detection
  useEffect(() => {
    let sequence: string[] = []

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === "input" || tag === "textarea") return

      const key = e.key.toLowerCase()
      sequence = [...sequence, key].slice(-KONAMI_CODE.length)
      if (
        sequence.length === KONAMI_CODE.length &&
        sequence.every((k, i) => k === KONAMI_CODE[i])
      ) {
        setIsOpen(true)
        playSfx("fanfare")
        sequence = []
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [playSfx])

  return (
    <>
      {/* Global CRT Scanlines Overlay */}
      {crtEnabled && (
        <div
          className="pointer-events-none fixed inset-0 z-[100] opacity-50 bg-[repeating-linear-gradient(rgba(0,0,0,0)_0px,rgba(0,0,0,0)_2px,rgba(0,0,0,0.35)_3px,rgba(0,0,0,0.35)_4px)]"
          style={{ mixBlendMode: "overlay" }}
        />
      )}

      {/* Global Matrix Rain Canvas Overlay */}
      {matrixEnabled && (
        <canvas
          ref={matrixCanvasRef}
          className="pointer-events-none fixed inset-0 z-[99] opacity-40"
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 p-5 sm:p-6 shadow-2xl backdrop-blur-xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header Glow */}
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

              {/* Title Row */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    <Gamepad2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
                      Arcade Cheat Deck
                      <Sparkles className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-400">↑ ↑ ↓ ↓ ← → ← → B A</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close cheat deck"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Interactive Soundboard */}
              <div className="py-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Volume2 className="h-3.5 w-3.5 text-emerald-400" /> 8-Bit Web Audio Synthesizer
                  </span>
                  <span className="text-[10px] text-zinc-500">Live Synthesis</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => playSfx("coin")}
                    className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-xs font-mono font-medium text-white transition-all flex flex-col items-center gap-1 active:scale-95"
                  >
                    <span>🪙 Coin</span>
                  </button>
                  <button
                    onClick={() => playSfx("laser")}
                    className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-xs font-mono font-medium text-white transition-all flex flex-col items-center gap-1 active:scale-95"
                  >
                    <span>⚡ Laser</span>
                  </button>
                  <button
                    onClick={() => playSfx("jump")}
                    className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-xs font-mono font-medium text-white transition-all flex flex-col items-center gap-1 active:scale-95"
                  >
                    <span>🚀 Jump</span>
                  </button>
                  <button
                    onClick={() => playSfx("powerup")}
                    className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-xs font-mono font-medium text-white transition-all flex flex-col items-center gap-1 active:scale-95"
                  >
                    <span>⭐ Powerup</span>
                  </button>
                  <button
                    onClick={() => playSfx("fanfare")}
                    className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-xs font-mono font-medium text-white transition-all flex flex-col items-center gap-1 active:scale-95 col-span-2"
                  >
                    <span>🏆 1-Up Fanfare</span>
                  </button>
                </div>
              </div>

              {/* Visual Environment Toggles */}
              <div className="py-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Monitor className="h-3.5 w-3.5 text-cyan-400" /> Visual Overlays
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setCrtEnabled(!crtEnabled)
                      playSfx("laser")
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${
                      crtEnabled
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-sm"
                        : "border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400"
                    }`}
                  >
                    <span>📺 CRT Scanlines</span>
                    <span className="text-[10px] font-bold">{crtEnabled ? "ON" : "OFF"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setMatrixEnabled(!matrixEnabled)
                      playSfx("coin")
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${
                      matrixEnabled
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-sm"
                        : "border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400"
                    }`}
                  >
                    <span>🟩 Matrix Rain</span>
                    <span className="text-[10px] font-bold">{matrixEnabled ? "ON" : "OFF"}</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <Button
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-xs bg-white/15 hover:bg-white/25 text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export const EasterEggTrigger = () => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    const keys = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ]
    keys.forEach((key, index) => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key }))
      }, index * 20)
    })
    setClicked(true)
    setTimeout(() => setClicked(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      title="Arcade Cheat Menu (or press ↑↑↓↓←→←→BA)"
      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10"
    >
      <Gamepad2 className="h-3.5 w-3.5 text-emerald-400" />
      <span>{clicked ? "Unlocked!" : "Cheat Menu"}</span>
    </button>
  )
}

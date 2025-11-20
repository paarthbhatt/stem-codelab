"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, ArrowLeft, Rocket, Target, Ruler, Star, Zap, Wind } from "lucide-react"
import Link from "next/link"

const FloatingRocket = ({ delay = 0 }) => (
  <motion.div
    className="absolute text-blue-400 opacity-20"
    animate={{
      y: [-20, -150],
      x: [0, Math.random() * 80 - 40],
      rotate: [0, 15, -15, 0],
      opacity: [0.2, 0],
    }}
    transition={{
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    <Rocket className="w-8 h-8" />
  </motion.div>
)

const FloatingStar = ({ delay = 0 }) => (
  <motion.div
    className="absolute text-yellow-400 opacity-30"
    animate={{
      y: [-10, -100],
      x: [0, Math.random() * 60 - 30],
      rotate: [0, 360],
      scale: [1, 1.5, 1],
      opacity: [0.3, 0],
    }}
    transition={{
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    <Star className="w-4 h-4" />
  </motion.div>
)

const FloatingZap = ({ delay = 0 }) => (
  <motion.div
    className="absolute text-purple-400 opacity-25"
    animate={{
      y: [-15, -120],
      x: [0, Math.random() * 50 - 25],
      rotate: [0, 180],
      opacity: [0.25, 0],
    }}
    transition={{
      duration: 3.5,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    <Zap className="w-6 h-6" />
  </motion.div>
)

const ProjectileSimulation = () => {
  const canvasRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [velocity, setVelocity] = useState([50])
  const [angle, setAngle] = useState([45])
  const [gravity, setGravity] = useState([9.81])
  const [airResistance, setAirResistance] = useState(false)
  const [wind, setWind] = useState([0])
  const [trail, setTrail] = useState([])
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })
  const [stats, setStats] = useState({
    maxHeight: 0,
    range: 0,
    flightTime: 0,
    currentTime: 0,
  })

  // Simulation state refs for the animation loop
  const simStateRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    t: 0,
    active: false
  })
  const animationRef = useRef()
  const lastFrameTimeRef = useRef()

  // Constants
  const DT = 0.016 // Time step (approx 60fps)
  const SCALE = 5 // pixels per meter
  const DRAG_COEFF = 0.05 // Arbitrary drag coefficient for visual effect

  const runPreSimulation = () => {
    const v0 = velocity[0]
    const angleRad = (angle[0] * Math.PI) / 180
    const g = gravity[0]
    const windSpeed = wind[0]
    const hasDrag = airResistance

    let x = 0
    let y = 0
    let vx = v0 * Math.cos(angleRad)
    let vy = v0 * Math.sin(angleRad)
    let t = 0
    let maxY = 0

    // Run simulation until y < 0 or timeout
    while (y >= 0 && t < 20) {
      maxY = Math.max(maxY, y)

      // Forces
      let ax = 0
      let ay = -g

      if (hasDrag) {
        const v = Math.sqrt(vx * vx + vy * vy)
        ax -= DRAG_COEFF * v * vx
        ay -= DRAG_COEFF * v * vy
      }

      // Wind effect
      ax += windSpeed * 0.5

      vx += ax * DT
      vy += ay * DT
      x += vx * DT
      y += vy * DT
      t += DT
    }

    return {
      maxHeight: maxY,
      range: x,
      flightTime: t
    }
  }

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = canvas

    // Clear canvas with proper background
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1
    for (let i = 0; i < width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i < height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Draw trail
    if (trail.length > 1) {
      ctx.strokeStyle = "rgba(34, 197, 94, 0.6)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(trail[0].x, trail[0].y)
      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y)
      }
      ctx.stroke()
    }

    // Draw projectile
    const { x, y } = simStateRef.current
    const canvasX = x * SCALE
    const canvasY = height - 50 - y * SCALE

    if (canvasY <= height - 50 && canvasX >= -100 && canvasX <= width + 100) {
      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.arc(canvasX + 50, canvasY, 8, 0, 2 * Math.PI)
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = "#ef4444"
      ctx.shadowBlur = 20
      ctx.fill()
      ctx.shadowBlur = 0
    }

    // Draw ground
    ctx.fillStyle = "rgba(34, 197, 94, 0.3)"
    ctx.fillRect(0, height - 50, width, 50)

    // Draw launcher
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(40, height - 60, 20, 20)

    // Draw angle indicator
    if (!isPlaying) {
      const angleRad = (angle[0] * Math.PI) / 180
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 3
      const launchX = 50
      const launchY = height - 50
      const indicatorLength = 40
      const indicatorX = launchX + Math.cos(angleRad) * indicatorLength
      const indicatorY = launchY - Math.sin(angleRad) * indicatorLength

      ctx.beginPath()
      ctx.moveTo(launchX, launchY)
      ctx.lineTo(indicatorX, indicatorY)
      ctx.stroke()
    }
  }

  const updatePhysics = (dt) => {
    const state = simStateRef.current
    const g = gravity[0]
    const windSpeed = wind[0]

    // Forces
    let ax = 0
    let ay = -g

    if (airResistance) {
      const v = Math.sqrt(state.vx * state.vx + state.vy * state.vy)
      // Simple drag model: F = -k * v^2 (direction opposite to velocity)
      // Here we use a simplified linear/quadratic mix for stability and visual effect
      ax -= DRAG_COEFF * v * state.vx
      ay -= DRAG_COEFF * v * state.vy
    }

    // Wind
    ax += windSpeed * 0.5

    // Update velocity
    state.vx += ax * dt
    state.vy += ay * dt

    // Update position
    state.x += state.vx * dt
    state.y += state.vy * dt
    state.t += dt

    return state.y >= 0 // Return true if still in air
  }

  const animate = (timestamp) => {
    if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp
    const dt = (timestamp - lastFrameTimeRef.current) / 1000
    lastFrameTimeRef.current = timestamp

    // Limit dt to avoid huge jumps if tab is inactive
    const safeDt = Math.min(dt, 0.1)

    if (isPlaying) {
      const stillFlying = updatePhysics(safeDt)

      const state = simStateRef.current
      const canvasHeight = canvasRef.current?.height || 500
      const canvasX = state.x * SCALE + 50
      const canvasY = canvasHeight - 50 - state.y * SCALE

      setCurrentPos({ x: state.x, y: Math.max(0, state.y) })
      setStats(prev => ({ ...prev, currentTime: state.t }))
      setTrail(prev => [...prev.slice(-100), { x: canvasX, y: canvasY }])

      if (stillFlying) {
        drawCanvas()
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsPlaying(false)
        drawCanvas()
      }
    } else {
      drawCanvas()
    }
  }

  const startSimulation = () => {
    if (!isPlaying) {
      // Reset state for new launch
      const v0 = velocity[0]
      const angleRad = (angle[0] * Math.PI) / 180

      simStateRef.current = {
        x: 0,
        y: 0,
        vx: v0 * Math.cos(angleRad),
        vy: v0 * Math.sin(angleRad),
        t: 0,
        active: true
      }

      setTrail([])
      lastFrameTimeRef.current = null
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }

  const resetSimulation = () => {
    setIsPlaying(false)
    setTrail([])
    setCurrentPos({ x: 0, y: 0 })
    simStateRef.current = { x: 0, y: 0, vx: 0, vy: 0, t: 0, active: false }
    setStats({
      maxHeight: 0,
      range: 0,
      flightTime: 0,
      currentTime: 0,
    })
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    // Trigger a redraw
    setTimeout(drawCanvas, 0)
  }

  // Calculate predicted stats when parameters change
  useEffect(() => {
    const predicted = runPreSimulation()
    setStats(prev => ({
      ...prev,
      maxHeight: predicted.maxHeight,
      range: predicted.range,
      flightTime: predicted.flightTime
    }))
    drawCanvas()
  }, [velocity, angle, gravity, airResistance, wind])

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Physics-themed floating background */}
      <div className="absolute inset-0" suppressHydrationWarning>
        {[...Array(8)].map((_, i) => (
          <FloatingRocket key={`rocket-${i}`} delay={i * 0.8} />
        ))}
        {[...Array(15)].map((_, i) => (
          <FloatingStar key={`star-${i}`} delay={i * 0.4} />
        ))}
        {[...Array(10)].map((_, i) => (
          <FloatingZap key={`zap-${i}`} delay={i * 0.6} />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Rocket className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">Physics Lab</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  Projectile Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Initial Velocity: {velocity[0]} m/s
                  </label>
                  <Slider value={velocity} onValueChange={setVelocity} max={100} min={10} step={1} className="w-full" />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Launch Angle: {angle[0]}°</label>
                  <Slider value={angle} onValueChange={setAngle} max={90} min={0} step={1} className="w-full" />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Gravity: {gravity[0]} m/s²</label>
                  <Slider value={gravity} onValueChange={setGravity} max={20} min={1} step={0.1} className="w-full" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="air-resistance" checked={airResistance} onCheckedChange={setAirResistance} />
                    <Label htmlFor="air-resistance" className="text-white">Air Resistance</Label>
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 flex items-center">
                    <Wind className="w-4 h-4 mr-2" />
                    Wind: {wind[0]} m/s
                  </label>
                  <Slider value={wind} onValueChange={setWind} max={20} min={-20} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Headwind</span>
                    <span>Tailwind</span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={startSimulation}
                    className={`flex-1 ${isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? "Pause" : "Launch"}
                  </Button>
                  <Button
                    onClick={resetSimulation}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-green-400" />
                  Simulation Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-xs">Max Height</div>
                    <div className="text-white font-mono">{stats.maxHeight.toFixed(1)} m</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Range</div>
                    <div className="text-white font-mono">{stats.range.toFixed(1)} m</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Flight Time</div>
                    <div className="text-white font-mono">{stats.flightTime.toFixed(1)} s</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Current Time</div>
                    <div className="text-white font-mono">{stats.currentTime.toFixed(1)} s</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-gray-400 text-xs mb-2">Current Position</div>
                  <div className="text-white font-mono text-sm">
                    X: {currentPos.x.toFixed(1)} m<br />
                    Y: {currentPos.y.toFixed(1)} m
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Simulation Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Projectile Motion Simulation</span>
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30">
                    Real-time Physics
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[600px]">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="w-full h-full border border-white/10 rounded-lg bg-gradient-to-b from-blue-900/20 to-gray-900/20"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectileSimulation

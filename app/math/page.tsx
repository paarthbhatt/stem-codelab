"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calculator, ActivityIcon as Function, Grid3X3, Zap } from "lucide-react"
import Link from "next/link"

const FloatingNumber = ({ delay = 0, number }) => (
  <motion.div
    className="absolute text-green-400 opacity-20 font-mono text-2xl font-bold"
    animate={{
      y: [-20, -150],
      x: [0, Math.random() * 60 - 30],
      rotate: [0, 360],
      opacity: [0.2, 0],
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
    {number}
  </motion.div>
)

const FloatingSymbol = ({ delay = 0, symbol }) => (
  <motion.div
    className="absolute text-teal-400 opacity-25 font-mono text-3xl font-bold"
    animate={{
      y: [-15, -120],
      x: [0, Math.random() * 80 - 40],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
      opacity: [0.25, 0],
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
    {symbol}
  </motion.div>
)

const FloatingEquation = ({ delay = 0, equation }) => (
  <motion.div
    className="absolute text-blue-400 opacity-15 font-mono text-lg"
    animate={{
      y: [-10, -100],
      x: [0, Math.random() * 50 - 25],
      opacity: [0.15, 0],
    }}
    transition={{
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    {equation}
  </motion.div>
)

const FunctionPlotter = () => {
  const canvasRef = useRef(null)
  const [equation, setEquation] = useState("x^2")
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [yMin, setYMin] = useState(-10)
  const [yMax, setYMax] = useState(10)

  // Update the evaluateFunction to handle more math operations
  const evaluateFunction = (x, equation) => {
    try {
      // Enhanced math expression evaluator
      let expr = equation
        .replace(/\^/g, "**")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log")
        .replace(/ln/g, "Math.log")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/abs/g, "Math.abs")
        .replace(/pi/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/exp/g, "Math.exp")
        .replace(/floor/g, "Math.floor")
        .replace(/ceil/g, "Math.ceil")
        .replace(/round/g, "Math.round")
        .replace(/x/g, `(${x})`)

      // Handle special cases
      if (expr.includes("Math.abs")) {
        expr = expr.replace(/Math\.abs$$(.*?)$$/g, "Math.abs($1)")
      }

      const result = eval(expr)
      return isFinite(result) ? result : Number.NaN
    } catch (e) {
      return Number.NaN
    }
  }

  // Update the drawGraph function to handle edge cases better
  const drawGraph = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = canvas

    // Clear canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)

    // Calculate scales
    const xScale = width / (xMax - xMin)
    const yScale = height / (yMax - yMin)

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1

    // Vertical grid lines
    const xStep = Math.pow(10, Math.floor(Math.log10((xMax - xMin) / 10)))
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const canvasX = (x - xMin) * xScale
      ctx.beginPath()
      ctx.moveTo(canvasX, 0)
      ctx.lineTo(canvasX, height)
      ctx.stroke()
    }

    // Horizontal grid lines
    const yStep = Math.pow(10, Math.floor(Math.log10((yMax - yMin) / 10)))
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      const canvasY = height - (y - yMin) * yScale
      ctx.beginPath()
      ctx.moveTo(0, canvasY)
      ctx.lineTo(width, canvasY)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
    ctx.lineWidth = 2

    // X-axis
    if (yMin <= 0 && yMax >= 0) {
      const y0 = height - (0 - yMin) * yScale
      ctx.beginPath()
      ctx.moveTo(0, y0)
      ctx.lineTo(width, y0)
      ctx.stroke()
    }

    // Y-axis
    if (xMin <= 0 && xMax >= 0) {
      const x0 = (0 - xMin) * xScale
      ctx.beginPath()
      ctx.moveTo(x0, 0)
      ctx.lineTo(x0, height)
      ctx.stroke()
    }

    // Draw function
    ctx.strokeStyle = "#22d3ee"
    ctx.lineWidth = 3
    ctx.beginPath()

    let firstPoint = true
    const step = (xMax - xMin) / (width * 2) // Higher resolution

    for (let x = xMin; x <= xMax; x += step) {
      const y = evaluateFunction(x, equation)

      if (!isNaN(y) && isFinite(y)) {
        const canvasX = (x - xMin) * xScale
        const canvasY = height - (y - yMin) * yScale

        if (canvasY >= -50 && canvasY <= height + 50) {
          // Allow some overflow
          if (firstPoint) {
            ctx.moveTo(canvasX, canvasY)
            firstPoint = false
          } else {
            ctx.lineTo(canvasX, canvasY)
          }
        } else {
          firstPoint = true
        }
      } else {
        firstPoint = true
      }
    }

    ctx.stroke()

    // Add glow effect
    ctx.shadowColor = "#22d3ee"
    ctx.shadowBlur = 10
    ctx.stroke()
    ctx.shadowBlur = 0

    // Draw axis labels
    ctx.fillStyle = "white"
    ctx.font = "12px monospace"
    ctx.textAlign = "center"

    // X-axis labels
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) > 0.001) {
        // Avoid labeling zero
        const canvasX = (x - xMin) * xScale
        const labelY = yMin <= 0 && yMax >= 0 ? height - (0 - yMin) * yScale + 15 : height - 5
        ctx.fillText(x.toFixed(1), canvasX, labelY)
      }
    }

    // Y-axis labels
    ctx.textAlign = "left"
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) > 0.001) {
        // Avoid labeling zero
        const canvasY = height - (y - yMin) * yScale
        const labelX = xMin <= 0 && xMax >= 0 ? (0 - xMin) * xScale + 5 : 5
        ctx.fillText(y.toFixed(1), labelX, canvasY - 5)
      }
    }
  }

  // Add a function to auto-scale the graph
  const autoScale = () => {
    const step = (xMax - xMin) / 100
    let minY = Number.POSITIVE_INFINITY
    let maxY = Number.NEGATIVE_INFINITY

    for (let x = xMin; x <= xMax; x += step) {
      const y = evaluateFunction(x, equation)
      if (!isNaN(y) && isFinite(y)) {
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }

    if (isFinite(minY) && isFinite(maxY)) {
      const padding = (maxY - minY) * 0.1
      setYMin(minY - padding)
      setYMax(maxY + padding)
    }
  }

  useEffect(() => {
    drawGraph()
  }, [equation, xMin, xMax, yMin, yMax])

  const presetFunctions = [
    { name: "Quadratic", equation: "x^2" },
    { name: "Cubic", equation: "x^3" },
    { name: "Sine Wave", equation: "sin(x)" },
    { name: "Cosine Wave", equation: "cos(x)" },
    { name: "Exponential", equation: "e^x" },
    { name: "Logarithm", equation: "log(x)" },
    { name: "Square Root", equation: "sqrt(x)" },
    { name: "Absolute Value", equation: "Math.abs(x)" },
  ]

  // Math-themed floating elements
  const numbers = ["π", "e", "∞", "∑", "∫", "√", "α", "β", "γ", "θ"]
  const symbols = ["+", "-", "×", "÷", "=", "≠", "≤", "≥", "∂", "∇"]
  const equations = ["x²+y²=r²", "E=mc²", "a²+b²=c²", "f(x)=mx+b", "y=ax²+bx+c"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-teal-900 relative overflow-hidden">
      {/* Math-themed floating background */}
      <div className="absolute inset-0">
        {/* Floating Numbers */}
        {[...Array(12)].map((_, i) => (
          <FloatingNumber key={`number-${i}`} delay={i * 0.5} number={numbers[i % numbers.length]} />
        ))}

        {/* Floating Symbols */}
        {[...Array(15)].map((_, i) => (
          <FloatingSymbol key={`symbol-${i}`} delay={i * 0.3} symbol={symbols[i % symbols.length]} />
        ))}

        {/* Floating Equations */}
        {[...Array(8)].map((_, i) => (
          <FloatingEquation key={`equation-${i}`} delay={i * 0.8} equation={equations[i % equations.length]} />
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
                <Calculator className="w-6 h-6 text-green-400" />
                <span className="text-xl font-bold text-white">Math Studio</span>
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
                  <Function className="w-5 h-5 mr-2 text-green-400" />
                  Function Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">f(x) =</label>
                  <Input
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    className="bg-gray-800/50 border-white/20 text-white"
                    placeholder="Enter function (e.g., x^2, sin(x))"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">X Min</label>
                    <Input
                      type="number"
                      value={xMin}
                      onChange={(e) => setXMin(Number(e.target.value))}
                      className="bg-gray-800/50 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">X Max</label>
                    <Input
                      type="number"
                      value={xMax}
                      onChange={(e) => setXMax(Number(e.target.value))}
                      className="bg-gray-800/50 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Y Min</label>
                    <Input
                      type="number"
                      value={yMin}
                      onChange={(e) => setYMin(Number(e.target.value))}
                      className="bg-gray-800/50 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Y Max</label>
                    <Input
                      type="number"
                      value={yMax}
                      onChange={(e) => setYMax(Number(e.target.value))}
                      className="bg-gray-800/50 border-white/20 text-white"
                    />
                  </div>
                </div>
                {/* Add auto-scale button to the controls */}
                <Button variant="secondary" onClick={autoScale}>
                  Auto Scale
                </Button>
              </CardContent>
            </Card>

            {/* Preset Functions */}
            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Quick Functions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {presetFunctions.map((func, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setEquation(func.equation)}
                      className="border-white/20 text-white hover:bg-white/10 text-xs"
                    >
                      {func.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Function Info */}
            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Grid3X3 className="w-5 h-5 mr-2 text-blue-400" />
                  Function Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="text-gray-400">Current Function:</div>
                  <div className="text-cyan-300 font-mono">f(x) = {equation}</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-400">Domain:</div>
                  <div className="text-white font-mono">
                    [{xMin}, {xMax}]
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-400">Range:</div>
                  <div className="text-white font-mono">
                    [{yMin}, {yMax}]
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graph Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Interactive Function Plotter</span>
                  <Badge className="bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-300 border-green-500/30">
                    Real-time Graphing
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[600px]">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="w-full h-full border border-white/10 rounded-lg bg-gradient-to-b from-green-900/20 to-gray-900/20"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FunctionPlotter

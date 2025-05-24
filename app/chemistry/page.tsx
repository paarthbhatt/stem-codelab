"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Beaker, Atom, Zap, Plus, RotateCcw } from "lucide-react"
import Link from "next/link"

const FloatingAtom = ({ delay = 0 }) => (
  <motion.div
    className="absolute text-orange-400 opacity-20"
    animate={{
      y: [-20, -140],
      x: [0, Math.random() * 70 - 35],
      rotate: [0, 360],
      scale: [1, 1.3, 1],
      opacity: [0.2, 0],
    }}
    transition={{
      duration: 4.5,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    <Atom className="w-8 h-8" />
  </motion.div>
)

const FloatingMolecule = ({ delay = 0 }) => (
  <motion.div
    className="absolute opacity-15"
    animate={{
      y: [-15, -120],
      x: [0, Math.random() * 60 - 30],
      rotate: [0, 180],
      opacity: [0.15, 0],
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
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-red-400">
      <circle cx="10" cy="20" r="6" fill="currentColor" opacity="0.6" />
      <circle cx="30" cy="20" r="6" fill="currentColor" opacity="0.6" />
      <line x1="16" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  </motion.div>
)

const FloatingCircle = ({ delay = 0, size = "w-4 h-4", color = "bg-yellow-400" }) => (
  <motion.div
    className={`absolute ${size} ${color} rounded-full opacity-25`}
    animate={{
      y: [-10, -100],
      x: [0, Math.random() * 50 - 25],
      scale: [1, 1.5, 0.5],
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
  />
)

const MolecularBuilder = () => {
  const canvasRef = useRef(null)
  const [selectedElement, setSelectedElement] = useState("C")
  const [molecules, setMolecules] = useState([])
  const [bonds, setBonds] = useState([])
  const [formula, setFormula] = useState("")
  const [molecularWeight, setMolecularWeight] = useState(0)

  const elements = {
    H: { name: "Hydrogen", color: "#ffffff", radius: 15, weight: 1.008 },
    C: { name: "Carbon", color: "#404040", radius: 20, weight: 12.011 },
    N: { name: "Nitrogen", color: "#3050f8", radius: 18, weight: 14.007 },
    O: { name: "Oxygen", color: "#ff0d0d", radius: 18, weight: 15.999 },
    F: { name: "Fluorine", color: "#90e050", radius: 16, weight: 18.998 },
    Cl: { name: "Chlorine", color: "#1ff01f", radius: 22, weight: 35.453 },
    Br: { name: "Bromine", color: "#a62929", radius: 24, weight: 79.904 },
    S: { name: "Sulfur", color: "#ffff30", radius: 22, weight: 32.065 },
  }

  const drawMolecule = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = canvas

    // Clear canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
    ctx.lineWidth = 1
    for (let i = 0; i < width; i += 30) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i < height; i += 30) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Draw bonds first (so they appear behind atoms)
    bonds.forEach((bond) => {
      const atom1 = molecules[bond.atom1]
      const atom2 = molecules[bond.atom2]
      if (atom1 && atom2) {
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(atom1.x, atom1.y)
        ctx.lineTo(atom2.x, atom2.y)
        ctx.stroke()

        // Add glow effect
        ctx.shadowColor = "#ffffff"
        ctx.shadowBlur = 5
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    })

    // Draw atoms
    molecules.forEach((atom, index) => {
      const element = elements[atom.element]

      // Draw atom circle
      ctx.fillStyle = element.color
      ctx.beginPath()
      ctx.arc(atom.x, atom.y, element.radius, 0, 2 * Math.PI)
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = element.color
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0

      // Draw border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw element symbol
      ctx.fillStyle = atom.element === "H" ? "#000000" : "#ffffff"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(atom.element, atom.x, atom.y)
    })
  }

  const addAtom = (x, y) => {
    const newAtom = {
      element: selectedElement,
      x: x,
      y: y,
      id: Date.now(),
    }
    setMolecules((prev) => [...prev, newAtom])
  }

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    // Check if clicking on existing atom
    const clickedAtomIndex = molecules.findIndex((atom) => {
      const element = elements[atom.element]
      const distance = Math.sqrt((x - atom.x) ** 2 + (y - atom.y) ** 2)
      return distance <= element.radius
    })

    if (clickedAtomIndex === -1) {
      // Add new atom
      addAtom(x, y)
    } else {
      // Could implement atom selection/deletion here
      console.log("Clicked on atom:", molecules[clickedAtomIndex])
    }
  }

  const addBond = () => {
    if (molecules.length >= 2) {
      const atom1 = molecules.length - 2
      const atom2 = molecules.length - 1

      // Check if bond already exists
      const bondExists = bonds.some(
        (bond) => (bond.atom1 === atom1 && bond.atom2 === atom2) || (bond.atom1 === atom2 && bond.atom2 === atom1),
      )

      if (!bondExists) {
        setBonds((prev) => [...prev, { atom1, atom2, id: Date.now() }])
      }
    }
  }

  const clearMolecule = () => {
    setMolecules([])
    setBonds([])
    setFormula("")
    setMolecularWeight(0)
  }

  const calculateFormula = () => {
    if (molecules.length === 0) {
      setFormula("")
      setMolecularWeight(0)
      return
    }

    const elementCounts = {}
    let weight = 0

    molecules.forEach((atom) => {
      elementCounts[atom.element] = (elementCounts[atom.element] || 0) + 1
      weight += elements[atom.element].weight
    })

    // Sort elements by conventional order (C, H, then alphabetical)
    const sortedElements = Object.keys(elementCounts).sort((a, b) => {
      if (a === "C") return -1
      if (b === "C") return 1
      if (a === "H") return -1
      if (b === "H") return 1
      return a.localeCompare(b)
    })

    let formulaStr = ""
    sortedElements.forEach((element) => {
      const count = elementCounts[element]
      formulaStr += element + (count > 1 ? count : "")
    })

    setFormula(formulaStr)
    setMolecularWeight(weight)
  }

  useEffect(() => {
    drawMolecule()
    calculateFormula()
  }, [molecules, bonds])

  const commonMolecules = [
    {
      name: "Water",
      formula: "H₂O",
      atoms: [
        { element: "O", x: 400, y: 250 },
        { element: "H", x: 370, y: 220 },
        { element: "H", x: 430, y: 220 },
      ],
      bonds: [
        { atom1: 0, atom2: 1 },
        { atom1: 0, atom2: 2 },
      ],
    },
    {
      name: "Methane",
      formula: "CH₄",
      atoms: [
        { element: "C", x: 400, y: 250 },
        { element: "H", x: 370, y: 220 },
        { element: "H", x: 430, y: 220 },
        { element: "H", x: 370, y: 280 },
        { element: "H", x: 430, y: 280 },
      ],
      bonds: [
        { atom1: 0, atom2: 1 },
        { atom1: 0, atom2: 2 },
        { atom1: 0, atom2: 3 },
        { atom1: 0, atom2: 4 },
      ],
    },
    {
      name: "Ammonia",
      formula: "NH₃",
      atoms: [
        { element: "N", x: 400, y: 250 },
        { element: "H", x: 370, y: 220 },
        { element: "H", x: 430, y: 220 },
        { element: "H", x: 400, y: 290 },
      ],
      bonds: [
        { atom1: 0, atom2: 1 },
        { atom1: 0, atom2: 2 },
        { atom1: 0, atom2: 3 },
      ],
    },
  ]

  const loadMolecule = (molecule) => {
    setMolecules(molecule.atoms.map((atom, index) => ({ ...atom, id: Date.now() + index })))
    setBonds(molecule.bonds.map((bond, index) => ({ ...bond, id: Date.now() + index + 1000 })))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 relative overflow-hidden">
      {/* Chemistry-themed floating background */}
      <div className="absolute inset-0">
        {/* Floating Atoms */}
        {[...Array(10)].map((_, i) => (
          <FloatingAtom key={`atom-${i}`} delay={i * 0.6} />
        ))}

        {/* Floating Molecules */}
        {[...Array(8)].map((_, i) => (
          <FloatingMolecule key={`molecule-${i}`} delay={i * 0.8} />
        ))}

        {/* Floating Circles */}
        {[...Array(20)].map((_, i) => {
          const sizes = ["w-3 h-3", "w-4 h-4", "w-5 h-5"]
          const colors = ["bg-yellow-400", "bg-orange-400", "bg-red-400", "bg-pink-400"]
          return (
            <FloatingCircle
              key={`circle-${i}`}
              delay={i * 0.3}
              size={sizes[i % sizes.length]}
              color={colors[i % colors.length]}
            />
          )
        })}
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
                <Beaker className="w-6 h-6 text-orange-400" />
                <span className="text-xl font-bold text-white">Chemistry Hub</span>
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
                  <Atom className="w-5 h-5 mr-2 text-orange-400" />
                  Element Palette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(elements).map(([symbol, element]) => (
                    <Button
                      key={symbol}
                      variant={selectedElement === symbol ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedElement(symbol)}
                      className={`h-12 ${
                        selectedElement === symbol
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "border-white/20 text-white hover:bg-white/10"
                      }`}
                      style={{ backgroundColor: selectedElement === symbol ? element.color : undefined }}
                    >
                      {symbol}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-white text-sm font-medium">{elements[selectedElement].name}</div>
                  <div className="text-gray-400 text-xs">Atomic Weight: {elements[selectedElement].weight}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Molecule Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={addBond}
                  disabled={molecules.length < 2}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bond
                </Button>
                <Button
                  onClick={clearMolecule}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Molecular Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Formula</div>
                  <div className="text-white font-mono text-lg">{formula || "None"}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Molecular Weight</div>
                  <div className="text-white font-mono">{molecularWeight.toFixed(3)} g/mol</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Atoms</div>
                  <div className="text-white font-mono">{molecules.length}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Bonds</div>
                  <div className="text-white font-mono">{bonds.length}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Common Molecules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {commonMolecules.map((molecule, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => loadMolecule(molecule)}
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                  >
                    <span className="font-medium">{molecule.name}</span>
                    <span className="ml-auto text-gray-400 text-xs">{molecule.formula}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Molecular Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Molecular Builder</span>
                  <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30">
                    Interactive Chemistry
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[600px]">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  onClick={handleCanvasClick}
                  className="w-full h-full border border-white/10 rounded-lg bg-gradient-to-b from-orange-900/20 to-gray-900/20 cursor-crosshair"
                />
                <div className="mt-4 text-center text-gray-400 text-sm">
                  Click to add {elements[selectedElement].name} atoms • Select two atoms and click "Add Bond" to connect
                  them
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MolecularBuilder

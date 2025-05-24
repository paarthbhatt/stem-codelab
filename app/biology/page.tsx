"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Dna, Search, BarChart3, Zap, Copy, RotateCcw } from "lucide-react"
import Link from "next/link"

const FloatingDNA = ({ delay = 0 }) => (
  <motion.div
    className="absolute text-emerald-400 opacity-20"
    animate={{
      y: [-20, -150],
      x: [0, Math.random() * 80 - 40],
      rotate: [0, 360],
      scale: [1, 1.4, 1],
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
    <Dna className="w-8 h-8" />
  </motion.div>
)

const FloatingCell = ({ delay = 0 }) => (
  <motion.div
    className="absolute opacity-15"
    animate={{
      y: [-15, -120],
      x: [0, Math.random() * 60 - 30],
      rotate: [0, 180],
      scale: [1, 1.2, 0.8],
      opacity: [0.15, 0],
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
    <svg width="32" height="32" viewBox="0 0 32 32" className="text-cyan-400">
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <circle cx="16" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.8" />
    </svg>
  </motion.div>
)

const FloatingHelix = ({ delay = 0 }) => (
  <motion.div
    className="absolute opacity-10"
    animate={{
      y: [-10, -100],
      x: [0, Math.random() * 50 - 25],
      rotate: [0, 720],
      opacity: [0.1, 0],
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
    <svg width="24" height="48" viewBox="0 0 24 48" className="text-green-400">
      <path
        d="M2 4 Q12 12 22 4 Q12 20 2 28 Q12 36 22 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
      <path
        d="M22 4 Q12 12 2 4 Q12 20 22 28 Q12 36 2 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />
    </svg>
  </motion.div>
)

const DNAAnalyzer = () => {
  const [dnaSequence, setDnaSequence] = useState("ATCGATCGATCGATCG")
  const [analysis, setAnalysis] = useState(null)
  const [complement, setComplement] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Update the analyzeDNA function to be more robust
  const analyzeDNA = () => {
    setIsAnalyzing(true)

    setTimeout(() => {
      try {
        const sequence = dnaSequence.toUpperCase().replace(/[^ATCG]/g, "")

        if (sequence.length === 0) {
          setAnalysis(null)
          setComplement("")
          setIsAnalyzing(false)
          return
        }

        // Count nucleotides
        const counts = { A: 0, T: 0, G: 0, C: 0 }
        for (const nucleotide of sequence) {
          if (counts.hasOwnProperty(nucleotide)) {
            counts[nucleotide]++
          }
        }

        const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
        const percentages = {}
        Object.entries(counts).forEach(([nucleotide, count]) => {
          percentages[nucleotide] = total > 0 ? (count / total) * 100 : 0
        })

        // Generate complement
        const complementMap = { A: "T", T: "A", G: "C", C: "G" }
        const complementSeq = sequence
          .split("")
          .map((n) => complementMap[n] || n)
          .join("")

        // Calculate GC content
        const gcContent = percentages.G + percentages.C

        // Find patterns
        const patterns = findPatterns(sequence)

        setAnalysis({
          sequence,
          length: sequence.length,
          counts,
          percentages,
          gcContent,
          patterns,
        })
        setComplement(complementSeq)
      } catch (error) {
        console.error("Error analyzing DNA:", error)
        setAnalysis(null)
        setComplement("")
      } finally {
        setIsAnalyzing(false)
      }
    }, 800)
  }

  // Update the findPatterns function to be more efficient
  const findPatterns = (sequence) => {
    const patterns = []
    const foundPatterns = new Set()

    // Find repeating sequences
    for (let length = 2; length <= Math.min(6, Math.floor(sequence.length / 2)); length++) {
      for (let i = 0; i <= sequence.length - length * 2; i++) {
        const pattern = sequence.substring(i, i + length)
        const patternKey = `${pattern}-${length}`

        if (!foundPatterns.has(patternKey)) {
          const nextOccurrence = sequence.indexOf(pattern, i + length)
          if (nextOccurrence !== -1) {
            patterns.push({
              pattern,
              positions: [i, nextOccurrence],
              length,
            })
            foundPatterns.add(patternKey)
          }
        }
      }
    }

    return patterns.slice(0, 5) // Return first 5 unique patterns
  }

  const generateRandomDNA = (length = 50) => {
    const nucleotides = ["A", "T", "C", "G"]
    let sequence = ""
    for (let i = 0; i < length; i++) {
      sequence += nucleotides[Math.floor(Math.random() * 4)]
    }
    setDnaSequence(sequence)
  }

  // Fix the copyToClipboard function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err)
      }
      document.body.removeChild(textArea)
    }
  }

  // Update the useEffect to trigger analysis on sequence change
  useEffect(() => {
    if (dnaSequence && dnaSequence.trim().length > 0) {
      const timeoutId = setTimeout(() => {
        analyzeDNA()
      }, 500) // Debounce the analysis

      return () => clearTimeout(timeoutId)
    } else {
      setAnalysis(null)
      setComplement("")
    }
  }, [dnaSequence])

  const sampleSequences = [
    {
      name: "Human Beta-Globin",
      sequence: "ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGG",
    },
    {
      name: "E. coli lac Operon",
      sequence: "AATTGTGAGCGCTCACAATTCCACACAACATACGAGCCGGAAGCATAAAGTGTAAAGCCTGGGGTGCCTAATGAGTGAGCTAACTCACATTA",
    },
    {
      name: "TATA Box Sequence",
      sequence: "GCGCGCTATAAAAGGCGCGCGCTATAWAW",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-cyan-900 relative overflow-hidden">
      {/* Biology-themed floating background */}
      <div className="absolute inset-0">
        {/* Floating DNA */}
        {[...Array(8)].map((_, i) => (
          <FloatingDNA key={`dna-${i}`} delay={i * 0.7} />
        ))}

        {/* Floating Cells */}
        {[...Array(12)].map((_, i) => (
          <FloatingCell key={`cell-${i}`} delay={i * 0.5} />
        ))}

        {/* Floating Helix */}
        {[...Array(6)].map((_, i) => (
          <FloatingHelix key={`helix-${i}`} delay={i * 1.2} />
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
                <Dna className="w-6 h-6 text-emerald-400" />
                <span className="text-xl font-bold text-white">Biology Center</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Search className="w-5 h-5 mr-2 text-emerald-400" />
                  DNA Sequence Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Enter DNA Sequence (A, T, C, G)</label>
                  <Textarea
                    value={dnaSequence}
                    onChange={(e) => setDnaSequence(e.target.value)}
                    className="bg-gray-800/50 border-white/20 text-white font-mono text-sm"
                    placeholder="ATCGATCGATCG..."
                    rows={4}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={analyzeDNA}
                    disabled={isAnalyzing}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze DNA"}
                  </Button>
                  <Button
                    onClick={() => generateRandomDNA()}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Sample Sequences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sampleSequences.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setDnaSequence(sample.sequence)}
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 text-xs"
                  >
                    {sample.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            {analysis && (
              <>
                <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-emerald-400" />
                        Nucleotide Composition
                      </span>
                      <Badge className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/30">
                        {analysis.length} base pairs
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {Object.entries(analysis.counts).map(([nucleotide, count]) => (
                        <div key={nucleotide} className="text-center">
                          <div
                            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 ${
                              nucleotide === "A"
                                ? "bg-red-500"
                                : nucleotide === "T"
                                  ? "bg-blue-500"
                                  : nucleotide === "C"
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                            }`}
                          >
                            {nucleotide}
                          </div>
                          <div className="text-white font-mono text-lg">{count}</div>
                          <div className="text-gray-400 text-sm">{analysis.percentages[nucleotide].toFixed(1)}%</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-white">GC Content</span>
                        <span className="text-emerald-400 font-mono font-bold">{analysis.gcContent.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-white">AT Content</span>
                        <span className="text-blue-400 font-mono font-bold">
                          {(100 - analysis.gcContent).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Dna className="w-5 h-5 mr-2 text-cyan-400" />
                      Complementary Strand
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Original (5' → 3')</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(analysis.sequence)}
                            className="text-white hover:bg-white/10"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg font-mono text-sm text-white break-all">
                          {analysis.sequence}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Complement (3' → 5')</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(complement)}
                            className="text-white hover:bg-white/10"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg font-mono text-sm text-cyan-300 break-all">
                          {complement}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {analysis.patterns.length > 0 && (
                  <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white">Sequence Patterns</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysis.patterns.map((pattern, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                            <div>
                              <span className="text-white font-mono">{pattern.pattern}</span>
                              <span className="text-gray-400 text-sm ml-2">(Length: {pattern.length})</span>
                            </div>
                            <div className="text-emerald-400 text-sm">Positions: {pattern.positions.join(", ")}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DNAAnalyzer

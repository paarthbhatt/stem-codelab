"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Brain,
  Rocket,
  Calculator,
  Beaker,
  Dna,
  Lightbulb,
  Target,
  Zap,
  Code,
  BookOpen,
  Play,
  ChevronRight,
  Atom,
  Microscope,
  Globe,
  Cpu,
} from "lucide-react"
import Link from "next/link"

const FloatingIcon = ({ delay = 0, icon: Icon, color = "text-cyan-400" }) => (
  <motion.div
    className={`absolute ${color} opacity-20`}
    animate={{
      y: [-20, -120],
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
    <Icon className="w-6 h-6" />
  </motion.div>
)

const ConceptCard = ({ icon: Icon, title, description, applications, difficulty, estimatedTime, moduleLink }) => (
  <motion.div whileHover={{ scale: 1.02, y: -5 }} className="group">
    <Card className="h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border-white/10 hover:border-cyan-500/30 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-lg group-hover:text-cyan-300 transition-colors">{title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                  {estimatedTime}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

        <div>
          <h4 className="text-white font-medium text-sm mb-2">Real-world Applications:</h4>
          <ul className="space-y-1">
            {applications.map((app, index) => (
              <li key={index} className="text-gray-400 text-xs flex items-center">
                <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2" />
                {app}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-2 pt-2">
          <Link href={moduleLink} className="flex-1">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              <Play className="w-3 h-3 mr-1" />
              Try Interactive
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <BookOpen className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const LearningPath = ({ title, concepts, color }) => (
  <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <div className={`w-3 h-3 rounded-full ${color} mr-3`} />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {concepts.map((concept, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-500 flex items-center justify-center text-white text-sm font-bold">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">{concept.name}</div>
              <div className="text-gray-400 text-xs">{concept.description}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function ConceptsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const physicsConceptsData = [
    {
      icon: Rocket,
      title: "Projectile Motion",
      description:
        "Understanding how objects move through space under the influence of gravity, including trajectory calculations and optimization.",
      applications: [
        "Ballistics and artillery systems",
        "Sports analytics and performance",
        "Space mission trajectory planning",
        "Video game physics engines",
      ],
      difficulty: "Intermediate",
      estimatedTime: "30 min",
      moduleLink: "/physics",
    },
    {
      icon: Zap,
      title: "Wave Physics",
      description:
        "Explore the fundamental properties of waves, including frequency, amplitude, and interference patterns.",
      applications: [
        "Wireless communication systems",
        "Medical ultrasound imaging",
        "Noise cancellation technology",
        "Seismic monitoring",
      ],
      difficulty: "Advanced",
      estimatedTime: "45 min",
      moduleLink: "/physics",
    },
    {
      icon: Globe,
      title: "Gravitational Forces",
      description: "Learn about Newton's law of universal gravitation and its applications in celestial mechanics.",
      applications: [
        "Satellite orbit calculations",
        "Planetary motion prediction",
        "Tidal force modeling",
        "GPS system accuracy",
      ],
      difficulty: "Intermediate",
      estimatedTime: "25 min",
      moduleLink: "/physics",
    },
  ]

  const mathConceptsData = [
    {
      icon: Calculator,
      title: "Function Analysis",
      description:
        "Master the art of analyzing mathematical functions, their properties, and graphical representations.",
      applications: [
        "Economic modeling and forecasting",
        "Signal processing algorithms",
        "Machine learning optimization",
        "Engineering design analysis",
      ],
      difficulty: "Intermediate",
      estimatedTime: "35 min",
      moduleLink: "/math",
    },
    {
      icon: Target,
      title: "Calculus Applications",
      description: "Discover how derivatives and integrals solve real-world optimization and area problems.",
      applications: [
        "Profit maximization in business",
        "Physics motion analysis",
        "Population growth modeling",
        "Computer graphics rendering",
      ],
      difficulty: "Advanced",
      estimatedTime: "50 min",
      moduleLink: "/math",
    },
    {
      icon: Cpu,
      title: "Statistical Analysis",
      description: "Learn statistical methods for data analysis, probability distributions, and hypothesis testing.",
      applications: [
        "Data science and analytics",
        "Quality control in manufacturing",
        "Medical research studies",
        "Financial risk assessment",
      ],
      difficulty: "Intermediate",
      estimatedTime: "40 min",
      moduleLink: "/math",
    },
  ]

  const chemistryConceptsData = [
    {
      icon: Atom,
      title: "Molecular Structure",
      description: "Understand atomic bonding, molecular geometry, and how structure determines chemical properties.",
      applications: [
        "Drug design and development",
        "Materials science innovation",
        "Catalyst development",
        "Polymer engineering",
      ],
      difficulty: "Intermediate",
      estimatedTime: "30 min",
      moduleLink: "/chemistry",
    },
    {
      icon: Beaker,
      title: "Chemical Reactions",
      description: "Explore reaction mechanisms, kinetics, and thermodynamics in chemical processes.",
      applications: [
        "Industrial chemical production",
        "Environmental remediation",
        "Battery technology",
        "Food preservation methods",
      ],
      difficulty: "Advanced",
      estimatedTime: "45 min",
      moduleLink: "/chemistry",
    },
    {
      icon: Lightbulb,
      title: "Electrochemistry",
      description: "Learn about electron transfer reactions and their applications in energy storage and conversion.",
      applications: [
        "Battery and fuel cell design",
        "Corrosion prevention",
        "Electroplating processes",
        "Solar cell technology",
      ],
      difficulty: "Advanced",
      estimatedTime: "40 min",
      moduleLink: "/chemistry",
    },
  ]

  const biologyConceptsData = [
    {
      icon: Dna,
      title: "Genetic Analysis",
      description: "Decode DNA sequences, understand genetic patterns, and explore heredity mechanisms.",
      applications: [
        "Personalized medicine",
        "Genetic disorder diagnosis",
        "Agricultural crop improvement",
        "Evolutionary biology research",
      ],
      difficulty: "Intermediate",
      estimatedTime: "35 min",
      moduleLink: "/biology",
    },
    {
      icon: Microscope,
      title: "Cell Biology",
      description: "Explore cellular structures, functions, and the molecular basis of life processes.",
      applications: [
        "Cancer research and treatment",
        "Biotechnology development",
        "Tissue engineering",
        "Pharmaceutical testing",
      ],
      difficulty: "Intermediate",
      estimatedTime: "30 min",
      moduleLink: "/biology",
    },
    {
      icon: Brain,
      title: "Bioinformatics",
      description: "Apply computational methods to analyze biological data and solve complex biological problems.",
      applications: [
        "Genome sequencing projects",
        "Protein structure prediction",
        "Drug discovery pipelines",
        "Epidemiological modeling",
      ],
      difficulty: "Advanced",
      estimatedTime: "50 min",
      moduleLink: "/biology",
    },
  ]

  const learningPaths = [
    {
      title: "Beginner's Journey",
      color: "bg-green-500",
      concepts: [
        { name: "Basic Physics Concepts", description: "Start with fundamental forces and motion" },
        { name: "Mathematical Foundations", description: "Essential algebra and geometry" },
        { name: "Introduction to Chemistry", description: "Atoms, molecules, and basic reactions" },
        { name: "Biology Basics", description: "Cell structure and basic life processes" },
      ],
    },
    {
      title: "Intermediate Explorer",
      color: "bg-blue-500",
      concepts: [
        { name: "Advanced Physics", description: "Waves, thermodynamics, and electromagnetism" },
        { name: "Calculus Applications", description: "Derivatives and integrals in real problems" },
        { name: "Organic Chemistry", description: "Carbon compounds and reaction mechanisms" },
        { name: "Molecular Biology", description: "DNA, RNA, and protein synthesis" },
      ],
    },
    {
      title: "Expert Pathway",
      color: "bg-purple-500",
      concepts: [
        { name: "Quantum Physics", description: "Subatomic particles and quantum mechanics" },
        { name: "Advanced Mathematics", description: "Differential equations and complex analysis" },
        { name: "Biochemistry", description: "Chemical processes in living organisms" },
        { name: "Computational Biology", description: "Bioinformatics and systems biology" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Floating Background */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => {
          const icons = [Brain, Lightbulb, Target, Atom, Microscope, Code]
          const colors = ["text-cyan-400", "text-blue-400", "text-purple-400", "text-pink-400", "text-green-400"]
          const Icon = icons[i % icons.length]
          const color = colors[i % colors.length]
          return <FloatingIcon key={`icon-${i}`} delay={i * 0.2} icon={Icon} color={color} />
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
                <Brain className="w-6 h-6 text-cyan-400" />
                <span className="text-xl font-bold text-white">STEM Concepts</span>
              </div>
            </div>
            <Link href="/playground">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                <Code className="w-4 h-4 mr-2" />
                Try Code Playground
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Master STEM Concepts
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore fundamental concepts across Science, Technology, Engineering, and Mathematics through interactive
            learning experiences and real-world applications.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-white/10 mb-8">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="physics"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
            >
              Physics
            </TabsTrigger>
            <TabsTrigger
              value="math"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300"
            >
              Mathematics
            </TabsTrigger>
            <TabsTrigger
              value="chemistry"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300"
            >
              Chemistry
            </TabsTrigger>
            <TabsTrigger
              value="biology"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300"
            >
              Biology
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">Learning Pathways</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">
                      Choose your learning journey based on your current knowledge level. Each pathway is designed to
                      build upon previous concepts and provide a structured approach to mastering STEM subjects.
                    </p>
                    <div className="space-y-4">
                      {learningPaths.map((path, index) => (
                        <LearningPath key={index} {...path} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="w-5 h-5 mr-2 text-cyan-400" />
                      Quick Start
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">
                      New to STEM? Start with our interactive modules designed for beginners.
                    </p>
                    <div className="space-y-2">
                      <Link href="/physics">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                        >
                          <Rocket className="w-4 h-4 mr-2" />
                          Physics Basics
                        </Button>
                      </Link>
                      <Link href="/math">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                        >
                          <Calculator className="w-4 h-4 mr-2" />
                          Math Foundations
                        </Button>
                      </Link>
                      <Link href="/chemistry">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                        >
                          <Beaker className="w-4 h-4 mr-2" />
                          Chemistry Intro
                        </Button>
                      </Link>
                      <Link href="/biology">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                        >
                          <Dna className="w-4 h-4 mr-2" />
                          Biology Basics
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                      Featured Concepts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/30 rounded-lg">
                        <div className="text-white font-medium text-sm">Projectile Motion</div>
                        <div className="text-gray-400 text-xs">Most popular physics concept</div>
                      </div>
                      <div className="p-3 bg-gray-800/30 rounded-lg">
                        <div className="text-white font-medium text-sm">DNA Analysis</div>
                        <div className="text-gray-400 text-xs">Trending in biology</div>
                      </div>
                      <div className="p-3 bg-gray-800/30 rounded-lg">
                        <div className="text-white font-medium text-sm">Function Plotting</div>
                        <div className="text-gray-400 text-xs">Essential math skill</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Physics Tab */}
          <TabsContent value="physics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {physicsConceptsData.map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ConceptCard {...concept} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Math Tab */}
          <TabsContent value="math">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mathConceptsData.map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ConceptCard {...concept} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Chemistry Tab */}
          <TabsContent value="chemistry">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chemistryConceptsData.map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ConceptCard {...concept} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Biology Tab */}
          <TabsContent value="biology">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {biologyConceptsData.map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ConceptCard {...concept} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

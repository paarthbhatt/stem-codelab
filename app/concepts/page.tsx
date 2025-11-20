"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
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
  ChevronDown,
  Atom,
  Microscope,
  Globe,
  Cpu,
  CheckCircle2,
  Lock,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const FloatingIcon = ({ delay = 0, icon: Icon, color = "text-cyan-400" }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [xOffset, setXOffset] = useState(0)

  useEffect(() => {
    // Generate random positions only on client side to avoid hydration mismatch
    setPosition({
      left: Math.random() * 100,
      top: Math.random() * 100,
    })
    setXOffset(Math.random() * 60 - 30)
  }, [])

  return (
    <motion.div
      className={`absolute ${color} opacity-20`}
      animate={{
        y: [-20, -120],
        x: [0, xOffset],
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
        left: `${position.left}%`,
        top: `${position.top}%`,
      }}
    >
      <Icon className="w-6 h-6" />
    </motion.div>
  )
}

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

const LearningPath = ({ title, color, concepts, description, totalDuration, skillLevel, prerequisites }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [completedLessons, setCompletedLessons] = useState([])

  const toggleLesson = (index) => {
    setCompletedLessons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const progress = (completedLessons.length / concepts.length) * 100

  return (
    <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl hover:border-cyan-500/20 transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <div className="flex-1">
              <CardTitle className="text-white text-lg">{title}</CardTitle>
              <p className="text-gray-400 text-xs mt-1">{description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:bg-white/10"
          >
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Progress</span>
            <span className="text-cyan-400 font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="flex items-center space-x-2 text-xs">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">{totalDuration}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">{skillLevel}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300">{completedLessons.length}/{concepts.length}</span>
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="pt-0">
              {/* Prerequisites */}
              {prerequisites && prerequisites.length > 0 && (
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 text-sm font-medium">Prerequisites</span>
                  </div>
                  <ul className="space-y-1">
                    {prerequisites.map((prereq, index) => (
                      <li key={index} className="text-yellow-200 text-xs flex items-center">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mr-2" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lessons */}
              <div className="space-y-3">
                {concepts.map((concept, index) => {
                  const isCompleted = completedLessons.includes(index)
                  const isLocked = index > 0 && !completedLessons.includes(index - 1)

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${isCompleted
                        ? "bg-green-500/10 border border-green-500/20"
                        : isLocked
                          ? "bg-gray-800/20 border border-gray-700/30 opacity-60"
                          : "bg-gray-800/30 border border-white/10 hover:bg-gray-700/30"
                        }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted
                          ? "bg-green-500 text-white"
                          : isLocked
                            ? "bg-gray-600 text-gray-400"
                            : "bg-gradient-to-r from-gray-600 to-gray-500 text-white"
                          }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium text-sm ${isCompleted ? "text-green-300" : "text-white"}`}>
                          {concept.name}
                        </div>
                        <div className="text-gray-400 text-xs">{concept.description}</div>
                        {concept.duration && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-500 text-xs">{concept.duration}</span>
                          </div>
                        )}
                      </div>
                      {!isLocked && (
                        <div className="flex items-center space-x-2">
                          {concept.moduleLink && (
                            <Link href={concept.moduleLink}>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 px-3 text-cyan-400 hover:bg-cyan-500/10"
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Start
                              </Button>
                            </Link>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleLesson(index)}
                            className={`h-8 w-8 p-0 ${isCompleted ? "text-green-400 hover:bg-green-500/10" : "text-gray-400 hover:bg-white/10"
                              }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  disabled={progress === 100}
                >
                  {progress === 100 ? (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Completed!
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => setCompletedLessons([])}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

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
      description: "Perfect for those starting their STEM adventure",
      totalDuration: "6-8 hours",
      skillLevel: "Beginner",
      prerequisites: ["Basic arithmetic", "Reading comprehension"],
      concepts: [
        {
          name: "Basic Physics Concepts",
          description: "Start with fundamental forces and motion",
          duration: "1.5 hours",
          moduleLink: "/physics"
        },
        {
          name: "Mathematical Foundations",
          description: "Essential algebra and geometry",
          duration: "2 hours",
          moduleLink: "/math"
        },
        {
          name: "Introduction to Chemistry",
          description: "Atoms, molecules, and basic reactions",
          duration: "1.5 hours",
          moduleLink: "/chemistry"
        },
        {
          name: "Biology Basics",
          description: "Cell structure and basic life processes",
          duration: "1.5 hours",
          moduleLink: "/biology"
        },
      ],
    },
    {
      title: "Intermediate Explorer",
      color: "bg-blue-500",
      description: "Build on fundamentals with advanced topics",
      totalDuration: "10-12 hours",
      skillLevel: "Intermediate",
      prerequisites: ["Completed Beginner's Journey", "Basic calculus knowledge", "Understanding of scientific method"],
      concepts: [
        {
          name: "Advanced Physics",
          description: "Waves, thermodynamics, and electromagnetism",
          duration: "3 hours",
          moduleLink: "/physics"
        },
        {
          name: "Calculus Applications",
          description: "Derivatives and integrals in real problems",
          duration: "3 hours",
          moduleLink: "/math"
        },
        {
          name: "Organic Chemistry",
          description: "Carbon compounds and reaction mechanisms",
          duration: "2.5 hours",
          moduleLink: "/chemistry"
        },
        {
          name: "Molecular Biology",
          description: "DNA, RNA, and protein synthesis",
          duration: "2.5 hours",
          moduleLink: "/biology"
        },
      ],
    },
    {
      title: "Expert Pathway",
      color: "bg-purple-500",
      description: "Master advanced concepts and research topics",
      totalDuration: "15-20 hours",
      skillLevel: "Advanced",
      prerequisites: ["Completed Intermediate Explorer", "Strong mathematical background", "Research experience recommended"],
      concepts: [
        {
          name: "Quantum Physics",
          description: "Subatomic particles and quantum mechanics",
          duration: "5 hours",
          moduleLink: "/physics"
        },
        {
          name: "Advanced Mathematics",
          description: "Differential equations and complex analysis",
          duration: "5 hours",
          moduleLink: "/math"
        },
        {
          name: "Biochemistry",
          description: "Chemical processes in living organisms",
          duration: "4 hours",
          moduleLink: "/chemistry"
        },
        {
          name: "Computational Biology",
          description: "Bioinformatics and systems biology",
          duration: "4 hours",
          moduleLink: "/biology"
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Floating Background */}
      <div className="absolute inset-0" suppressHydrationWarning>
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
                    <CardTitle className="text-white text-2xl">Interactive Learning Pathways</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">
                      Choose your learning journey based on your current knowledge level. Each pathway is designed to
                      build upon previous concepts and provide a structured approach to mastering STEM subjects. Track your progress, unlock achievements, and learn at your own pace.
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

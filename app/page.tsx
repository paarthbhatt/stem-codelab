"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Atom, Calculator, Dna, Rocket, Code, Play, Sparkles, ChevronRight, Beaker, Brain, Zap } from "lucide-react"
import Link from "next/link"

const FloatingParticle = ({ delay = 0, size = "w-2 h-2" }) => (
  <motion.div
    className={`absolute ${size} bg-cyan-400 rounded-full opacity-60`}
    animate={{
      y: [-20, -100],
      x: [0, Math.random() * 100 - 50],
      opacity: [0.6, 0],
    }}
    transition={{
      duration: 3,
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

const STEMModule = ({ icon: Icon, title, description, color, href, features }) => (
  <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} whileTap={{ scale: 0.95 }} className="group">
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-500">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16" />

      <CardHeader className="relative">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardHeader>

      <CardContent className="relative">
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="bg-white/10 text-gray-200 hover:bg-white/20">
              {feature}
            </Badge>
          ))}
        </div>

        <Link href={href}>
          <Button
            className={`w-full bg-gradient-to-r ${color} hover:opacity-90 text-white border-0 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300`}
          >
            Explore Module
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  </motion.div>
)

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stemModules = [
    {
      icon: Rocket,
      title: "Physics Lab",
      description: "Explore motion, forces, and energy through interactive simulations",
      color: "from-blue-500 to-purple-600",
      href: "/physics",
      features: ["Projectile Motion", "Wave Simulation", "Gravity Calculator"],
    },
    {
      icon: Calculator,
      title: "Math Studio",
      description: "Visualize mathematical concepts with dynamic graphing tools",
      color: "from-green-500 to-teal-600",
      href: "/math",
      features: ["Function Plotter", "3D Graphing", "Equation Solver"],
    },
    {
      icon: Beaker,
      title: "Chemistry Hub",
      description: "Build molecules and simulate chemical reactions",
      color: "from-orange-500 to-red-600",
      href: "/chemistry",
      features: ["Molecular Builder", "Reaction Simulator", "Periodic Table"],
    },
    {
      icon: Dna,
      title: "Biology Center",
      description: "Analyze DNA sequences and explore biological systems",
      color: "from-emerald-500 to-cyan-600",
      href: "/biology",
      features: ["DNA Analysis", "Cell Simulation", "Evolution Models"],
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(40)].map((_, i) => (
          <FloatingParticle key={`particle-${i}`} delay={i * 0.1} size={i % 3 === 0 ? "w-3 h-3" : "w-2 h-2"} />
        ))}

        {/* Floating Icons */}
        {[...Array(20)].map((_, i) => {
          const icons = [Atom, Code, Sparkles, Brain]
          const colors = ["text-cyan-400", "text-blue-400", "text-purple-400", "text-pink-400"]
          const Icon = icons[i % icons.length]
          const color = colors[i % colors.length]
          return <FloatingIcon key={`icon-${i}`} delay={i * 0.3} icon={Icon} color={color} />
        })}
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                STEM CodeLab
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link href="/playground">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <Code className="w-4 h-4 mr-2" />
                  Code Playground
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                Get Started
              </Button>
            </motion.div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-cyan-400 mr-3" />
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30">
                Interactive STEM Learning
              </Badge>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent leading-tight">
              Code Your Way to
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                STEM Mastery
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the power of programming through interactive STEM simulations. Write code, see results instantly,
              and master scientific concepts through hands-on experimentation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/concepts">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Get Started
                </Button>
              </Link>
              <Link href="/concepts">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Explore Concepts
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Interactive STEM Modules</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Each module combines theoretical knowledge with practical coding exercises, creating an immersive learning
              experience that bridges science and technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stemModules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <STEMModule {...module} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, label: "Interactive Simulations", value: "50+" },
              { icon: Code, label: "Coding Challenges", value: "200+" },
              { icon: Brain, label: "STEM Concepts", value: "100+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your STEM Learning?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of students who are already coding their way to scientific discovery.
            </p>
            <Link href="/playground">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-12 py-4 text-lg"
              >
                Launch Code Playground
                <Rocket className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

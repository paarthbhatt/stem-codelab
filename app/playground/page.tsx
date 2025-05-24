"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Play,
  RotateCcw,
  Download,
  Share,
  Code,
  Terminal,
  Lightbulb,
  ArrowLeft,
  Settings,
  Maximize,
  Copy,
  FileText,
  Folder,
  Plus,
  Trash2,
} from "lucide-react"
import Link from "next/link"

const CodeEditor = ({ value, onChange, language = "python", theme = "dark" }) => {
  const textareaRef = useRef(null)
  const [lineNumbers, setLineNumbers] = useState([])

  useEffect(() => {
    const lines = value.split("\n")
    setLineNumbers(lines.map((_, index) => index + 1))
  }, [value])

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue = value.substring(0, start) + "    " + value.substring(end)
      onChange(newValue)

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4
      }, 0)
    }
  }

  return (
    <div className="relative h-full flex">
      {/* Line Numbers */}
      <div className="bg-gray-800/30 border-r border-white/10 px-3 py-6 text-gray-500 font-mono text-sm select-none">
        {lineNumbers.map((num) => (
          <div key={num} className="leading-6">
            {num}
          </div>
        ))}
      </div>

      {/* Code Area */}
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30">
            {language.toUpperCase()}
          </Badge>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(value)}
            className="text-white hover:bg-white/10"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-transparent border-0 p-6 pl-4 text-green-400 font-mono text-sm resize-none focus:outline-none leading-6"
          placeholder={`# Write your ${language} code here...
# Example: Calculate projectile motion
import math

def projectile_motion(v0, angle, g=9.81):
    angle_rad = math.radians(angle)
    time_flight = 2 * v0 * math.sin(angle_rad) / g
    max_range = v0**2 * math.sin(2 * angle_rad) / g
    return time_flight, max_range

# Test the function
velocity = 50  # m/s
angle = 45     # degrees
time, distance = projectile_motion(velocity, angle)
print(f"Flight time: {time:.2f} seconds")
print(f"Maximum range: {distance:.2f} meters")`}
          spellCheck={false}
        />
      </div>
    </div>
  )
}

const OutputPanel = ({ output, isRunning, executionTime }) => (
  <div className="h-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      <div className="flex items-center">
        <Terminal className="w-5 h-5 text-cyan-400 mr-2" />
        <span className="text-white font-semibold">Output</span>
        {executionTime && (
          <Badge variant="outline" className="ml-2 text-xs border-white/20 text-gray-300">
            {executionTime}ms
          </Badge>
        )}
      </div>
      {isRunning && (
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
          <span className="text-green-400 text-sm">Running...</span>
        </div>
      )}
    </div>
    <div className="p-4 h-[calc(100%-4rem)] overflow-auto">
      <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
        {output || 'Click "Run Code" to see output...'}
      </pre>
    </div>
  </div>
)

const FileExplorer = ({ files, activeFile, onFileSelect, onNewFile, onDeleteFile }) => (
  <Card className="bg-gray-900/50 border-white/10 backdrop-blur-xl h-full">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-white text-sm flex items-center">
          <Folder className="w-4 h-4 mr-2" />
          Files
        </CardTitle>
        <Button size="sm" variant="ghost" onClick={onNewFile} className="text-white hover:bg-white/10 h-6 w-6 p-0">
          <Plus className="w-3 h-3" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-1">
      {files.map((file, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
            activeFile === index ? "bg-cyan-500/20 text-cyan-300" : "text-gray-300 hover:bg-white/10"
          }`}
          onClick={() => onFileSelect(index)}
        >
          <div className="flex items-center">
            <FileText className="w-3 h-3 mr-2" />
            <span className="text-xs">{file.name}</span>
          </div>
          {files.length > 1 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteFile(index)
              }}
              className="text-gray-400 hover:text-red-400 h-4 w-4 p-0"
            >
              <Trash2 className="w-2 h-2" />
            </Button>
          )}
        </div>
      ))}
    </CardContent>
  </Card>
)

const ExampleProjects = ({ setCode, setOutput, language }) => {
  const examples = {
    python: [
      {
        title: "Projectile Motion Simulator",
        description: "Calculate and visualize projectile trajectories",
        code: `import math

def simulate_projectile(v0, angle, steps=100):
    angle_rad = math.radians(angle)
    g = 9.81
    
    # Calculate flight time
    t_flight = 2 * v0 * math.sin(angle_rad) / g
    
    # Create time points
    time_points = [i * t_flight / steps for i in range(steps + 1)]
    
    # Calculate positions
    positions = []
    for t in time_points:
        x = v0 * math.cos(angle_rad) * t
        y = v0 * math.sin(angle_rad) * t - 0.5 * g * t**2
        if y >= 0:  # Only while above ground
            positions.append((x, y))
    
    return positions, t_flight

# Example usage
velocity = 50  # m/s
launch_angle = 45  # degrees

positions, flight_time = simulate_projectile(velocity, launch_angle)

print(f"Launch velocity: {velocity} m/s")
print(f"Launch angle: {launch_angle}°")
print(f"Flight time: {flight_time:.2f} seconds")
print(f"Maximum range: {positions[-1][0]:.2f} meters")
print(f"Maximum height: {max(pos[1] for pos in positions):.2f} meters")
print(f"\\nTrajectory points (first 10):")
for i, (x, y) in enumerate(positions[:10]):
    print(f"  t={i*flight_time/100:.1f}s: x={x:.1f}m, y={y:.1f}m")`,
      },
      {
        title: "DNA Sequence Analyzer",
        description: "Analyze DNA sequences and find patterns",
        code: `def analyze_dna(sequence):
    sequence = sequence.upper().replace(' ', '')
    
    # Count nucleotides
    counts = {'A': 0, 'T': 0, 'G': 0, 'C': 0}
    for nucleotide in sequence:
        if nucleotide in counts:
            counts[nucleotide] += 1
    
    total = sum(counts.values())
    
    # Calculate percentages
    percentages = {k: (v/total)*100 for k, v in counts.items()}
    
    # Find complement
    complement_map = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'}
    complement = ''.join(complement_map.get(n, n) for n in sequence)
    
    # Find repeating patterns
    patterns = []
    for length in range(2, min(6, len(sequence)//2)):
        for i in range(len(sequence) - length):
            pattern = sequence[i:i+length]
            if sequence.count(pattern) > 1 and pattern not in [p[0] for p in patterns]:
                positions = [j for j in range(len(sequence)-length+1) 
                           if sequence[j:j+length] == pattern]
                patterns.append((pattern, positions))
    
    return counts, percentages, complement, patterns

# Example DNA sequence
dna_sequence = "ATCGATCGATCGATCGAAATCG"

counts, percentages, complement, patterns = analyze_dna(dna_sequence)

print(f"DNA Sequence: {dna_sequence}")
print(f"Length: {len(dna_sequence)} base pairs")
print("\\nNucleotide counts:")
for nucleotide, count in counts.items():
    print(f"  {nucleotide}: {count} ({percentages[nucleotide]:.1f}%)")
print(f"\\nComplement: {complement}")

# Check for GC content (important in genetics)
gc_content = percentages['G'] + percentages['C']
print(f"\\nGC Content: {gc_content:.1f}%")

if patterns:
    print("\\nRepeating patterns found:")
    for pattern, positions in patterns[:3]:
        print(f"  '{pattern}' at positions: {positions}")`,
      },
      {
        title: "Mathematical Function Plotter",
        description: "Plot and analyze mathematical functions",
        code: `import math

def evaluate_function(x, expression):
    """Safely evaluate mathematical expressions"""
    try:
        # Replace common math functions
        expr = expression.replace('^', '**')
        expr = expr.replace('sin', 'math.sin')
        expr = expr.replace('cos', 'math.cos')
        expr = expr.replace('tan', 'math.tan')
        expr = expr.replace('log', 'math.log')
        expr = expr.replace('sqrt', 'math.sqrt')
        expr = expr.replace('pi', 'math.pi')
        expr = expr.replace('e', 'math.e')
        expr = expr.replace('x', str(x))
        
        return eval(expr)
    except:
        return None

def plot_function(expression, x_min=-10, x_max=10, points=50):
    """Generate points for plotting a function"""
    step = (x_max - x_min) / points
    plot_points = []
    
    for i in range(points + 1):
        x = x_min + i * step
        y = evaluate_function(x, expression)
        if y is not None:
            plot_points.append((x, y))
    
    return plot_points

def analyze_function(expression, x_min=-10, x_max=10):
    """Analyze function properties"""
    points = plot_function(expression, x_min, x_max, 100)
    
    if not points:
        return None
    
    y_values = [point[1] for point in points]
    
    analysis = {
        'min_y': min(y_values),
        'max_y': max(y_values),
        'range': max(y_values) - min(y_values),
        'points_count': len(points)
    }
    
    return analysis

# Example usage
function_expr = "x**2 - 4*x + 3"  # Quadratic function
print(f"Analyzing function: f(x) = {function_expr}")

# Generate plot points
points = plot_function(function_expr, -2, 6, 20)
print(f"\\nFunction values (sample points):")
for i, (x, y) in enumerate(points[:10]):
    print(f"  f({x:.1f}) = {y:.2f}")

# Analyze the function
analysis = analyze_function(function_expr, -2, 6)
if analysis:
    print(f"\\nFunction Analysis:")
    print(f"  Minimum value: {analysis['min_y']:.2f}")
    print(f"  Maximum value: {analysis['max_y']:.2f}")
    print(f"  Range: {analysis['range']:.2f}")
    print(f"  Points calculated: {analysis['points_count']}")

# Find roots (where function crosses x-axis)
print(f"\\nLooking for roots (y ≈ 0):")
for x, y in points:
    if abs(y) < 0.1:  # Close to zero
        print(f"  Root near x = {x:.1f}, y = {y:.3f}")`,
      },
    ],
    javascript: [
      {
        title: "Interactive Calculator",
        description: "Build a scientific calculator with JavaScript",
        code: `class ScientificCalculator {
    constructor() {
        this.memory = 0;
        this.history = [];
    }
    
    // Basic operations
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { 
        if (b === 0) throw new Error("Division by zero");
        return a / b; 
    }
    
    // Advanced operations
    power(base, exponent) { return Math.pow(base, exponent); }
    sqrt(x) { return Math.sqrt(x); }
    factorial(n) {
        if (n < 0) throw new Error("Factorial of negative number");
        if (n === 0 || n === 1) return 1;
        return n * this.factorial(n - 1);
    }
    
    // Trigonometric functions (in radians)
    sin(x) { return Math.sin(x); }
    cos(x) { return Math.cos(x); }
    tan(x) { return Math.tan(x); }
    
    // Convert degrees to radians
    toRadians(degrees) { return degrees * (Math.PI / 180); }
    
    // Evaluate expression
    evaluate(expression) {
        try {
            // Simple expression evaluator
            const result = eval(expression);
            this.history.push(\`\${expression} = \${result}\`);
            return result;
        } catch (error) {
            throw new Error("Invalid expression");
        }
    }
    
    // Memory operations
    memoryStore(value) { this.memory = value; }
    memoryRecall() { return this.memory; }
    memoryClear() { this.memory = 0; }
    
    // Get calculation history
    getHistory() { return this.history; }
}

// Example usage
const calc = new ScientificCalculator();

console.log("=== Scientific Calculator Demo ===");

// Basic operations
console.log(\`Addition: 15 + 25 = \${calc.add(15, 25)}\`);
console.log(\`Subtraction: 50 - 18 = \${calc.subtract(50, 18)}\`);
console.log(\`Multiplication: 7 * 8 = \${calc.multiply(7, 8)}\`);
console.log(\`Division: 100 / 4 = \${calc.divide(100, 4)}\`);

// Advanced operations
console.log(\`\\nAdvanced Operations:\`);
console.log(\`Power: 2^8 = \${calc.power(2, 8)}\`);
console.log(\`Square root: √64 = \${calc.sqrt(64)}\`);
console.log(\`Factorial: 5! = \${calc.factorial(5)}\`);

// Trigonometry
console.log(\`\\nTrigonometry (30 degrees):\`);
const angle30 = calc.toRadians(30);
console.log(\`sin(30°) = \${calc.sin(angle30).toFixed(4)}\`);
console.log(\`cos(30°) = \${calc.cos(angle30).toFixed(4)}\`);
console.log(\`tan(30°) = \${calc.tan(angle30).toFixed(4)}\`);

// Expression evaluation
console.log(\`\\nExpression Evaluation:\`);
console.log(\`(5 + 3) * 2 = \${calc.evaluate("(5 + 3) * 2")}\`);
console.log(\`Math.PI * 2 = \${calc.evaluate("Math.PI * 2")}\`);

// Memory operations
calc.memoryStore(42);
console.log(\`\\nMemory Operations:\`);
console.log(\`Stored in memory: 42\`);
console.log(\`Memory recall: \${calc.memoryRecall()}\`);

// Show history
console.log(\`\\nCalculation History:\`);
calc.getHistory().forEach((entry, index) => {
    console.log(\`  \${index + 1}. \${entry}\`);
});`,
      },
      {
        title: "Data Visualization",
        description: "Create charts and graphs with JavaScript",
        code: `class DataVisualizer {
    constructor() {
        this.datasets = [];
    }
    
    // Add dataset
    addDataset(name, data) {
        this.datasets.push({ name, data });
    }
    
    // Calculate statistics
    calculateStats(data) {
        const sorted = [...data].sort((a, b) => a - b);
        const sum = data.reduce((acc, val) => acc + val, 0);
        const mean = sum / data.length;
        
        // Calculate median
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0 
            ? (sorted[mid - 1] + sorted[mid]) / 2 
            : sorted[mid];
        
        // Calculate standard deviation
        const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
        const stdDev = Math.sqrt(variance);
        
        return {
            count: data.length,
            sum: sum,
            mean: mean,
            median: median,
            min: Math.min(...data),
            max: Math.max(...data),
            range: Math.max(...data) - Math.min(...data),
            stdDev: stdDev
        };
    }
    
    // Create ASCII histogram
    createHistogram(data, bins = 10) {
        const min = Math.min(...data);
        const max = Math.max(...data);
        const binWidth = (max - min) / bins;
        
        const histogram = new Array(bins).fill(0);
        
        data.forEach(value => {
            const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
            histogram[binIndex]++;
        });
        
        const maxCount = Math.max(...histogram);
        const scale = 50; // Max bar length
        
        console.log("\\nHistogram:");
        for (let i = 0; i < bins; i++) {
            const binStart = min + i * binWidth;
            const binEnd = min + (i + 1) * binWidth;
            const barLength = Math.round((histogram[i] / maxCount) * scale);
            const bar = "█".repeat(barLength);
            console.log(\`[\${binStart.toFixed(1)}-\${binEnd.toFixed(1)}]: \${bar} (\${histogram[i]})\`);
        }
    }
    
    // Generate sample data
    generateRandomData(count, min = 0, max = 100) {
        return Array.from({ length: count }, () => 
            Math.random() * (max - min) + min
        );
    }
    
    // Linear regression
    linearRegression(xData, yData) {
        const n = xData.length;
        const sumX = xData.reduce((a, b) => a + b, 0);
        const sumY = yData.reduce((a, b) => a + b, 0);
        const sumXY = xData.reduce((sum, x, i) => sum + x * yData[i], 0);
        const sumXX = xData.reduce((sum, x) => sum + x * x, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // Calculate R-squared
        const yMean = sumY / n;
        const totalSumSquares = yData.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
        const residualSumSquares = yData.reduce((sum, y, i) => {
            const predicted = slope * xData[i] + intercept;
            return sum + Math.pow(y - predicted, 2);
        }, 0);
        const rSquared = 1 - (residualSumSquares / totalSumSquares);
        
        return { slope, intercept, rSquared };
    }
}

// Example usage
const viz = new DataVisualizer();

console.log("=== Data Visualization Demo ===");

// Generate sample datasets
const salesData = [120, 135, 148, 162, 155, 171, 189, 201, 195, 210, 225, 240];
const temperatureData = viz.generateRandomData(20, 15, 35);

viz.addDataset("Monthly Sales", salesData);
viz.addDataset("Temperature Readings", temperatureData);

// Analyze sales data
console.log("\\n📊 Sales Data Analysis:");
const salesStats = viz.calculateStats(salesData);
console.log(\`Count: \${salesStats.count}\`);
console.log(\`Mean: \${salesStats.mean.toFixed(2)}\`);
console.log(\`Median: \${salesStats.median.toFixed(2)}\`);
console.log(\`Range: \${salesStats.min} - \${salesStats.max}\`);
console.log(\`Standard Deviation: \${salesStats.stdDev.toFixed(2)}\`);

// Create histogram for temperature data
console.log("\\n🌡️ Temperature Distribution:");
viz.createHistogram(temperatureData, 8);

// Linear regression example
console.log("\\n📈 Linear Regression (Sales Trend):");
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const regression = viz.linearRegression(months, salesData);
console.log(\`Equation: y = \${regression.slope.toFixed(2)}x + \${regression.intercept.toFixed(2)}\`);
console.log(\`R-squared: \${regression.rSquared.toFixed(4)}\`);
console.log(\`Trend: \${regression.slope > 0 ? 'Increasing' : 'Decreasing'} by \${Math.abs(regression.slope).toFixed(2)} units per month\`);`,
      },
    ],
  }

  const currentExamples = examples[language] || examples.python

  const loadExample = (example) => {
    setCode(example.code)
    setOutput("")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
        Example Projects
      </h3>
      {currentExamples.map((example, index) => (
        <Card
          key={index}
          className="bg-gray-900/30 border-white/10 hover:bg-gray-800/40 transition-colors cursor-pointer group"
          onClick={() => loadExample(example)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base group-hover:text-cyan-300 transition-colors">
              {example.title}
            </CardTitle>
            <p className="text-gray-400 text-sm">{example.description}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default function PlaygroundPage() {
  const [files, setFiles] = useState([{ name: "main.py", content: "", language: "python" }])
  const [activeFile, setActiveFile] = useState(0)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [language, setLanguage] = useState("python")
  const [executionTime, setExecutionTime] = useState(null)
  const [settings, setSettings] = useState({
    fontSize: 14,
    theme: "dark",
    autoSave: true,
  })

  const currentFile = files[activeFile]

  const updateCurrentFile = (content) => {
    const newFiles = [...files]
    newFiles[activeFile] = { ...newFiles[activeFile], content }
    setFiles(newFiles)
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running code...\n")
    const startTime = Date.now()

    // Enhanced code execution simulation
    setTimeout(
      () => {
        try {
          const code = currentFile.content
          let result = ""

          if (language === "python") {
            // Enhanced Python interpreter simulation
            const lines = code.split("\n")
            const variables = {}
            const functions = {}

            for (const line of lines) {
              const trimmedLine = line.trim()

              // Skip comments and empty lines
              if (trimmedLine.startsWith("#") || !trimmedLine) continue

              // Handle print statements with better parsing
              if (trimmedLine.includes("print(")) {
                const printMatch = trimmedLine.match(/print$$(.*)$$/)
                if (printMatch) {
                  let content = printMatch[1]

                  // Handle f-strings
                  if (content.includes('f"') || content.includes("f'")) {
                    const fStringMatch = content.match(/f["'](.*)["']/)
                    if (fStringMatch) {
                      let fString = fStringMatch[1]
                      // Replace {variable:.2f} patterns
                      fString = fString.replace(/\{(\w+):(\.?\d*f?)\}/g, (match, varName, format) => {
                        if (variables[varName] !== undefined) {
                          const value = variables[varName]
                          if (format.includes("f")) {
                            const decimals = format.match(/\.(\d+)f/) ? Number.parseInt(format.match(/\.(\d+)f/)[1]) : 2
                            return typeof value === "number" ? value.toFixed(decimals) : value
                          }
                          return value
                        }
                        return match
                      })
                      // Replace simple {variable} patterns
                      fString = fString.replace(/\{(\w+)\}/g, (match, varName) => {
                        return variables[varName] !== undefined ? variables[varName] : match
                      })
                      result += fString + "\n"
                    }
                  } else {
                    // Handle regular strings and variables
                    content = content.replace(/["']/g, "")
                    if (variables[content] !== undefined) {
                      result += variables[content] + "\n"
                    } else {
                      result += content + "\n"
                    }
                  }
                }
              }

              // Handle variable assignments
              if (trimmedLine.includes("=") && !trimmedLine.includes("==") && !trimmedLine.startsWith("#")) {
                const assignMatch = trimmedLine.match(/(\w+)\s*=\s*(.+)/)
                if (assignMatch) {
                  const varName = assignMatch[1]
                  const value = assignMatch[2]

                  // Enhanced value parsing
                  if (!isNaN(value)) {
                    variables[varName] = Number.parseFloat(value)
                  } else if (value.includes('"') || value.includes("'")) {
                    variables[varName] = value.replace(/["']/g, "")
                  } else if (value.includes("[") && value.includes("]")) {
                    // Simple list parsing
                    try {
                      variables[varName] = JSON.parse(value.replace(/'/g, '"'))
                    } catch {
                      variables[varName] = value
                    }
                  } else {
                    variables[varName] = value
                  }
                }
              }

              // Handle function calls and mathematical operations
              if (trimmedLine.includes("math.")) {
                // Simulate math operations
                const mathOps = {
                  "math.sin": Math.sin,
                  "math.cos": Math.cos,
                  "math.tan": Math.tan,
                  "math.sqrt": Math.sqrt,
                  "math.pi": Math.PI,
                  "math.e": Math.E,
                }

                for (const [op, func] of Object.entries(mathOps)) {
                  if (trimmedLine.includes(op)) {
                    // Simple math operation simulation
                    result += `Mathematical operation detected: ${op}\n`
                  }
                }
              }
            }

            setOutput(result || "Code executed successfully!\n(Add print statements to see output)")
          } else if (language === "javascript") {
            // Enhanced JavaScript execution simulation
            const lines = code.split("\n")
            let result = ""

            for (const line of lines) {
              if (line.trim().startsWith("console.log(")) {
                const logMatch = line.match(/console\.log$$(.*)$$/)
                if (logMatch) {
                  let content = logMatch[1]
                  // Handle template literals
                  if (content.includes("`")) {
                    content = content.replace(/`([^`]*)`/g, "$1")
                  }
                  content = content.replace(/["'`]/g, "")
                  result += content + "\n"
                }
              }
            }

            setOutput(result || "JavaScript code executed successfully!\n(Add console.log statements to see output)")
          }

          const endTime = Date.now()
          setExecutionTime(endTime - startTime)
        } catch (error) {
          setOutput("Error executing code: " + error.message)
          setExecutionTime(null)
        } finally {
          setIsRunning(false)
        }
      },
      1000 + Math.random() * 1000,
    ) // Simulate variable execution time
  }

  const resetCode = () => {
    updateCurrentFile("")
    setOutput("")
    setExecutionTime(null)
  }

  const saveCode = () => {
    const blob = new Blob([currentFile.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = currentFile.name
    a.click()
    URL.revokeObjectURL(url)
  }

  const newFile = () => {
    const fileNumber = files.length + 1
    const extension = language === "python" ? "py" : "js"
    const newFile = {
      name: `file${fileNumber}.${extension}`,
      content: "",
      language: language,
    }
    setFiles([...files, newFile])
    setActiveFile(files.length)
  }

  const deleteFile = (index) => {
    if (files.length > 1) {
      const newFiles = files.filter((_, i) => i !== index)
      setFiles(newFiles)
      if (activeFile >= newFiles.length) {
        setActiveFile(newFiles.length - 1)
      }
    }
  }

  const shareCode = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.content)
      setOutput("Code copied to clipboard!")
    } catch (err) {
      setOutput("Failed to copy code to clipboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl">
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
                <Code className="w-6 h-6 text-cyan-400" />
                <span className="text-xl font-bold text-white">Code Playground</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={shareCode} className="text-white hover:bg-white/10">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" onClick={saveCode} className="text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-12rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <FileExplorer
              files={files}
              activeFile={activeFile}
              onFileSelect={setActiveFile}
              onNewFile={newFile}
              onDeleteFile={deleteFile}
            />
            <ExampleProjects setCode={updateCurrentFile} setOutput={setOutput} language={language} />
          </div>

          {/* Main Coding Area */}
          <div className="lg:col-span-4">
            <div className="h-full flex flex-col">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Tabs value={language} onValueChange={setLanguage} className="w-auto">
                    <TabsList className="bg-gray-900/50 border border-white/10">
                      <TabsTrigger
                        value="python"
                        className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
                      >
                        Python
                      </TabsTrigger>
                      <TabsTrigger
                        value="javascript"
                        className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
                      >
                        JavaScript
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex items-center space-x-2">
                    <Input
                      value={currentFile.name}
                      onChange={(e) => {
                        const newFiles = [...files]
                        newFiles[activeFile] = { ...newFiles[activeFile], name: e.target.value }
                        setFiles(newFiles)
                      }}
                      className="bg-gray-800/50 border-white/20 text-white text-sm w-32"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    onClick={resetCode}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    onClick={runCode}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                </div>
              </div>

              {/* Code Editor and Output */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="h-full">
                  <Card className="h-full bg-gray-900/50 border-white/10 backdrop-blur-xl overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-sm">Code Editor</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 h-6 w-6 p-0">
                            <Maximize className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 h-[calc(100%-4rem)]">
                      <CodeEditor
                        value={currentFile.content}
                        onChange={updateCurrentFile}
                        language={language}
                        theme={settings.theme}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full">
                  <OutputPanel output={output} isRunning={isRunning} executionTime={executionTime} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

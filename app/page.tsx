"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Star,
  Tag,
  HelpCircle,
  SaveAllIcon,
  MoonIcon,
  ArrowRight,
  Github,
  Code2,
  ChevronRight,
  Twitter,
  Linkedin
} from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const { theme } = useTheme()

  const handleSignIn = async () => {
    router.push("/pages/repos")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] dark:bg-[#121212] text-[#1a1a1a] dark:text-[#e5e5e5] transition-colors duration-300">
      <main className="pt-10">
        {/* Hero Section */}
        <section className="relative py-10 px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6 mb-12"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="text-amber-600 dark:text-amber-500">Open</span>Findr
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-[#3a3a3a] dark:text-[#a0a0a0] max-w-3xl mx-auto">
                Discover the world's best open-source projects — fast, filtered, and frictionless.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button
                  onClick={handleSignIn}
                  size="lg"
                  className="bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-8 py-6 h-12 rounded-md"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-4xl"
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-[#e5e5e5] dark:border-[#2a2a2a]">
                <Image
                  src="/landingImage.png"
                  width={1200}
                  height={675}
                  alt="OpenFindr interface"
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent dark:from-[#121212]/40"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#161616]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight">Powerful Developer Tools</h2>
              <p className="mt-4 text-[#3a3a3a] dark:text-[#a0a0a0] max-w-2xl mx-auto">
                Streamlined features designed to accelerate your open source contribution journey
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={item}>
                  <Card className="bg-[#f8f8f8] dark:bg-[#1a1a1a] border-[#e5e5e5] dark:border-[#2a2a2a] hover:border-amber-500/50 dark:hover:border-amber-500/30 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl font-medium">
                        <feature.icon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-[#3a3a3a] dark:text-[#a0a0a0] text-sm">
                      {feature.description}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f8f8f8] dark:bg-[#121212]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight">How OpenFindr Works</h2>
              <p className="mt-4 text-[#3a3a3a] dark:text-[#a0a0a0] max-w-2xl mx-auto">
                A simple, intuitive process to connect you with the perfect open source projects
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto"
            >
              {steps.map((step, index) => (
                <motion.div key={step.title} variants={item} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-6">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-[#3a3a3a] dark:text-[#a0a0a0] text-sm">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#161616]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold tracking-tight">Find Beginner-Friendly Projects</h2>
                <p className="text-[#3a3a3a] dark:text-[#a0a0a0]">
                  OpenFindr makes it easy to discover repositories with "good first issue" tags, helping newcomers take their first steps in open source contribution.
                </p>
                <ul className="space-y-4">
                  {[
                    "Filter projects by beginner-friendly issues and labels",
                    "See clearly marked difficulty levels for each issue",
                    "Get recommended projects that match your experience level",
                    "Find mentored issues where maintainers offer guidance",
                    "Access step-by-step contribution guides for popular repos"
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <ChevronRight className="w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[#3a3a3a] dark:text-[#a0a0a0]">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button
                    onClick={handleSignIn}
                    className="bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
                  >
                    Find Beginner Issues
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg border border-[#e5e5e5] dark:border-[#2a2a2a]">
                  <Image
                    src="/beginerRepo.png"
                    width={600}
                    height={400}
                    alt="Beginner repository interface"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f8f8f8] dark:bg-[#121212]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to find your next project?</h2>
            <p className="text-lg text-[#3a3a3a] dark:text-[#a0a0a0] max-w-2xl mx-auto">
              Join OpenFindr today and connect with projects that will enhance your skills and expand your portfolio
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-8 h-12 rounded-md w-full sm:w-auto"
                onClick={handleSignIn}
              >
                <Github className="mr-2 h-5 w-5" />
                Connect with GitHub
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

    </div>
  )
}

// Features data
const features = [
  {
    icon: Search,
    title: "Language Filtering",
    description:
      "Find projects in popular programming languages like JavaScript, Python, Ruby, and more that match your skill level.",
  },
  {
    icon: Star,
    title: "Popularity Ranking",
    description:
      "Filter projects by popularity levels with our advanced ranking algorithm that considers community engagement and activity.",
  },
  {
    icon: Tag,
    title: "Keyword Search",
    description:
      "Use precise keywords to find projects that align with your interests and the specific skills you want to develop.",
  },
  {
    icon: HelpCircle,
    title: "Beginner-Friendly Issues",
    description:
      "Discover issues specifically tagged for newcomers across thousands of repositories to make your first contribution.",
  },
  {
    icon: SaveAllIcon,
    title: "Project Bookmarking",
    description:
      "Save your favorite repositories and track issues you want to work on with our intuitive bookmarking system.",
  },
  {
    icon: MoonIcon,
    title: "Dark Mode",
    description:
      "Switch to dark mode for a comfortable reading experience during late-night coding sessions with our ergonomic design.",
  },
]

// How it works steps
const steps = [
  {
    title: "Connect",
    description: "Sign in with your GitHub account to get started with OpenFindr in seconds.",
  },
  {
    title: "Discover",
    description: "Use our powerful filters to find projects that match your skills and interests.",
  },
  {
    title: "Contribute",
    description: "Start contributing to open source with curated, beginner-friendly issues.",
  },
]

// Benefits list
const benefits = [
  "Find projects that perfectly match your skill level and interests",
  "Save time with our intelligent filtering and recommendation system",
  "Track your contributions and build your open source portfolio",
  "Connect with maintainers and other contributors",
  "Discover new technologies and expand your skillset",
]


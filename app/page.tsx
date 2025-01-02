'use client'

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Star, Tag, HelpCircle, SaveAllIcon, MoonIcon, ArrowRight, Github, Code2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"

export default function Home() {
  const router = useRouter()
  const { theme } = useTheme()
  


   const handleSignIn = async () => {
      const result = await signIn('github', { redirect: false })
      if (result?.ok) {
        router.push('/pages/repos')
      }
    }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#101521] text-gray-900 dark:text-white transition-colors duration-300">
      <main className="relative">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-7xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Code2 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                <h1 className="text-5xl md:text-6xl font-bold">OpenSox</h1>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Your Gateway to Open Source
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Find the perfect open source projects for beginners and start your contribution journey today
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                onClick={handleSignIn} 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1c2438] transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Everything You Need
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Powerful features to help you find and contribute to open source projects
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
                  <Card className="bg-gray-50 dark:bg-[#212b42] border-gray-200 dark:border-[#2a3655] hover:border-blue-400/50 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-700 dark:text-gray-300">
                      {feature.description}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-[#141927] transition-colors duration-300">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Ready to start your open source journey?
            </h2>
            <p className="text-lg text-gray-700 dark:text-blue-100">
              Join OpenSox today and become part of the open source community!
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-blue-600 dark:hover:bg-blue-50 text-white px-8 py-6 text-lg rounded-full"
              onClick={handleSignIn}
            >
              <Github className="mr-2 h-5 w-5" />
              Sign Up with GitHub
            </Button>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

const features = [
  {
    icon: Search,
    title: "Search by Languages",
    description: "Find projects in popular programming languages like JavaScript, Python, Ruby, and more."
  },
  {
    icon: Star,
    title: "Search by Popularity",
    description: "Filter projects by popularity levels to find the right fit for your skill level."
  },
  {
    icon: Tag,
    title: "Search by Keywords",
    description: "Use keywords to find projects that match your interests or the skills you want to develop."
  },
  {
    icon: HelpCircle,
    title: "Beginner Repos",
    description: "Discover beginner-friendly issues from popular open source projects to start contributing."
  },
  {
    icon: SaveAllIcon,
    title: "Saved Repositories",
    description: "Bookmark your favorite projects and keep track of issues you want to work on."
  },
  {
    icon: MoonIcon,
    title: "Dark Mode",
    description: "Switch to dark mode for a comfortable reading experience during late-night coding sessions."
  }
]


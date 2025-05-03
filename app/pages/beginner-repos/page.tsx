'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, GitPullRequest, Calendar, Book, ExternalLink, Search } from 'lucide-react'
import { SelectLanguage } from '@/app/components/SelectComponent'
import { Issue } from '@/types/BeginnerTypes'
import { motion } from "framer-motion"
import { useTheme } from 'next-themes'
import { Input } from "@/components/ui/input"
import debounce from 'lodash/debounce'
import { useSession } from 'next-auth/react'

const BeginnerRepos = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState('javascript')
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme } = useTheme()

  const fetchIssues = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/fetch-good-first-issues/?language=${language}&search=${searchQuery}`
      )
      const data = await response.json()
      setIssues(data.items)
    } catch (err: any) {
      console.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Debounce search to prevent too many API calls
  const debouncedFetch = debounce(fetchIssues, 500)

  useEffect(() => {
    debouncedFetch()
    return () => debouncedFetch.cancel()
  }, [language, page, searchQuery])

  // Animation variants
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f8f8f8] dark:bg-[#121212]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600 dark:text-amber-500 mx-auto" />
          <p className="text-[#3a3a3a] dark:text-[#a0a0a0]">Finding the best issues for you...</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" min-h-screen bg-[#f8f8f8] dark:bg-[#121212] text-[#1a1a1a] dark:text-[#e5e5e5] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="bg-white dark:bg-[#161616] rounded-lg p-6 shadow-md border border-[#e5e5e5] dark:border-[#2a2a2a]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="text-amber-600 dark:text-amber-500">Beginner-</span>Friendly Issues
              </h1>
              
              <div className="relative flex items-center max-w-md">
                <Search className="absolute left-3 h-4 w-4 text-[#3a3a3a] dark:text-[#a0a0a0]" />
                <Input
                  type="text"
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2a2a2a] rounded-md focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="w-full md:w-64">
              <SelectLanguage onChange={setLanguage} />
            </div>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6"
          >
            {issues.length > 0 ? (
              issues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  variants={item}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border border-[#e5e5e5] dark:border-[#2a2a2a] hover:border-amber-500/50 dark:hover:border-amber-500/30 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-[#1a1a1a]">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-grow">
                          <a 
                            href={issue.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-2 group"
                          >
                            <GitPullRequest className="w-5 h-5" />
                            {issue.title}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                          <a 
                            href={issue.repository.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#3a3a3a] dark:text-[#a0a0a0] hover:text-[#1a1a1a] dark:hover:text-[#e5e5e5] flex items-center gap-1"
                          >
                            <Book className="w-4 h-4" />
                            {issue.repository.full_name}
                          </a>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {issue.labels.map((label) => {
                          // Process colors for labels
                          const bgColor = `#${label.color}`
                          const textColor = parseInt(label.color, 16) > 0x7FFFFF ? '#000000' : '#FFFFFF'
                          
                          return (
                            <Badge 
                              key={label.id}
                              className="px-2 py-1 rounded-full text-sm font-medium"
                              style={{
                                backgroundColor: theme === 'dark' ? `${bgColor}80` : bgColor,
                                color: textColor,
                              }}
                            >
                              {label.name}
                            </Badge>
                          )
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#3a3a3a] dark:text-[#a0a0a0]">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Created {new Date(issue.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div variants={item}>
                <Card className="text-center py-12 bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2a2a2a]">
                  <CardContent>
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Search className="w-10 h-10 text-amber-600 dark:text-amber-500 opacity-50" />
                      <p className="text-[#3a3a3a] dark:text-[#a0a0a0]">
                        No issues found. Try adjusting your search or selecting a different language.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
          
          {/* Pagination or load more could be added here */}
        </motion.div>
      </div>
    </div>
  )
}

export default BeginnerRepos
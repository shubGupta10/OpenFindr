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
import SavedRepositories from '@/app/components/SavedRepos'
import { useSession } from 'next-auth/react'

const BeginnerRepos = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState('javascript')
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme } = useTheme()
  const { data: session } = useSession()

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Please wait a sec...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-black dark:to-white bg-clip-text text-transparent">
                Beginner-Friendly Issues
              </h1>
              
              <div className="relative flex items-center max-w-md">
                <Search className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="w-full md:w-64">
              <SelectLanguage onChange={setLanguage} />
            </div>
          </div>

          <div className="grid gap-6">
            {issues.length > 0 ? (
              issues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-grow">
                          <a 
                            href={issue.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 group"
                          >
                            <GitPullRequest className="w-5 h-5" />
                            {issue.title}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                          <a 
                            href={issue.repository.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1"
                          >
                            <Book className="w-4 h-4" />
                            {issue.repository.full_name}
                          </a>
                        </div>
                        {/* {session && session.user && session.user.email && (
                          <SavedRepositories repo={issue} userEmail={session.user.email} />
                        )} */}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {issue.labels.map((label) => {
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
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
              <Card className="text-center py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    No issues found. Try adjusting your search or selecting a different language.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeginnerRepos


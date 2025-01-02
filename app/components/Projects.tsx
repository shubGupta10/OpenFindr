import React, { useEffect, useState } from "react"
import { SelectLanguage, SelectKeywords, SelectPopularity } from "./SelectComponent"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GithubIcon, Star, GitForkIcon, Loader2, Search, ExternalLink, Book } from 'lucide-react'
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Repository } from "@/types/Repository"
import { useSession } from "next-auth/react"
import debounce from 'lodash/debounce'
import SavedRepositories from "@/app/components/SavedRepos"

export default function Projects() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectLanguage, setSelectLanguage] = useState<string | null>("javascript")
  const [selectedPopularity, setSelectedPopularity] = useState<string | null>("high")
  const [selectedKeywords, setSelectedKeywords] = useState<string | null>("frontend")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { data: session } = useSession()
  console.log(session);
  

  const fetchRepositories = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/repositories?language=${selectLanguage}&popularity=${selectedPopularity}&keyword=${selectedKeywords}&search=${searchQuery}`
      )
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      setRepositories(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetch = debounce(fetchRepositories, 500)

  useEffect(() => {
    debouncedFetch()
    return () => debouncedFetch.cancel()
  }, [selectLanguage, selectedPopularity, selectedKeywords, searchQuery])

  const handleLanguageChange = (value: string) => setSelectLanguage(value)
  const handleChangePopularity = (value: string) => setSelectedPopularity(value)
  const handleChangeKeywords = (value: string) => setSelectedKeywords(value)

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
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-black dark:to-white bg-clip-text text-transparent">
                  Top GitHub Projects
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover popular open-source projects filtered by your preferences
                </p>
              </div>
              
              <div className="relative flex items-center max-w-md">
                <Search className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectLanguage onChange={handleLanguageChange} />
              <SelectPopularity onChange={handleChangePopularity} />
              <SelectKeywords onChange={handleChangeKeywords} />
            </div>
          </div>

          <div className="grid gap-6">
            {error ? (
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-400">Error Occurred</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-500 flex items-center gap-2">
                    <span className="rounded-full bg-red-100 dark:bg-red-900 p-1">⚠️</span>
                    {error}
                  </p>
                </CardContent>
              </Card>
              
            ) : repositories.length > 0 ? (
              repositories.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <a 
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 group"
                          >
                            <Book className="w-5 h-5" />
                            {repo.name}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {repo.description || "No description available."}
                          </p>
                        </div>
                        {session && session.user && (
                          <SavedRepositories repo={repo} userEmail={session.user.email || ''} />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                          <Star className="w-4 h-4" />
                          <span>{repo.stargazers_count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
                          <GitForkIcon className="w-4 h-4" />
                          <span>{repo.forks_count.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button 
                        asChild 
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
                      >
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 justify-center"
                        >
                          <GithubIcon className="w-4 h-4" />
                          View Repository
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="text-center py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    No repositories found. Try adjusting your filters or search query.
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


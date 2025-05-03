'use client'

import React, { useEffect, useState } from "react"
import { SelectLanguage, SelectKeywords, SelectPopularity } from "./SelectComponent"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GithubIcon, Star, GitForkIcon, Loader2, Search, ExternalLink, Book, Save, Code2 } from 'lucide-react'
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Repository } from "@/types/Repository"
import { signIn, useSession } from "next-auth/react"
import debounce from 'lodash/debounce'
import { SavedRepositories } from "@/app/components/SavedRepos"
import { useRouter } from "next/navigation"

export default function Projects() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectLanguage, setSelectLanguage] = useState<string | null>("javascript")
  const [selectedPopularity, setSelectedPopularity] = useState<string | null>("high")
  const [selectedKeywords, setSelectedKeywords] = useState<string | null>("frontend")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { data: session } = useSession()

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
  const router = useRouter()

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
          <p className="text-[#3a3a3a] dark:text-[#a0a0a0]">Please wait a sec...</p>
        </div>
      </div>
    )
  }

  const handleSignIn = async () => {
    const result = await signIn('github', { redirect: false })
    if (result?.ok) {
      router.push('/pages/repos')
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] dark:bg-[#121212] text-[#1a1a1a] dark:text-[#e5e5e5] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#e5e5e5] dark:border-[#2a2a2a]">
            <div className="flex flex-col space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Code2 className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    <span className="text-amber-600 dark:text-amber-500">Open</span>Source Projects
                  </h1>
                </div>
                <p className="text-sm text-[#3a3a3a] dark:text-[#a0a0a0]">
                  Discover popular open-source projects filtered by your preferences
                </p>
              </div>

              <div className="relative flex items-center w-full lg:w-auto">
                <Search className="absolute left-3 h-4 w-4 text-[#3a3a3a] dark:text-[#a0a0a0]" />
                <Input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full bg-white dark:bg-[#161616] border border-[#e5e5e5] dark:border-[#2a2a2a] rounded-md focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 text-[#1a1a1a] dark:text-[#e5e5e5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <SelectLanguage onChange={handleLanguageChange} />
              <SelectPopularity onChange={handleChangePopularity} />
              <SelectKeywords onChange={handleChangeKeywords} />
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {error ? (
              <Card className="col-span-full border-red-200 dark:border-red-800 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm">
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
                  variants={item}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden border border-[#e5e5e5] dark:border-[#2a2a2a] hover:border-amber-500/50 dark:hover:border-amber-500/30 shadow-sm hover:shadow-md transition-all duration-300 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm">
                    <CardHeader className="flex-grow pb-2">
                      <CardTitle className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base sm:text-lg font-semibold text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-2 group"
                          >
                            <Book className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="break-all">{repo.name}</span>
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          </a>
                          <div>
                            {session ? (
                              <SavedRepositories repo={repo} handleSignIn={handleSignIn} />
                            ) : (
                              <Button
                                onClick={handleSignIn}
                                className="p-1 rounded-full transition-colors text-[#3a3a3a] bg-[#f8f8f8] hover:bg-[#1a1a1a] hover:text-white dark:text-[#a0a0a0] dark:bg-[#1a1a1a] dark:hover:bg-amber-600 dark:hover:text-white"
                                title="Sign in to save repository"
                              >
                                <Save className="h-5 w-5" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-[#3a3a3a] dark:text-[#a0a0a0]">
                          {repo.description || "No description available."}
                        </p>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-2">
                      <div className="flex items-center gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{repo.stargazers_count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
                          <GitForkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{repo.forks_count.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-xs sm:text-sm"
                      >
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 justify-center"
                        >
                          <GithubIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          View Repository
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="col-span-full text-center py-12 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#e5e5e5] dark:border-[#2a2a2a]">
                <CardContent>
                  <p className="text-[#3a3a3a] dark:text-[#a0a0a0]">
                    No repositories found. Try adjusting your filters or search query.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
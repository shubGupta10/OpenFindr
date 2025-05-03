import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchSavedRepositories } from '@/supabase/SupabaseFunction'
import { GitFork, Star, ExternalLink, Loader2, RefreshCcw, AlertCircle, Book, Bookmark } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Repository {
  id: string
  repo_name: string
  repo_url: string
  created_at: string
  stars_count?: number
  forks_count?: number
}

const FetchSavedRepo = ({ userEmail }: { userEmail: string }) => {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRepos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchSavedRepositories(userEmail)
      setRepositories(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
  }, [userEmail])

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
          <p className="text-[#3a3a3a] dark:text-[#a0a0a0]">Loading your saved repositories...</p>
        </div>
      </div>
    )
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
          <div className="bg-white dark:bg-[#161616] rounded-lg p-6 shadow-md border border-[#e5e5e5] dark:border-[#2a2a2a]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  <span className="text-amber-600 dark:text-amber-500">Saved</span> Repositories
                </h1>
                <p className="text-[#3a3a3a] dark:text-[#a0a0a0]">
                  Your collection of bookmarked GitHub repositories
                </p>
              </div>
              
              <Button
                onClick={fetchRepos}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2 bg-white hover:bg-[#f8f8f8] dark:bg-[#1a1a1a] dark:hover:bg-[#2a2a2a] border-[#e5e5e5] dark:border-[#2a2a2a] hover:border-amber-500/50 dark:hover:border-amber-500/30 text-[#1a1a1a] dark:text-[#e5e5e5] transition-all duration-300"
              >
                <RefreshCcw className="w-4 h-4" />
                Refresh List
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border border-red-200 dark:border-red-800/30 bg-white dark:bg-[#1a1a1a]">
                  <CardContent className="flex items-center gap-3 text-red-600 dark:text-red-400 p-4">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{error}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : repositories.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="text-center py-16 bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2a2a2a]">
                  <CardContent className="space-y-6">
                    <Bookmark className="w-16 h-16 text-amber-600/30 dark:text-amber-500/30 mx-auto" />
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-[#1a1a1a] dark:text-[#e5e5e5]">
                        No saved repositories
                      </p>
                      <p className="text-[#3a3a3a] dark:text-[#a0a0a0] max-w-md mx-auto">
                        Start saving repositories to build your collection. Browse projects and click the bookmark icon to add them here.
                      </p>
                    </div>
                    <Button 
                      onClick={() => window.location.href = '/pages/repos'}
                      className="bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-amber-600 dark:hover:bg-amber-700 text-white mt-4"
                    >
                      Explore Projects
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="repo-list"
                variants={container}
                initial="hidden" 
                animate="show"
                className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {repositories.map((repo) => (
                  <motion.div
                    key={`${repo.id}-${repo.repo_name}`}
                    variants={item}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden border border-[#e5e5e5] dark:border-[#2a2a2a] hover:border-amber-500/50 dark:hover:border-amber-500/30 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-[#1a1a1a]">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <a 
                              href={repo.repo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xl font-semibold text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-2 group line-clamp-1"
                            >
                              <Book className="w-5 h-5 flex-shrink-0" />
                              <span className="truncate">{repo.repo_name}</span>
                              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </a>
                            <p className="text-sm text-[#3a3a3a] dark:text-[#a0a0a0]">
                              Saved on {new Date(repo.created_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                        {(repo.stars_count !== undefined || repo.forks_count !== undefined) && (
                          <div className="flex items-center gap-4 text-sm">
                            {repo.stars_count !== undefined && (
                              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
                                <Star className="w-4 h-4" />
                                <span>{repo.stars_count.toLocaleString()}</span>
                              </div>
                            )}
                            {repo.forks_count !== undefined && (
                              <div className="flex items-center gap-1 text-[#3a3a3a] dark:text-[#a0a0a0]">
                                <GitFork className="w-4 h-4" />
                                <span>{repo.forks_count.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="mt-auto pt-4">
                          <Button 
                            asChild 
                            className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-amber-600 dark:hover:bg-amber-700 text-white transition-colors duration-300"
                          >
                            <a
                              href={repo.repo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 justify-center"
                            >
                              View Repository
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default FetchSavedRepo
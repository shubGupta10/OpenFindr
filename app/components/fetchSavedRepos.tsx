import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchSavedRepositories } from '@/supabase/SupabaseFunction'
import { GitFork, Star, ExternalLink, Loader2, RefreshCcw, AlertCircle, Book } from 'lucide-react'
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
      console.log("My data", data);
      
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Loading your saved repositories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-black dark:to-white bg-clip-text text-transparent">
                  Saved Repositories
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Your collection of bookmarked GitHub repositories
                </p>
              </div>
              
              <Button
                onClick={fetchRepos}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                <Card className="border-red-200 dark:border-red-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <CardContent className="flex items-center gap-2 text-red-600 dark:text-red-400 p-4">
                    <AlertCircle className="w-5 h-5" />
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
                <Card className="text-center py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <CardContent className="space-y-4">
                    <Book className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto" />
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        No saved repositories
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Start saving repositories to build your collection!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="repo-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6"
              >
                {repositories.map((repo) => (
                  <motion.div
                    key={`${repo.id}-${repo.repo_name}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <a 
                              href={repo.repo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 group"
                            >
                              <Book className="w-5 h-5" />
                              {repo.repo_name}
                              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Saved on {new Date(repo.created_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {(repo.stars_count !== undefined || repo.forks_count !== undefined) && (
                          <div className="flex items-center gap-4 text-sm">
                            {repo.stars_count !== undefined && (
                              <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                                <Star className="w-4 h-4" />
                                <span>{repo.stars_count.toLocaleString()}</span>
                              </div>
                            )}
                            {repo.forks_count !== undefined && (
                              <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
                                <GitFork className="w-4 h-4" />
                                <span>{repo.forks_count.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <Button 
                          asChild 
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
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
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default FetchSavedRepo
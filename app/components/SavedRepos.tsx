'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { savedRepositories } from '@/supabase/SupabaseFunction'
import { Save, Check } from 'lucide-react'
import { Repository } from '@/types/Repository'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type SavedRepositoriesProps = {
  repo: Repository
  handleSignIn: () => Promise<void>
}

export const SavedRepositories = ({ repo, handleSignIn }: SavedRepositoriesProps) => {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleSave = async () => {
    if (isSaved) return

    if (!session) {
      await handleSignIn()
      return
    }

    try {
      setIsLoading(true)
      await savedRepositories(session.user.email!, { id: repo.id.toString(), name: repo.name, url: repo.html_url })
      setIsSaved(true)
      toast({
        title: "Repository Saved",
        description: `${repo.name} has been added to your saved repositories.`,
        duration: 3000,
      })
    } catch (err: any) {
      console.error(err.message)
      toast({
        title: "Error",
        description: "Failed to save the repository. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleSave}
            disabled={isLoading || isSaved}
            variant="outline"
            size="icon"
            className={cn(
              "w-9 h-9 rounded-full transition-all duration-300 ease-in-out",
              "bg-gradient-to-br from-[#121828] to-[#1c2438] text-white border-none",
              "hover:from-[#1c2438] hover:to-[#2a3346] hover:shadow-md",
              "focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50",
              isSaved && "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
              isLoading && "animate-pulse"
            )}
            aria-label={isSaved ? 'Saved' : 'Save Repository'}
          >
            {isSaved ? (
              <Check className="h-5 w-5" />
            ) : (
              <Save className="h-5 w-5" />
            )}
          </Button>


        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-[#121828] text-white border-[#121828]"
        >
          <p>{isSaved ? 'Saved' : 'Save Repository'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}


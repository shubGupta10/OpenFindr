'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { GithubIcon, MoonIcon, SunIcon, Code2, BookOpen, LogOut, Menu, X } from 'lucide-react'
import { signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { useTheme } from 'next-themes'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function Navbar() {
  const router = useRouter()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignIn = async () => {
    const result = await signIn('github', { redirect: false })
    if (result?.ok) {
      router.push('/pages/repos')
    }
  }

  const NavItems = () => (
    <>
      <Link 
        href="/pages/beginner-repos" 
        className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        onClick={() => setIsOpen(false)}
      >
        <BookOpen className="w-4 h-4" />
        <span>Beginner Repos</span>
      </Link>
      
      <Link 
        href="/pages/fetch-saved-repos" 
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        onClick={() => setIsOpen(false)}
      >
        Saved Repos
      </Link>
      
      {session && (
        <Link 
          href="/pages/repos" 
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          Top Repos
        </Link>
      )}
    </>
  )

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white shadow-md backdrop-blur-sm w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
            <Code2 className="w-8 h-8 text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OpenSox
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavItems />
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {session ? (
              <Button 
                onClick={() => signOut({callbackUrl: '/'})}
                variant="destructive"
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <Button
                onClick={handleSignIn}
                variant="default"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4">
                  <NavItems />
                  {session ? (
                    <Button 
                      onClick={() => {
                        signOut({callbackUrl: '/'})
                        setIsOpen(false)
                      }}
                      variant="destructive"
                      className="flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleSignIn()
                        setIsOpen(false)
                      }}
                      variant="default"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <GithubIcon className="mr-2 h-4 w-4" />
                      Sign in with GitHub
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon, MoonIcon, SunIcon, Code2, BookOpen, LogOut, Menu } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function Navbar() {
  const router = useRouter()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignIn = async () => {
    const result = await signIn("github", { redirect: false })
    if (result?.ok) {
      router.push("/pages/repos")
    }
  }

  const NavItems = () => (
    <>
      <Link
        href="/pages/beginner-repos"
        className="flex items-center space-x-1 text-[#1a1a1a] dark:text-[#e5e5e5] hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200"
        onClick={() => setIsOpen(false)}
      >
        <BookOpen className="w-4 h-4" />
        <span>Beginner Repos</span>
      </Link>

      {session && (
        <Link
          href="/pages/fetch-saved-repos"
          className="text-[#1a1a1a] dark:text-[#e5e5e5] hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          Saved Repos
        </Link>
      )}

      <Link
        href="/pages/repos"
        className="text-[#1a1a1a] dark:text-[#e5e5e5] hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200"
        onClick={() => setIsOpen(false)}
      >
        Top Repos
      </Link>
    </>
  )

  return (
    <nav className="sticky bg-[#f8f8f8]/80 dark:bg-[#121212]/80 text-[#1a1a1a] dark:text-[#e5e5e5] shadow-sm border-b border-[#e5e5e5]/10 dark:border-[#2a2a2a]/50 backdrop-blur-md w-full z-50  top-0 left-0 right-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
            <Code2 className="w-6 h-6 text-amber-600 dark:text-amber-500" />
            <span className="text-[#1a1a1a] dark:text-[#e5e5e5]">OpenFindr</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavItems />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border-[#e5e5e5] dark:border-[#2a2a2a] bg-white/50 dark:bg-[#1a1a1a]/50 hover:bg-[#e5e5e5]/30 dark:hover:bg-[#2a2a2a]/30"
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {session ? (
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="outline"
                className="border-[#e5e5e5] dark:border-[#2a2a2a] text-[#1a1a1a] dark:text-[#e5e5e5] hover:bg-[#e5e5e5]/30 dark:hover:bg-[#2a2a2a]/30 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <Button
                onClick={handleSignIn}
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
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
              className="mr-2 rounded-full border-[#e5e5e5] dark:border-[#2a2a2a] bg-white/50 dark:bg-[#1a1a1a]/50 hover:bg-[#e5e5e5]/30 dark:hover:bg-[#2a2a2a]/30"
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#1a1a1a] dark:text-[#e5e5e5] hover:bg-[#e5e5e5]/30 dark:hover:bg-[#2a2a2a]/30"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-[#f8f8f8] dark:bg-[#121212] border-l border-[#e5e5e5] dark:border-[#2a2a2a]"
              >
                <SheetHeader>
                  <SheetTitle className="text-[#1a1a1a] dark:text-[#e5e5e5]">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-6 mt-8">
                  <NavItems />
                  {session ? (
                    <Button
                      onClick={() => {
                        signOut({ callbackUrl: "/" })
                        setIsOpen(false)
                      }}
                      variant="outline"
                      className="border-[#e5e5e5] dark:border-[#2a2a2a] text-[#1a1a1a] dark:text-[#e5e5e5] hover:bg-[#e5e5e5]/30 dark:hover:bg-[#2a2a2a]/30 flex items-center space-x-2"
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
                      className="bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
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

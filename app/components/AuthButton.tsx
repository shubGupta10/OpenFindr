import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon } from "lucide-react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Button 
        onClick={() => signIn('github')} 
        variant="outline" 
        className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
      >
        <GithubIcon className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
        </CardContent>
      </Card>
    </div>
  )
}


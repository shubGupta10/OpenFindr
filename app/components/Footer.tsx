import { Button } from '@/components/ui/button'
import { Code2, Github, Twitter, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#1c2438] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-[#2a3655]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">OpenSox</span>
            </div>
            <p className="text-sm max-w-xs">Your gateway to open source contributions. Discover, learn, and contribute to amazing projects.</p>
          </div>
          
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="https://github.com/shubGupta10/OpenSox" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://x.com/i_m_shubham45" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
          
          <div className="space-y-4 max-w-xs mx-auto md:mx-0 pb-6 border-b border-[#2a3655]">
            <Button variant="outline" className="w-full justify-center hover:bg-blue-500 hover:text-white transition-colors" asChild>
              <a href="https://github.com/shubGupta10/OpenSox" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                Star on GitHub
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-center hover:bg-blue-500 hover:text-white transition-colors" asChild>
              <Link href="http://shubgupta.vercel.app" className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#2a3655] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            <p className="text-sm">Made with love by Shubham Kumar Gupta</p>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} OpenSox. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


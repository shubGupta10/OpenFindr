'use client'

import React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Code2, Flame, Tag } from "lucide-react"

const keywords = [
  "frontend", "backend", "fullstack", "data-science", "machine-learning", "AI", "web-development", 
  "devops", "cloud", "database", "blockchain", "open-source", "API", "automation", "security", 
  "testing", "performance", "ui/ux", "design", "serverless", "microservices", "distributed-systems", 
  "graphql", "rest-api", "typescript", "react", "vue", "angular", "nextjs", "nodejs", "python", "ruby", 
  "go", "java", "rust", "flutter", "swift", "kotlin", "docker", "kubernetes", "ci/cd", "scrum", "open-standards", 
  "accessibility", "sustainability", "cryptocurrency", "smart-contracts", "blockchain-apps", "ecosystem", 
  "ai-chatbots", "enterprise", "cross-platform", "peer-to-peer"
]

type SelectProps = {
  onChange: (value: string) => void
}

export function SelectLanguage({ onChange }: SelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="language-select" className="flex items-center gap-2 text-sm font-medium">
        <Code2 className="w-4 h-4 text-blue-500" />
        Programming Language
      </Label>
      <Select onValueChange={onChange} defaultValue="javascript">
        <SelectTrigger id="language-select" className="w-full bg-white dark:bg-gray-800">
          <SelectValue placeholder="Choose a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Popular Languages</SelectLabel>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export function SelectPopularity({ onChange }: SelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="popularity-select" className="flex items-center gap-2 text-sm font-medium">
        <Flame className="w-4 h-4 text-orange-500" />
        Popularity
      </Label>
      <Select onValueChange={onChange} defaultValue="high">
        <SelectTrigger id="popularity-select" className="w-full bg-white dark:bg-gray-800">
          <SelectValue placeholder="Choose popularity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Repository Popularity</SelectLabel>
            <SelectItem value="high">Highly Popular</SelectItem>
            <SelectItem value="medium">Moderately Popular</SelectItem>
            <SelectItem value="low">Rising Stars</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export function SelectKeywords({ onChange }: SelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="keyword-select" className="flex items-center gap-2 text-sm font-medium">
        <Tag className="w-4 h-4 text-green-500" />
        Category
      </Label>
      <Select onValueChange={onChange} defaultValue="frontend">
        <SelectTrigger id="keyword-select" className="w-full bg-white dark:bg-gray-800">
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Project Categories</SelectLabel>
            {keywords.map((keyword) => (
              <SelectItem key={keyword} value={keyword}>
                {keyword.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
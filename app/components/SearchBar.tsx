import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className={`relative w-full max-w-2xl transition-all duration-300 `}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search repositories..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-10 pr-24 py-2 rounded-full dark:focus:border-[#131a29] focus:ring-2 focus:ring-[#131a29] dark:focus:ring-[#131a29] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>
      <Button
        type="button"
        onClick={onSearch}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full px-4 py-4 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBar


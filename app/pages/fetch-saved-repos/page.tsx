'use client'

import React from 'react'
import FetchSavedRepos from '@/app/components/fetchSavedRepos'
import { useSession } from 'next-auth/react'


function FetchSavedRepo() {
const {data} = useSession()
    return (
    <div>
        <FetchSavedRepos userEmail={data?.user.email ?? ''} />
    </div>
  )
}

export default FetchSavedRepo
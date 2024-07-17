import { ErrorCard } from '@/components/Auth/ErrorCard'
import React from 'react'

const AuthErrorPage = () => {
  return (
    <div className="flex item-center justify-center flex-col h-full">
        <ErrorCard/>
    </div>
  )
}

export default AuthErrorPage
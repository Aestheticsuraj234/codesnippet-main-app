"use client"
import { auth } from '@/auth'
import { UserInfo } from '@/components/Auth/UserInfo';
import { useCurrentUser } from '@/hooks/auth/use-current-user';
import { currentUser } from '@/lib/auth/data/auth'
import React from 'react'

const ClientPage = () => {
    const user =  useCurrentUser();
  return (
    <UserInfo   
    user={user}
    label="📱Client Component"
    />
  )
}

export default ClientPage
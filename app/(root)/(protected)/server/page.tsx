import { auth } from '@/auth'
import { UserInfo } from '@/components/Auth/UserInfo';
import { currentUser } from '@/lib/auth/data/auth'
import React from 'react'

const ServerPage = async() => {
    const user = await currentUser();
  return (
    <UserInfo   
    user={user}
    label="💻Server Component"
    />
  )
}

export default ServerPage
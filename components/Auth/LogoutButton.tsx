"use client";



import { logout } from '@/action/auth/logout';
import React from 'react'

interface LogoutButtonProps{
    children?: React.ReactNode
}


const LogoutButton = ({children}:LogoutButtonProps) => {

    const onClick = ()=>{
        logout()
    }


  return (
    <span className='cursor-pointer' onClick={onClick}>{children}</span>
  )
}

export default LogoutButton
"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import {  LogOut } from 'lucide-react';
import { logout } from '@/action/auth/logout';

const LogOutButton = () => {
  const [isPending, setIsPending] = React.useState(false)

  const onClick = ()=>{

    setIsPending(true)
    logout()
    setIsPending(false)
}

  return (
    <Button disabled={isPending}  onClick={onClick}  variant={"outline"} size={"default"} className='flex justify-center items-center gap-2' >
   <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  dark:text-white" />
    <span className="text-xs">Logout</span>

</Button>
  )
}

export default LogOutButton
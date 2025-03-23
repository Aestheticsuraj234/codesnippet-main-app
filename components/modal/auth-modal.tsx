'use client'

import React, { useState } from 'react'
import { usePathname } from "next/navigation"
import { useAuthModal } from "@/zustand/use-auth-modal"
import { RegisterForm } from "../Auth/RegisterForm"
import { LoginForm } from "../Auth/LoginForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthModal() {
  const { isOpen, onClose } = useAuthModal()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")

  const handleClose = () => {
    onClose()
    setActiveTab("login") // Reset to login tab when closing
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Welcome
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")} className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="login">Login</TabsTrigger>
         
          </TabsList>
          <TabsContent value="login" className="px-6 py-4">
            <LoginForm redirectUrl={`${pathname}`} />
          </TabsContent>
        
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
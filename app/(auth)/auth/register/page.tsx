import { Logo } from '@/app/dashboard/_components/logo'
import { RegisterForm } from '@/components/Auth/RegisterForm'
import Image from 'next/image'

import React from 'react'

const RegisterPage = () => {
  return (
  <div className="grid min-h-svh lg:grid-cols-2">
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <Logo/>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <RegisterForm redirectUrl='/'/>
        </div>
      </div>
    </div>
    <div className=" hidden bg-muted lg:flex  lg:flex-col items-center justify-center">
      <Image
        src="/login.svg"
        alt="Image"
        className=""
        height={600}
        width={600}
      />
    </div>
  </div>
  )
}

export default RegisterPage
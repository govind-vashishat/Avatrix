"use client";

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

interface GoogleLoginButtonProps {
    buttonText: string,
}

const GoogleLoginButton = ({ buttonText }: GoogleLoginButtonProps) => {
  return (
    <div>
        <Button 
        className='w-full py-6 text-lg flex items-center' 
        variant="outline"
        onClick={() => signIn("google", { callbackUrl: "/create" })}
        >
          <Image src="/google-icon.png" alt='google-icon' width={25} height={25} className='h-auto object-cover mr-2' />
            {buttonText}
          </Button>
    </div>
  )
}

export default GoogleLoginButton
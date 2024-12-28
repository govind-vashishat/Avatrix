"use client";

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Button1 = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push("/create");
    }
  return (
    <div className="flex justify-center items-center mt-5 md:mt-8">
        <Button
        onClick={handleClick} 
        className="text-black bg-white hover:bg-gray-400">Get Started</Button>
    </div>
  )
}

export default Button1
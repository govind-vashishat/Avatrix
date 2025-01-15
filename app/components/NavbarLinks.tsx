"use client";

import React from 'react'
import { Button, buttonVariants } from "@/components/ui/button"
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const NavbarLinks = () => {
  const session = useSession();
  return (
    <div>
        {session.data?.user ? (
          <div className='flex justify-center items-center space-x-4'>
            <Link href="/create" className={buttonVariants({ variant: "outline" })}>Create</Link>
            <Button onClick={() => signOut()} className="bg-white text-black hover:bg-white">Log Out</Button>
          </div>
        ) : (
          <div className='flex justify-center items-center space-x-4'>
            <Link href="/auth/signin" className={buttonVariants({ variant: "outline" })}>Log In</Link>
            <Link href="/auth/signup" className={buttonVariants({ variant: "outline" })}>Sign Up</Link>
          </div>
        )}
      </div>
  )
}

export default NavbarLinks
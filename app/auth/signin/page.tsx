import GoogleLoginButton from '@/app/components/GoogleLoginButton'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await getServerSession();

  if(session?.user) {
    redirect("/create")
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/*left side black bg*/}
      <div className='w-full md:w-1/2 bg-black text-white p-8 flex flex-col justify-center items-center'>
      <h1 className='text-4xl md:text-6xl font-bold mb-6'>Avatrix</h1>
      <p className='text-lg mb-6'>Welcome Back. Log in and get started!</p>
      <div className='aspect-video w-full max-w-md mx-auto bg-gray-800 rounded-lg overflow-hidden'>
        <video 
        className='w-full h-full object-cover'
        autoPlay
        loop
        muted
        playsInline
        >
        <source src="/authpage_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      </div>
      </div>
      {/*right side white bg*/} 
      <div className='w-full md:w-1/2 bg-white text-black p-8 flex items-center justify-center'>
        <div className='w-full max-w-md'>
          <GoogleLoginButton buttonText="Log in with google" />
          <p className='mt-4 text-center text-sm text-gray-600'>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className='text-blue-600 font-medium hover:underline'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
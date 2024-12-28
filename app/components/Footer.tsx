import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='border-t h-[300px] border-neutral-800 mt-20 px-32 py-14'>
        <div className='flex justify-between gap-10'>         
            <h1 className='text-white font-sans text-2xl'>Make engaging content with Avatrix</h1>
            <div className='flex flex-col gap-10 text-white font-sans text-lg'>       
                <Link href="/" className='hover:text-gray-400'>Home</Link>
                <Link href="/create" className='hover:text-gray-400'>Create</Link>
            </div>
        </div>
    </div> 
    <div className='text-gray-400 text-sm text-center'>
    <p>© 2024 Avatrix. All rights reserved.</p>
    </div>  
    </>                      
  )
}

export default Footer
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {

  return (
    <div className='sticky top-0 z-10 flex items-center justify-between h-20 border-b border-neutral-800 px-10 md:px-32 backdrop-blur-lg'>
      <div>
        <Link href="/" className='text-white flex text-sm font-sans'>
          <Image src="/logo.png" alt='logo' width={70} height={70} className='h-auto object-cover' />
            <h1 className='mt-6 text-sm'>Avatrix</h1>
        </Link>
      </div>
    <NavbarLinks />  
    </div>
  )
}

export default Navbar
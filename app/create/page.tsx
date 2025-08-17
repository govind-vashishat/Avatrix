import React from 'react'
import GenerateForm from '../components/GenerateForm'
import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getServerSession } from 'next-auth';

export default async function Create() {
  const session = await getServerSession();

  if(!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Navbar />
        <section className='max-w-7xl mx-auto flex flex-col items-center justify-center p-5'>
            <h1 className='font-sans text-4xl text-white text-center mt-2'>Get Started</h1>
            <p className='text-gray-400 p-2 font-sans'>Create your first AI avatar video.</p>
            <p className='mt-5 font-sans text-white text-center text-xl md:text-3xl'>Pick your perfect avatar and voice to bring your video to life!</p>

            <GenerateForm />
        </section>
      <Footer />  
    </div>
  )
}

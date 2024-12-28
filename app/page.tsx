import React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Button1 from "./components/Button1"

export default function LandingPage() {
  return (
      <section className="max-w-7xl mx-auto flex flex-col items-center justify-center p-5">
        <div className="flex items-center justify-center text-white cursor-pointer border border-neutral-700 font-mono p-2 rounded-lg mt-2">Access to realistic avatars</div>
        <h1 className="font-sans text-4xl text-center text-white mt-5">Create beautiful hyper realistic AI avatar videos with Avatrix</h1>
        <p className="text-gray-400 p-2 font-sans">At Avatrix, brands can produce engaging, customizable video content featuring ultra-realistic avatars tailored to their identity. It empowers businesses to craft compelling marketing campaigns effortlessly, saving time and resources while boosting creativity and audience engagement.</p>
        <Card className="shadow-2xl overflow-hidden border-none outline-none mt-6 mb-6">
          <Image 
            className="w-auto h-auto object-cover"
            src="/landingpage.jpg"
            alt="landing page image"
            width={600}
            height={600}
            />
        </Card>

        <h1 className="font-sans text-4xl text-center text-white mt-7">Our Services</h1>
          <div className="flex flex-wrap justify-center gap-5 mt-10 ml-2">
            <Card className="w-[400px] max-w-[400px] bg-zinc-900 text-white p-4 border-none outline-none font-sans h-[144px]">
              <CardTitle>1. Realistic Avatars</CardTitle>
              <CardContent className="text-sm text-gray-400 mt-3">Wide range of avatars which you can use to generate content with various faces for your brand.</CardContent>
            </Card>
            <Card className="w-[400px] max-w-[400px] bg-zinc-900 text-white p-4 border-none outline-none font-sans h-[144px]">
              <CardTitle>2. List of voices</CardTitle>
              <CardContent className="text-sm text-gray-400 mt-3">Large list of different voices form which you can select one which best suits your brand.</CardContent>
            </Card>
            <Card className="w-[400px] max-w-[400px] bg-zinc-900 text-white p-4 border-none outline-none font-sans h-[144px]">
              <CardTitle>3. Video Generation</CardTitle>
              <CardContent className="text-sm text-gray-400 mt-3">Our AI-powered platform can generate high-quality, personalized videos that help bring your ideas to life.</CardContent>
            </Card>
          </div>
          <div className="flex flex-col justify-center items-center px-4 mt-10">
            <h1 className="text-white text-center font-sans text-4xl">Get started</h1>
          <div className="md:w-[1000px] w-[400px] h-[200px] bg-zinc-900 rounded-2xl mt-5 font-sans ml-2 p-5 md:p-8">
            <h1 className="text-center text-white">Simple, Straightforward and designed to help you market better.</h1>
            <p className="text-sm text-gray-400 mt-5 text-center">Ready to get started? Click on the button below to make your first AI avatar video!</p>
            <Button1 />
          </div>
          </div>
      </section>
  )
}


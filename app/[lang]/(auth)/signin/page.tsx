"use client"
import PosterCard from '@/components/PosterCard'
import SignupFormDemo from '@/components/signup-form-demo'
import React, { useState } from 'react'

const Page = () => {
  const [first, setfirst] = useState("")
  
  return (
    <div className="flex items-center justify-center h-screen px-6">
      <div className="flex w-full max-w-7xl gap-10 items-center bg-slate-200 p-7 rounded-md ">
        <div className="flex-1">
          <SignupFormDemo />
        </div>

        {/* RIGHT - POSTER */}
        <div className="flex-1 hidden md:flex justify-center">
          <PosterCard />
        </div>

      </div>
    </div>
  )
}

export default Page
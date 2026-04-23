import React from 'react'

const PosterCard = () => {
  return (
    <div className="relative w-full max-w-md h-[420px] rounded-2xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f2d] via-[#1a3a4a] to-[#2a6b8a]" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 p-6 h-full flex flex-col justify-end">
        <div className="flex gap-2 mb-3">
          <span className="text-xs px-3 py-1 bg-white/20 rounded-full text-white">
            HR Management
          </span>
          <span className="text-xs px-3 py-1 bg-white/20 rounded-full text-white">
            Atharv Tech Co.
          </span>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-5 text-white">
          <p className="text-sm leading-relaxed mb-4">
            Manage your team's attendance, tasks, and onboarding — all in one place. 
            Built for the way Atharv Tech actually works.
          </p>

          <div className="text-xs text-gray-300">
            <p className="font-medium text-white">Atharv Tech Co.</p>
            <p>Internal HR & Operations Platform</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PosterCard
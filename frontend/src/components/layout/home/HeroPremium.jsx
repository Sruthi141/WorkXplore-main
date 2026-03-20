import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

// ✅ FIXED
import { Button } from '../ui/button.jsx'
const featureItems = [
  { title: 'Smart filters', emoji: '⚡' },
  { title: 'Job insights', emoji: '📊' },
  { title: 'Resume parsing', emoji: '📄' },
  { title: 'Premium plans', emoji: '⭐' },
]

export default function HeroPremium(){
  const navigate = useNavigate();

  const onFeatureClick = (key) => {
    // Map feature to a route or action
    switch (key) {
      case 'Smart filters':
        return navigate('/jobs');
      case 'Job insights':
        return navigate('/recruiter/jobs');
      case 'Resume parsing':
        return navigate('/resume');
      case 'Premium plans':
        return navigate('/plans');
      default:
        return;
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">Find great talent or your next career move — faster.</h1>
          <p className="mt-4 text-lg text-zinc-500 max-w-xl">WorkXplore connects recruiters and job seekers with modern tools: smart filters, deep hiring insights, and premium recruiter plans.</p>

          <div className="mt-6 flex items-center gap-4">
            <Button asChild>
              <Link to="/jobs" className="inline-flex items-center px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-[1.02] transition transform-gpu">Browse Jobs</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/signup" className="inline-flex items-center px-5 py-3 rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition">Get Started</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div className="relative select-none" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.7}}>
          <div className="bg-gradient-to-b from-white/60 via-white/30 to-white/10 dark:from-black/60 dark:via-black/40 dark:to-black/20 rounded-2xl p-6 backdrop-blur-lg border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-indigo-50 dark:bg-indigo-900 flex items-center justify-center text-2xl">💼</div>
              <div>
                <div className="text-sm font-semibold">Featured role: Senior Product Designer</div>
                <div className="text-xs text-zinc-500">Google · Remote · ₹1,20,000</div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {featureItems.map((f) => (
                <motion.button
                  key={f.title}
                  whileHover={{ y: -4 }}
                  onClick={() => onFeatureClick(f.title)}
                  type="button"
                  className="flex items-center gap-3 p-3 bg-white/70 dark:bg-black/50 rounded-lg shadow-sm border border-white/10 cursor-pointer select-none w-full text-left"
                >
                  <div className="w-9 h-9 rounded-md bg-white/90 dark:bg-zinc-800 flex items-center justify-center text-lg">{f.emoji}</div>
                  <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{f.title}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

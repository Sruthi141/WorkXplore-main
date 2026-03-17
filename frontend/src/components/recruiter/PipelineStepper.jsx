import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const stepVariants = {
  idle: { scale: 1, opacity: 0.6 },
  active: { scale: 1.03, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 18 } },
  done: { scale: 1, opacity: 1 }
}

export default function PipelineStepper({ steps = [], currentIndex = 0 }) {
  return (
    <div className="flex items-center gap-6">
      {steps.map((s, i) => (
        <div key={s.key || s.label} className="flex items-center gap-3">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center border ${i <= currentIndex ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'}`}
            variants={stepVariants}
            animate={i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'idle'}
          >
            {i < currentIndex ? <Check className="text-green-600" size={16} /> : <span className="text-sm font-medium">{i+1}</span>}
          </motion.div>
          <div className="min-w-[120px]">
            <div className="text-sm font-semibold">{s.label}</div>
            {s.subtitle && <div className="text-xs text-muted-foreground">{s.subtitle}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

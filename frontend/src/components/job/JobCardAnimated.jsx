import React from 'react'
import { motion } from 'framer-motion'

export default function JobCardAnimated({ job }) {
  return (
    <motion.article
      className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
      whileHover={{ scale: 1.02, y: -6, boxShadow: '0 12px 30px rgba(2,6,23,0.08)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-md bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center font-semibold text-zinc-700 dark:text-zinc-200">
          {job.company?.name ? job.company.name.charAt(0).toUpperCase() : 'C'}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900">{job.title}</h3>
          <p className="text-sm text-muted-foreground">
            {job.company?.name} · {job.location}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {job.experienceLevel} yrs · {job.jobType}
        </div>
        <div className="text-sm font-medium">
          {job.salary ? `₹${job.salary}` : 'Not disclosed'}
        </div>
      </div>
    </motion.article>
  )
}
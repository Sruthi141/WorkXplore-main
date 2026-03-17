import React from 'react'
import clsx from 'clsx'

export default function Skeleton({ className = '' }) {
  return <div className={clsx('rounded-md bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse', className)} />
}

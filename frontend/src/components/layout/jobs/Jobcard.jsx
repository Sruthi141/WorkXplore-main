/* eslint-disable react/prop-types */

import { Button } from '../../ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from '../../ui/badge'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { toast } from 'sonner'
const Job = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  return (
    <article className='glass-card p-5 rounded-xl shadow-lg border border-white/10 hover:shadow-2xl transition transform hover:-translate-y-1'>
      <div className='flex items-start justify-between'>
        <p className='text-sm text-zinc-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="ghost" className="rounded-full p-2" size="icon" aria-label="save-job"><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-4 my-4'>
        <div className='w-14 h-14 rounded-lg bg-white/80 dark:bg-zinc-800 flex items-center justify-center overflow-hidden'>
          <div className='w-10 h-10 rounded-md bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-lg font-semibold text-zinc-700 dark:text-zinc-200'>
            {job?.company?.name ? job.company.name.charAt(0).toUpperCase() : 'C'}
          </div>
        </div>
        <div className='flex-1 min-w-0'>
          <h1 className='font-semibold text-lg text-zinc-900 dark:text-zinc-100 truncate'>{job?.company?.name}</h1>
          <p className='text-xs text-zinc-500'>India</p>
        </div>
      </div>

      <div>
        <h2 className='font-bold text-xl my-2 text-zinc-900 dark:text-zinc-100 truncate'>{job?.title}</h2>
        <p className='text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2'>{job?.description}</p>
      </div>

      <div className='flex flex-wrap items-center gap-3 mt-4'>
        <Badge className={'text-blue-700 font-semibold'} variant="outline">{job?.position} Positions</Badge>
        <Badge className={'text-[#F83002] font-semibold'} variant="outline">{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-semibold'} variant="outline">{job?.salary} LPA</Badge>
      </div>

      <div className='flex items-center gap-3 mt-5'>
        {user?.role === 'recruiter' ? (
          <Button onClick={() => navigate(`/recruiter/jobs/${job?._id}/applicants`)} variant="outline">Applicants</Button>
        ) : (
          <>
            <Button onClick={() => navigate(`/description/${job?._id}`)} variant="default">View</Button>
            <Button onClick={() => toast?.success && toast.success('Saved for later')} variant="ghost">Save</Button>
          </>
        )}
      </div>
    </article>
  )
}

export default Job;

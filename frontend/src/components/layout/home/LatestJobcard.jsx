/* eslint-disable react/prop-types */

import { Badge } from '../../ui/badge.jsx'
import { useNavigate } from 'react-router-dom'
const JobCard = ({job}) => {
    const navigate = useNavigate();
    return (
        <article role="button" tabIndex={0} onKeyDown={(e)=> { if(e.key === 'Enter') navigate(`/description/${job._id}`) }} onClick={()=> navigate(`/description/${job._id}`)} className='glass-card p-5 rounded-xl shadow-lg border border-white/10 cursor-pointer hover:shadow-2xl transition'>
            <div>
                <h1 className='font-medium text-lg text-zinc-900 dark:text-zinc-100'>{job?.company?.name}</h1>
                <p className='text-sm text-zinc-500'>India</p>
            </div>
            <div>
                <h2 className='font-bold text-lg my-2 text-zinc-900 dark:text-zinc-100 truncate'>{job?.title}</h2>
                <p className='text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-semibold'} variant="outline">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-semibold'} variant="outline">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-semibold'} variant="outline">{job?.salary} LPA</Badge>
            </div>

        </article>
    )
}

export default JobCard
import { setAllJobs } from '@/redux/jobslice'
import { JOB_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery, filters } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const params = new URLSearchParams();
                if (searchedQuery) params.append('keyword', searchedQuery);
                if (filters.companies && filters.companies.length) params.append('companies', filters.companies.join(','));
                if (filters.industries && filters.industries.length) params.append('industries', filters.industries.join(','));
                if (filters.minSalary) params.append('minSalary', filters.minSalary);
                if (filters.maxSalary) params.append('maxSalary', filters.maxSalary);
                if (filters.jobType) params.append('jobType', filters.jobType);
                if (filters.sort) params.append('sort', filters.sort);
                if (filters.location) params.append('location', filters.location);
                if (filters.experience) params.append('experience', filters.experience);
                if (filters.postedDate) params.append('postedDate', filters.postedDate);

                const query = params.toString();
                const url = `${JOB_API_END_POINT}/get${query ? `?${query}` : ''}`;
                const res = await axios.get(url, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs || []));
                }
            } catch (error) {
                console.log('fetchAllJobs error', error);
            }
        }
        fetchAllJobs();
    }, [dispatch, searchedQuery, JSON.stringify(filters)])
}

export default useGetAllJobs
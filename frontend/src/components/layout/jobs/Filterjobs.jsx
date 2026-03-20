import { useEffect, useState, useMemo } from 'react';

import { Label } from '../../ui/label.jsx';

import { useDispatch, useSelector } from 'react-redux';

// ✅ fixed
import { setFilters } from '@/redux/jobslice.jsx';

const INDUSTRIES = ["Frontend Developer", "Backend Developer", "FullStack Developer", "Digital Analyst", "Cyber Analyst"]
const SALARY_OPTIONS = ["20LPA", "40LPA", "60LPA", "80LPA", "100LPA"]
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Hybrid", "Remote"]
const POSTED_DATE = [
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
]

const FilterCard = () => {
    const dispatch = useDispatch();
    const { allJobs, filters } = useSelector(store => store.job);

    const companies = useMemo(() => {
        if (!allJobs || !allJobs.length) return [];
        const names = allJobs.map(j => j.company && (j.company.name || j.company)).filter(Boolean);
        return Array.from(new Set(names));
    }, [allJobs]);

    const [selectedCompanies, setSelectedCompanies] = useState(filters.companies || []);
    const [selectedIndustries, setSelectedIndustries] = useState(filters.industries || []);
    const [selectedSalary, setSelectedSalary] = useState(filters.minSalary || null);
    const [location, setLocation] = useState(filters.location || '');
    const [experience, setExperience] = useState(filters.experience || '');
    const [jobType, setJobType] = useState(filters.jobType || '');
    const [postedDate, setPostedDate] = useState(filters.postedDate || '');

    useEffect(() => {
        dispatch(setFilters({
            companies: selectedCompanies,
            industries: selectedIndustries,
            minSalary: selectedSalary,
            location,
            experience: experience ? Number(experience) : null,
            jobType,
            postedDate,
        }))
    }, [selectedCompanies, selectedIndustries, selectedSalary, location, experience, jobType, postedDate]);

    const toggleArrayValue = (arr, value) => {
        if (arr.includes(value)) return arr.filter(v => v !== value);
        return [...arr, value];
    }

    const salaryToNumber = (label) => {
        if (!label) return null;
        const num = parseInt(label.replace('LPA','').trim());
        if (isNaN(num)) return null;
        return num * 100000; // convert LPA to numeric approx
    }

    const clearAll = () => {
        setSelectedCompanies([]);
        setSelectedIndustries([]);
        setSelectedSalary(null);
        setLocation('');
        setExperience('');
        setJobType('');
        setPostedDate('');
        dispatch(setFilters({
            companies: [],
            industries: [],
            minSalary: null,
            location: '',
            experience: null,
            jobType: '',
            postedDate: '',
        }))
    }

    return (
        <div className='w-full bg-white dark:bg-slate-900 p-3 rounded-md shadow-sm space-y-4'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Smart filters</h1>
                <button
                    type="button"
                    className='text-xs text-blue-600 hover:underline'
                    onClick={clearAll}
                >
                    Clear
                </button>
            </div>
            <hr className='mt-1' />

            <div className='mt-2 space-y-2'>
                <h2 className='font-semibold text-sm'>Companies</h2>
                {companies.length === 0 && <div className='text-xs text-muted-foreground'>No companies yet</div>}
                <div className='max-h-36 overflow-y-auto pr-1'>
                    {companies.map((c) => (
                        <div key={c} className='flex items-center space-x-2 my-1'>
                            <input id={`comp-${c}`} type='checkbox' checked={selectedCompanies.includes(c)} onChange={() => setSelectedCompanies(toggleArrayValue(selectedCompanies, c))} />
                            <Label htmlFor={`comp-${c}`} className="text-xs">{c}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-2'>
                <h2 className='font-semibold text-sm mb-1'>Industry</h2>
                {INDUSTRIES.map((i) => (
                    <div key={i} className='flex items-center space-x-2 my-1'>
                        <input id={`ind-${i}`} type='checkbox' checked={selectedIndustries.includes(i)} onChange={() => setSelectedIndustries(toggleArrayValue(selectedIndustries, i))} />
                        <Label htmlFor={`ind-${i}`} className="text-xs">{i}</Label>
                    </div>
                ))}
            </div>

            <div className='mt-2'>
                <h2 className='font-semibold text-sm mb-1'>Location</h2>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or remote"
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs"
                />
            </div>

            <div className='mt-2'>
                <h2 className='font-semibold text-sm mb-1'>Experience (years)</h2>
                <input
                    type="number"
                    min="0"
                    value={experience ?? ''}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs"
                />
            </div>

            <div className='mt-2'>
                <h2 className='font-semibold text-sm mb-1'>Salary (min)</h2>
                {SALARY_OPTIONS.map(s => (
                    <div key={s} className='flex items-center space-x-2 my-1'>
                        <input id={`sal-${s}`} type='radio' name='salary' checked={selectedSalary === salaryToNumber(s)} onChange={() => setSelectedSalary(salaryToNumber(s))} />
                        <Label htmlFor={`sal-${s}`} className="text-xs">{s}</Label>
                    </div>
                ))}
            </div>

            <div className='mt-2'>
                <h2 className='font-semibold text-sm mb-1'>Job type</h2>
                <select
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                >
                    <option value="">Any</option>
                    {JOB_TYPES.map((jt) => (
                        <option key={jt} value={jt}>{jt}</option>
                    ))}
                </select>
            </div>

            <div className='mt-2'>
                <h2 className='font-semibold text-sm mb-1'>Posted date</h2>
                <div className="space-y-1">
                    {POSTED_DATE.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 text-xs">
                            <input
                                type="radio"
                                name="postedDate"
                                value={opt.value}
                                checked={postedDate === opt.value}
                                onChange={(e) => setPostedDate(e.target.value)}
                            />
                            {opt.label}
                        </label>
                    ))}
                    <label className="flex items-center gap-2 text-xs">
                        <input
                            type="radio"
                            name="postedDate"
                            value=""
                            checked={!postedDate}
                            onChange={() => setPostedDate('')}
                        />
                        Any time
                    </label>
                </div>
            </div>
        </div>
    )
}

export default FilterCard
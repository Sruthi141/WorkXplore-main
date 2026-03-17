import Job from "../models/jobModel.js";
import Company from "../models/companyModel.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
    

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false,
           
                  
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("POST JOB ERROR:", error && error.stack ? error.stack : error);
        return res.status(500).json({
            message: error?.message || 'Server error while creating job',
            success: false
        });
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const {
            keyword = '',
            companies,
            industries,
            minSalary,
            maxSalary,
            jobType,
            sort,
            location,
            experience,
            postedDate,
        } = req.query;

        const pipeline = [];

        // Keyword search on title or description
        if (keyword) {
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: keyword, $options: 'i' } },
                        { description: { $regex: keyword, $options: 'i' } },
                    ]
                }
            });
        }

        // Lookup company details
        pipeline.push({
            $lookup: {
                from: 'companies',
                localField: 'company',
                foreignField: '_id',
                as: 'company'
            }
        });
        pipeline.push({ $unwind: { path: '$company', preserveNullAndEmptyArrays: true } });

        // Filter by company names (comma separated)
        if (companies) {
            const companyArr = companies.split(',').map(c => c.trim()).filter(Boolean);
            if (companyArr.length) {
                pipeline.push({ $match: { 'company.name': { $in: companyArr } } });
            }
        }

        // Industry filter (simple text match against title/description)
        if (industries) {
            const inds = industries.split(',').map(i => i.trim()).filter(Boolean);
            if (inds.length) {
                pipeline.push({
                    $match: {
                        $or: inds.map(i => ({
                            title: { $regex: i, $options: 'i' }
                        }))
                    }
                });
            }
        }

        // Location filter
        if (location) {
            pipeline.push({
                $match: {
                    location: { $regex: location, $options: 'i' }
                }
            });
        }

        // Experience filter (minimum years)
        if (experience) {
            pipeline.push({
                $match: {
                    experienceLevel: { $gte: Number(experience) }
                }
            });
        }

        // Posted date filter
        if (postedDate) {
            const now = new Date();
            let from;
            if (postedDate === '24h') {
                from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            } else if (postedDate === '7d') {
                from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            } else if (postedDate === '30d') {
                from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            }
            if (from) {
                pipeline.push({ $match: { createdAt: { $gte: from } } });
            }
        }

        // Salary filter
        const salaryMatch = {};
        if (minSalary) salaryMatch.$gte = Number(minSalary);
        if (maxSalary) salaryMatch.$lte = Number(maxSalary);
        if (Object.keys(salaryMatch).length) pipeline.push({ $match: { salary: salaryMatch } });

        // Job type
        if (jobType) pipeline.push({ $match: { jobType } });

        // Sorting
        if (sort === 'salary_asc') pipeline.push({ $sort: { salary: 1 } });
        else if (sort === 'salary_desc') pipeline.push({ $sort: { salary: -1 } });
        else pipeline.push({ $sort: { createdAt: -1 } });

        const jobs = await Job.aggregate(pipeline);
        if (!jobs) {
            return res.status(404).json({
                message: 'Jobs not found.',
                success: false
            });
        }
        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.error('GET ALL JOBS ERROR:', error);
        return res.status(500).json({ message: error?.message || 'Server error', success: false });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
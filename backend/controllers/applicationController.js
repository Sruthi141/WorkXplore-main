import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";


// ================= APPLY JOB =================
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Create application (status = pending by default)
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      status: "pending", // Explicitly set
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


// ================= GET APPLIED JOBS (Student) =================
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    return res.status(200).json({
      applications,
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


// ================= GET APPLICANTS (Recruiter) =================
export const getApplicants = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // 🔒 Ensure recruiter owns this job
    if (job.created_by.toString() !== recruiterId) {
      return res.status(403).json({
        message: "Not authorized.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


// ================= UPDATE APPLICATION STATUS =================
export const updateStatus = async (req, res) => {
  try {
    const recruiterId = req.id;
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    const allowedStatuses = ["pending", "accepted", "rejected"];

    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid status value.",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // 🔒 Ensure recruiter owns this job
    const job = await Job.findById(application.job);
    if (!job || job.created_by.toString() !== recruiterId) {
      return res.status(403).json({
        message: "Not authorized to update this application.",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
      application,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
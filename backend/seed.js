import "./env.js";
import mongoose from "mongoose";
import mongodbconnect from "./utils/db.js";
import User from "./models/userModel.js";
import Company from "./models/companyModel.js";
import Job from "./models/jobModel.js";
import bcrypt from "bcryptjs";

const run = async () => {
  try {
    await mongodbconnect();

    await Promise.all([User.deleteMany({}), Company.deleteMany({}), Job.deleteMany({})]);

    const password = await bcrypt.hash("password123", 10);

    const admin = await User.create({
      fullname: "Admin User",
      email: "admin@workxplore.com",
      phoneNumber: 9999999999,
      password,
      role: "admin",
    });

    const recruiter = await User.create({
      fullname: "Recruiter One",
      email: "recruiter@workxplore.com",
      phoneNumber: 8888888888,
      password,
      role: "recruiter",
    });

    const student = await User.create({
      fullname: "Student One",
      email: "student@workxplore.com",
      phoneNumber: 7777777777,
      password,
      role: "student",
    });

    const company = await Company.create({
      name: "WorkXplore Labs",
      description: "A modern job marketplace.",
      website: "https://workxplore.local",
      location: "Remote",
      userId: recruiter._id,
    });

    await Job.create([
      {
        title: "Full Stack Engineer",
        description: "Build modern web apps with React and Node.",
        requirements: ["React", "Node", "MongoDB"],
        salary: 1200000,
        experienceLevel: 2,
        location: "Remote",
        jobType: "Full-time",
        position: 2,
        company: company._id,
        created_by: recruiter._id,
      },
      {
        title: "Product Designer",
        description: "Design delightful user experiences.",
        requirements: ["Figma", "UX", "UI"],
        salary: 900000,
        experienceLevel: 3,
        location: "Bangalore",
        jobType: "Hybrid",
        position: 1,
        company: company._id,
        created_by: recruiter._id,
      },
    ]);

    console.log("Seed data created successfully.");
    console.log("Admin: admin@workxplore.com / password123");
    console.log("Recruiter: recruiter@workxplore.com / password123");
    console.log("Student: student@workxplore.com / password123");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.connection.close();
  }
};

run();


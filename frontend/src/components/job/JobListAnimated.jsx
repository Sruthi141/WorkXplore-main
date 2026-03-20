import React from "react";
import JobCardAnimated from "./JobCardAnimated.jsx";

export default function JobListAnimated({ jobs = [] }) {
  if (!jobs.length) {
    return <div className="grid place-items-center py-20">No jobs found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((j) => (
        <JobCardAnimated key={j._id} job={j} />
      ))}
    </div>
  );
}
import { useEffect, useState } from "react";
// import Navbar from '../common/Navbar.jsx'

import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useGetAllRecruiterJobs from "../../hooks/useGetAllRecruiterJobs.jsx";
import { setSearchJobByText } from "../../redux/jobslice.jsx";
import RecruiterJobsTable from "../layout/recruiterJobs/RecruiterJobsTable.jsx";

const AdminJobs = () => {
  useGetAllRecruiterJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      {/* <Navbar /> */}
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
  className="bg-indigo-600 hover:bg-indigo-700 text-white"
  onClick={() => navigate("/recruiter/jobs/create")}
>
  + Post Job
</Button>
        </div>
      <RecruiterJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs
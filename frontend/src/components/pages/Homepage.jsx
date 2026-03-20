/* eslint-disable no-unused-vars */
import { useEffect } from "react";
// import Navbar from "../common/Navbar.jsx";

import Herosection from "../layout/home/HeroPremium.jsx";
import CategoryCatalouge from "../layout/home/CategoryCatalouge.jsx";
import Latestjobs from "../layout/home/Latestjobs.jsx";
import Footer from "../common/Footer.jsx";

import useGetAllJobs from "../../hooks/useGetAllJobs.jsx";
import { setSearchedQuery } from "../../redux/jobslice.jsx";
import { useDispatch, useSelector } from "react-redux";

import RecentJobsPosted from "../layout/home/RecentJobsPosted.jsx";
import CompanyCatalouge from "../layout/home/CompanyCatalouge.jsx";

function Homepage() {
  useGetAllJobs();

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {/* <Navbar /> */}
      <Herosection></Herosection>

      {user && user.role === "recruiter" ? (
        <>
         <CompanyCatalouge></CompanyCatalouge>
          <RecentJobsPosted></RecentJobsPosted>
        </>
      ) : (
        <>
       
          <CategoryCatalouge></CategoryCatalouge>
          <Latestjobs></Latestjobs>
        </>
      )}

      <Footer></Footer>
    </>
  );
}

export default Homepage;

import Filterjobs from "../layout/jobs/Filterjobs.jsx";
import JobListAnimated from "../job/JobListAnimated.jsx";

import { Input } from "../ui/input.jsx";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// ✅ safer
import useGetAllJobs from "../../hooks/useGetAllJobs.jsx";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs = [], searchedQuery = "" } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [page, setPage] = useState(1);
  const [locationFilter, setLocationFilter] = useState(""); // ✅ NEW
  const pageSize = 9;

  useGetAllJobs();

  useEffect(() => {
    let filtered = Array.isArray(allJobs) ? [...allJobs] : [];

    const q = (searchedQuery || "").trim().toLowerCase();
    const locQ = (locationFilter || "").trim().toLowerCase();

    // ✅ Text search filter (title/description/location)
    if (q) {
      filtered = filtered.filter((job) => {
        const title = (job?.title || "").toLowerCase();
        const desc = (job?.description || "").toLowerCase();
        const loc = (job?.location || "").toLowerCase();
        return title.includes(q) || desc.includes(q) || loc.includes(q);
      });
    }

    // ✅ Separate location filter
    if (locQ) {
      filtered = filtered.filter((job) => {
        const loc = (job?.location || "").toLowerCase();
        return loc.includes(locQ);
      });
    }

    setFilterJobs(filtered);
    setPage(1);
  }, [allJobs, searchedQuery, locationFilter, dispatch]);

  return (
    <div>
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-72">
            <div className="sticky top-24">
              <Filterjobs />
            </div>
          </aside>

          <main className="flex-1">
            {/* ✅ NEW: Location filter input */}
            <div className="mb-4">
              <Input
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Filter by location (e.g., Bangalore, Remote, Hyderabad)"
                className="max-w-md"
              />
            </div>

            {filterJobs.length <= 0 ? (
              <div className="py-20">
                <div className="text-center text-muted-foreground">No jobs found</div>
              </div>
            ) : (
              <div className="pb-10 space-y-4">
                <JobListAnimated jobs={filterJobs.slice((page - 1) * pageSize, page * pageSize)} />

                {filterJobs.length > pageSize && (
                  <div className="flex justify-between items-center pt-4 text-sm text-muted-foreground">
                    <span>
                      Page {page} of {Math.ceil(filterJobs.length / pageSize)}
                    </span>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1 rounded-md border border-border disabled:opacity-50"
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        disabled={page * pageSize >= filterJobs.length}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1 rounded-md border border-border disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
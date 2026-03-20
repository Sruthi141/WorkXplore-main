import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";

// ✅ fixed folder case
import CompaniesTable from "../layout/Company/CompanyJobsTable.jsx";

import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies.jsx";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// ✅ fixed slice name
import { setSearchCompanyByText } from "../../redux/companyslice.jsx";

function Companies() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/recruiter/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
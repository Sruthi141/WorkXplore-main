import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { ADMIN_API_END_POINT } from "../utils/constant";

function Barchart() {
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        // If you store JWT in localStorage, uncomment next line
        const token = localStorage.getItem("token"); // adjust key if different

        const response = await axios.get(`${ADMIN_API_END_POINT}/users`, {
          withCredentials: true, // important if auth uses cookies
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!isMounted) return;

        const students = Array.isArray(response.data?.students)
          ? response.data.students
          : [];
        const recs = Array.isArray(response.data?.recruiters)
          ? response.data.recruiters
          : [];

        setUsers(students);
        setRecruiters(recs);
      } catch (error) {
        console.error("Error fetching users:", error?.response?.data || error.message);
        if (isMounted) {
          setUsers([]);
          setRecruiters([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  const data = [
    { name: "January", users: 0, recruiters: 0 },
    { name: "February", users: 0, recruiters: 0 },
    { name: "March", users: 0, recruiters: 0 },
    { name: "April", users: 0, recruiters: 0 },
    { name: "May", users: 0, recruiters: 0 },
    { name: "June", users: 0, recruiters: 0 },
    { name: "July", users: 0, recruiters: 0 },
    { name: "August", users: 0, recruiters: 0 },
    { name: "September", users: 0, recruiters: 0 },
    { name: "October", users: 0, recruiters: 0 },
    { name: "November", users: 0, recruiters: 0 },
    { name: "December", users: users.length, recruiters: recruiters.length },
  ];

  if (loading) {
    return <div style={{ height: 250, display: "grid", placeItems: "center" }}>Loading...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="recruiters"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="users"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Barchart;
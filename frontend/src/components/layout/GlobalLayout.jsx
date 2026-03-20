import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";

export default function GlobalLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
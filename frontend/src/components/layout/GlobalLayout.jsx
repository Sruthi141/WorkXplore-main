import { Outlet } from "react-router-dom";
import Navbar from "../common/navbar.jsx";

export default function GlobalLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
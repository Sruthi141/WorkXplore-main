import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar"; // ✅ adjust if your navbar file name is different

export default function GlobalLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
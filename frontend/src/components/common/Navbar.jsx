/* eslint-disable no-unused-vars */
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { Button } from "../ui/button.jsx";

import { Sun, Moon } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// ✅ FIXED HERE
import { setUser } from "@/redux/authslice.jsx";

import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classlinks = ["Home", "Jobs", "Resume", "Browse", "Premium"];
  const recruiterlink = ["Home", "Companies", "Jobs", "Resume", "Premium"];

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  const defaultAvatar = "/default-avatar.png";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white text-zinc-900 dark:border-[#152246] dark:bg-[#040A19] dark:text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold">
              W
            </div>
            <span className="text-xl font-semibold">Work Xplore</span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {(user && user.role === "recruiter" ? recruiterlink : classlinks).map((link, idx) => {
              let to = "/";

              if (link === "Home") to = "/";
              else if (link === "Companies") to = "/recruiter/companies";
              else if (link === "Jobs") to = user?.role === "recruiter" ? "/recruiter/jobs" : "/jobs";
              else if (link === "Resume") to = "/resume";
              else if (link === "Premium") to = "/plans";
              else to = `/${link.toLowerCase()}`;

              return (
                <NavLink
                  key={idx}
                  to={to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 pb-1"
                        : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    }`
                  }
                >
                  {link}
                </NavLink>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {!user ? (
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-zinc-300 text-zinc-900 bg-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-white/10"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link to="/signup">Signup</Link>
                </Button>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto || defaultAvatar} alt="User Avatar" />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-64 p-4 rounded-lg border bg-white text-zinc-900 border-zinc-200 dark:bg-[#0B1630] dark:border-[#152246] dark:text-white">
                  <div className="flex gap-4 items-center">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto || defaultAvatar} alt="User Avatar" />
                    </Avatar>
                    <div>
                      <h1 className="font-medium">{user.fullname || user.name}</h1>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild variant="link" className="justify-start px-0 text-zinc-900 dark:text-white">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                    <Button asChild variant="link" className="justify-start px-0 text-zinc-900 dark:text-white">
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                    <Button
                      variant="link"
                      onClick={handleLogout}
                      type="button"
                      className="text-red-500 dark:text-red-400 justify-start px-0"
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-md transition hover:bg-zinc-100 text-zinc-900 dark:hover:bg-white/10 dark:text-white"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default Navbar;
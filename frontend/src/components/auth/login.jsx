/* eslint-disable react/no-unescaped-entities */
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authslice.jsx";
import { Eye, EyeOff, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "", role: "" };
    let isValid = true;

    if (!input.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!input.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    if (!input.role) {
      newErrors.role = "Please select a role.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res?.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);

        if (res.data.user.email === "admin@domain.com" || res.data.user.role === "admin") {
          navigate("/adminpanel");
        } else {
          navigate("/");
        }
      } else {
        toast.error(res?.data?.message || "Login failed");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Network error. Check backend is running on port 5000.";
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      if (user.email === "sruthi.k22@iiits.in" || user.role === "admin") {
        navigate("/adminpanel");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const roleHint = useMemo(() => {
    if (input.role === "student") return "Explore jobs, apply, and manage your resume.";
    if (input.role === "recruiter") return "Post jobs, review applicants, and hire faster.";
    return "Choose your role to continue.";
  }, [input.role]);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      {/* Aurora Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
        <div className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-28 left-[30%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Brand panel */}
          <div className="hidden lg:block">
            <div className="h-full rounded-3xl border border-border/60 bg-card/50 backdrop-blur-md p-10 shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow">
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight text-foreground">Work Xplore</div>
                  <div className="text-sm text-muted-foreground">Premium Job Portal</div>
                </div>
              </div>

              <h2 className="mt-8 text-3xl font-semibold tracking-tight text-foreground">
                Sign in, stay ahead.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                A clean, premium experience for students and recruiters. Search smarter,
                apply faster, and manage hiring with clarity.
              </p>

              <div className="mt-8 space-y-3">
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <ShieldCheck size={16} className="text-primary" />
                    Secure session (cookies enabled)
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Your login uses secure cookies via <span className="font-mono">withCredentials</span>.
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                  <div className="text-sm font-semibold text-foreground">What you get</div>
                  <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                    <li>• Saved jobs + quick apply (UI premium flow)</li>
                    <li>• Recruiter dashboard with applicants pipeline</li>
                    <li>• Resume score & profile completeness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Login card */}
          <div>
            <div className="rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-7 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Login
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter your details to continue.
                  </p>
                </div>

                <div className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                  {roleHint}
                </div>
              </div>

              <form onSubmit={submitHandler} className="mt-6 space-y-4">
                {/* Email */}
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="you@example.com"
                    className="mt-1 bg-background/60"
                  />
                  {errors.email ? (
                    <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
                  ) : null}
                </div>

                {/* Password */}
                <div>
                  <Label>Password</Label>
                  <div className="mt-1 relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={input.password}
                      name="password"
                      onChange={changeEventHandler}
                      placeholder="••••••••"
                      className="pr-10 bg-background/60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground hover:bg-muted/50 transition"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password ? (
                    <p className="mt-1 text-xs text-rose-500">{errors.password}</p>
                  ) : null}
                </div>

                {/* Role */}
                <div>
                  <Label>Role</Label>

                  <RadioGroup className="mt-2 grid grid-cols-2 gap-2">
                    <label
                      className={[
                        "flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition cursor-pointer",
                        input.role === "student"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border/70 bg-background/60 text-foreground hover:bg-muted/50",
                      ].join(" ")}
                    >
                      <Input
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role === "student"}
                        onChange={changeEventHandler}
                        className="cursor-pointer"
                      />
                      Student
                    </label>

                    <label
                      className={[
                        "flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition cursor-pointer",
                        input.role === "recruiter"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border/70 bg-background/60 text-foreground hover:bg-muted/50",
                      ].join(" ")}
                    >
                      <Input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role === "recruiter"}
                        onChange={changeEventHandler}
                        className="cursor-pointer"
                      />
                      Recruiter
                    </label>
                  </RadioGroup>

                  {errors.role ? (
                    <p className="mt-2 text-xs text-rose-500">{errors.role}</p>
                  ) : null}
                </div>

                {/* Submit */}
                {loading ? (
                  <Button className="w-full mt-2" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full mt-2">
                    Login
                  </Button>
                )}

                {/* Footer */}
                <div className="pt-2 text-sm text-muted-foreground">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-primary font-medium hover:underline">
                    Signup
                  </Link>
                </div>
              </form>

              {/* UI-only social buttons */}
              <div className="mt-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  OR
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => toast.message("Google login UI only")}
                    className="rounded-2xl border border-border/70 bg-background/60 px-4 py-2 text-sm font-medium hover:bg-muted/50 transition"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.message("LinkedIn login UI only")}
                    className="rounded-2xl border border-border/70 bg-background/60 px-4 py-2 text-sm font-medium hover:bg-muted/50 transition"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile brand strip */}
            <div className="mt-4 lg:hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-4 text-center">
              <div className="text-sm font-semibold text-foreground">Work Xplore</div>
              <div className="text-xs text-muted-foreground">Premium Job Portal Experience</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
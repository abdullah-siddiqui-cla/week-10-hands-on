import { useContext, useState } from "react";
import { Link } from "react-router";
import { z } from "zod";
import LocationHint from "../components/LocationHint.jsx";
import Navigation from "../components/Navigation.jsx";
import PromoField from "../components/PromoField.jsx";
import Timer from "../components/timer/Timer.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { PAGE_INNER, PAGE_OUTER } from "../constants/pageFrame.js";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function issuesToFieldErrors(issues) {
  const fields = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && fields[key] === undefined) {
      fields[key] = issue.message;
    }
  }
  return fields;
}

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const result = loginSchema.safeParse({ username, password });
    if (!result.success) {
      setFieldErrors(issuesToFieldErrors(result.error.issues));
      return;
    }
    setFieldErrors({});
    console.log("Login (valid):", result.data);
    login(result.data.username.trim());
  }

  return (
    <div className={PAGE_OUTER}>
      <div className={PAGE_INNER}>
        <LocationHint />

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-amber-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <PromoField />
          <Timer />
        </div>

        <Navigation />

        <h1 className="mb-2 text-2xl font-semibold text-amber-950">Log in</h1>
        <p className="mb-6 text-sm text-amber-800">
          Demo only — no real account. Valid submit logs to the console and sets
          mock &quot;logged in&quot; state.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-md space-y-4 rounded-xl border border-amber-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label
              htmlFor="login-username"
              className="block text-sm font-medium text-amber-950"
            >
              Username
            </label>
            <input
              id="login-username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-amber-200 px-3 py-2 text-amber-950 outline-none focus:border-amber-400"
            />
            {fieldErrors.username ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.username}</p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-amber-950"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-amber-200 px-3 py-2 text-amber-950 outline-none focus:border-amber-400"
            />
            {fieldErrors.password ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
          >
            Submit
          </button>
        </form>

        <p className="mt-6 text-sm text-amber-800">
          Need an account?{" "}
          <Link to="/signup" className="font-medium text-amber-700 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

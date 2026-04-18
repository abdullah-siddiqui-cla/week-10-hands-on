import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import LocationHint from "../components/LocationHint.jsx";
import Navigation from "../components/Navigation.jsx";
import PromoField from "../components/PromoField.jsx";
import Timer from "../components/timer/Timer.jsx";
import { PAGE_INNER, PAGE_OUTER } from "../constants/pageFrame.js";

const signUpSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onValid(data) {
    console.log("Sign up (valid):", data);
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

        <h1 className="mb-2 text-2xl font-semibold text-amber-950">Sign up</h1>
        <p className="mb-6 text-sm text-amber-800">
          Demo form — valid submit logs to the console.
        </p>

        <form
          onSubmit={handleSubmit(onValid)}
          className="max-w-md space-y-4 rounded-xl border border-amber-200 bg-white p-6 shadow-sm"
          noValidate
        >
          <div>
            <label
              htmlFor="signup-username"
              className="block text-sm font-medium text-amber-950"
            >
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-amber-200 px-3 py-2 text-amber-950 outline-none focus:border-amber-400"
              {...register("username")}
            />
            {errors.username ? (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium text-amber-950"
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-amber-200 px-3 py-2 text-amber-950 outline-none focus:border-amber-400"
              {...register("password")}
            />
            {errors.password ? (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="signup-confirm"
              className="block text-sm font-medium text-amber-950"
            >
              Confirm password
            </label>
            <input
              id="signup-confirm"
              type="password"
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-amber-200 px-3 py-2 text-amber-950 outline-none focus:border-amber-400"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-sm text-amber-800">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-amber-700 underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;

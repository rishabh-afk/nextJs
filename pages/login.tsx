import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const { push } = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/public/v1/auth/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data.message === "User does not exist") {
        toast.info(resp.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        push("/register");
      } else if (resp.data.message === "Your password does not match") {
        toast.info(resp.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success(resp.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        push("/login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleChange = (e: any) => {
    if (e.target.name === "email") {
      setUser({ ...user, email: e.target.value });
    } else {
      setUser({ ...user, password: e.target.value });
    }
  };
  return (
    <section className="bg-gray-50 pt-14">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-center">
                <Link
                  href={"forget"}
                  className="text-sm font-medium text-primary-600 hover:underline text-white"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-lg text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </button>
              <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href={"register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

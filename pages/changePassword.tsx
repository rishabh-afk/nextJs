import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const changePassword = () => {
  const { push } = useRouter();
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      toast.error("Your password is incorrect", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const email = localStorage.getItem("email");
      const data = {
        email: email,
        password: password.confirmPassword,
      };
      const resp = await axios.put(
        "http://localhost:3000/api/public/v1/auth/forgetPassword",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (resp.data.message === "Updated successfully") {
        toast.success(resp.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        push("/login");
      } else {
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };
  return (
    <section className="bg-gray-50 pt-14">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Your Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="newpassword"
                  onChange={(e: any) => {
                    setPassword({ ...password, newPassword: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="********"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="confirmpassword"
                  onChange={(e: any) => {
                    setPassword({
                      ...password,
                      confirmPassword: e.target.value,
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="********"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default changePassword;

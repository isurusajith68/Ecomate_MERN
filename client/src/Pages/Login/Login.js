import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function login(ev) {
    ev.preventDefault();

    const res = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 400) {
      toast.error("fields are empty");
    } else if (res.status === 401) {
      toast.error("Invalid username or password");
    } else if (res.status === 401) {
      toast.error("Invalid username or password");
    } else if (res.status === 200) {
      const data = await res.json();

      localStorage.setItem('token', data.token);

      if (data.type === "user") {
        toast.success("Welcome " + data.name);
            setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.success("Welcome " + data.name);

            setTimeout(() => {
              navigate("/");
            }, 1000);
      }
    } else {
      toast.error("Server error");
    }
  }
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div>
        <section class="bg-gray-50 bg-white">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-gray-500 border-black rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0 ">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl   ">
                  Sign in to your account
                </h1>
                <form class="space-y-4 md:space-y-6" onSubmit={login}>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-white "
                    >
                      Your email
                    </label>
                    <input
                      type="name"
                      name="name"
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                      class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      required=""
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Sign in
                  </button>
                  <p class="text-sm font-light text-white ">
                    Don’t have an account yet?{" "}
                    <Link
                      to={"/register"}
                      class="font-medium text-primary-600 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;

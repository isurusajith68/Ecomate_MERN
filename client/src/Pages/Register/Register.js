import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();

  async function register(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      body: JSON.stringify({ name, email, phonenumber, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 400) {
      toast.error("fields are empty");
    } else if (response.status === 409) {
      toast.error("name or email already exists");
    } else if (response.status === 201) {
      toast.success("User created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
                  Sign up
                </h1>
                <form class="space-y-4 md:space-y-6" onSubmit={register}>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-white ">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                      class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="name "
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-white "
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      
                      onChange={(ev) => setEmail(ev.target.value)}
                     
                      class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="name@company.com"
                      required=""
                    />
                    
                  </div>{" "}
                  <div>
                    <label class="block mb-2 text-sm font-medium text-white ">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phonenumber"
                      value={phonenumber}
                      onChange={(ev) => setPhonenumber(ev.target.value)}
                      class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="+94761243234"
                      required=""
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-white">
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
                    Register
                  </button>
                  <p class="text-sm font-light text-white ">
                    Do you have already account{" "}
                    <Link
                      to={"/login"}
                      class="font-medium text-primary-600 hover:underline"
                    >
                      Login
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

export default Register;

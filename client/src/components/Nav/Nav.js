import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from 'jwt-decode';
function Nav() {

const storedToken = localStorage.getItem('token');
 
const decodedToken = jwt_decode(storedToken);
const inactivelink = "text-white hover:text-blue-500";
const activelink = "text-red-500 hover:text-blue-500";
const router = useLocation();
const { pathname } = router;
const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login')
  };



  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full fixed  z-10">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-8">
        <a href="/" className="flex items-start">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ECOMAT
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="text-lg font-semibold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"

                className={pathname === "/" ? activelink : inactivelink}
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/cresource"
                  className={
              pathname.includes("/cresource") ? activelink : inactivelink
            }
              >
                Resource
              </a>
            </li>
            <li>
              <a
                href="/services"
                className={
                  pathname.includes("/services") ? activelink : inactivelink
                }
              >
                Energy audit
              </a>
            </li>
            <li>
              <a
                href="/d"
                className={
                  pathname.includes("/ss") ? activelink : inactivelink
                }
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/ds"
                className={
                  pathname.includes("/ss") ? activelink : inactivelink
                }
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        
        <div className="text-white flex space-x-4">
        <div className="mr-6">
          <span className="text-white">Hello , <a className="text-blue-500"> {decodedToken.name}</a></span>
        </div>
          <svg
          onClick={handleSignOut}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg> */}
        </div>
      </div>
    </nav>
  );
}

export default Nav;

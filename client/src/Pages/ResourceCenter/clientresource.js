import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Res from "./Res";
import Nav from "../../components/Nav/Nav";
import Fotter from "../../components/Fotter/Fotter";
import ResClient from "./ResClient";
import toast, { Toaster } from "react-hot-toast";
function AResource() {
  const [resources, setResource] = useState([]);
useEffect(() => {
  const fetchResources = async () => {
    const promise = toast.promise(
      fetch("http://localhost:5000/resource/post").then((response) =>
        response.json()
      ),
      {
        loading: "Loading resources...",
        success: (data) => {
          setResource(data);
          return "Resources loaded successfully";
        },
        error: () => {
          return "Error loading resources";
        },
      }
    );
    await promise;
  };

  fetchResources();
}, []);

  var res = resources;
  console.log(res);

  return (
    <>
      <Nav />
      <Toaster position="top-center"  reverseOrder={false} />
      <div className="h-[800px]">
        <div className=" text-center justify-center flex text-blue-900 text-2xl font-bold mb-[150px] ">
          <h2>Resources</h2>
        </div>
        {resources.length > 0 &&
          resources.map((resource) => <ResClient {...resource} />)}
      </div>
      <Fotter />
    </>
  );
}

export default AResource;
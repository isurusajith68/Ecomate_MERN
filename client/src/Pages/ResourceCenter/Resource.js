import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import Res from "./Res";
import toast, { Toaster } from "react-hot-toast";
function Resource() {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    //   fetch("http://localhost:5000/resource/post")
    //     .then((response) => {
    //       response.json().then((resources) => {
    //         setResource(resources);
    //         setLoading(false);
    //         toast.success("Data fetched successfully!");

    //       });
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //       // set the loading state to false
    //       setLoading(false);
    //       // show error toast notification
    //       toast.error("Error fetching data");
    //     });
    // }, []);
    const fetchResources = async () => {
      const promise = toast.promise(
        fetch("http://localhost:5000/resource/post").then((response) =>
          response.json()
        ),
        {
          loading: "Loading resources...",
          success: (data) => {
            setResources(data);
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

var res = resources
console.log(res)
  
  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="text-black mt-3 ml-3">
        <Link to={"addresource"}>
          <span className="bg-blue-900 p-2 border-2 text-white">
            Add Resource
          </span>
        </Link>
      </div>
      <div className="mt-5 text-center justify-center flex text-blue-900 text-2xl font-bold">
        <h2>All Resource</h2>
      </div>
      <div></div>
      {resources.length > 0 &&
        resources.map((resource) => <Res {...resource} />)}
      {/* <div>
        {loading ? (
          <p>Loading...</p>
        ) : resources.length > 0 ? (
          resources.map((resource) => <Res {...resource} />)
        ) : (
          <p>No resources found.</p>
        )}
      </div> */}
    </Layout>
  );
}

export default Resource;
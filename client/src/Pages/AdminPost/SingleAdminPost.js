import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { formatISO9075 } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import jwt_decode from "jwt-decode";

function SingleAdminPost() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const storedToken = localStorage.getItem("token");

  const decodedToken = jwt_decode(storedToken);

  useEffect(() => {
    if (decodedToken.type === "user") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/resource/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  async function deletePost(id) {
    const response = await fetch(
      "http://localhost:5000/resource/post/" + postInfo._id,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      toast.success("Resource delete successfully");
      setTimeout(() => {
        navigate("/resource");
      }, 1000);
    }
  }

  if (!postInfo) return "";
  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="w-full p-4 ">
        <article class="py-12 px-4">
          <h1 class="text-4xl text-center mb-4 font-semibold font-heading font-semibold text-blue-900  ">
            {postInfo.title}
          </h1>
          <div className="flex flex-row">
            <div className="flex-1">
              <img
                src={"http://localhost:5000/" + postInfo.cover}
                className=" h-[300px] fixed ml-10 shadow-black rounded-lg"
              />
            </div>
            <div className="p-1 flex-1">
              <p class=" mt-3 text-xl text-center">
                <span>{postInfo.summary}</span>
              </p>
              <div
                class="max-w-3xl mx-auto mt-3"
                className="content"
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
              />
              <p class=" mt-3">
                <span>{formatISO9075(new Date(postInfo.createdAt))}</span>
              </p>
            </div>
          </div>
        </article>
      </div>
      <div className="flex pl-40 pr-40 justify-between ">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-[300px] "
          onClick={deletePost}
        >
          Delete
        </button>
        <Link
          class="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 text-center rounded-full  w-[300px]"
          to={`/resource/edit/${postInfo._id}`}
        >
          Update
        </Link>
      </div>
    </Layout>
  );
}

export default SingleAdminPost;

import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import { formatISO9075 } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import jwt_decode from "jwt-decode";
import Nav from "../../components/Nav/Nav";
import Fotter from "../../components/Fotter/Fotter";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
function SinglePost() {
  const [postInfo, setPostInfo] = useState();
  const { id } = useParams();
  const contentRef = useRef(null);
  useEffect(() => {
    fetch(`http://localhost:5000/resource/postclient/${id}`).then(
      (response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      }
    );
  }, []);



  console.log(postInfo);

  if (!postInfo) return "";
  return (
    <>
      <Nav />
      <div className="w-full p-4 ">
        <article class="py-12 px-4 ">
          <h1 class="text-4xl text-center mb-4 font-semibold font-heading font-semibold text-blue-900 mt-[80px]  ">
            {postInfo.title}
          </h1>
          <div className="flex flex-row">
            <div className="flex-1">
              <img
                src={"http://localhost:5000/" + postInfo.cover}
                className=" h-[300px] fixed ml-10 shadow-black rounded-lg md"
              />
            </div>
            <div className="p-1 flex-1">
              <p class=" mt-3 text-xl text-center">
                <span>{postInfo.summary}</span>
              </p>
              <div
                class="max-w-3xl mx-auto mt-3"
                className="content"
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
              />
              <p class=" mt-3">
                <span>{formatISO9075(new Date(postInfo.createdAt))}</span>
              </p>
            </div>
           {/* // <button onClick={handleDownload}>Download PDF</button> */}
          </div>
        </article>
      </div>
      <Fotter />
    </>
  );
}

export default SinglePost;

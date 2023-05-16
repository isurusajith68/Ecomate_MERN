import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Editor from "../../components/Editor/Editor";
import toast, { Toaster } from "react-hot-toast";

function AddResource() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    ev.preventDefault();
    const response = await fetch("http://localhost:5000/resource/post", {
      method: "POST",
      body: data,
     
    });
    if (response.status === 400) {
      toast.error("fields are empty");
    }else if(response.status === 201){
      toast.success("Resource created successfully");
      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    }else {
      toast.error("Server error");
    }
  }

  if (redirect) {
    return <Navigate to={"/resource"} />;
  }  
  return (
    <Layout>
       
      <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
        <form
          className="flex flex-col w-full text-black gap-3"
           onSubmit={createNewPost}
        >
          <label>Title</label>
          <input
          className="border-2"
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <label>Summary</label>
          <input
          className="border-2"
            type="summary"
            placeholder={"Summary"}
            value={summary}
            maxlength="40"
           onChange={(ev) => setSummary(ev.target.value)}
          />
          <input
            type="file"
            required
            onChange={(ev) => setFiles(ev.target.files)}
          />
          <Editor
           value={content} onChange={setContent}
          />
          <button className="bg-blue-900 p-2 text-white" style={{ marginTop: "5px" }}>Create post</button>
        </form>
      </div>
    </Layout>
  );
}

export default AddResource;

import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../../components/Editor/Editor";
import Layout from "../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/resource/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:5000/resource/post", {
      method: "PUT",
      body: data,
    });
    if(response.status ===400){
      toast.success("fiels are empty ");
    }
    else if (response.status===201) {
      toast.success("Resource update successfully");
      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    }else {
      toast.error("Server error");
    }
  }

  if (redirect) {
    return <Navigate to={"/resource/asinglepost/" + id} />;
  }

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
 <form onSubmit={updatePost} className="flex flex-col w-full text-black gap-3">
      <input
      className="border-2"
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
       className="border-2"
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input    type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor    onChange={setContent} value={content} />
      <button   className="bg-blue-900 p-2 text-white" style={{ marginTop: "5px" }}>Update post</button>
    </form>
    </Layout>
   
  );
}
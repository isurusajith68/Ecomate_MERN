import React, { useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import Fotter from "../../components/Fotter/Fotter";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  const decodedToken = jwt_decode(storedToken);

  console.log(decodedToken.type);

  useEffect(() => {
    if (decodedToken.type === "admin") {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="h-[900px]"></div>
      <Fotter />
    </>
  );
}

export default Home;

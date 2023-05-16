import React,{useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
function Dashboard() {

  const storedToken = localStorage.getItem('token');
 
  const decodedToken = jwt_decode(storedToken);

  const navigate = useNavigate();
  console.log(decodedToken.type);

  useEffect(() => {
    if (decodedToken.type === "user") {
      navigate("/");
    }
  }, []);

  return (
    <Layout>
    <div>
      <h1>Hello, {decodedToken.name}</h1>
    </div>
    </Layout>
  )
}

export default Dashboard

import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import toast, { Toaster } from "react-hot-toast";
import Fotter from "../../components/Fotter/Fotter";
export default function ServicessList() {
  const storedToken = localStorage.getItem("token");
  const decodedToken = jwt_decode(storedToken);
  const uid = decodedToken.userId;
  //console.log(uid);
  const [audits, setAudit] = useState([]);

  const navigate = useNavigate();

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:5000/audit/${id}`)
      .then((response) => {
        toast.success("Delete Successfully ");
        fetchData();
      })
      .catch((error) => {
        toast.error("delete unsuccessfully");
        console.log(error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/audit/audit/get/${uid}`
      );
      setAudit(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Toaster position="top-center " reverseOrder={false}></Toaster>
      <Nav />

      <div className="flex  justify-center items-center ">
        <table className="w-[500px]  mt-[200px] ">
          <thead>
            <tr>
              <td>Appliance</td>
              <td>Quantity</td>
              <td>H/Day</td>
              <td>P/W</td>
              <td>Kwh/Day</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {audits.map((row, index) => (
              // eslint-disable-next-line react/jsx-key
              <tr key={index}>
                <td>{row.appliance}</td>
                <td>{row.quantity}</td>
                <td>{row.h}</td>
                <td>{row.p}</td>
                <td>{row.kwh}</td>
                {/* <td>{audit._id}</td> */}

                <td>
                  <Link to={"/servicesedit/" + row._id}>
                    <svg
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    
        
                  </Link>
                </td>
                <td>
                  <button onClick={() => deleteData(row._id)}>
                    <svg
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Fotter/>
    </div>
  );
}

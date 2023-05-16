import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Fotter from "../../components/Fotter/Fotter";
import Nav from "../../components/Nav/Nav";
import toast, { Toaster } from "react-hot-toast";

function EditServicess() {
  const [appliance, setAppliance] = useState("");
  const [quantity, setQuantity] = useState("");
  const [h, setH] = useState("");
  const [p, setP] = useState("");
  const [kwh, setKwh] = useState("");

  const navigate = useNavigate("");
  const { id } = useParams();

  function Cal() {
    setKwh(quantity * h * p);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/audit/audit/${id}`).then((response) => {
      response.json().then((audit) => {
        setAppliance(audit.appliance);
        setQuantity(audit.quantity);
        setH(audit.h);
        setP(audit.p);
        setKwh(audit.kwh);
      });
    });
  }, []);

  async function update(ev) {
    ev.preventDefault();
    const res = await fetch("http://localhost:5000/audit/audit/update", {
      method: "PUT",
      body: JSON.stringify({ appliance, quantity, h, p, kwh, id }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 400) {
      toast.error("fields are empty");
    } else if (res.status === 201) {
      toast.success("Update Successfully");
      setTimeout(() => {
        navigate("/serviceslist");
      }, 1000);
    } else {
      toast.error("Server error");
    }
  }
  
  return (
    <div>
      <Toaster position="top-center " reverseOrder={false}></Toaster>

      <Nav />

      <div className="flex  justify-center items-center">
        <div className="flex flex-col w-[500px]  ">
          <br></br>
          <br></br>
          <br></br>
          <h1 className="text-3xl font-bold text-center mt-[50px] mb-5">
            Update Energy Audit
          </h1>
          <label className="font-medium ">Appliance</label>
          <input
            className="w-full text-center bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
            type="text"
            value={appliance}
            onChange={(e) => {
              setAppliance(e.target.value);
            }}
          />

          <br></br>

          <label className="font-medium">Quantity</label>

          <input
            className="w-full text-center bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <br></br>

          <label className="font-medium">H/Day</label>

          <input
            className="w-full text-center bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
            type="number"
            value={h}
            onChange={(e) => {
              setH(e.target.value);
            }}
          />
          <br></br>
          <label className="font-medium">P/W</label>

          <input
            className="w-full text-center bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
            type="number"
            value={p}
            onChange={(e) => {
              setP(e.target.value);
            }}
          />
          <br></br>

          <br></br>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={Cal}
          >
            Genarate
          </button>
          <br></br>

          <label className="font-medium text-center">Kwh/Day</label>

          <input
            className="ml-[202px] text-center w-[100px] bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
            type="text"
            value={kwh}
            onChange={(e) => {
              setKwh(e.target.value);
            }}
            readOnly
          />

          <br></br>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={update}
          >
            Update
          </button>
        </div>
      </div>

      {/* <div onClick={() => onClick("account")} className="backBtnn">
        PREVIOUS
      </div> */}

      <Fotter />
    </div>
  );
}

export default EditServicess;

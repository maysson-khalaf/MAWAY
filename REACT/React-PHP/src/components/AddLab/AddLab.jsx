import React from "react";
import style from "./AddLab.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import animated from "../../images/animated.gif";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

function AddLab() {
  const navigate = useNavigate();

  const [UserData, setuserData] = useState(null);
  const [inputs, setInputs] = useState({});
  const [msg , setMessage] = useState("");

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  
  }
  useEffect(() => {
    const encodedToken = localStorage.getItem('token');
    if (!encodedToken) {
      navigate('/LoginDash'); // Redirect to login page if token is not found
    } else {
      const decodedToken = jwtDecode(encodedToken);
      console.log(decodedToken);
      setuserData(decodedToken);
      getUsers();
    }
  }, [navigate]);

  const handleSubmit = (event) =>{
  event.preventDefault();
  
  axios.post('http://localhost/APIS/LabApi/save', inputs).then(function(response){
   console.log(response.data);
   setMessage(response.data.message);
   setTimeout(() => {
    setMessage("");
    navigate("/Lablist");
  }, 4000);
  });
  
  }

  const [users, setUsers] = useState([]);


  // useEffect(() => {
  //     getUsers();

  // }, []);
  if (!UserData || UserData.role !== "إداري") {
    navigate('/LoginDash');
  }

function getUsers() {

axios.get("http://localhost/APIS/selectapi").then(function(response){
  console.log(response.data);
  setUsers(response.data);
});

}
  return (
   <>

   <div className={style.parent}>
   <div className={style.formParent}>
   <h3 className={style.head}>اضافه معمل جديد</h3>
   {msg && (
            <p className={`${style.Message} alert alert-success`}>{msg}</p>
          )}
   <form onSubmit={handleSubmit}>
   <div className={style.inputs}>
     
     <label htmlFor="username" className={style.label}>اسم المعمل</label><br/>
   <input  type="text" id="lab_name" name="lab_name" className={style.input} onChange={handleChange} />
   </div>
   
   <div className={style.parentOption}>
     <label htmlFor="role" className={style.label} >منسق المعمل</label><br />
 <select className={style.options} name="name" onChange={handleChange}>
 {users.map((user, key) =>
      <option key={key} value={user.name}>{user.name}</option>
        )}
   
 </select>
     </div>
   <div className={style.inputs}>
   <label htmlFor="username" className={style.label}>العنوان</label><br/>
   <input  type="text" id="address" name="address" className={style.input} onChange={handleChange} />
   </div>
  
   <div >
   <input type="submit" name="submit" value="انشاء حساب" className={style.submit}  />
   </div>

</form>
    
</div>
<div className={style.image}>
  <img src={animated}  alt="animated-gif"/>
  </div> 
   </div>
   </>
  );
}

export default AddLab;

/* import React, { useState, useEffect } from "react";
import style from "./AddLab.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import animated from "../../images/animated.gif";

function AddLab() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost/LabApi/save", inputs).then(function (response) {
      setSuccessMessage("تمت اضافه معمل بنجاح");
      setTimeout(() => {
        setSuccessMessage("تمت اضافه معمل بنجاح");
        navigate("/Lablist");
      }, 40000);
    });
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get("http://localhost/selectapi").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  return (
    <>
      <div className={style.parent}>
        <div className={style.formParent}>
         
          <h3 className={style.head}>اضافة معمل جديد</h3>
          {successMessage && (
            <div className={`${style.successMessage} alert alert-success`}>{successMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className={style.inputs}>
              <label htmlFor="username" className={style.label}>
                اسم المعمل
              </label>
              <br />
              <input
                type="text"
                id="lab_name"
                name="lab_name"
                className={style.input}
                onChange={handleChange}
              />
            </div>

            <div className={style.parentOption}>
              <label htmlFor="role" className={style.label}>
                منسق المعمل
              </label>
              <br />
              <select
                className={style.options}
                name="name"
                onChange={handleChange}
              >
                {users.map((user, key) => (
                  <option key={key} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={style.inputs}>
              <label htmlFor="username" className={style.label}>
                العنوان
              </label>
              <br />
              <input
                type="text"
                id="address"
                name="address"
                className={style.input}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="submit"
                name="submit"
                value="انشاء حساب"
                className={style.submit}
              />
            </div>
          </form>
        </div>
        <div className={style.image}>
          <img src={animated} alt="animated-gif" />
        </div>
      </div>
    </>
  );
}

export default AddLab; */
import React from "react";
import style from "./AddMessage.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import animated from "../../images/animated.gif";
import { useEffect } from "react";
import email from "../../images/Email 1.svg";



function AddMessage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({})

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  
  }
  
  const handleSubmit = (event) =>{
  event.preventDefault();
  
  axios.post('http://localhost/APIS/MessageApi/save', inputs).then(function(response){
   console.log(response.data);

   navigate('/');
  });
  
  }




 







  return (
   <>
<h1 style={{marginTop:'30px'}}>تواصل معنا</h1>

<div className="container-fluid">
  <div className="row justify-content-center align-items-center">
    <div className="col-md-5" >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">الاسم</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">الهاتف</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">البريد الالكتروني</label>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">اترك رسالة</label>
          <textarea
            type="text"
            onChange={handleChange}
            placeholder="اترك رسالتك وسنتواصل معك"
            id="message"
            className="form-control"
            name="message"
            cols="35"
            rows="5"
          ></textarea>
        </div>
        <div>
          <input
            type="submit"
            name="submit"
            value="تواصل معنا"
            className={`${style.submit} btn btn-primary}`}
          />
        </div>
      </form>
    </div>
    <div className="col-md-5">
      <img src={email} alt="animated-gif" className="img-fluid" />
    </div>
  </div>
</div>
   </>
  );
}

export default AddMessage;

import React from "react";

import style from './AddLabTest.module.css';
import animated from "../../images/animated.gif";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";


function AddLabTest() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [SSN, setSSN] = useState('');
  const [phone, setPhone] = useState('');
  const [lab_name, setLab_name] = useState('');
  const [file, setFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState('');
  const [predictionResultSSN, setPredictionResultSSN] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };


  const handleSSNChange = (event) => {
    setSSN(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleLab_nameChange = (event) => {
    setLab_name(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
     const fileData = new FormData();
     fileData.append('file', file);
    const formData = new FormData();
    formData.append('name', name);
    // formData.append('email', email);
    formData.append('address', address);
    formData.append('lab_name', lab_name);
    formData.append('SSN', SSN);
    formData.append('phone', phone);
    formData.append('file', file);
    const token = localStorage.getItem('token');
    axios.post('https://53a5-154-178-253-120.ngrok-free.app/predict', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
    
      }
    }).then(response => {
      console.log(response.data);
      if (response.data.person_matched === 'No Matches in DB') {
        setPredictionResult('لا يوجد تطابق فى قاعده البيانات');
      } else {
        setPredictionResult(response.data.person_matched.Name);
        setPredictionResultSSN(response.data.person_matched.SNN);
        formData.append('result', response.data.person_matched.Name);
        formData.append('resultPhone', response.data.person_matched.Phone);
      } 
   
    });
    setTimeout(() => {
      axios.post('http://localhost/APIS/CasesApi/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        console.log(response.data);
        // Navigate to the '/Resultlist' page
        // navigate('/Resultlist');
      }).catch(error => {
        console.error(error);
        // Handle the error
      });
    }, 30000);

  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
      getUsers();

  }, []);

function getUsers() {
axios.get("http://localhost/APIS/SelectLabNameApi/").then(function(response){
  console.log(response.data);
  setUsers(response.data);
});

}

  return (
   <>
   
   <div className={style.parent}>
   <div className={style.formParent}>
   <h3 className={style.head}>اضافه حاله جديدة</h3>
   {predictionResult !== '' && (
  <div className={`${style.predictionResult} alert alert-primary`}>
    <p>الحاله المتطابقه: {predictionResult === 'No Matches in DB' ? 'لا يوجد تطابق في قاعدة البيانات' : predictionResult}</p>
  </div>
)}
{predictionResultSSN !== '' && (
  <div className={`${style.predictionResult} alert alert-primary`}>
    <p> الرقم القومى: {predictionResultSSN}</p>
  </div>
)}
   <form onSubmit={handleSubmit}>
   <div className={style.inputs}>
    <label htmlFor="username" className={style.label}>الاسم</label><br />
  <input  type="text" id="name" name="name" className={style.input} value={name} onChange={handleNameChange} />
  </div>
  <div className={style.inputs}>
  <label htmlfor="username" className={style.label}>الهاتف</label><br/>
  <input  type="text" id="phone" name="phone" className={style.input} value={phone} onChange={handlePhoneChange} />
  </div>
  <div className={style.inputs}>
  <label htmlfor="username" className={style.label}>العنوان</label><br/>
  <input  type="text" id="address" name="address" className={style.input} value={address} onChange={handleAddressChange} />
  </div>
 
  <div className={style.inputs}>
  <label htmlfor="username" className={style.label}>الرقم القومى</label><br/>
  <input  type="text" id="SSN" name="SSN" className={style.input} value={SSN} onChange={handleSSNChange} />
  </div>
  <div className={style.parentOption}>
     <label htmlFor="lab_name" className={style.label} >اسم المعمل</label><br />
 <select className={style.options} name="lab_name" value={lab_name} onChange={handleLab_nameChange}>
 {users.map((user, key) =>
      <option key={key} value={user.lab_name}>{user.lab_name}</option>
        )}
   
 </select>
     </div>
     <div className={`${style.inputs} ${style.file}`}>
     <input type="file" id="file" name="file"  onChange={handleFileChange} />
     </div>
 
  <div >
    
  <input type="submit" name="submit" value="اضافه" className={style.submit}  />

  </div>
   </form>
 
</div>
<div className={style.image}>
  <img src={animated}  alt="dna"/>
  </div> 
   </div>
   </>
  );
}

export default AddLabTest;
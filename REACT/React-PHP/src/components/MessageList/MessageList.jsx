import React from "react";
import style from './MessageList.module.css';
import DashNav from "../DashNav/DashNav";
import { Link, useAsyncError } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function MessageList() {
/*   const [UserData, setuserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem('token');
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setuserData(decodedToken);
  }

    const [messages, setUsers] = useState([]);


    useEffect(() => {
        getUsers();

    }, []);

function getUsers() {

axios.get("http://localhost/MessageApi").then(function(response){
    console.log(response.data);
    setUsers(response.data);
});

}


let name = localStorage.getItem("name");
console.log(name);
 */


const [UserData, setuserData] = useState(null);

const [messages, setUsers] = useState([]);
const navigate = useNavigate();

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

function getUsers() {
  axios.get("http://localhost/APIS/MessageApi").then(function(response){
    console.log(response.data);
    setUsers(response.data);
  });
}

if (!UserData || UserData.role !== "إداري") {
  navigate('/LoginDash');
}

  return (
   <>
   <DashNav  />
   <Link to="/" className={style.home}>الصفحه الرئيسية</Link>

   <table className={style.styledtable}>
    <thead>
        <tr>
        <th>التسلسل</th>
        <th>الاسم</th>
            <th>البريد الالكترونى</th>
            <th>الرساله</th>
            <th>الهاتف</th>
            <th>التاريخ</th>
           
        </tr>
    </thead>
    <tbody>
    {messages.map((message, key) =>
        <tr key={key}>
             <td>{message.id}</td>
            <td>{message.email}</td>
            <td>{message.email}</td>
            <td>{message.message}</td>
            <td>{message.phone}</td>
            <td>{message.date}</td>
        </tr>
        )}
      
   
      
    </tbody>
</table> 




{/* <div className={` ${style.messageList}`}>
        {messages.map((message) => (
          <div className={` ${style.message}`} key={message.id}>
            <div className="">
              <h5 className={style.messageTitle}> الاسم:{message.name}</h5>
              <h5 className={style.messageEmail}>البريدالالكترونى: {message.email}</h5>
              <p className={style.messageText}>الرساله: {message.message}</p>
            </div>
          </div>
        ))}
      </div> */}

    
   </>
  );
}

export default MessageList;
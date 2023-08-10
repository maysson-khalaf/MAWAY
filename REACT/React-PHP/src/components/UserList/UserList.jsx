import React, { useEffect, useState } from "react";
import style from './UserList.module.css';
import DashNav from "../DashNav/DashNav";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EditUser from "../EditUser/EditUser";
import jwtDecode from "jwt-decode";


function UserList() {

/* const [auth, setAuth] = useState('');
let navigate = useNavigate();

useEffect(()=>{
    var auth = localStorage.getItem('name');
    setAuth(auth);
},[])
if (auth===null){
    navigate('/LoginDash');
} */






const [UserData, setuserData] = useState(null);
const [users, setUsers] = useState([]);
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



  /*   useEffect(() => {
        getUsers();

    }, []); */
    if (!UserData || UserData.role !== "إداري") {
        navigate('/LoginDash');
      }

function getUsers() {

axios.get("http://localhost/api").then(function(response){
    console.log(response.data);
    setUsers(response.data);
});

}

const deleteUser = (id) => {
    axios.delete(`http://localhost/api/user/${id}`).then(function(response){
        console.log(response.data);
        getUsers();
    });
}

  return (
   <>
   <DashNav  />

<div className={style.heading}>
    <div>
        <h4>قائمه المستخدمين</h4>
    </div>
    
</div>

<Link to="/Signup" className={style.link}>اضافه مستخدم جديد</Link>
<Link to="/" className={style.home}>الصفحه الرئيسية<i className={`${style.arrow} fa-solid fa-arrow-left`}></i></Link>



   <table className={style.styledtable}>
    <thead>
        <tr>
            <th>الرقم</th>
            <th>الاسم</th>
            <th>الايميل</th>
            <th>الوظيفه</th>
            <th>الرقم القومى</th>
            <th>تعديلات</th>
        </tr>
    </thead>
    <tbody>
        {users.map((user, key) =>
        <tr key={key}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.SSN}</td>
            <span>
            <td><Link to={`/user/${user.id}/edit`} className={`${style.delete} ${style.submit}`}>تعديل</Link></td>
            <td><button className={`${style.delete} ${style.submit}`}  onClick={() => deleteUser(user.id)}>حذف</button></td>
            </span>
            
        </tr>
        )}
      
    </tbody>
</table>
   </>
  );
}

export default UserList;
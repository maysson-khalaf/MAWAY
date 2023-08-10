import React from "react";
import style from "./UserProfile.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FixedNav from "../FixedNav/FixedNav";

function UserProfile() {
  const naviget = useNavigate();
  const [UserData, setUserData] = useState(null);

  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("name", "");
    localStorage.setItem("token", "");
    localStorage.setItem("loginStatus", "تمت عملية تسجيل الخروج بنجاح");
    naviget("/LoginDash");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);

  function saveUserData() {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken);
  }

  return (
    <>
      <FixedNav />
      {UserData ? (
        <div className={style.container}>
          <div className={style.header}>
            {localStorage.getItem("token") && (
              <p onClick={logoutSubmit}>تسجيل الخروج</p>
            )}
          </div>
          <div className={style.content}>
            <h4>الاسم: {UserData.name}</h4>
            <h4>البريد: {UserData.email}</h4>
            <h4>الوظيفه: {UserData.role}</h4>
            <h4>الرقم القومى: {UserData.SSN}</h4>
          </div>
        </div>
      ) : (
        <h3 className={`${style.alert} alert alert-danger`}>تأكد من تسجيل الدخول ......</h3>
      )}
    </>
  );
}

export default UserProfile;
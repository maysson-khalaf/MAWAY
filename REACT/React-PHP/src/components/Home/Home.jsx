import React from "react";
import style from "./Home.css";
import animated from "../../images/animated.gif";
import story from "../../images/final_dna_tree.jpg";
import drahmed from "../../images/dr_ahmed.jpg";
import samah from "../../images/samah1.jpg";
import reem from "../../images/reem1.jpg";
import mysoon from "../../images/maysson.jpg";
import mahy from "../../images/mahy1.jpg";
import dalia from "../../images/dalia.jpg";
import AddMessage from "../AddMessage/AddMessage";
import { Link } from "react-router-dom";
import sara from "../../images/sara.jpg";
import logo from "../../images/logo.jpeg";
import logo1 from "../../images/logo1.jpeg";
import logo2 from "../../images/Asset 3.png";
import logo3 from "../../images/Asset 6.png";


function Home() {
    return (
        <>
        <div className="landing-page">
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-transparent">
          <div className="container-fluid mt-2">
            <img src={logo2} className="navbar-brand" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa-solid fa-bars icon"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="#index.php">الصفحه الرئيسية</a>
                </li>
              
                <li className="nav-item">
                  <Link to="/Ourteam" className="nav-link">فريق العمل</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contactus">تواصل معنا</a>
                </li>
              
                <li className="nav-item">
                  <Link to="/LoginDash" className="nav-link logging font submit" >تسجيل الدخول</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Signup" className="nav-link logging font submit" >انشاء الحساب</Link>
                </li>
                <li className="nav-item">
                  <Link to="/userprofile" className="nav-link logging"><i className="fa-solid fa-user"></i></Link>
                </li>
              </ul>
              
            </div>
          </div>
        </nav>
        <div className="intro">مَأْوَاي … كي نكون سويًا</div>
  </div>
  </div>

{/*   <div className="story text-align-center" id="ourstory">
        <h1 className="head">our story</h1>
        <div className="container ">
          <div className="row text-center align-items-center">
            <div className="col-6 our-story">
              Due to the spread of the phenomenon of missing children, especially the phenomenon of kidnapping children, as well as the phenomenon of losing people with mental illnesses and the elderly, especially those with Alzheimer's disease, which represents great difficulty in communicating with the missing people due to the difficulty of identifying them.Therefore, the proposed system aims to develop a smart model using Blockchain Technologies in order to match the DNA data of the missing persons and publish them on the smart system in a secure, non-distortionable, and decentralized manner, which allows the possibility of communication for the missing regardless of the location and in a more secure and reliable manner.
            </div>
            <div className="col-6 story">
              <img src={story} alt="story" />
            </div>
          </div>
        </div>
        
    </div> */}










<AddMessage/>




 

























<footer>
  <div>
  <span>الشركاء</span>
    <span>رحلتنا</span>
    <span>فريق العمل</span>
    
    <span>الصفحه الرئيسة</span>
    <span>كيف يعمل</span>
  </div>
 
  <div className="Desc">
  نموذج ذكي يستخدم تقنيات Blockchain لمطابقة بيانات الحمض النووي للمفقودين ونشرها على النظام الذكي بطريقة آمنة وغير قابلة للتشويه ولا مركزية
 <p style={{marginTop:'20px'}}> جميع الحقوق محفوظه لفريق عمل مَأْوَاي  </p>
  </div>


</footer>




        </>
        
     
    );
  }
  
  export default Home;
import React from "react";
import style from './FixedNav.module.css';
import logo3 from '../../images/Asset 6.png';
import logo2 from '../../images/Asset 3.png';



function FixedNav() {
  return (
<>
<div className={style.fixedNav}>
    <div className={style.container}>
   
   {/* <i className="fa-solid fa-dna"></i> */}
   <img  src={logo2} className={style.LOGO} />
    </div>
</div>
</>
  );
}

export default FixedNav;
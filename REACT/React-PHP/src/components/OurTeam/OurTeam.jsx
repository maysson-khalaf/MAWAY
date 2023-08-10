import React from "react";
import style from './OurTeam.css';
import story from "../../images/final_dna_tree.jpg";
import drahmed from "../../images/dr_ahmed.jpg";
import samah from "../../images/samah1.jpg";
import reem from "../../images/reem1.jpg";
import mysoon from "../../images/maysson.jpg";
import mahy from "../../images/mahy1.jpg";
import dalia from "../../images/dalia.jpg";
import sara from "../../images/sara.jpg";
function OurTeam() {
return(
<>
<div class="Row firstRow">
        <h1>فريق العمل</h1>
      </div>
      <div class="Row">
    
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={drahmed} alt="drahmed"/>
            </div>
            <h3>Dr.Ahmed Salama</h3>
            <p>Supervisor</p>
            <p>Executive Manager for the project of developing university's network infrastructure</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        </div>
    
    <section>
      <div class="Row ">
      </div>
      <div class="Row">
    
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={sara} alt="sara"/>
            </div>
            <h3>Sara Gamal</h3>
            <p className="role">Web3 developer</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      
      
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={samah}alt="samah" />
            </div>
            <h3>Samah abd Elghaffar</h3>
            <p className="role">Full stack developer</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
       
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={dalia} alt="dalia" />
            </div>
            <h3>Dalia Mohamed</h3>
            <p>Team Leader</p>
            <p className="role">Blockchain developer</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>





    <section>
     
      <div class="Row">
    
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={mysoon} alt="drahmed"/>
            </div>
            <h3 >Maysoon Mohamed</h3>
            <p className="role">Data Scientist</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      
      
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={reem}alt="samah" />
            </div>
            <h3>Reem Moaud</h3>
            <p className="role">UI/UX designer</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
       
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={mahy} alt="dalia" />
            </div>
            <h3>Mahetab Mohamed</h3>
            <p className="role">System analyst</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
    )
};

    export default OurTeam;
import React, { useEffect, useState } from "react";
import { CiFacebook } from "react-icons/ci";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import "../Style/footer.css";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import banner from '../assets/footer_banner.png'
import logo from '../assets/logo_1-removebg-preview.png'



const Footer = () => {
  const [Welcome, setWelcome] = useState([]);

  const getWelcomeNote = async () => {
    console.log("Welcome", Welcome);

    try {
      let res = await axios.get(
        "http://localhost:8989/api/homeWelcomeNote/getWelcomeNote"
      );
      if (res.status === 201) {
        setWelcome(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const abutFooter = Welcome.map((item) => item?.description);

  useEffect(() => {
    getWelcomeNote();
  }, []);
  return (
    <div 
      style={{
        backgroundImage:`url(${banner})`,
        backgroundPosition:'center',
        backgroundSize:'cover',
        width:'100vw'
      }}
    >
      <div className="pad-foot-top">
        <footer>
          <div className="container">
            <img src={logo} alt="" style={{width:"250px"}}/>
            <div className="row">
              <div className="col-md-5">
                {/* <div className="row">
                  <img
                    src="../Images/logo .jpeg"
                    alt=""
                    className="footer-part-logo"
                  />
                </div> */}

                <div className="row foot-text-in-2-row">
                  <a
                    href="/"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "380px",
                    }}
                  >
                    {parse(`<div>${abutFooter[0]?.slice(0, 110)}...</div>`)}
                  </a>
                </div>
                <div className="row foot-pad-social-link" style={{display:"block"}}>
                  <a href="https://www.facebook.com">
                    <img
                      src="../Images/facebookNew.png"
                      className="foot-socialmedia-links"
                      alt=""
                      
                    />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../Images/instagramIcon.png"
                      className="foot-socialmedia-links"
                      alt=""
                     
                    />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../Images/twitterIcon.png"
                      className="foot-socialmedia-links"
                      alt=""
                    
                    />
                  </a>

                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../Images/youtube.png"
                      className="foot-socialmedia-links"
                      alt=""
                     
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <p className="foot-second-title">Get In Touch</p>
                </div>
                <div className="row  foot-second-part-2">
                  <div className="d-flex gap-2">
                    <div>
                      <img
                        src="../Images/locationwhite.png"
                        alt=""
                        className="second-foot-imgs"
                      />
                    </div>
                    <div className="foot-second-top" id="foot-second-location">
                      789 Inner Lane, Holy park, Bangalore
                    </div>
                  </div>
                </div>
                <div className="row  foot-para-icon-matching">
                  <div className="d-flex">
                    <div>
                      <img
                        src="../Images/phonewhite.png"
                        alt=""
                        className="second-foot-imgs"
                      />
                    </div>
                    <div>
                      <span className="foot-second-top" id="number-foot">
                        +91 7876765456
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row foot-para-icon-matching">
                  <div className="d-flex">
                    <div>
                      <img
                        src="../Images/emailwhite.png"
                        alt=""
                        className="second-foot-imgs"
                      />
                    </div>
                    <div className="foot-second-top" id="foot-email">
                      supportmail01@gmail.com
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="row">
                  <div className="foot-third-section-title">Useful Links</div>
                </div>
                <div className="row dis-bt-t-b">
                  <a href="/" className="useful-links-route-foot">
                    Home
                  </a>
                </div>
                <div className="row">
                  <a href="/aboutus" className="useful-links-route-foot">
                    About Us
                  </a>
                </div>
                <div className="row">
                  <a
                    href="/ongoing_project"
                    className="useful-links-route-foot"
                  >
                    Our Project
                  </a>
                </div>

                <div className="row">
                  <a href="/contactus" className="useful-links-route-foot">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;

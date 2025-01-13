import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import {
  LuActivity,
  LuBookMarked,
  LuFileQuestion,
  LuIndianRupee,
  LuListOrdered,
  LuLogOut,
  LuPackageX,
  LuUserCog,
} from "react-icons/lu";
import { FaQuestion, FaWeightHanging } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FaShop, FaRegIdCard, FaCircleUser } from "react-icons/fa6";
import { GiFlatPlatform } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { AiOutlineSnippets } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { IoPeopleOutline, IoNewspaperOutline } from "react-icons/io5";
import { PiExamFill, PiHandshakeLight } from "react-icons/pi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineTipsAndUpdates,
  MdOutlineKeyboardArrowUp,
  MdOutlineSupportAgent,
  MdOutlineAddComment,
  MdEventAvailable,
  MdSubject,
  MdOutlineKeyboardArrowLeft,
  MdOutlineReviews,
} from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { LuAlignHorizontalJustifyStart } from "react-icons/lu";
import { IoEarth } from "react-icons/io5";
import "../Admin/Admin.css";
import Navbar from "react-bootstrap/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { MdLooksOne } from "react-icons/md";
import { PiNumberSquareTwoFill } from "react-icons/pi";
import { PiNumberSquareThreeFill } from "react-icons/pi";
import { PiNumberSquareFourFill } from "react-icons/pi";
import { PiNumberSquareFiveFill } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { AiFillSetting, AiOutlineHome } from "react-icons/ai";
import { BsFillTelephoneFill, BsQuestionLg } from "react-icons/bs";

const Side = () => {

  const [Home, setHome] = useState(false);
  const [acc, setacc] = useState(true);
  const [acc1, setacc1] = useState(false);
  const [acc2, setacc2] = useState(false);
  const [acc3, setacc3] = useState(false);
  const [acc4, setacc4] = useState(false);
  

  const [About, setAbout] = useState(false);
  const [acc5, setacc5] = useState(false);
  const [acc6, setacc6] = useState(false);
  const [acc7, setacc7] = useState(false);
  const [acc8, setacc8] = useState(false);
  const [acc9, setacc9] = useState(false);
  const [acc10, setacc10] = useState(false);


  const [Service, setService] = useState(false);
  const [acc11, setacc11] = useState(false);
  const [acc12, setacc12] = useState(false);


  const [Gallery, setGallery] = useState(false);
  const [acc13, setacc13] = useState(false);
  const [acc14, setacc14] = useState(false);
  const [acc15, setacc15] = useState(false);

const [DownloadBrochure, setDownloadBrochure] = useState(false);

  const [Blog, setBlog] = useState(false);
  const [acc16, setacc16] = useState(false);
  const [acc17, setacc17] = useState(false);
  const [acc18, setacc18] = useState(false);



  const [Faq, setFaq] = useState(false);
  const [acc19, setacc19] = useState(false);
  const [acc20, setacc20] = useState(false);


  const [Contact, setContact] = useState(false);
  const [acc21, setacc21] = useState(false);
  const [acc22, setacc22] = useState(false);
  const [acc23, setacc23] = useState(false);
  const [acc24, setacc24] = useState(false);

  // Responsive sidebar
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div>

      <Navbar expand="lg" className=" p-0">
        <button
          class="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
          style={{ margin: "10px" }}
        >
          <span>
            <GiHamburgerMenu style={{ color: "white" }} />
          </span>
        </button>
        <div
          class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarsExample09"
        >
          <div className="si09">
            <div style={{ width:"100%", justifyContent: "space-between" }}>
              <div className="lo-ad"  style={{background:"white", borderBottom:"1px solid white"}}>
              <div className="">
              <a href="/" className="tail-text">
                <img src="../Images/logo .jpeg" alt="whitelogo" className="admin-logo-img" style={{width:"100%",height:"100px"}}/>
              </a>
             
            </div>
              </div>
              <div className="sidebar-close-icon" onClick={handleNavCollapse}>
                <AiOutlineClose />
              </div>
            </div>
            <ul>


              {/* =========DASHBOARD =======*/}

              {/* <Link to="/dashboard" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <MdOutlineSupportAgent style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">DASHBOARD</span>
                </li>
              </Link> */}


          {/*============= HOME ===========  */}

              <Link to="">
          <li
            className={`a-ele ${acc3 ? "active-0" : "null"}`}
            onClick={() => {
              setHome(!Home);
            }}
          >
            <span>
              <AiOutlineHome style={{ fontSize: "20px" }} />
            </span>{" "}
            <span>HOME</span>{" "}
            {Home ? (
              <>
                {" "}
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowUp />
                </span>
              </>
            ) : (
              <>
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowDown />
                </span>
              </>
            )}
          </li>
        </Link>


        <Link to="">

          {Home ? (
            <>
              <div className="webmanagement">
               
                <Link to="/admin_slider" onClick={handleNavCollapse}>
                <li
                   className={`a-ele ${acc ? "active2" : "null"}`}
                   onClick={() => {
                     setacc(true);
                     setacc1(false);
                     setacc2(false);
                     setacc3(false);
                     setacc4(false);
                   }}
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                    {/* <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i> */}
                  </span>
                  <span className="ms-2">Home Banner</span>
                </li>
              </Link>



                <Link to="/admin_Welcome">
                  <li
                    className={`a-ele ${acc1 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc(false);
                      setacc1(true);
                      setacc2(false);
                      setacc3(false);
                      setacc4(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">Welcome</span>{" "}
                  </li>
                </Link>



                <Link to="/admin_Services">
                  <li
                    className={`a-ele ${acc2 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc(false);
                      setacc1(false);
                      setacc2(true);
                      setacc3(false);
                      setacc4(false);
                    }}
                  >
                    <span>
                      {" "}
                      <BsQuestionLg style={{ fontSize: "20px" }} />
                    </span>
                    <span className="ms-2">Services</span>{" "}
                  </li>
                </Link>




                {/* <Link to="/admin_Projects">
                  <li
                    className={`a-ele ${acc3 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc(false);
                      setacc1(false);
                      setacc2(false);
                      setacc3(true);
                      setacc4(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">Projects</span>{" "}
                  </li>
                </Link>
               */}
              

                {/* <Link to="/admin_Upcoming_project">
                  <li
                    className={`a-ele ${acc4 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc(false);
                      setacc1(true);
                      setacc2(false);
                      setacc3(true);
                      setacc4(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">Upcoming Project</span>{" "}
                  </li>
                </Link> */}

                <Link to="/admin_why_us">
                  <li
                    className={`a-ele ${acc4 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc(false);
                      setacc1(true);
                      setacc2(false);
                      setacc3(true);
                      setacc4(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">Why choose us?</span>{" "}
                  </li>
                </Link>

                <Link to="/admin_what_our_client_says">
                  <li
                    className={`a-ele ${acc4 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc(false);
                      setacc1(true);
                      setacc2(false);
                      setacc3(true);
                      setacc4(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">What Our Client Says </span>{" "}
                  </li>
                </Link>

                <Link to="/admin_Faq">
                  <li
                    className={`a-ele ${acc4 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc(false);
                      setacc1(true);
                      setacc2(false);
                      setacc3(true);
                      setacc4(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">FAQ</span>{" "}
                  </li>
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
        </Link>
        {/* ===========ABOUT US=============== */}

        <Link to="">
          <li
            className={`a-ele ${acc3 ? "active-0" : "null"}`}
            onClick={() => {
              setAbout(!About);
            }}
          >
            <span>
              <AiOutlineHome style={{ fontSize: "20px" }} />
            </span>{" "}
            <span>ABOUT</span>{" "}
            {About ? (
              <>
                {" "}
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowUp />
                </span>
              </>
            ) : (
              <>
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowDown />
                </span>
              </>
            )}
          </li>
        </Link>


        <Link to="">
          {About ? (
            <>
              <div className="webmanagement">
               
                <Link to="/admin_aboutbanner" onClick={handleNavCollapse}>
                <li
                   className={`a-ele ${acc5 ? "active2" : "null"}`}
                   onClick={() => {
                     setacc5(true);
                     setacc6(false);
                     setacc7(false);
                     setacc8(false);
                     setacc9(false);
                     setacc10(false);

                   }}
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                    {/* <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i> */}
                  </span>
                  <span className="ms-2">About Banner</span>
                </li>
              </Link>

                <Link to="/admin_about_vision_mision">
                  <li
                    className={`a-ele ${acc7 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc5(false);
                     setacc6(false);
                     setacc7(true);
                     setacc8(false);
                     setacc9(false);
                     setacc10(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">Our Vision & Mission</span>{" "}
                  </li>
                </Link>

                <Link to="/Admin_about_get_in_touch">
                  <li
                    className={`a-ele ${acc8 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc5(false);
                      setacc6(false);
                      setacc7(false);
                      setacc8(true);
                      setacc9(false);
                      setacc10(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">Get In Touch</span>{" "}
                  </li>
                </Link>
               
              </div>
            </>
          ) : (
            ""
          )}
        </Link>

         {/* ======= ONGOING PROJECT ======= */}
          
         <Link to="">
          <li
            className={`a-ele ${acc3 ? "active-0" : "null"}`}
            onClick={() => {
              setGallery(!Gallery);
            }}
          >
            <span>
              <AiOutlineHome style={{ fontSize: "20px" }} />
            </span>{" "}
            <span>ONGOING PROJECT</span>{" "}
            {Service ? (
              <>
                {" "}
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowUp />
                </span>
              </>
            ) : (
              <>
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowDown />
                </span>
              </>
            )}
          </li>
        </Link>


        <Link to="">
          {Gallery ? (
            <>
              <div className="webmanagement">
               
                <Link to="/ongoing_project_banner" onClick={handleNavCollapse}>
                <li
                   className={`a-ele ${acc13 ? "active2" : "null"}`}
                   onClick={() => {
                     setacc13(true);
                     setacc14(false);
                     setacc15(false);

                   }}
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Ongoing Project Banner</span>
                </li>
              </Link>
              </div>
            </>
          ) : (
            ""
          )}

        </Link>
        <Link to="/upcoming_project_banner" onClick={handleNavCollapse}>
                <li
                   className={`a-ele ${acc21 ? "active2" : "null"}`}
                   onClick={() => {
                     setacc21(true);
                     setacc22(false);
                     setacc23(false);
                     setacc24(false);
                   }}
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Upcoming Project</span>
                </li>
              </Link>

        <Link to="/admin_project_overview" onClick={handleNavCollapse}>
                <li
                   className={`a-ele ${acc21 ? "active2" : "null"}`}
                   onClick={() => {
                     setacc21(true);
                     setacc22(false);
                     setacc23(false);
                     setacc24(false);
                   }}
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Project Overview</span>
                </li>
              </Link>

              <Link to="/admin_Features_aminities" onClick={handleNavCollapse}>
                <li
                   className={`a-ele ${acc21 ? "active2" : "null"}`}
                   onClick={() => {
                     setacc21(true);
                     setacc22(false);
                     setacc23(false);
                     setacc24(false);
                   }}
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Features And Aminities</span>
                </li>
              </Link>

              <Link to="/admin_Property_Overview" onClick={handleNavCollapse}>
                <li
                   className={`a-ele ${acc21 ? "active2" : "null"}`}
                   onClick={() => {
                     setacc21(true);
                     setacc22(false);
                     setacc23(false);
                     setacc24(false);
                   }}
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Property Overview</span>
                </li>
              </Link>
              {/*========= CONTACT US=========== */}

              <Link to="">
          <li
            className={`a-ele ${acc3 ? "active-0" : "null"}`}
            onClick={() => {
              setContact(!Contact);
            }}
          >
            <span>
              <AiOutlineHome style={{ fontSize: "20px" }} />
            </span>{" "}
            <span>CONTACT</span>{" "}
            {Service ? (
              <>
                {" "}
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowUp />
                </span>
              </>
            ) : (
              <>
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowDown />
                </span>
              </>
            )}
          </li>
        </Link>


        <Link to="">
          {Contact? (
            <>
              <div className="webmanagement">
               
                <Link to="/admin_contact_banner" onClick={handleNavCollapse}>
                <li
                   className={`a-ele ${acc21 ? "active2" : "null"}`}
                   onClick={() => {
                     setacc21(true);
                     setacc22(false);
                     setacc23(false);
                     setacc24(false);
                   }}
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Banner</span>
                </li>
              </Link>

                <Link to="/admin_contact_us">
                  <li
                    className={`a-ele ${acc22 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc21(false);
                      setacc22(true);
                      setacc23(false);
                      setacc24(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">Contact Details</span>{" "}
                  </li>
                </Link>

                <Link to="/admin_Schedule_Visit">
                  <li
                    className={`a-ele ${acc22 ? "active2" : "null"}`}
                    onClick={() => {
                      setacc21(false);
                      setacc22(true);
                      setacc23(false);
                      setacc24(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">Schedule Visit</span>{" "}
                  </li>
                </Link>
{/* 
                <Link to="/admin_contactsocialmedia">
                  <li
                    className={`a-ele ${acc23 ? "active2" : "null"}`}
                    onClick={() => {

                      setacc21(false);
                      setacc22(false);
                      setacc23(true);
                      setacc24(false);
                    
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">Social Media</span>{" "}
                  </li>
                </Link> */}


                {/* <Link to="/admin_contactgeneralenquiry">
                  <li
                    className={`a-ele ${acc24 ? "active2" : "null"}`}
                    onClick={() => {

                      setacc21(false);
                      setacc22(false);
                      setacc23(false);
                      setacc24(true);
                    
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa fa-arrows" style={{ fontSize: "18px" }}></i>
                    </span>
                    <span className="ms-2">General Enquiry</span>{" "}
                  </li>
                </Link> */}


              </div>
            </>
          ) : (
            ""
          )}

        </Link>
       

        <Link to="">
          <li
            className={`a-ele ${acc3 ? "active-0" : "null"}`}
            onClick={() => {
              setDownloadBrochure(!DownloadBrochure);
            }}
          >
            <span>
              <AiOutlineHome style={{ fontSize: "20px" }} />
            </span>{" "}
            <span>Download Brochure</span>{" "}
            {Service ? (
              <>
                {" "}
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowUp />
                </span>
              </>
            ) : (
              <>
                <span style={{ float: "right" }}>
                  <MdOutlineKeyboardArrowDown />
                </span>
              </>
            )}
          </li>
        </Link>

        <Link to="">
          {DownloadBrochure? (
            <>
              <div className="webmanagement">
               
                <Link to="/download_Brochure" onClick={handleNavCollapse}>
                <li
                   className={`a-ele ${acc21 ? "active2" : "null"}`}
                   onClick={() => {
                     setacc21(true);
                     setacc22(false);
                     setacc23(false);
                     setacc24(false);
                   }}
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Download Brochure</span>
                </li>
              </Link>

              </div>
            </>
          ) : (
            ""
          )}

        </Link>
       
            </ul>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Side;

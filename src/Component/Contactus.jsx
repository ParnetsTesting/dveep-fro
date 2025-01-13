import React, { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "../Style/Contactus.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import AOS from "aos";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contactus = () => {
  const [isScrollUp, setIsScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsScrollUp(false);
      } else if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight
      ) {
        setIsScrollUp(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollTo = () => {
    if (isScrollUp) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    setIsScrollUp(!isScrollUp); // Toggle state after initiating scroll
  };
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("form submitted successfully");
    // Handle form submission logic here
  };

  const [ConatactBanner, setConatactBanner] = useState([]);
  const getConatactBanner = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/ContactBanner/getContactBanner"
      );
      if (res.status === 201) {
        setConatactBanner(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const [Contact, setContact] = useState([]);
  const getConatactDetails = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/ContactUs/getContactUs"
      );
      if (res.status === 201) {
        setContact(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  useEffect(() => {
    getConatactBanner();
    getConatactDetails();
  }, []);
  const validatePhone = (phone) => {
    const phoneregex = /^[6789]\d{9}$/;
    if (phoneregex.test(phone)) {
      return true;
    } else {
      toast.warning("enter valid mobile number");
    }
  };
  const validateEmail = (email) => {
    const emailregex = /\S+@\S+\.\S+/;
    if (emailregex.test(email)) {
      return true;
    } else {
      toast.warning("enter valid email");
    }
  };

  const [loading, setloading] = useState(false);

  const [YourName, setYourName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Project, setProject] = useState("");
  const [Text, setText] = useState("");

  const DownloadForm = async (e) => {
    e.preventDefault();
    if(loading) return;

    if (!YourName) {
      toast.warning("Please Enter Your Name");
      return;
    }
    if (!Email) {
      toast.warning("please Enter Your Email");
      return;
    }
    if (!PhoneNumber) {
      toast.warning("Please Enter Your Phone Number");
      return;
    }
    if (!Project) {
      toast.warning("please Select Project");
      return;
    }if(!YourName,!Email,!PhoneNumber,!Project){
      toast.warning("All fields are necessary!,please enter all the fields");
      return;
    }

    try {
      if(validateEmail(Email)&&validatePhone(PhoneNumber)){
      
const formData = new FormData();

      formData.append("yourName", YourName);
      formData.append("email", Email);
      formData.append("phoneNumber", PhoneNumber);
      formData.append("selectProject", Project);
      formData.append("text", Text);
setloading(true)
      const config = {
        url: "createScheduleVisist",
        method: "post",
        baseURL: "http://localhost:8989/api/ScheduleVisit/",
        headers: { "Content-Type": "application/json" },
        data: formData,
      };
      let res = await axios(config);
      if (res.status === 200) {
       alert('Form is Submitted Sucessfully');
        setYourName("");
        setEmail("");
        setPhoneNumber("");
        setProject("");
        setText("");
      }
    }
  } catch (error) {
      toast.error(error.response.data.error);
    }finally{
      setloading(false)
    }
  };
  return (
    <div>
      <ToastContainer   position="top-center"/>
      {ConatactBanner?.map((item) => {
        return (
          <section
            className="contact"
            style={{
              height: "40vh",
              width: "100%",
              backgroundImage: `url(http://localhost:8989/Contact/${item?.contactImage})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="container ">
              <div className="breadcrumbt">
                <div>
                  <h1 className="abtus-heading" style={{ color: "white" }}>
                    {item?.contactText}
                  </h1>
                </div>
                <div>
                  <Breadcrumb>
                    <FontAwesomeIcon
                      icon={faHouse}
                      style={{
                        fontSize: "14px",
                        marginTop: "0px",
                        color: "white",
                        padding: "5px",
                      }}
                    />
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ color: "white" }}>
                      Contact
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <div className="our-contact-information">
        <div className="row" style={{ width: "100%" }}>
          <div className="d-flex justify-content-center contact-center-title">
            Our Contact Information
          </div>
        </div>
        <Container className="contact-top-space-want">
          <div className="row" style={{ width: "100%" }}>
            {Contact?.map((item) => {
              return (
                <div className="col-md-4">
                  <div className="custom-card-1" data-aos="flip-up">
                    <div className="card-flex">
                      <img
                        src={`http://localhost:8989/Contact/${item?.icon}`}
                        alt="Location Icon"
                        className="contact-icon-card"
                      />
                      <div className="contact-container">
                        <h6 className="phone-title-contact">{item?.desc}</h6>
                        <p className="contact-con-para-phone">
                          {parse(`<div>${item?.heading}</div>`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div className="col-md-4">
            <div className="custom-card-1"  data-aos="flip-up">
                <div className="card-flex">
                  <img
                    src="../Images/emailwhite.png"
                    alt="Location Icon"
                    className="contact-icon-card"
                  />
                  <div className="contact-container">
                    <h6>
                    Email Address</h6>
                    <p className="contact-con-para-email">support24@realar.com</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </Container>
      </div>
      <div className="container contact-us-page-map-form">
        <div className="row">
          <div className="col-md-6  mb-5">
            <div className="">
              <form
                onSubmit={DownloadForm}
                className="f-forms"
                data-aos="zoom-in"
              >
                <h2
                  style={{ color: "#176457", fontFamily: "Roboto" }}
                  className="mt-2"
                >
                  Schedule a visit
                </h2>
                <div className="form-sections">
                  <div className="form-groups">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      className="selections"
                      value={YourName}
                      onChange={(e)=>setYourName(e.target.value)}
                    />
                  </div>
                  <div className="form-groups">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      className="selections"
                      value={Email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-groups">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone Number"
                      className="selections"
                      value={PhoneNumber}
                      onChange={(e)=>setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-groups">
                    <select id="option" name="option" className="selections" 
                    value={Project}
                    onChange={(e)=>setProject(e.target.value)}>
                      <option >Select Project</option>
                      <option value="Ongoing Project">Ongoing Project</option>
                      <option value="Upcoming Project">Upcoming Project</option>
                    </select>
                  </div>
                </div>

                <div className="form-groups mt-2 mb-2">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    cols="50"
                    placeholder="Your Message"
                    className="selections"
                    value={Text}
                    onChange={(e)=>setText(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: "#176457" }}
                  className="btn-callbacks"
                  // onClick={DownloadForm}
                >
                  {loading?"Submitting...":"Submit"}
                 
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 mb-5 ">
            <div className="" style={{ width: "100%" }}>
              <iframe
                className="map-img"
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3886.6868145855365!2d77.6039842!3d13.0555962!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDAzJzIwLjAiTiA3N8KwMzYnMjQuOSJF!5e0!3m2!1sen!2sin!4v1722600897652!5m2!1sen!2sin"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                style={{ width: "100%", height: "350px" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div
        id="scroll-button"
        className={isScrollUp ? "scroll-up" : "scroll-down"}
        onClick={scrollTo}
      >
        {isScrollUp ? (
          <FaArrowCircleUp style={{ fontSize: "45px" }} />
        ) : (
          <FaArrowCircleDown style={{ fontSize: "45px" }} />
        )}
      </div>
    </div>
  );
};

export default Contactus;

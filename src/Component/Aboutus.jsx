import React, { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "../Style/aboutus.css";
import Container from "react-bootstrap/esm/Container";
import Accordion from "react-bootstrap/Accordion";
import AOS from "aos";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import GetTouch from "./GetTouch";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Aboutus = () => {
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
    setIsScrollUp(!isScrollUp);
  };

  const [AboutBanner, setAboutBanner] = useState([]);

  const getAboutBanner = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/aboutBanner/getAboutBanner"
      );
      if (res.status === 201) {
        setAboutBanner(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const [AboutUs, setAboutUs] = useState([]);

  const getAboutUs = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/aboutVissionAndMission/getVissionAndMission"
      );
      if (res.status === 201) {
        setAboutUs(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getAboutBanner();
    getAboutUs();
  }, []);
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);
  return (
    <div>
           <ToastContainer position="top-center"/>
      {AboutBanner?.map((item) => {
        return (
          <section
            id="about"
            style={{
              height: "40vh",
              width: "100%",
              zIndex: 2,
              backgroundImage: `url(https://dveep-backend.onrender.com/About/${item?.image})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              position: "relative",
            }}
          >
            <div className="container">
              <div
                className="breadcrumbt"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  padding: "101px",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h1 className="abtus-heading" style={{ color: "white" }}>
                    {item?.text}
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
                    <Breadcrumb.Item href="/" style={{ color: "white" }}>
                      Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ color: "white" }}>
                      About
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <div className="back-clor-about-us">
        {AboutUs?.map((item, i) => {
          return (
            <>
              {i % 2 == 0 ? (
                <Container data-aos="fade-up">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="vision-mission-title">
                          Vission & Mission
                        </div>
                      </div>
                      <div className="row vision-mission-paragraph">
                        {parse(`<div>${item?.desc}</div>`)}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <img
                        src={`https://dveep-backend.onrender.com/About/${item?.image}`}
                        alt=""
                        className="vision-mission-img"
                      />
                    </div>
                  </div>
                </Container>
              ) : (
                <Container data-aos="fade-up">
                  <div className="row">
                  <div className="col-md-6">
                      <img
                        src={`https://dveep-backend.onrender.com/About/${item?.image}`}
                        alt=""
                        className="vision-mission-img"
                      />
                    </div>
                    <div className="col-md-6">
                    
                      <div className="row vision-mission-paragraph">
                        {parse(`<div>${item?.desc}</div>`)}
                      </div>
                    </div>
                   
                  </div>
                </Container>
              )}
            </>
          );
        })}
      </div>

     
      <GetTouch />
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

export default Aboutus;

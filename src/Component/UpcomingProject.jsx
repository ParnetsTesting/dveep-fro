import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "../Style/home.css";
import WhatOurClientSays from "./WhatOurClientSays";
import GetTouch from "./GetTouch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import AOS from "aos";
import WelcomeHome from "./WelcomeHome";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const UpcomingProject = (phoneNumber) => {
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

  const whatsappMessage = encodeURIComponent(
    "Hello, I am interested in your services."
  );

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${whatsappMessage}`,
      "_blank"
    );
  };
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleButtonClick1 = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/projectoverview");
  };

  const [ProjectOverview, setProjectOverview] = useState([]);
  const getProjectOverviewPage = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/ProjectOverview/getProjectOverview"
      );
      if (res.status === 201) {
        setProjectOverview(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const [UpComingProject, setUpComingProject] = useState([]);

  const getUpComingProject = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/UpComingProject/getUpComingProjectBanner"
      );
      if (res.status === 201) {
        setUpComingProject(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getProjectOverviewPage();
    getUpComingProject();
  }, []);
  return (
    <div>
      <ToastContainer position="top-center" />
      {UpComingProject?.map((item) => {
        return (
          <section
            id="about"
            style={{
              height: "40vh",
              width: "100%",
              zIndex: 2,
              backgroundImage: `url(http://localhost:8989/UpComingProject/${item?.image})`,
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

      {ProjectOverview?.filter((item) => item?.SelectType === "Upcoming")?.map(
        (item) => {
          return (
            <div
              className="container-fluid browse-all-project-rs"
              style={{ paddingBottom: "90px" }}
            >
              <div className="row this-is-project-heading">
                <div style={{ textAlign: "center !important" }}>
                  Our Upcoming Projects
                </div>
              </div>
              <div className="row">
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "700",
                    color: "#175764",
                    marginTop: "10px",
                    fontFamily: "Lato, sans-serif",
                  }}
                  className="pro-title-mob-res"
                >
                  {item?.projectTitle}
                </div>
              </div>
              <div className="background-image-in">
                <Container>
                  <div className="row">
                    <div className="container">
                      <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={30}
                        slidesPerView={1}
                      >
                        <SwiperSlide className="mt-4">
                          <div
                            className="swiper-container-custom"
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div className="row">
                              <img
                                src={`http://localhost:8989/ProjectOverview/${item?.Image3}`}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "500px",
                                  borderRadius: "10px",
                                }}
                                className="mob-res-img-up-coming-project mt-5"
                              />
                              <div
                                style={{
                                  position: "relative",
                                  display: "flex",
                                }}
                              >
                                <div
                                  className="main"
                                  onClick={() =>
                                    navigate("/projectoverview", { state: item })
                                  }
                                >
                                  <img
                                    src="../Images/right-arrow-white1.png"
                                    alt="Icon"
                                    className="arrow-right-explore"
                                    style={{
                                      padding: "12px",
                                      position: "absolute",
                                      borderRadius: "50px",
                                      top: "-35px",
                                      left: "70px",
                                    }}
                                  />

                                  <svg
                                    id="rotatingText"
                                    viewBox="0 0 150 150"
                                    width="150"
                                    height="150"
                                    className="rotating-text-mobile-res"
                                    style={{
                                      width: "135px",
                                      height: "135px",
                                      fontWeight: "700",
                                      marginTop: "-79px",
                                      marginLeft: "27px",
                                    }}
                                  >
                                    <defs>
                                      <path
                                        id="circle"
                                        d="M 75, 75
                    m -56.25, 0
                    a 56.25, 56.25 0 1, 0 112.5, 0
                    a 56.25, 56.25 0 1, 0 -112.5, 0"
                                      ></path>
                                    </defs>
                                    <text>
                                      <textPath
                                        xlinkHref="#circle"
                                        startOffset="0%"
                                        className="text"
                                        alignmentBaseline="middle"
                                        fill="#fff"
                                      >
                                        EXPLORE&nbsp;&nbsp;MORE
                                      </textPath>
                                    </text>
                                    <text>
                                      <textPath
                                        xlinkHref="#circle"
                                        startOffset="50%"
                                        className="text"
                                        alignmentBaseline="middle"
                                        fill="#fff"
                                      >
                                        EXPLORE&nbsp;&nbsp;MORE
                                      </textPath>
                                    </text>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        {/* <SwiperSlide >
                    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                      <div className="row">
                        <img src="../Images/card2.png" alt="" style={{width:"800px",height:"500px",borderRadius:"10px"}}/>
                      </div>
                    </div>
                  </SwiperSlide> */}
                      </Swiper>

                      {/* </Swiper> */}
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          );
        }
      )}

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

export default UpcomingProject;

import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "../Style/home.css";
import WhatOurClientSays from "./WhatOurClientSays";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Accordion from "react-bootstrap/Accordion";
import AOS from "aos";
import WelcomeHome from "./WelcomeHome";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import UpcomingProject from "./UpcomingProject";
import { BiSolidPhoneCall } from "react-icons/bi";
import WhyChoosenUs from "./WhyChoosenUs";
import axios from "axios";
import parse from "html-react-parser";
import { toast, ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import img1 from ".././assets/24-hour water supply.webp";
import img2 from ".././assets/24-hour power supply.webp";
import img3 from ".././assets/24-hour water supply.webp";
import img4 from ".././assets/gated community.webp";
import backImg from ".././assets/qwerty.webp";
import imgcont from ".././assets/imgcont.avif";
import logo from ".././assets/logo_1.jpeg";






const Home = () => {
  const [FAQ, setFAQ] = useState([]);
  const [Demo, setDemo] = useState({});
  console.log(Demo, "demo");

  console.log(FAQ, "DASD");
  const getFaq = async () => {
    try {
      let res = await axios.get("https://dveep-backend.onrender.com/api/homeFaq/getFaq");
      if (res.status === 201) {
        setFAQ(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  useEffect(() => {
    getFaq();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);

  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  const [ProjectOverview, setProjectOverview] = useState([]);
  const getProjectOverviewPage = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/ProjectOverview/getProjectOverview"
      );
      if (res.status === 201) {
        setProjectOverview(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // Download Brochure PDF
  const BroucherDownload = () => {
    // Get the PDF URL
    const brochurePdf = `https://dveep-backend.onrender.com/ProjectOverview/${Demo?.brochure}`;

    // Open the PDF in a new browser tab/window
    window.open(brochurePdf, "_blank");
  };

  // Download Brochure

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");

  const DownloadBrochure = async () => {
    if (!Demo?.brochure) {
      toast.warning("No Pdf Available");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("name1", Name);
      formData.append("useremail", Email);
      formData.append("phoneNumber", PhoneNo);
      formData.append("brochure", Demo?.brochure);
      const config = {
        url: "downloadbrochure",
        method: "post",
        baseURL: "https://dveep-backend.onrender.com/api/DownloadBrochure/",
        headers: { "Content-Type": "application/json" },
        data: formData,
      };
      let res = await axios(config);
      if (res.status === 200) {
        toast.success(res.data.success);
        handleClose1();
        BroucherDownload();
        setName("");
        setEmail("");
        setPhoneNo("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // const [isFormVisible, setIsFormVisible] = useState(false);
  // const [isFormVisible1, setIsFormVisible1] = useState(false);

  // const handleButtonClick1= () => {
  //   setIsFormVisible(!isFormVisible);
  // };
  // const handleButtonClick3= () => {
  //   setIsFormVisible1(!isFormVisible1);
  // };

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
  const options = {
    margin: 520,
    responsiveClass: true,
    nav: false,
    dots: true,
    autoplay: false,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      1000: {
        items: 2,
      },
    },
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/projectoverview");
    window.location.reload();
  };

  const learnMoreHandleClick = () => {
    navigate("/aboutus");
  };
  const BrowseAllProjectbtn = () => {
    navigate("/ongoing_project");
  };
  const [Banner, setBanner] = useState([]);
  const getHomeslider = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/homeBanner/getHomeBanner"
      );
      if (res.status === 201) {
        setBanner(res.data.data2);
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  useEffect(() => {
    getHomeslider();
    getProjectOverviewPage();
    getWhyDveep();
  }, []);

  const [Dveep, setDveep] = useState([]);
  const getWhyDveep = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/homeInvestInDveep/getInvestInDveep"
      );
      if (res.status === 201) {
        setDveep(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const validatePhone = (phone) => {
    const phoneregex = /^[6789]\d{9}$/;
    if (phoneregex.test(phone)) {
      return true;
    } else {
      toast.warning("enter valid mobile number");
    }
  };
  const validateEmail = (Email1) => {
    const emailregex = /\S+@\S+\.\S+/;
    if (emailregex.test(Email1)) {
      return true;
    } else {
      toast.warning("enter valid email");
    }
  };

  const [loading, setloading] = useState(false);

  const [YourName, setYourName] = useState("");
  const [Email1, setEmail1] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  // const [Project, setProject] = useState("");
  const [Text, setText] = useState("");

  console.log(YourName, Email1, PhoneNumber, Text);

  const DownloadForm = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!YourName) {
      toast.warning("Please Enter Your Name");
      return;
    }
    if (!Email1) {
      toast.warning("please Enter Your Email");
      return;
    }
    if (!PhoneNumber) {
      toast.warning("Please Enter Your Phone Number");
      return;
    }
    if ((!YourName, !Email1, !PhoneNumber)) {
      toast.warning("All fields are necessary!,please enter all the fields");
      return;
    }

    try {
      if (validateEmail(Email1) && validatePhone(PhoneNumber)) {
        const formData = new FormData();

        formData.append("yourName", YourName);
        formData.append("email", Email1);
        formData.append("phoneNumber", PhoneNumber);
        formData.append("text", Text);
        setloading(true);
        const config = {
          url: "createScheduleVisist",
          method: "post",
          baseURL: "https://dveep-backend.onrender.com/api/ScheduleVisit/",
          headers: { "Content-Type": "application/json" },
          data: formData,
        };
        let res = await axios(config);
        if (res.status === 200) {
          alert("Form is Submitted Sucessfully");
          setShow(false);
          setYourName("");
          setEmail1("");
          setPhoneNumber("");
          setText("");
        }
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <ToastContainer position="top-center" />
      <Carousel fade data-aos="fade-down">
        {Banner?.map((item) => {
          return (
            <Carousel.Item className="carousel-item">
              <img
                src={`https://dveep-backend.onrender.com/HomeBanner/${item?.bannerImg}`}
                alt=""
                className="cor-img-h-w"
              />
              <Carousel.Caption>
                <h3 className="cor-heading-fs">{item?.title}</h3>
                <p className="cor-para-fs">
                  {parse(`<div>${item?.description}</div>`)}
                </p>
                <div className="btn-btn-btn">
                  <button
                    className="explore-project-btn"
                    onClick={handleButtonClick}
                  >
                    Explore Projects
                  </button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>

      {/* =========================================about us=================================== */}

      {/* <WelcomeHome /> */}

      <div className="d-flex justify-content-center align-items-center mx-auto mb-5 mt-5">
        <Carousel className="mx-auto" interval={3000} slide>
          {/* Large screen: 4 items, Medium screen: 2 items, Small screen: 1 item */}
          <Carousel.Item>
            <Row className="d-flex justify-content-center mx-auto">
              <Col xs={12} sm={6} md={4} lg={3}>
                <div className="card">
                  {/* <p className="header">UI Blog's</p> */}
                  <div className="main-content">
                    <div className="d-flex justify-content-center mx-auto">
                      <img
                        src={img1}
                        alt=""
                        className="img-fluid rounded-circle w-50"
                        data-aos="zoom-in"
                      />
                    </div>
                    <p className="heading">24 Hours Water Supply</p>
                  </div>
                  {/* <div className="footer">by Harsh Gupta</div> */}
                </div>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <div className="card">
                  {/* <p className="header">UI Blog's</p> */}
                  <div className="main-content">
                    <div className="d-flex justify-content-center mx-auto">
                      <img
                        src={img2}
                        alt=""
                        className="img-fluid rounded-circle w-50"
                        data-aos="zoom-in"
                      />
                    </div>
                    <p className="heading">24 Hours Power Supply</p>
                  </div>
                  {/* <div className="footer">by Harsh Gupta</div> */}
                </div>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <div className="card">
                  {/* <p className="header">UI Blog's</p> */}
                  <div className="main-content">
                    <div className="d-flex justify-content-center mx-auto">
                      <img
                        src={img4}
                        alt=""
                        className="img-fluid rounded-circle w-50"
                        data-aos="zoom-in"
                      />
                    </div>
                    <p className="heading">Gated Community</p>
                  </div>
                  {/* <div className="footer">by Harsh Gupta</div> */}
                </div>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <div className="card">
                  {/* <p className="header">UI Blog's</p> */}
                  <div className="main-content">
                    <div className="d-flex justify-content-center mx-auto">
                      <img
                        src={img3}
                        alt=""
                        className="img-fluid rounded-circle w-50"
                        data-aos="zoom-in"
                      />
                    </div>
                    <p className="heading">24 Hours Security</p>
                  </div>
                  {/* <div className="footer">by Harsh Gupta</div> */}
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
      </div>

      <section class="b-section mb-5">
        <div class="b-section-marquee-box">
          <h2 class="marquee-text">
            Explore our exclusive farmland projects offering lush greenery,
            fertile soil, and a sustainable investment opportunity—scroll
            endlessly to discover your perfect piece of nature •
          </h2>
          <h2 class="marquee-text">
            Discover a wide range of prime farmland properties with endless
            possibilities for investment, agriculture, and development—keep
            scrolling to find your ideal land •
          </h2>
        </div>
      </section>

      {ProjectOverview?.filter((ele) => ele.SelectType === "Ongoing")?.map(
        (item) => {
          console.log("ProjectOverview", ProjectOverview);

          return (
            <div
              className="container-fluid browse-all-project-rs"
              // style={{ backgroundColor: "#F1FAFF", paddingBottom: "90px"  }}
              style={{
                backgroundImage: `url(${backImg})`,
                backgroundAttachment: "fixed",
                backgroundPosition:"center",
                backgroundSize:"cover",
                width:"100%"
              }}
            >
              {/* <div className="row this-is-project-heading">
                Browse Our Latest Projects
              </div> */}
              <div className="row">
                <div className="col-md-6 this-is-project-title">
                  {/* {parse(`<div>${item?.desc1.slice(0,100)}</div>`)} */}
                </div>
                {/* <div className="col-md-6">
                  <button onClick={BrowseAllProjectbtn} className="project-btn">
                    Browse All Project
                  </button>
                </div> */}
              </div>

              <div className="row position-relative">
                <div className="col-md-6 mt-4 position-relative">
                  <img
                    src={`https://dveep-backend.onrender.com/ProjectOverview/${item?.Image3}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "500px",
                      borderRadius: "10px",
                    }}
                    data-aos="flip-left"
                  />
                  <div className="row">
                    <div className="col-md-3">
                      <>
                        <Button
                          variant="primary"
                          onClick={handleShow}
                          className="enquire-now-btn"
                        >
                          Enquire Now
                        </Button>
                        <div className="mt-5 erooe">
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Enquire Now Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Label>Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter your Name"
                                    autoFocus
                                    value={YourName}
                                    onChange={(e) =>
                                      setYourName(e.target.value)
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Label>Email address</Form.Label>
                                  <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={Email1}
                                    onChange={(e) => setEmail1(e.target.value)}
                                  />
                                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Label>Phone Number</Form.Label>
                                  <Form.Control
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your Phone Number"
                                    value={PhoneNumber}
                                    onChange={(e) =>
                                      setPhoneNumber(e.target.value)
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <Form.Label>Enter your Query</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="query"
                                    value={Text}
                                    onChange={(e) => setText(e.target.value)}
                                  />
                                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={DownloadForm}
                                type="submit"
                              >
                                {loading ? "Submitting..." : "Submit"}
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </>
                    </div>
                    <div className="col-md-6">
                      <>
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleShow1();
                            setDemo(item);
                          }}
                          className="download-brochure-btn"
                        >
                          Download Brochure
                        </Button>
                        <div className="mt-5 erooe">
                          <Modal show={show1} onHide={handleClose1}>
                            <Modal.Header closeButton>
                              <Modal.Title>Download Brochure Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Label>Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter your Name"
                                    autoFocus
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Label>Email address</Form.Label>
                                  <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  <Form.Label>Phone Number</Form.Label>
                                  <Form.Control
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your Phone Number"
                                    value={PhoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                  />
                                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleClose1}
                              >
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={DownloadBrochure}
                                type="submit"
                              >
                                Submit
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* <div className="row mt-4 title-project-1">
                    {item?.projectTitle}
                  </div>
                  <div className="row mt-4 project-paragraph-home-changing">
                    {parse(`<div>${item?.desc1}</div>`)}
                  </div> */}

                  <div className="mt-4 d-flex flex-column gap-3 ">
                    <div
                      className="d-flex justify-content-between align-items-center  gap-5"
                      style={{
                        height: "160px",
                        borderRadius: "10px",
                        padding: "0 10px",
                      }}
                      data-aos="fade-down"
                    >
                      <img
                        src={img2}
                        alt=""
                        className="img-fluid rounded-circle gap-5"
                        style={{ width: "100px" }}
                      />
                      <h1
                        className=" fs-2"
                        style={{ color: "#176457", fontWeight: "900" }}
                      >
                        Grow Your Own Organic Foods
                      </h1>
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center gap-5"
                      style={{
                        height: "160px",
                        borderRadius: "10px",
                        padding: "0 10px",
                      }}
                      data-aos="fade-down"
                    >
                      <img
                        src={img2}
                        alt=""
                        className="img-fluid rounded-circle"
                        style={{ width: "100px" }}
                      />
                      <h1
                        className="fs-2"
                        style={{ color: "#176457", fontWeight: "900" }}
                      >
                        Grow Your Own Organic Foods
                      </h1>
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center gap-5"
                      style={{
                        height: "160px",
                        borderRadius: "10px",
                        padding: "0 10px",
                      }}
                      data-aos="fade-down"
                    >
                      <img
                        src={img2}
                        alt=""
                        className="img-fluid rounded-circle"
                        style={{ width: "100px" }}
                      />
                      <h1
                        className="fs-2"
                        style={{ color: "#176457", fontWeight: "900" }}
                      >
                        Grow Your Own Organic Foods
                      </h1>
                    </div>
                  </div>

                  <div className="row">
                    <div style={{ position: "relative", display: "flex" }}>
                      <div
                        className="main"
                        data-aos="zoom-in"
                        data-aos-duration="2000"
                        onClick={() =>
                          navigate("/projectoverview", { state: item })
                        }
                      >
                        <img
                          src="../Images/right-arrow.png"
                          alt="Icon"
                          style={{ textAlign: "center" }}
                          className="arrow-right-explore"
                        />
                        <svg
                          id="rotatingText"
                          viewBox="0 0 150 150"
                          width="150"
                          height="150"
                          className="rotating-text-mobile-res"
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
                          <text style={{ color: "#176457" }}>
                            <textPath
                              xlinkHref="#circle"
                              startOffset="0%"
                              className="text"
                              alignmentBaseline="middle"
                              fill="#176457"
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
                              fill="#176457"
                            >
                              EXPLORE&nbsp;&nbsp;MORE
                            </textPath>
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}
      {/* ======================= */}
      {/* <UpcomingProject/> */}
      {ProjectOverview?.filter((ele) => ele.SelectType === "Upcoming")?.map(
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
                                src={`https://dveep-backend.onrender.com/ProjectOverview/${item?.Image3}`}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "500px",
                                  borderRadius: "10px",
                                }}
                                className="mob-res-img-up-coming-project mt-5"
                                // data-aos="zoom-in-right"
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
                                    navigate("/projectoverview", {
                                      state: item,
                                    })
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

      {/* ============================================== */}
   

      <div className="why-you-call">
        <div className="full-width-background">
          <div
            className="row green-background-container-row"
            data-aos="zoom-in"
          >
            <div>
              <div className="d-flex justify-content-between align-items-center flex-lg-row flex-column">
                <div className="d-flex flex-column col-lg-4">
                  <div className="d-flex flex-column col-lg-12">
                  <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={`https://dveep-backend.onrender.com/InvestInDveep/${Dveep[0]?.image1}`}
                        alt=""
                        className="service-img-icon"
                      />
                    </div>
                    <div className="title-name-service mt-3">
                      {Dveep[0]?.heading1}
                    </div>
                    <div className="para-name-service mt-3">
                      {parse(`<div>${Dveep[0]?.description1}</div>`)}
                    </div>
                  </div>
                  <div className="d-flex flex-column col-lg-12">
                  <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={`https://dveep-backend.onrender.com/InvestInDveep/${Dveep[1]?.image1}`}
                        alt=""
                        className="service-img-icon"
                      />
                    </div>
                    <div className="title-name-service mt-3">
                      {Dveep[1]?.heading1}
                    </div>
                    <div className="para-name-service mt-3">
                      {parse(`<div>${Dveep[1]?.description1}</div>`)}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center col-lg-4">
                  <span className="text-light fs-1 text-center ">Why</span>
                  <img src={logo} alt="" style={{ width: "200px" }} />
                </div>

                <div className="d-flex flex-column col-lg-4">
                  <div className="d-flex flex-column col-lg-12">
                  <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={`https://dveep-backend.onrender.com/InvestInDveep/${Dveep[2]?.image1}`}
                        alt=""
                        className="service-img-icon"
                      />
                    </div>
                    <div className="title-name-service mt-3">
                      {Dveep[2]?.heading1}
                    </div>
                    <div className="para-name-service mt-3">
                      {parse(`<div>${Dveep[2]?.description1}</div>`)}
                    </div>
                  </div>
                  <div className="d-flex flex-column col-lg-12">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={`https://dveep-backend.onrender.com/InvestInDveep/${Dveep[3]?.image1}`}
                        alt=""
                        className="service-img-icon"
                      />
                    </div>
                    <div className="title-name-service mt-3">
                      {Dveep[3]?.heading1}
                    </div>
                    <div className="para-name-service mt-3">
                      {parse(`<div>${Dveep[3]?.description1}</div>`)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row width-overflow">
          <div className="talk-with-property-adviser">
            <div className="talk-button">
              <button className="talk-button-design">
                TALK WITH OUR PROPERTY ADVISER
              </button>
            </div>
            <div className="phone-call d-flex">
              <a href="tel:+917996920665" className="call-icon-link">
                <p className="call-icon">
                  <BiSolidPhoneCall />
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <WhyChoosenUs />
      <WhatOurClientSays />
      <div className="faq">
        <Container>
          <div className="row d-flex justify-content-center frequently-question">
            Frequently Asked Questions
          </div>
          <div className="row d-flex justify-content-center have-a-question">
            Have a Question?
          </div>
          <div
            className="row d-flex justify-content-center help-days-weeks"
            style={{ paddingLeft: "25px" }}
          >
            We are here to help you 7 days a week and respond within 24 hours.
            Plus, you can find most answers to your questions right on this
            page.
          </div>
          <div className="row faq-row-mb-res">
            {FAQ.map((item) => {
              return (
                <div className="col-md-6">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                      <Accordion.Header> {item?.question}</Accordion.Header>
                      <Accordion.Body>
                        {parse(`<div>${item?.answer}</div>`)}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      <div className="mx-auto">
        <div className="d-flex justify-content-between align-items-center mx-auto">
          <div class="card6">
            <a class="card1" href="/contactus">
              <h1 style={{ color: "#176457" }}>
                Get a glimpse of life at{" "}
                <span style={{ fontSize: "60px" }}> DVeep Farm Land</span>
              </h1>
              <p class="small">Schedule a site visit today</p>
              <div class="go-corner" href="#">
                <div class="go-arrow">→</div>
              </div>
            </a>
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

export default Home;

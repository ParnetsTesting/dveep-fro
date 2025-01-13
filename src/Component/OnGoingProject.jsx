import React, { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Style/project.css";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import AOS from "aos";
import axios from "axios";
import parse from "html-react-parser";
import { toast, ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const OnGoingProject = (phoneNumber) => {

  const [Demo, setDemo] = useState({});
  console.log(Demo, "demo");
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

  useEffect(() => {
    getProjectOverviewPage();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);

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

  const whatsappMessage = encodeURIComponent(
    "Hello, I am interested in your services."
  );

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${whatsappMessage}`,
      "_blank"
    );
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/projectoverview");
  };

  const [OnGoingProject, setOnGoingProject] = useState([]);

  const getOnGoingProject = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/OnGoingProjectBanner/getOnGoingProjectBanner"
      );
      if (res.status === 201) {
        setOnGoingProject(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getOnGoingProject();
    getUploadBrochure();
  }, []);

  // Brochure PDF
  const [BrouchurList, setBrouchurList] = useState([]);
  const getUploadBrochure = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/UploadBrochure/getUploadBrochure"
      );
      if (res.status === 201) {
        setBrouchurList(res.data.data1?.[0]);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  console.log("BrouchurList", BrouchurList);

  // Download Brochure PDF
  const BroucherDownload = () => {
    // Get the PDF URL
    const brochurePdf = `http://localhost:8989/ProjectOverview/${Demo?.brochure}`;

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
      formData.append("email", Email);
      formData.append("phoneNumber", PhoneNo);
      formData.append("brochure", Demo?.brochure);

      const config = {
        url: "downloadbrochure",
        method: "post",
        baseURL: "http://localhost:8989/api/DownloadBrochure/",
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
          baseURL: "http://localhost:8989/api/ScheduleVisit/",
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
      {OnGoingProject?.map((item) => {
        return (
          <section
            className="contact"
            style={{
              height: "40vh",
              width: "100%",
              zIndex: 2,
              backgroundImage: `url(http://localhost:8989/OnGoingProject/${item?.image})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              position: "relative",
            }}
          >
            <div className="container ">
              <div className="breadcrumbt">
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
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ color: "white" }}>
                      project
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <div className="list-of-all-projects">
        {ProjectOverview?.filter((item) => item?.SelectType === "Ongoing")?.map(
          (item) => {
            return (
              <div className="row" style={{ width: "100%" }}>
                <div className="col-md-6 mt-4">
                  <img
                    src={`http://localhost:8989/ProjectOverview/${item?.Image3}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "500px",
                      borderRadius: "10px",
                      marginLeft: "10px",
                    }}
                    data-aos="flip-up"
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
                    <div className="col-md-3">
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
                                    value={PhoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                  />
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
                  <div className="row mt-4 title-project-1">
                    {item?.projectTitle}
                  </div>
                  <div className="row mt-4 project-paragraph-home-changing">
                    {parse(`<div>${item?.desc1}</div>`)}
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
            );
          }
        )}
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

export default OnGoingProject;

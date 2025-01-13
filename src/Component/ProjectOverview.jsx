import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "../Style/projectOverview.css";
import "react-multi-carousel/lib/styles.css";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AOS from "aos";
import { useLocation, useNavigate } from "react-router-dom";

const ProjectOverview = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data,"sddsd");
  
  
  const [Demo, setDemo] = useState({});
  console.log(Demo, "demo");

  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const navigate = useNavigate()

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

  console.log("ProjectOverview", ProjectOverview);

  const projectslider = ProjectOverview.flatMap((data) => data?.Image2 || []);
  console.log("projectslider", typeof projectslider);

  useEffect(() => {
    getProjectOverviewPage();
    getPropertyOverview();
    getFeaturesAndAminities();
    getUploadBrochure();
  }, []);



  const [PropertyOverview1, setPropertyOverview1] = useState([]);
  const getPropertyOverview = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/PropertyOverview/getPropertyOverview"
      );
      if (res.status === 201) {
        setPropertyOverview1(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const [Features, setFeatures] = useState([]);
  const getFeaturesAndAminities = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/FeatureAndAminities/getFeatureAndAminities"
      );
      if (res.status === 201) {
        setFeatures(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  console.log("Features", Features);

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
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedFeatures = chunkArray(Features, 5); // Break into chunks of 4

  const [ViewImage, setViewImage] = useState("");

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");

  // Brochure PDF
  const [BrouchurList, setBrouchurList] = useState([]);
  const getUploadBrochure = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/UploadBrochure/getUploadBrochure"
      );
      if (res.status === 201) {
        setBrouchurList(res.data.data1?.[0]);
      }
    } catch (error) {
      // toast.error(error.response.data.error);
      console.log(error);
    }
  };

  console.log("BrouchurList", BrouchurList);

 // Download Brochure PDF
 const BroucherDownload = () => {
  // Get the PDF URL
  const brochurePdf = `https://dveep-backend.onrender.com/ProjectOverview/${Demo?.brochure}`;

  // Open the PDF in a new browser tab/window
  window.open(brochurePdf, "_blank");
};

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
      <Container>
        <div className="row">
          <div className="col-md-8">
            <div className="paragraph-about-project">
              <h3
                className="paragraph-about-project-heading mt-4 text-start"
                style={{ paddingBottom: "20px", paddingTop: "20px" }}
              >
                {data?.projectTitle}
              </h3>
              <p className="paragraph-about-project-paragraph ">
                {parse(`<div>${data?.desc1}</div>`)}
              </p>
            </div>
          </div>
          <div className="col-md-4" style={{ marginTop: "60px" }}>
            <img
              src={`https://dveep-backend.onrender.com/ProjectOverview/${data?.Image3}`}
              alt=""
              style={{ height: "300px", width: "350px", marginTop: "61px" }}
              className="card-img-mob-res"
              data-aos="flip-up"
            />
          </div>
        </div>
      </Container>
      <div className="video-background-image-in">
        <Container>
          <div className="row mob-res-video-2">
            <div className="video-in-project-overview">
              <video
                controls
                muted
                loop
                style={{ height: "500px", width: "800px" }}
                className="video-mob-res mt-5"
                data-aos="fade-up"
                data-aos-duration="3000"
              >
                <source
                  src={`https://dveep-backend.onrender.com/ProjectOverview/${data?.video}`}
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="row mt-5">
              <div className="col-md-9">
                <>
                  <div>
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      className="enquire-now-btn"
                    >
                      Enquire Now
                    </Button>
                  </div>
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
                              onChange={(e) => setYourName(e.target.value)}
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
                              onChange={(e) => setPhoneNumber(e.target.value)}
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
                      setDemo(data);
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
                        <Button variant="secondary" onClick={handleClose1}>
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
        </Container>
      </div>
      <Container>
        <div className="elementor-widget-container mt-5" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
          <h2 className="page-title mb-20" style={{ color: "#176457" }}>
            Property Overview
          </h2>
          <ul className="property-grid-list">
            {/* {PropertyOverview1.map((item, index) => ( */}
             {data?.Property?.map((e) => {
              return( <li>
                <div className="property-grid-list-icon">
                  <img decoding="async" src={`https://dveep-backend.onrender.com/PropertyOverview/${e?.value.Icon}`}
                  alt="" />
                </div>
                <div className="property-grid-list-details">
                  <h4 className="property-grid-list-title">{e?.value.heading}</h4>
                  <p className="property-grid-list-text">{e?.value.title}</p>
                </div>
              </li>)})}
            {/* ))} */}
          </ul>
        </div>
      </Container>
      <Container>
        <div className="features-amenities-container" data-aos="zoom-in">
          <h3
            className="features-title"
            style={{
              color: "#176457",
              fontSize: "25px",
              fontFamily: "Roboto",
              fontWeight: "700",
            }}
          >
            Features &amp; Amenities
          </h3>
          <div className="features-row">


          {data?.Features?.map((e,index) => (
  <div className="features-column" key={index}>
    <div className="features-checklist">
        <div className="features-checklist-item" key={index}>
          <span className="tick-symbol">&#10003;</span>
          {e?.value}
        </div>
  
    </div>
  </div>
))}
         

        
          </div>
         
        </div>
      </Container>
      <Container>
        <div
          className="project-plan mt-5"
          style={{ backgroundColor: "#f1faff", borderRadius: "10px" }}
          data-aos="zoom-in"
        >
          <div className="floor-plan" style={{ paddingLeft: "10px" }}>
            Project Plan
          </div>

          <div className="row rw-style">
            <div className="col-md-6 mg-wg-jd">
              <img
                src={`https://dveep-backend.onrender.com/ProjectOverview/${data?.Image4}`}
                alt="pic"
              />
            </div>
            <div className="col-md-5  mg-wg-jd">
              <div className="title-of-project-plan">
                <p
                  style={{ fontSize: "17px", fontFamily: "serif" }}
                  className="para-mob-res-6"
                >
                  {parse(`<div>${data?.desc2}</div>`)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
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

export default ProjectOverview;

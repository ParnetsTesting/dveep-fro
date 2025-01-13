import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Style/header.css";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Offcanvas } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleButtonClick1 = () => {
    setIsFormVisible(!isFormVisible);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form is Submitted Sucessfully");
    // Handle form submission logic here
    console.log("Form submitted");
  };

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
    if (loading) return;

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
    }
    if ((!YourName, !Email, !PhoneNumber, !Project)) {
      toast.warning("All fields are necessary!,please enter all the fields");
      return;
    }

    try {
      if (validateEmail(Email) && validatePhone(PhoneNumber)) {
        const formData = new FormData();

        formData.append("yourName", YourName);
        formData.append("email", Email);
        formData.append("phoneNumber", PhoneNumber);
        formData.append("selectProject", Project);
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
          handleButtonClick1();
          setYourName("");
          setEmail("");
          setPhoneNumber("");
          setProject("");
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
    <div
      style={{
        position:"absolute",
        top: "30px",
        zIndex: "9999999",
        width:"100%"
        // backgroundColor: "green",
      }}
      className="d-flex justify-content-between align-items-center"
    >
      <Navbar
        collapseOnSelect
        expand="lg"
        className=" navbar-mobile d-flex justify-content-between align-items-center"
        style={{ position: "absolute", background: "none", width: "100%"  }}
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav" onClick={handleShow}>
            <Nav className=""></Nav>
            <Nav>
              <Nav.Link href="/" className="header-link-color">
                HOME
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="/aboutus"
                className="header-link-color"
              >
                ABOUT US
              </Nav.Link>
              <Nav.Link href="/ongoing_project" className="header-link-color">
                ONGOING PROJECT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>

        <Navbar.Brand href="/home">
          <img
            src="../Images/logo .jpeg"
            alt=""
            height={80}
            width={200}
            className="logo-header-mob"
          />
        </Navbar.Brand>

        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav" onClick={handleShow}>
            <Nav className="ms-auto"></Nav>
            <Nav>
              <Nav.Link href="/contactus" className="header-link-color">
                CONTACT US
              </Nav.Link>
              <div className="form-contain">
                <bUtton className="header-button" onClick={handleButtonClick1}>
                  Request A Visit
                </bUtton>

                {isFormVisible && (
                  <form onSubmit={DownloadForm} className="f-forms1">
                    <h2 style={{ color: "#176457" }} className="mt-2">
                      Schedule a visit
                    </h2>
                    <div className="form-sections1">
                      <div className="form-groups1">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          className="selections1"
                          value={YourName}
                          onChange={(e) => setYourName(e.target.value)}
                        />
                      </div>
                      <div className="form-groups1">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          className="selections1"
                          value={Email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-groups1">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Phone Number"
                          className="selections1"
                          value={PhoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <div className="form-groups1">
                        <select
                          id="option"
                          name="option"
                          className="selections1"
                          value={Project}
                          onChange={(e) => setProject(e.target.value)}
                        >
                          <option>Select Project</option>
                          <option value="Ongoing Project">
                            Ongoing Project
                          </option>
                          <option value="Upcoming Project">
                            Upcoming Project
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="form-groups1 mt-2 mb-2">
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        cols="50"
                        placeholder="Your Message"
                        className="selections1"
                        value={Text}
                        onChange={(e) => setText(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#176457" }}
                      className="btn-callbacks1"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

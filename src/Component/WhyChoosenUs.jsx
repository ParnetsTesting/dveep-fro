import "../Style/whyChoosenUs.css";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { FaSortDown } from "react-icons/fa";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";

const WhyChoosenUs = () => {
  const [counterOn, setCounterOn] = useState(false);

  const [WhyChooseUs, setWhyChooseUs] = useState([]);

  const getWhyChooseUs = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/homeWhyChooseUs/getWhyChooseUs"
      );
      if (res.status === 201) {
        setWhyChooseUs(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const [OurWork, setOurWork] = useState([]);

  const getOurWork = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/homeOurWork/getOurWork"
      );
      if (res.status === 201) {
        setOurWork(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const [Numbers, setNumbers] = useState([]);
  const getNumbers = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/homeNumbers/getNumbers"
      );
      if (res.status === 201) {
        setNumbers(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getWhyChooseUs();
    getOurWork();
    getNumbers();
  }, []);

  return (
    <div id="plain-back-image">
      <div className="plain-image-mobile-res">
        <Row style={{ width: "100%" }}>
          <Col
            md={12}
            className="chooseSection d-flex justify-content-center align-items-center gap-5"
          >
            <div>
              {WhyChooseUs?.map((item) => {
                return (
                  <div style={{width:"100%"}} className="">
                    <h1 style={{ textAlign: "center", color: "white" }}>
                      {item?.heading}
                    </h1>
                    <h5
                      style={{
                        textAlign: "justify",
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "700",
                      }}
                      className="mob-res-para-orange"
                    >
                      {parse(`<div>${item?.description}</div>`)}
                    </h5>
                  </div>
                );
              })}
            </div>

            <div>
              {OurWork?.map((item) => {
                return (
                  <div className="Expertise d-flex flex-column " style={{width:"500px"}}>
                    <h5 style={{ marginTop: "8%" }}>
                      <FaSortDown
                        style={{
                          color: "#fff",
                          fontSize: "24px",
                          marginBottom: "10px",
                        }}
                      />
                      <b className="text-light"> {item?.title}</b>
                    </h5>
                    <p
                      className="text-light"
                      style={{ borderBottom: "1px solid #fff" }}
                    >
                      {parse(`<div class="tyrue ">${item?.desc}</div>`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WhyChoosenUs;

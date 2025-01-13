import React, { useEffect, useState } from "react";
import "../Style/WelcomeHome.css";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WelcomeHome = () => {
  const [Welcome, setWelcome] = useState([]);
  const getWelcomeNote = async () => {
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

  useEffect(() => {
    getWelcomeNote();
  }, []);
  return (
    <div>
      <ToastContainer/>
      {Welcome?.map((item) => {
          return (
      <div className="background-section"  style={{
        position: 'relative',
        width: '100%',
        minHeight: '500px',
        backgroundImage:`url(http://localhost:8989/WelcomeNote/${item?.image1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginTop: '20px',
        marginBottom: '20px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundAttachment:"fixed"
      }}>
      
            <div className="overlay">
              <h1>{item?.heading}</h1>
              <p className="welcome-para">
              {parse(`<div>${item?.description}</div>`)}
              </p>
            </div>
      </div>
        );
      })}
    </div>
  );
};


export default WelcomeHome;

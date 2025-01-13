import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../Style/whatOurClientSays.css';
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Slider from "react-slick";
import AOS from 'aos';

const WhatOurClientSays = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
      const [WhatOurClientSays, setWhatOurClientSays] = useState([]);

    const getWhatOurClientSays= async () => {
      try {
        let res = await axios.get(
          "https://dveep-backend.onrender.com/api/homeOurClientSays/getOurClientSays"
        );
        if (res.status === 201) {
          setWhatOurClientSays(res.data.data1);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };

    useEffect(()=>{
      getWhatOurClientSays();
    },[])
    
    useEffect(()=>{
      AOS.init({duration:2500});
    },[])
  return (
    <div>
      <div className="client-heading">
        <div className="heading">
        What Our Clients Says
        </div>
      </div>

      <div className="slider-container">
      <Slider {...settings}>
      {WhatOurClientSays?.map((item)=>{
    return(
      <div className="custom-card" style={{width:"380px",height:"800px !important"}}>
      <div className="custom-card-body">
        <div style={{display:"flex",justifyContent:"center"}}>
        <img src={`https://dveep-backend.onrender.com/ClientSays/${item?.image}`} alt=""   style={{borderRadius:"50px",height:"100px",width:"100px"}}/>
        </div>
        <p className="custom-card-text" style={{fontWeight:"500",textAlign:"justify"}}>{parse(`<div>${item?.desc}</div>`)}</p>
        <h3 className="custom-card-title">{item?.title}</h3>
      </div>
      </div>
    )}
  )}
      </Slider>
    </div>


    </div>
  )
}

export default WhatOurClientSays
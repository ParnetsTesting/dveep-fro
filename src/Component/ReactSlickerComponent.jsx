import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const ReactSlickerComponent = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

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
      console.log(error);
    }
  };

  const projectslider = ProjectOverview.flatMap((item) => item?.Image2 || []);

  useEffect(() => {
    getProjectOverviewPage();
  }, []);

  
  return (
    <div>
      <div className="slider-container">
        <Slider asNavFor={nav2} ref={sliderRef1}>
          {projectslider?.map((item) => {
            return (
              <>
                    <div>
                      <img
                        src={`http://localhost:8989/ProjectOverview/${item?.swiperimages}`}
                        alt=""
                        width="100%"
                        height={400}
                      />
                    </div>
                
              </>
            );
          })}
        
        </Slider><br/>

        <Slider
          asNavFor={nav1}
          ref={sliderRef2}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          className="second-slider"
        >
          {projectslider?.map((item) => {
            return (
              <>
              
                    <div style={{ padding: "0 10px" }}>
                      <img
                        // src="../Images/about2.png"
                        src={`http://localhost:8989/ProjectOverview/${item?.swiperimages}`}
                        alt=""
                        width="100%"
                        height={150}
                      />
                    </div>
                
              </>
            );
          })}

        </Slider>
      </div>
    </div>
  );
};

export default ReactSlickerComponent;

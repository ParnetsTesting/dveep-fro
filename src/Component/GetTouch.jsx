import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Style/getInTouch.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const GetTouch = () => {
    const navigate = useNavigate();

    const getInTouchHandleClick = () => {
      navigate('/contactus'); // Use absolute path
    };
    const [GetInTouch, setGetInTouch] = useState([])
    console.log(GetInTouch,"GetInTouch")
    const getGetInTouchImage = async () => {
      try {
        let res = await axios.get(
          "http://localhost:8989/api/aboutGetInTouch/getGetInTouch"
        );
        if (res.status === 201) {
         setGetInTouch(res.data.data1);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };

    useEffect(()=>{
      getGetInTouchImage()
    },[])

    const imagesTouch = GetInTouch.map((item)=>item?.image)
    // console.log(imagesTouch,)
   console.log (`${imagesTouch[0]}`,"imagesTouch")
   
  return (
    <div className='padd-space-90'>
        <div className="container-fluid get-in-touch-c-h">
            <div className="container "  data-aos="zoom-in-down">
                <div className="row">
                <div className="col-md-4">
                    <img src={`http://localhost:8989/About/${imagesTouch[0]}`} alt="" className='get-in-touch-img' data-aos="flip-left" />
                </div>
                <div className="col-md-4">
                <img src={`http://localhost:8989/About/${imagesTouch[1]}`} alt="" id='middle-img-up' data-aos="flip-left"/>
                </div>
                <div className="col-md-4">
                <img src={`http://localhost:8989/About/${imagesTouch[2]}`} alt="" className='get-in-touch-img' data-aos="flip-left"/>
                </div>
                </div>
                <div className="row">
                    <div className="row this-is-get-in-title">
                    Get In Touch Today To Get A Free Project Quote
                    </div>
                    <div className="row">
                        <div className="btn-get-in-touch">
                        <button className='touch-btn-btn' onClick={getInTouchHandleClick}>Get In Touch</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-4">
                <img src={`http://localhost:8989/About/${imagesTouch[3]}`} alt="" className='get-in-touch-img'  data-aos="flip-right" />
                </div>
                <div className="col-md-4">
                <img src={`http://localhost:8989/About/${imagesTouch[4]}`} alt="" id='middle-img-down'   data-aos="flip-right"/>
                </div>
                <div className="col-md-4">
                <img src={`http://localhost:8989/About/${imagesTouch[5]}`} alt="" className='get-in-touch-img'  data-aos="flip-right"/>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GetTouch
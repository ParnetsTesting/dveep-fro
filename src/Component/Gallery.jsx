// import React, { useEffect, useState } from 'react';
// import Container from 'react-bootstrap/esm/Container';
// import Breadcrumb from "react-bootstrap/Breadcrumb";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse } from "@fortawesome/free-solid-svg-icons";
// import '../Style/gallery.css';
// import AOS from 'aos';
// import { FaArrowCircleUp } from "react-icons/fa";
// import { FaArrowCircleDown } from "react-icons/fa";
// import axios from "axios";
// import parse from "html-react-parser";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const Gallery = () => {
//   const [isScrollUp, setIsScrollUp] = useState(false);

// useEffect(() => {
//   const handleScroll = () => {
//     if (window.scrollY === 0) {
//       setIsScrollUp(false);
//     } else if (
//       window.innerHeight + window.scrollY >=
//       document.body.scrollHeight
//     ) {
//       setIsScrollUp(true);
//     }
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);
//   const scrollTo = () => {
//     if (isScrollUp) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
//     }
//     setIsScrollUp(!isScrollUp); // Toggle state after initiating scroll
//   };
//   useEffect(()=>{
//     AOS.init({duration:2500});
//   },[])

//   const [GalleryBanner, setGalleryBanner] = useState([]);
//   const getGalleryBanner = async () => {
//     try {
//       let res = await axios.get(
//         "https://dveep-backend.onrender.com/api/galleryGalleryBanner/getGalleryBanner"
//       );
//       if (res.status === 201) {
//         setGalleryBanner(res.data.data1);
//       }
//     } catch (error) {
//       toast.error(error.response.data.error);
//     }
//   };
  
// const [GalleryImage1, setGalleryImage1] = useState([]);
// const getGalleryImage = async () => {
//   try {
//     let res = await axios.get(
//       "https://dveep-backend.onrender.com/api/galleryImage/getImage"
//     );
//     if (res.status === 201) {
//       setGalleryImage1(res.data.data1);
//     }
//   } catch (error) {
//     toast.error(error.response.data.error);
//   }
// };


// const [GalleryVideo1, setGalleryVideo1] = useState([]);
// const getGalleryVideo = async () => {
//   try {
//     let res = await axios.get(
//       "https://dveep-backend.onrender.com/api/galleryVideo/getVideo"
//     );
//     if (res.status === 201) {
//       setGalleryVideo1(res.data.data1);
//     }
//   } catch (error) {
//     toast.error(error.response.data.error);
//   }
// };
//   useEffect(()=>{
//     getGalleryBanner();
//     getGalleryImage();
//     getGalleryVideo();
//   },[]);
//   return (
//     <div>
//       {GalleryBanner?.map((item)=>{
//         return(
//           <section className="gallery" style={{height: '40vh',
//             width: '100%',
//             zIndex: 2,
//             backgroundImage: `url(https://dveep-backend.onrender.com/GalleryBannery/${item?.image})`,
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             backgroundSize: 'cover',}}>
//           <div className="container">
//             <div className="breadcrumbt">
//               <div>
//                 <h1 className="abtus-heading" style={{color:"white"}}>{item?.text}</h1>
//               </div>
//               <div>
//                 <Breadcrumb>
//                   <FontAwesomeIcon
//                     icon={faHouse}
//                     style={{
//                       fontSize: "14px",
//                       color: "white",
//                       padding: "5px",
//                     }}
//                   />
//                   <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
//                   <Breadcrumb.Item active style={{ color: "white" }}>
//                     Gallery
//                   </Breadcrumb.Item>
//                 </Breadcrumb>
//               </div>
//             </div>
//           </div>
//         </section>
//         )
//       })}
   

//       <Container>
//         <div className="row mt-4">
//           {GalleryImage1?.map((item)=>{
//             return(
//               <div className="col-md-4">
//               <img    src={`https://dveep-backend.onrender.com/GalleryBannery/${item?.image}`} alt="" className="gallery-page-image"  data-aos="flip-left" />
//             </div>
//             )
//           })}
         
//     </div>
//         <div className="row mt-2">
//           {GalleryVideo1?.map((item)=>{
//             return(
//               <div className="col-md-4">
//               <video controls muted loop className="video-design-in-gallery" data-aos="flip-left">
//                 <source src={`https://dveep-backend.onrender.com/GalleryBannery/${item?.video}`} type="video/mp4"  />
//               </video>
//             </div>
//             )
//           })}
//         </div>
//       </Container>
//       <div
//         id="scroll-button"
//         className={isScrollUp ? "scroll-up" : "scroll-down"}
//         onClick={scrollTo}
//       >
//         {isScrollUp ? (
//           <FaArrowCircleUp style={{ fontSize: "45px" }} />

//         ) : (
//           <FaArrowCircleDown style={{ fontSize: "45px" }}/>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Gallery;
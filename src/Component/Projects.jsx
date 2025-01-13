// import React, { useEffect, useState } from 'react'
// import Card from 'react-bootstrap/Card';
// import Breadcrumb from "react-bootstrap/Breadcrumb";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse } from "@fortawesome/free-solid-svg-icons";
// import Container from 'react-bootstrap/esm/Container';
// import {useNavigate} from 'react-router-dom';
// import '../Style/project.css';
// import { FaArrowCircleUp } from "react-icons/fa";
// import { FaArrowCircleDown } from "react-icons/fa";
// import AOS from 'aos';

// const Projects = (phoneNumber) => {
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
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const handleButtonClick1= () => {
//     setIsFormVisible(!isFormVisible);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert("thank you for submitting the form")
//     // Handle form submission logic here
//     console.log('Form submitted');
//   };
//   const whatsappMessage = encodeURIComponent('Hello, I am interested in your services.');

//   const handleClick = () => {
//     window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
//   };
  
//   const navigate=useNavigate();

//   const handleButtonClick=()=>{
//     navigate('/projectoverview')
//   }
//   return (
//     <div>
//  <section className="contact">
//         <div className="container ">
//           <div className="breadcrumbt">
//             <div>
//               <h1 className="abtus-heading" style={{color:"white"}}>Projects</h1>
//             </div>

//             <div>
//               <Breadcrumb>
//                 <FontAwesomeIcon
//                   icon={faHouse}
//                   style={{
//                     fontSize: "14px",
//                     marginTop: "0px",
//                     color: "white",
//                     padding: "5px",
//                   }}
//                 />
//                 <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
//                 <Breadcrumb.Item active style={{ color: "white" }}>
//                   project
//                 </Breadcrumb.Item>
//               </Breadcrumb>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div className="list-of-all-projects">

// <div className="row" style={{width:"100%"}}>
//   <div className="col-md-6 mt-4">
// <img src="../Images/card2.png" alt="" style={{width:"100%",height:"500px",borderRadius:"10px"}}/>

// <div className="buttons-of-projects mt-5">
//   <button className='enquire-now-btn' onClick={handleClick}>Enquire Now</button>
//   <div className="form-container1">
//       <button 
//         id="download-brochure-btn"
//         className='download-brochure-btn'
//         onClick={handleButtonClick1}
//       >
//         Download Brochure
//       </button>

//       {isFormVisible && (
//         <form onSubmit={handleSubmit} className='f-forms1' >
//           <h2 style={{ color: "#176457" }} className='mt-2'>Schedule a visit</h2>
//           <div className='form-sections1'>
//             <div className='form-groups1'>
//               <input type="text" id="name" name="name" placeholder='Your Name' className='selections1' />
//             </div>
//             <div className='form-groups1'>
//               <input type="email" id="email" name="email" placeholder='Email Address' className='selections1' />
//             </div>
//             <div className='form-groups1'>
//               <input type="tel" id="phone" name="phone" placeholder='Phone Number' className='selections1' />
//             </div>
//             <div className='form-groups1'>
//               <select id="option" name="option" className='selections1'>
//                 <option value="option1">Real Estate</option>
//                 <option value="option2">Apartment</option>
//                 <option value="option3">Residential</option>
//               </select>
//             </div>
//           </div>
          
//           <div className='form-groups1 mt-2 mb-2'>
//             <textarea id="message" name="message" rows="4" cols="50" placeholder='Your Message' className='selections1'></textarea>
//           </div>
//           <button type='submit' style={{ backgroundColor: "#176457" }} className='btn-callbacks1'>Submit</button>
//         </form>
//       )}
//     </div>

//     </div>
//   </div>
//   <div className="col-md-5">
//     <div className="row mt-4 title-project-1">
//       Luxury Farm Plots for Sale in Doddaballapura
//     </div>
//     <div className="row mt-4 project-paragraph-home-changing">
//       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore ipsam officiis quaerat eum omnis molestiae tenetur pariatur assumenda vitae! Officiis, corporis ad inventore, praesentium corrupti debitis reiciendis sit saepe officia cum odit totam reprehenderit dolorem quisquam, quam aspernatur mollitia quasi! Labore atque dolores quasi optio deserunt enim, dignissimos amet, quia ea distinctio unde commodi rerum repudiandae. Amet dolore inventore et? Quaerat nihil, ipsum repudiandae sit mollitia architecto consectetur. Iure ad minima incidunt nesciunt iste nam, dicta officia ducimus iusto at.
//     </div>
//     <div className="row">
//     <div style={{position:"relative",display:"flex"}}>
//                 <div className="main"  data-aos="zoom-in" data-aos-duration="2000" onClick={handleButtonClick}>
//       <img src="../Images/right-arrow.png"  alt="Icon" style={{textAlign:"center"}} className="arrow-right-explore" />
//       <svg id="rotatingText" viewBox="0 0 150 150" width="150" height="150" className="rotating-text-mobile-res">
//         <defs>
//           <path id="circle"d="M 75, 75
//           m -56.25, 0
//           a 56.25, 56.25 0 1, 0 112.5, 0
//           a 56.25, 56.25 0 1, 0 -112.5, 0">
//           </path>
//         </defs>
//         <text style={{color:"#176457"}}>
//           <textPath xlinkHref="#circle" startOffset="0%" className="text" alignmentBaseline="middle" fill="#176457">
//           EXPLORE&nbsp;&nbsp;MORE
//           </textPath>
//         </text>
//         <text>
//           <textPath xlinkHref="#circle" startOffset="50%" className="text" alignmentBaseline="middle" fill="#176457">
//           EXPLORE&nbsp;&nbsp;MORE
//           </textPath>
//         </text>
//       </svg>
//     </div>
    
//     </div>
//     </div>
//   </div>
// </div>
//       </div>
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
//   )
// }

// export default Projects
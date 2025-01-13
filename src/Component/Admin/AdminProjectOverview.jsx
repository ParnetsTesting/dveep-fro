import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  Table,
  Image,
  FormControl,
  Form,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFilePdf } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MdDelete } from "react-icons/md";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useLocation } from "react-router-dom";
const AdminProjectOverview = () => {

  const animatedComponents = makeAnimated();


  const location = useLocation();
  const data1 = location.state;
  console.log(data1,"sdddddddddddddddsd");

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);

  const handleChange17 = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleChange18 = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };
  const [ViewImages, setViewImages] = useState({});
  const [show, setShow] = useState(false);
  const [show1, setshow1] = useState(false);
const [show2, setshow2] = useState(false);


const handleShow22=()=>setshow2(true);
const handleClose22=()=>setshow2(false);

  const handleClose1=()=>setshow1(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setshow1(true);
  // Ck Editor Code
  const [Desc, setDesc] = useState();
  const [Desc1, setDesc1] = useState();

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setDesc(data);
  };
  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setDesc1(data);
  };
  // Add modal for Slider
  const [show3, setShow3] = useState();
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  // Edit modal for  Slider
  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  // Delet modal for  Slider
  const [show5, setShow5] = useState();
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const [Image, setImage] = useState("");
  // pdf
  const [View, setView] = useState({});
  const [show10, setShow10] = useState();
  const handleClose10 = () => setShow10(false);
  const handleShow10 = () => setShow10(true);

  const [ProjectTitle, setProjectTitle] = useState("");
  const [brochure, setbrochure] = useState("");
  const [Image2, setImage2] = useState("");
  const [Video, setVideo] = useState(null);
  const [Image3, setImage3] = useState("");
  const [SelectType, setSelectType] = useState("");
  const [text, settext] = useState("");


  // Add Gallery Image
  const [imageURL2, setimageURL2] = useState(null);
  const [Image1, setImage1] = useState(null); // Changed to store the file directly
  const [galleryImages, setGalleryImages] = useState([]);
  const fileInputRef = useRef(null);

//add Property Overview Array
const [imageUrl1, setimageUrl1] = useState(null);
const [Icon, setIcon] = useState(null);
const [Heading, setHeading] = useState("");
const [Title, setTitle] = useState("");
const [PropertyOverviewArray, setPropertyOverviewArray] = useState([]);
const propertyOverviewRef=useRef(null);
const [ViewPropertyOverview, setViewPropertyOverview] = useState({});
const [viewFeatures, setviewFeatures] = useState({});

const OnPropertyOverviewImage=(event)=>{
if(event.target.files && event.target.files[0]){
  setIcon(event.target.files[0]);
  setimageUrl1(URL.createObjectURL(event.target.files[0]));
}
}

const AddPropertyOverviewArrayDetails=()=>{
if(!Icon){
  return alert("Please, Select an Icon");
}
if(!Heading){
  return alert("Please, Add heading ");
}
if(!Title){
  return alert("Please, Add Title");
}
const PropertyOverviewExits=PropertyOverviewArray.find((item)=>item.iconUrl===imageUrl1);

console.log("PropertyOverviewArray",PropertyOverviewArray);
if(PropertyOverviewExits){
  return alert("Image already exists in the gallery.");
}

const object={
  Icon:Icon,
  iconUrl:imageUrl1,
  heading:Heading,
  title:Title
};

setPropertyOverviewArray([...PropertyOverviewArray, object]);

setIcon(null);
setimageUrl1(null); // Clear the preview
if (propertyOverviewRef.current) {
  propertyOverviewRef.current.value = ""; // Clear the input file field
}
setHeading("");
setTitle("");
}





  const onImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage1(event.target.files[0]); // Store the selected file
      setimageURL2(URL.createObjectURL(event.target.files[0])); // Create image preview
    }
  };
 
  const AddGalleryImage = () => {
    if (!Image1) {
      return alert("Please, Select an Image");
    }

   

    const obj = {
      swiperimages: Image1, // Store the file in the gallery object
      imgUrl: imageURL2, // Preview URL
    };

    setGalleryImages([...galleryImages, obj]);

    // Clear the file input after adding the image
    setImage1(null);
    setimageURL2(null); // Clear the preview
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input file field
    }
  };
  const removeItem2 = (val) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmDelete) {
      const updatedGallery = galleryImages.filter(
        (item, index) => index !== val
      );
      setGalleryImages(updatedGallery);
    }
  };

  const PropertyOverviewPage = async ( ) => {
    try {
      if (!SelectType) {
        return alert("Please select Project Type");
      }
   
      // Create FormData object
      const formData = new FormData();
      formData.append("Image1", Image);
      formData.append("projectTitle", ProjectTitle);
      formData.append("desc1", Desc);
      formData.append("Image3", Image2);
      formData.append("video", Video);
      formData.append("Image4", Image3);
      formData.append("desc2", Desc1);
      formData.append("SelectType", SelectType);
      formData.append("brochure", brochure);
      formData.append("Property", JSON.stringify(selectedOption));
      formData.append("Features", JSON.stringify(selectedOption1));


      //formData.append("propertyOverview", JSON.stringify(myPropertyOverview));
     // formData.append('propertyOverviewId', 'YOUR_PROPERTY_OVERVIEW_ID');
      // formData.append('heading', heading);
      // formData.append('title', title);
      // formData.append('files', file);
      formData.append("text", text);

      const config = {
        url: "/createProjectOverview",
        method: "post",
        baseURL: "https://dveep-backend.onrender.com/api/ProjectOverview",
        headers: { "content-type": "multipart/form-data" },
        data: formData,
      };

      let res = await axios(config);

      if (res.status === 200) {
        console.log("res.data.newProjectOverview?._id",PropertyOverviewArray);
        
        for (let i = 0; i < galleryImages.length; i++) {
          const config = {
            url: "/uploadimages",
            method: "put",
            baseURL: "https://dveep-backend.onrender.com/api/ProjectOverview",
            headers: { "content-type": "multipart/form-data" },
            data: {
              productId: res.data.newProjectOverview?._id,
              swiperimages: galleryImages[i]?.swiperimages,

            },
          };
          await axios(config);
        }
    
      


        toast.success(res.data.status);
        handleClose3();
        getProjectOverviewPage();
        // Reset the form
        setImage("");
        setImage1("");
        setProjectTitle("");
        setImage2("");
        setVideo("");
        setImage3("");
        setDesc("");
        setSelectType(" ");
        setDesc1("");
        setSelectedOption("");
        setSelectedOption1("");
        setGalleryImages("");
        //setheading(" ");
        // settitle("");
        // settext("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };




  
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

  console.log("ProjectOverview>>>>>>>>>>>>>>", ProjectOverview);

  const [ProjectOverviewId, setProjectOverviewId] = useState({});
  const EditProjectOverview = async () => {
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("Image1", Image);
      formData.append("projectTitle", ProjectTitle);
      formData.append("desc1", Desc);
      formData.append("Image3", Image2);
      formData.append("video", Video);
      formData.append("Image4", Image3);
      formData.append("desc2", Desc1);
      formData.append("SelectType", SelectType);
      formData.append("brochure", brochure);
      // formData.append("Icon", Icon);
      // formData.append("heading", heading);
      // formData.append("title", title);
      // formData.append("text", text);

      const config = {
        url: "/updateProjectOverview/" + ProjectOverviewId,
        method: "put",
        baseURL: "https://dveep-backend.onrender.com/api/ProjectOverview",
        headers: { "content-type": "multipart/form-data" },
        data: formData,
      };

      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.sucess);
        handleClose4();
        getProjectOverviewPage();
        setImage("");
        setImage1("");
        setProjectTitle("");
        setImage2("");
        setVideo("");
        setImage3("");
        setDesc("");
        setSelectType(" ");
        setDesc1("");
        settext("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const DeleteProjectOverview = async () => {
    try {
      let res = await axios.delete(
        `https://dveep-backend.onrender.com/api/ProjectOverview/deleteProjectOverview/${ProjectOverviewId}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getProjectOverviewPage();
        handleClose5();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  console.log("ViewImages", ViewImages);

  // Slider Images
  const [GalleryId, setGalleryId] = useState("");
  console.log("GalleryId", GalleryId);

  console.log(selectedOption1,"sdsd");
  console.log(selectedOption,"sdsdsdd");

  const editSliderImages = async (image) => {
    try {
      const config = {
        url: "/editimages",
        method: "put",
        baseURL: "https://dveep-backend.onrender.com/api/ProjectOverview",
        headers: { "content-type": "multipart/form-data" },
        data: {
          projectid: ViewImages?._id,
          galleryid: GalleryId,
          swiperimages: image,
        },
      };

      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const [PropertyOverview1, setPropertyOverview1] = useState([]);
  const getPropertyOverview = async () => {
    console.log('fjdfdfkfj');
    
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/PropertyOverview/getPropertyOverview"
      );
      if (res.status === 201) {
        setPropertyOverview1(res.data.data1);
        console.log('dfdf',PropertyOverview1);
        
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.log('fdfdfdfdsf');
      
    }
  };
  useEffect(()=>{
    getProjectOverviewPage();
    getPropertyOverview();
    getFeaturesAndAminities();
  },[]);


  const [Features1, setFeatures] = useState([]);
  const Features = Features1.map(feature => ({
    value: feature.text,
    label: feature.text,
  }));
  const PropertyOverview2 =PropertyOverview1.map(feature => ({
    value: feature,
    label: feature.heading,
  }));
  console.log(selectedOption);
  console.log(selectedOption1);

  
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
console.log(Features);


  
  return (
    <div>
      <ToastContainer />
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Project Overview</h2>
          <div className="d-flex gap-3">
            <button className="admin-add-btn" onClick={handleShow3}>
              Add Project Overview
            </button>
          </div>
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Project Type</th>
                <th>SwiperImages</th>
                <th>Project Title</th>
                <th>
                  <div style={{ width: "400px" }}>Description</div>{" "}
                </th>
                <th>Image2</th>
                <th>Video</th>
                <th>Image3</th>
                <th>
                  <div style={{ width: "400px" }}>Description 2</div>
                </th>
                <th>Brochure</th>
                <th>Property Overview</th>
                <th>Features & amintities</th>
                {/* <th>Property heading</th>
                <th>Property Title</th> */}
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {ProjectOverview.map((item, i) => {
                return (
                  <tr style={{ border: "1px solid black" }}>
                    <td>{i + 1}</td>
                    <td>{item.SelectType}</td>
                    {/* <td>
                      <img
                        src={`https://dveep-backend.onrender.com/ProjectOverview/${item?.Image1}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      />
                    </td> */}
                    <td>
                      <Button
                        onClick={() => {
                          handleShow();
                          setViewImages(item);
                        }}
                      >
                        View
                      </Button>
                    </td>
                    <td>{item?.projectTitle}</td>
                    <td>
                      <div style={{ width: "400px !important" }}>
                        {parse(`<div>${item?.desc1}</div>`)}
                      </div>
                    </td>
                    <td>
                      <img
                        src={`https://dveep-backend.onrender.com/ProjectOverview/${item?.Image3}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      />
                    </td>
                    <td>
                      <video
                        style={{ width: "75px", height: "75px" }}
                        controls
                        autoPlay
                        loop
                        muted
                      >
                        <source
                          src={`https://dveep-backend.onrender.com/ProjectOverview/${item?.video}`}
                          type="file"
                          accept="video/*"
                        />
                      </video>
                    </td>
                    <td>
                      <img
                        src={`https://dveep-backend.onrender.com/ProjectOverview/${item?.Image4}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      />
                    </td>
                    <td
                      style={{ paddingTop: "10px", width: "400px !important" }}
                    >
                      {parse(`<div>${item?.desc2}</div>`)}{" "}
                    </td>
                    <td>
                      <FaRegEye
                        onClick={() => {
                          handleShow10();
                          setView(item);
                        }}
                      />
                    </td>
                    <td>
                      {/* <img
                        src={`https://dveep-backend.onrender.com/ProjectOverview/${item?.Icon}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      /> */}
                      <Button
                        onClick={() => {
                          handleShow1();
                              setViewPropertyOverview(item);
                        }}
                      >
                        View
                      </Button>
                    </td>
                    <td>     <Button
                        onClick={() => {
                          handleShow22();
                          setviewFeatures(item)
                        }}
                      >
                        Views
                      </Button></td>
                    {/* <td>{item?.heading}</td>
                    <td>{item?.title}</td> */}
                    <td>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <BiSolidEdit
                            className=""
                            style={{
                              cursor: "pointer",
                              fontSize: "20px",
                              color: "rgb(101, 177, 69)",
                            }}
                            onClick={() => {
                              handleShow4();
                              setProjectOverviewId(item?._id);
                            }}
                          />{" "}
                        </div>
                        <div>
                          <AiFillDelete
                            className=""
                            style={{
                              cursor: "pointer",
                              fontSize: "20px",
                              color: "red",
                            }}
                            onClick={() => {
                              handleShow5();
                              setProjectOverviewId(item?._id);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {/* Add Package modal for Slider */}
        <Modal
          show={show3}
          onHide={handleClose3}
          style={{ zIndex: "99999" }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Project Overview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-6">
                <div className="do-sear mt-2">
                  <label>Select Project Type</label>
                  <select
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setSelectType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              <div className="do-sear mt-2 mb-2">
                <label>Add Project Title</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Banner Title"
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </div>
            </div>

            <div
              className="row"
              style={{ padding: "5px", border: "2px solid black" }}
            >
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-9">
                    <div className="do-sear mt-2">
                      <label>Add Slider Image</label>
                      <input
                        type="file"
                        name=""
                        id=""
                        className="vi_0"
                        ref={fileInputRef}
                        onChange={(e) => {
                          onImageChange2(e);
                          setImage1(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <Button
                     onClick={AddGalleryImage}
                      style={{ marginTop: "40px" }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
{/* <div className="row"></div> */}
              <div className="col-sm-6">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Sl.No</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryImages?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {" "}
                            <img
                              src={item.imgUrl} // Use the image preview URL to display the image
                              alt={`Gallery Image ${index + 1}`}
                              style={{ width: "100px", height: "auto" }}
                            />
                          </td>
                          <td>
                            <MdDelete onClick={() => removeItem2(index)} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Description</label>

                <CKEditor editor={ClassicEditor} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Add Project Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setImage2(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Add Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setVideo(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Add Project Plan Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setImage3(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="col-md-6"></div>
              <div className="col-md-6"></div>
              <div className="col-md-6"></div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Description</label>

                <CKEditor editor={ClassicEditor} onChange={handleChange1} />
              </div>
            </div>
            <div>
              <label>Upload Project Brochure</label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={(e) => setbrochure(e.target.files[0])}
              />
            </div>
         <div className="row">
         <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label>Add Property Overview</label>
                  <Select
                  options={PropertyOverview2}
                   components={animatedComponents}
                   isMulti 
                   value={selectedOption}
                   onChange={handleChange17} />
                  </div>
                  </div>
         </div>
      
         <div className="row">
         <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label>Add Features And Aminities</label>
                  <Select
                  options={Features}
                   components={animatedComponents}
                   isMulti 
                   value={selectedOption1}
                   onChange={handleChange18} />
                  </div>
                  </div>
         </div>
          
            {/* </div> */}
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                className="mx-2 modal-close-btn"
                variant=""
                onClick={handleClose3}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={PropertyOverviewPage}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal for Slider */}
        <Modal
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Edit Project Overview
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-6">
                <div className="do-sear mt-2">
                  <label>Select Project Type</label>
                  <select
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setSelectType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              <div className="do-sear mt-2 mb-2">
                <label>Edit Project Title</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Banner Title"
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </div>
            </div>

            <div
              className="row"
              style={{ padding: "5px", border: "2px solid black" }}
            >
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-9">
                    <div className="do-sear mt-2">
                      <label>Edit Slider Image</label>
                      <input
                        type="file"
                        name=""
                        id=""
                        className="vi_0"
                        ref={fileInputRef}
                        onChange={(e) => {
                          onImageChange2(e);
                          setImage1(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <Button
                     onClick={AddGalleryImage}
                      style={{ marginTop: "40px" }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
{/* <div className="row"></div> */}
              <div className="col-sm-6">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Sl.No</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryImages?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {" "}
                            <img
                              src={item.imgUrl} // Use the image preview URL to display the image
                              alt={`Gallery Image ${index + 1}`}
                              style={{ width: "100px", height: "auto" }}
                            />
                          </td>
                          <td>
                            <MdDelete onClick={() => removeItem2(index)} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Description</label>

                <CKEditor editor={ClassicEditor} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Edit Project Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setImage2(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Edit Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setVideo(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Edit Project Plan Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setImage3(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="col-md-6"></div>
              <div className="col-md-6"></div>
              <div className="col-md-6"></div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Description</label>

                <CKEditor editor={ClassicEditor} onChange={handleChange1} />
              </div>
            </div>
            <div>
              <label>Edit Project Brochure</label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={(e) => setbrochure(e.target.files[0])}
              />
            </div>
         <div className="row">
         <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label>Edit Property Overview</label>
                  <Select
                  options={PropertyOverview2}
                   components={animatedComponents}
                   isMulti 
                   value={selectedOption}
                   onChange={handleChange17} />
                  </div>
                  </div>
         </div>
      
         <div className="row">
         <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label>Edit Features And Aminities</label>
                  <Select
                  options={Features}
                   components={animatedComponents}
                   isMulti 
                   value={selectedOption1}
                   onChange={handleChange18} />
                  </div>
                  </div>
         </div>
          
            {/* </div> */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose4}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={EditProjectOverview}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Delet Package modal for Slider */}
        <Modal
          show={show5}
          onHide={handleClose5}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <p className="fs-4" style={{ color: "red" }}>
                  Are you sure?
                  <br /> you want to delete this data?
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose5}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={DeleteProjectOverview}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Property Overview Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <Table bordered>
                <thead>
                        <tr>
                          <th>Sl.No</th>
                          <th>Property Image</th>
                          <th>Property Heading</th>
                          <th>property Title</th>
                        </tr>
                      </thead>
                  <tbody>
                  {ViewPropertyOverview?.Property?.map((e, index) => {
                     console.log(e,"e");
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <img
          src={`https://dveep-backend.onrender.com/PropertyOverview/${e?.value.Icon}`}
          alt={`Gallery Image ${index + 1}`}
          style={{ width: "100px", height: "auto" }}
        />
      </td>
      <td>{e?.value.heading}</td>
      <td>{e?.value.title}</td>
      <td>{/* Add your action buttons here */}</td>
    </tr>
  );
})}
                  </tbody>
                </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

{/* ================================================ */}

<Modal
          show={show2}
          onHide={handleClose22}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Features And Aminities List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>Features</th>
                  </tr>
                </thead>
                <tbody>
                {viewFeatures?.Features?.map((e,index) => (
                      <tr>
                        <td>{index+1}</td>
                        <td>
                        {e?.value}
                        </td>
                      </tr>
                   ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose22}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>





{/* ============================================= */}

<Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Slider Images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>Images</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ViewImages?.Image2?.map((item, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <img
                            src={`https://dveep-backend.onrender.com/ProjectOverview/${item?.swiperimages}`}
                            alt="lt"
                            style={{ width: "75px", height: "75px" }}
                          />
                        </td>
                        <td>
                          <div>
                            <BiSolidEdit
                              style={{
                                cursor: "pointer",
                                fontSize: "20px",
                                color: "rgb(101, 177, 69)",
                              }}
                              onClick={() => {
                                fileInputRef.current.click();
                                setGalleryId(item?._id);
                              }}
                            />{" "}
                            <input
                              type="file"
                              ref={fileInputRef}
                              style={{ display: "none" }} // Hide the file input
                              onChange={(e) =>
                                editSliderImages(e.target.files[0])
                              } // Handle file selection
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>











        {/* brochure modal  */}
        <Modal
          show={show10}
          onHide={handleClose10}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Brochure</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-12">
                <iframe
                  title="brochure"
                  style={{ width: "100%", height: "500px", overflow: "hidden" }}
                  src={`https://dveep-backend.onrender.com/ProjectOverview/${View?.brochure}`}
                ></iframe>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose10}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              // onClick={DeleteProjectOverview}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminProjectOverview;

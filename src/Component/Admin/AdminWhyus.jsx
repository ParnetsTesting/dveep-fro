import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AdminWhyus = () => {
  const [Desc, setDesc] = useState();
  const [Desc1, setDesc1] = useState()


  const handleChange = (e, editor) => {
    const data=editor.getData(); 
    setDesc(data) 
  }
  const handleChange1 = (e, editor) => {
    const data=editor.getData(); 
    setDesc1(data) 
  }
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


  const [Whyus, setWhyus] = useState(true);
  const [Ourwrk, setOurwrk] = useState(false);
  const [Number, setNumber] = useState(false);


const [Heading, setHeading] = useState('');
  const AddWhyChooseUs = async () => {
    try {
      const config = {
        url: "/createWhyChooseUs",
        method: "post",
        baseURL: "http://localhost:8989/api/homeWhyChooseUs",
        headers: { "content-type": "application/json" },
        data: {
          heading:Heading,
          description:Desc,
        },
      };

      let res = await axios(config);
      if (res.status === 200) {
        toast.success(res.data.status);
        handleClose3();
        getWhyChooseUs();
        setDesc("");
         setHeading("");
        
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const [WhyChooseUs, setWhyChooseUs] = useState([]);

  const getWhyChooseUs= async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/homeWhyChooseUs/getWhyChooseUs"
      );
      if (res.status === 201) {
        setWhyChooseUs(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };


const [WhyChooseUsId, setWhyChooseUsId] = useState("");

const EditWhyChooseUs= async () => {

    try {
      const config = {
        url: "/updateWhyChooseUs/" + WhyChooseUsId,
        method: "put",
        baseURL: "http://localhost:8989/api/homeWhyChooseUs",
        headers: { "content-type": "application/json" },
        data: {
          heading:Heading,
          description:Desc,
        },
      };

      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.sucess);
        handleClose4();
         getWhyChooseUs();
        setDesc("");    
         setHeading("");   
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const DeleteWhyChooseUs = async () => {
    try {
      let res = await axios.delete(
        `http://localhost:8989/api/homeWhyChooseUs/deleteWhyChooseUs/${WhyChooseUsId}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getWhyChooseUs();
        handleClose5();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // =====================================//
  const [Title, setTitle] = useState('');

  const AddOurWork = async () => {
    try {
      const config = {
        url: "/crateOurWork",
        method: "post",
        baseURL: "http://localhost:8989/api/homeOurWork",
        headers: { "content-type": "application/json" },
        data: {
          title:Title,
          desc:Desc1
        },
      };
console.log("config",config);

      let res = await axios(config);
      if (res.status === 200) {
        toast.success(res.data.status);
        handleClose3();
        getWhyChooseUs();
        setDesc("");
        setTitle("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

const [OurWork, setOurWork] = useState([]);

  const getOurWork= async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/homeOurWork/getOurWork"
      );
      if (res.status === 201) {
        setOurWork(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };


const [OurWorkId, setOurWorkId] = useState("");

const EditOurWork= async () => {

    try {
      const config = {
        url: "/updateOurWork/" + OurWorkId,
        method: "put",
        baseURL: "http://localhost:8989/api/homeOurWork",
        headers: { "content-type": "application/json" },
        data: {
          title:Title,
          desc:Desc1
        },
      };

      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.sucess);
        handleClose4();
        getOurWork();
        setTitle("");
        setDesc("");    
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const DeleteOurWork = async () => {
    try {
      let res = await axios.delete(
        `http://localhost:8989/api/homeOurWork/deleteOurWork/${OurWorkId}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getOurWork();
        handleClose5();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  useEffect(()=>{
    getOurWork();
    getWhyChooseUs();
    getNumbers();
  },[]);
// ==================================================================//
const [Title1, setTitle1] = useState('');
const [Number1, setNumber1] = useState('');

const AddNumbers = async () => {
  try {
    const config = {
      url: "/createNumbers",
      method: "post",
      baseURL: "http://localhost:8989/api/homeNumbers",
      headers: { "content-type": "application/json" },
      data: {
        title:Title1,
        number:Number1
      },
    };

    let res = await axios(config);
    if (res.status === 200) {
      toast.success(res.data.status);
      handleClose3();
      getNumbers();
     setTitle1("");
     setNumber1("");
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

const [Numbers, setNumbers] = useState([])
const getNumbers = async () => {
  try {
    let res = await axios.get(
      "http://localhost:8989/api/homeNumbers/getNumbers"
    );
    if (res.status === 201) {
      setNumbers(res.data.data1);
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};


const [NumbersId, setNumbersId] = useState('');

const EditNumbers= async () => {

  try {
    const config = {
      url: "/updateNumbers/" + NumbersId,
      method: "put",
      baseURL: "http://localhost:8989/api/homeNumbers",
      headers: { "content-type": "application/json" },
      data: {
        title:Title1,
        number:Number1
      },
    };

    let res = await axios(config);
    if (res.status === 201) {
      toast.success(res.data.sucess);
      handleClose4();
      getNumbers();
     setTitle1("");
     setNumber1("");  
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

const DeleteNumbers = async () => {
  try {
    let res = await axios.delete(
      `http://localhost:8989/api/homeNumbers/deleteNumbers/${NumbersId}`
    );
    if (res.status === 201) {
      toast.success(res.data.message);
      getNumbers();
      handleClose5();
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


  

  return (
    <div>
      <ToastContainer/>
      {/* Button  */}
      <div className='d-flex gap-3'>
        <div onClick={() => {
          setWhyus(true);
          setOurwrk(false);
          setNumber(false);
        }}>
          <Button>Why Choose Us</Button>
        </div>
        <div onClick={() => {
          setWhyus(false);
          setOurwrk(true);
          setNumber(false);
        }}>
          <Button>Our Works</Button>
        </div>
        <div onClick={() => {
          setWhyus(false);
          setOurwrk(false);
          setNumber(true);
        }}>
          <Button>Numbers</Button>
        </div>
      </div>

{Whyus? (<>

<div>
<div className="customerhead p-2">
<div className="d-flex justify-content-between align-items-center">
            <h2 className="header-c ">Why Choose Us</h2>
            <div className="d-flex gap-3">
              <button className="admin-add-btn" onClick={handleShow3}>
                Add Why Choose Us
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
                  <th>Why choose us?</th>
                  <th>Why Choose us Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
{WhyChooseUs?.map((item,i)=>{
  return(
    <tr  style={{border:"1px solid black"}}>
    <td>{i+1}</td>
  
    <td style={{ paddingTop: "10px" }}>{item?.heading}</td>
    <td style={{paddingTop:"10px"}}>
    {parse(`<div>${item?.description}</div>`)}
    </td>
    
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
            style={{ cursor: "pointer", fontSize: "20px", color:"rgb(101, 177, 69)" }}
            onClick={() => {
              setWhyChooseUsId(item?._id)
              handleShow4()}}

          />{" "}
        </div>
        <div>
          <AiFillDelete
            className=""
            style={{ cursor: "pointer", fontSize: "20px",  color:"red" }}
            onClick={() => {
              handleShow5();
              setWhyChooseUsId(item?._id)
            }}
          />
        </div>
      </div>
    </td>
  </tr>
  )
})}

              </tbody>
            </Table>
            </div>
             {/* Add Package modal for Slider */}
             <Modal show={show3} onHide={handleClose3} style={{ zIndex: "99999" }}>
              <Modal.Header
                closeButton
              >
                <Modal.Title>Add Why Choose Us</Modal.Title>
              </Modal.Header>
              <Modal.Body>
             
              <div className="row">
                  <div className="do-sear mt-2">
                    <label>Why Choose Us</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                     onChange={(e) => setHeading(e.target.value)}
                    />
                  </div>
                </div>

                
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Why Choose us Description</label>
                    <CKEditor 
                    editor={ClassicEditor}
                    onChange={handleChange}
                    />
                  </div>
                </div>
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
                   onClick={AddWhyChooseUs}
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
            >
              <Modal.Header
                closeButton
              >
                <Modal.Title style={{ color: "black" }}>Edit  Why Choose Us</Modal.Title>
              </Modal.Header>
             <Modal.Body>
             
              <div className="row">
                  <div className="do-sear mt-2">
                    <label>Edit Why Choose Us</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                     onChange={(e) => setHeading(e.target.value)}
                    />
                  </div>
                </div>

                
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Edit Why Choose Us Description</label>
                    <CKEditor 
                    editor={ClassicEditor}
                    onChange={handleChange}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClose4}
                >
                  Close
                </Button>
                <Button variant="" className="modal-add-btn"
                 onClick={EditWhyChooseUs}
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
              <Modal.Header
                closeButton
              >
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
                 onClick={DeleteWhyChooseUs}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
</div>

</>) : (<></>)}


{Ourwrk? (<>

<div>
<div className="customerhead p-2">
<div className="d-flex justify-content-between align-items-center">
            <h2 className="header-c ">Our Work</h2>
            <div className="d-flex gap-3">
              <button className="admin-add-btn" onClick={handleShow3}>
                Add Our Work 
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
                  <th>Our Work Title</th>
                  <th>Our Work Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
{OurWork?.map((item,i)=>{
  return(
    <tr  style={{border:"1px solid black"}}>
    <td>{i+1}</td>
  
    <td style={{ paddingTop: "10px" }}>{item?.title}</td>
    <td style={{paddingTop:"10px"}}>
      {parse(`<div>${item?.desc}</div>`)}
    </td>
    
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
            style={{ cursor: "pointer", fontSize: "20px", color:"rgb(101, 177, 69)" }}
            onClick={() =>
              {
              setOurWorkId(item?._id);
               handleShow4()}}

          />{" "}
        </div>
        <div>
          <AiFillDelete
            className=""
            style={{ cursor: "pointer", fontSize: "20px",  color:"red" }}
            onClick={() => {
              handleShow5();
              setOurWorkId(item?._id);
            }}
          />
        </div>
      </div>
    </td>
  </tr>
  )
})}
               

              </tbody>
            </Table>
            </div>
             {/* Add Package modal for Slider */}
             <Modal show={show3} onHide={handleClose3} style={{ zIndex: "99999" }}>
              <Modal.Header
                closeButton
              >
                <Modal.Title>Add Our Work</Modal.Title>
              </Modal.Header>
              <Modal.Body>
             
              <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Our Work</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                     onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Our work Description</label>
                    <CKEditor 
                    editor={ClassicEditor}
                    onChange={handleChange1}
                    />
                  </div>
                </div>
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
                    onClick={AddOurWork}
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
            >
              <Modal.Header
                closeButton
              >
                <Modal.Title style={{ color: "black" }}>Edit Our Work</Modal.Title>
              </Modal.Header>
             <Modal.Body>
             
              <div className="row">
                  <div className="do-sear mt-2">
                    <label>Edit Our Work</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                     onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Edit Our work Description</label>
                    <CKEditor 
                    editor={ClassicEditor}
                    onChange={handleChange1}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClose4}
                >
                  Close
                </Button>
                <Button variant="" className="modal-add-btn"
                 onClick={EditOurWork}
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
              <Modal.Header
                closeButton
              >
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
                  onClick={DeleteOurWork}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
</div>

</>) : (<></>)}

{Number? (<>
<div>
<div className="customerhead p-2">
<div className="d-flex justify-content-between align-items-center">
            <h2 className="header-c ">Numbers</h2>
            <div className="d-flex gap-3">
              <button className="admin-add-btn" onClick={handleShow3}>
                Add Numbers
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
                  <th>Numbers</th>
                  <th>Text</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
{Numbers?.map((item,i)=>{
  return(

    <tr  style={{border:"1px solid black"}}>
    <td>{i+1}</td>

    <td style={{paddingTop:"10px"}}>
      {item?.number}
    </td>
    
    <td style={{ paddingTop: "10px" }}>{item?.title}</td>
   
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
            style={{ cursor: "pointer", fontSize: "20px", color:"rgb(101, 177, 69)" }}
            onClick={() => 
              {
                setNumbersId(item?._id)
                handleShow4()}}

          />{" "}
        </div>
        <div>
          <AiFillDelete
            className=""
            style={{ cursor: "pointer", fontSize: "20px",  color:"red" }}
            onClick={() => {
              handleShow5();
              setNumbersId(item?._id)
            }}
          />
        </div>
      </div>
    </td>
  </tr>
  )
})}

              </tbody>
            </Table>
            </div>
             {/* Add Package modal for Slider */}
             <Modal show={show3} onHide={handleClose3} style={{ zIndex: "99999" }}>
              <Modal.Header
                closeButton
              >
                <Modal.Title>Add Numbers</Modal.Title>
              </Modal.Header>
              <Modal.Body>
             
              <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Numbers</label>
                    <input
                      type="number"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                       onChange={(e) => setNumber1(e.target.value)}
                    />
                  </div>
                </div>

                
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Add Text</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                    onChange={(e) => setTitle1(e.target.value)}
                    />
                  </div>
                </div>
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
                   onClick={AddNumbers}
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
            >
              <Modal.Header
                closeButton
              >
                <Modal.Title style={{ color: "black" }}>Edit Numbers</Modal.Title>
              </Modal.Header>
             <Modal.Body>
             
              <div className="row">
                  <div className="do-sear mt-2">
                    <label>Edit Numbers</label>
                    <input
                      type="number"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                     onChange={(e) => setNumber1(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Edit Text</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                     onChange={(e) => setTitle1(e.target.value)}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant=""
                  className="modal-close-btn"
                  onClick={handleClose4}
                >
                  Close
                </Button>
                <Button variant="" className="modal-add-btn"
                onClick={EditNumbers}
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
              <Modal.Header
                closeButton
              >
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
                  onClick={DeleteNumbers}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
</div>
</>) : (<></>)}

    </div>
  )
}

export default AdminWhyus

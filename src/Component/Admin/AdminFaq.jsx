import React, { useState, useEffect } from "react";
import { Button, Modal, Table,  } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import "../Admin/Admin.css";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AdminFaq = () => {
    // Ck Editor Code
    const [Desc, setDesc] = useState()

    const 
    handleChange = (e, editor) => {
      const data=editor.getData(); 
      setDesc(data) 
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


    const [Question, setQuestion] = useState('');

    const AddFaq = async () => {
      try {
        const config = {
          url: "/createFaq",
          method: "post",
          baseURL: "https://dveep-backend.onrender.com/api/homeFaq",
          headers: { "content-type": "application/json" },
          data: {
            question:Question,
            answer:Desc
          },
        };
  
        let res = await axios(config);
        if (res.status === 200) {
          toast.success(res.data.status);
          handleClose3();
          getFaq();
          setDesc("");
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    console.log("Question",Question);

const [FAQ, setFAQ] = useState([]);
    const getFaq= async () => {
      try {
        let res = await axios.get(
          "https://dveep-backend.onrender.com/api/homeFaq/getFaq"
        );
        if (res.status === 201) {
          setFAQ(res.data.data1);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
  

const [FAQID, setFAQID] = useState("");

 const EditFaq= async () => {
  console.log("ahahahhaha: ", FAQID);
  
      try {
        const config = {
          url: "/updateFaq/" + FAQID,
          method: "put",
          baseURL: "https://dveep-backend.onrender.com/api/homeFaq",
          headers: { "content-type": "application/json" },
          data: {
            question:Question,
            answer:Desc
          },
        };
  
        let res = await axios(config);
        if (res.status === 201) {
          toast.success(res.data.sucess);
          handleClose4();
          getFaq();
          setDesc("");        
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };

    const DeleteFaq= async () => {
      try {
        let res = await axios.delete(
          `https://dveep-backend.onrender.com/api/homeFaq/deleteFaq/${FAQID}`
        );
        if (res.status === 201) {
          toast.success(res.data.message);
          getFaq();
          handleClose5();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  
    useEffect(()=>{
      getFaq();
    },[])
  return (
    <div>
      <ToastContainer/>
      <div className="customerhead p-2">
                 <div className="d-flex justify-content-between align-items-center">
            <h2 className="header-c ">FAQ</h2>
            <div className="d-flex gap-3">
              <button className="admin-add-btn" onClick={handleShow3}>
               Add FAQ
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
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
{FAQ?.map((item,i)=>{
  return(
    <tr  style={{border:"1px solid black"}}>
    <td>{i+1}</td>
  
    <td style={{paddingTop:"10px"}}>
   {item?.question}
    </td>

    <td style={{ paddingTop: "10px" }}>{parse(`<div>${item?.answer}</div>`)}</td>

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
            onClick={() =>{ 
              setFAQID(item?._id)
              handleShow4()}}

          />{" "}
        </div>
        <div>
          <AiFillDelete
            className=""
            style={{ cursor: "pointer", fontSize: "20px",  color:"red" }}
            onClick={() => {
              handleShow5();
              setFAQID(item?._id)
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
                <Modal.Title>Add FAQ</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
                
             
              <div className="row">
                  <div className="do-sear mt-2">
                    <label>Question</label>
                    <input
                      type="text"
                      className="vi_0"
                      placeholder="Enter Banner Title"
                     onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Answer</label>
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
                    onClick={AddFaq}
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
                <Modal.Title style={{ color: "black" }}>Edit FAQ</Modal.Title>
              </Modal.Header>
              <Modal.Body>
             
             

             <div className="row">
                 <div className="do-sear mt-2">
                   <label>Edit Question</label>
                   <input
                     type="text"
                     className="vi_0"
                     placeholder="Enter Banner Title"
                    onChange={(e) => setQuestion(e.target.value)}
                   />
                 </div>
               </div>

               <div className="row">
                 <div className="do-sear mt-2">
                   <label>Edit Answer</label>
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
                 onClick={EditFaq}
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
                  onClick={DeleteFaq}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
      </div>
    </div>
  )
}

export default AdminFaq

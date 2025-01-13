import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AdminContactUs = () => {
  // Ck Editor Code
  const [Desc, setDesc] = useState();

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setDesc(data);
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

  const [ContactIcon, setContactIcon] = useState("");
  const [ContactDesc, setContactDesc] = useState("");
  // const [ContactHeading, setContactHeading] = useState("");

  const ContactDetails = async () => {
    try {
      const config = {
        url: "/createContactUs",
        method: "post",
        baseURL: "http://localhost:8989/api/ContactUs",
        headers: { "content-type": "multipart/form-data" },
        data: {
          icon: ContactIcon,
          desc: ContactDesc,
          heading: Desc,
        },
      };

      let res = await axios(config);
      if (res.status === 200) {
        toast.success(res.data.status);
        handleClose3();
        getConatactDetails();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const [Contact, setContact] = useState([]);
  const getConatactDetails = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/ContactUs/getContactUs"
      );
      if (res.status === 201) {
        setContact(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
console.log("Contact",Contact);

  const [ContactId, setContactId] = useState({});

  const EditConatactDetails = async () => {
    try {
      const config = {
        url: "/updateContactUs/" + ContactId,
        method: "put",
        baseURL: "http://localhost:8989/api/ContactUs",
        headers: { "content-type": "multipart/form-data" },
        data: {
          icon: ContactIcon,
          desc: ContactDesc,
          heading: Desc,
        },
      };
      console.log("config", config);

      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.sucess);
        handleClose4();
        getConatactDetails();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const DeleteContactDetails = async () => {
    try {
      let res = await axios.delete(
        `http://localhost:8989/api/ContactUs/deleteContactUs/${ContactId}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getConatactDetails();
        handleClose5();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getConatactDetails();
  }, []);
  return (
    <div>
      <ToastContainer/>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Contact Us Details</h2>
          <div className="d-flex gap-3">
            <button className="admin-add-btn" onClick={handleShow3}>
              Add Contact Details
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
                <th>Icon</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Contact?.map((item,i)=>{
                return(
                  <tr style={{border:"1px solid black"}}>
                  <td>{i+1}</td>
                  <td>
                    <img
                            src={`http://localhost:8989/Contact/${item?.icon}`}
                            alt="pic"
                            style={{ width: "75px", height: "75px" }}
                          />
                  </td>
                  <td style={{ paddingTop: "10px" }}>{item?.desc}</td>
                  <td style={{ paddingTop: "10px" }}>{parse(`<div>${item?.heading}</div>`)}</td>
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
                            setContactId(item?._id)
                            handleShow4()}
                        }
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
                            setContactId(item?._id)
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                )
              })
            }
            
            </tbody>
          </Table>
        </div>

        {/* Add Package modal for Slider */}
        <Modal show={show3} onHide={handleClose3} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton>
            <Modal.Title>Add Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Icon</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setContactIcon(e.target.files[0])}
                />
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Title</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Banner Title"
                  onChange={(e) => setContactDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Description</label>

                <CKEditor editor={ClassicEditor} onChange={handleChange} />
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
                 onClick={ContactDetails}
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
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Edit Contact Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Icon</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                   onChange={(e) => setContactIcon(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Title</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Banner Title"
                   onChange={(e) => setContactDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Descrption</label>
                <CKEditor editor={ClassicEditor} onChange={handleChange} />
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
            <Button
              variant=""
              className="modal-add-btn"
              onClick={EditConatactDetails}
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
               onClick={DeleteContactDetails}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>{" "}
    </div>
  );
};

export default AdminContactUs;

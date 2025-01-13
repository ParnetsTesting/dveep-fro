import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const AdminFeaturesAndAminities = () => {
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

 const [Text, setText] = useState("");

  const FeaturesAndAminities = async () => {
    try {
      const config = {
        url: "/createFeatureAndAminities",
        method: "post",
        baseURL: "https://dveep-backend.onrender.com/api/FeatureAndAminities",
        headers: { "content-type": "application/json" },
        data: {
          text:Text
        },
      };
      console.log("config", config);

      let res = await axios(config);
      if (res.status === 200) {
        toast.success(res.data.status);
        handleClose3();
        getFeaturesAndAminities();
        setText("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

const [Features, setFeatures] = useState([]);
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

  console.log("afjnas", Features);
const [FeaturesId, setFeaturesId] = useState({});

  const EditFeatureAndAminities = async () => {
    try {
      console.log("FeaturesId", FeaturesId);
      const config = {
        url: "/updateFeatureAndAminities/" + FeaturesId,
        method: "put",
        baseURL: "https://dveep-backend.onrender.com/api/FeatureAndAminities",
        headers: { "content-type": "application/json" },
        data: {
          text:Text
        },
      };

      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.sucess);
        handleClose4();
        getFeaturesAndAminities();
        setText("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const DeleteFeaturesAndAminities= async () => {
    try {
      let res = await axios.delete(
        `https://dveep-backend.onrender.com/api/FeatureAndAminities/deleteFeatureAndAminities/${FeaturesId}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getFeaturesAndAminities();
        handleClose5();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getFeaturesAndAminities();
  }, []);

  return (
    <div>
       <ToastContainer/>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Features And Aminities</h2>
          <div className="d-flex gap-3">
            <button className="admin-add-btn" onClick={handleShow3}>
              Add Features And Aminities
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
                <th>Feature</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Features?.map((item, i) => {
                return (
                  <tr style={{border:"1px solid black"}}>
                    <td>{++i}</td>
                    <td style={{ paddingTop: "10px" }}>{item?.text}</td>
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
                              setFeaturesId(item?._id);
                              handleShow4();
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
                              setFeaturesId(item?._id);
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
        <Modal show={show3} onHide={handleClose3} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton>
            <Modal.Title>Add Home Banner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
            <div className="row">
              <div className="do-sear mt-2">
                <label>Features</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Banner Title"
                  onChange={(e) => setText(e.target.value)}
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
                onClick={FeaturesAndAminities}
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
              Edit Home Slider
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Feature</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Banner Title"
                  onChange={(e) => setText(e.target.value)}
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
            <Button
              variant=""
              className="modal-add-btn"
              onClick={EditFeatureAndAminities}
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
              onClick={DeleteFeaturesAndAminities}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default AdminFeaturesAndAminities

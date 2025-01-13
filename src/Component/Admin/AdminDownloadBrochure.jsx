import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { FaFilePdf } from "react-icons/fa";

const AdminDownloadBrochure = () => {
  const [UploadBrochure, setUploadBrochure] = useState(false);
  const [BrochureDownloadList, setBrochureDownloadList] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setshow1] = useState(false);
  const handleClose1 = () => setshow1(false);
  const handleShow1 = () => setshow1(true);

  const [Name1, setName1] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Brochure1, setBrochure1] = useState("");

  const AddDownloadBrochure = async () => {
    try {
      const config = {
        url: "/createDownloadBrochure",
        method: "post",
        baseURL: "http://localhost:8989/api/DownloadBrochure",
        headers: { "content-type": "multipart/form-data" },
        data: {
          name1: Name1,
          email: Email,
          phoneNumber: PhoneNumber,
          brochure: Brochure1,
        },
      };
      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.sucess);
        getDownloadBrochure();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const [DownloadBrochure, setDownloadBrochure] = useState([]);

  const getDownloadBrochure = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/DownloadBrochure/getDownloadBrochure"
      );
      if (res.status === 201) {
        setDownloadBrochure(res.data.downloadlist);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
console.log("DownloadBrochure",DownloadBrochure);

  const [DownloadBrochureId, setDownloadBrochureId] = useState("");

  const EditDownloadBrochure = async () => {
    try {
      const config = {
        url: "/updateDownloadBrochure/" + DownloadBrochureId,
        method: "put",
        baseURL: "http://localhost:8989/api/DownloadBrochure",
        headers: { "content-type": "multipart/form-data" },
        data: {
          name1: Name1,
          email: Email,
          phoneNumber: PhoneNumber,
          brochure: Brochure1,
        },
      };
      console.log("config", config);

      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.sucess);
        getUploadBrochure();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const DeleteDownloadBrochure = async () => {
    try {
      let res = await axios.delete(
        `http://localhost:8989/api/DownloadBrochure/deleteDownloadBrochure/${DownloadBrochureId}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getDownloadBrochure();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [Brochure, setBrochure] = useState("");

  const AddUploadBrochure = async () => {
    try {
      const formData = new FormData();
      formData.append("brochure", Brochure); // Make sure to append the file to form data

      const config = {
        url: "/createUploadBrochure",
        method: "post",
        baseURL: "http://localhost:8989/api/UploadBrochure",
        headers: { "content-type": "multipart/form-data" },
        data: formData,
      };

      let res = await axios(config);
      // Check if the response contains `data` and handle it properly
      if (res && res.status === 200 && res.data) {
        toast.success(res.data.status);
        handleClose()
        getUploadBrochure(); // Update the list after successful upload
      }
    } catch (error) {      
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const [BrouchurList, setBrouchurList] = useState([]);
  const getUploadBrochure = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8989/api/UploadBrochure/getUploadBrochure"
      );
      if (res.status === 201) {
        setBrouchurList(res.data.data1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  console.log("BrouchurList",BrouchurList);
  

  const [UploadBrochureId, setUploadBrochureId] = useState({});

  const EditUploadBrochure = async () => {
    try {
      const config = {
        url: "/updateUploadBrochure/" + UploadBrochureId,
        method: "put",
        baseURL: "http://localhost:8989/api/UploadBrochure",
        headers: { "content-type": "multipart/form-data" },
        data: {},
      };
      console.log("config", config);

      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.sucess);
        getUploadBrochure();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const DeleteUploadBrochure = async (id) => {
    const deleteconfirm = window.confirm(
      "Are You Sure want to delete this item..?"
    );
    if (!deleteconfirm) {
      return;
    }
    try {
      let res = await axios.delete(
        `http://localhost:8989/api/UploadBrochure/deleteUploadBrochure/${id}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getUploadBrochure();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getUploadBrochure();
    getDownloadBrochure();
  }, []);
  return (
    <div>
      <ToastContainer />
      <div className="d-flex gap-4">
        {/* <Button
          onClick={() => {
            setBrochureDownloadList(true);
            setUploadBrochure(false);
          }}
        >
          BrochureDownloadList
        </Button> */}
        {/* <Button
          onClick={() => {
            setUploadBrochure(true);
            setBrochureDownloadList(false);
          }}
        >
          UploadBrochure
        </Button> */}
      </div>
    
        <div>
          <h3 className="p-2">Brochure Download List :</h3>
          <Table>
            <thead>
              <tr>
                <th>SL. No</th>
                <th>Name</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Brochure PDF</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {DownloadBrochure?.map((item,i)=>{
                return(
                  <tr>
                  <td>{i+1}</td>
                  <td>{item?.name1}</td>
                  <td>{item?.phoneNumber}</td>
                  <td>{item?.useremail}</td>
                  <td>
                      <a
                        href={`http://localhost:8989${item?.brochure}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFilePdf size={24} color="red" />
                      </a>
                    </td>
                  <td><AiFillDelete/></td>
                </tr>
                )
              })}
          
            </tbody>
          </Table>
        </div>
     
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Enter Your Name</label>
            <input
              type="text"
              name=""
              className="vi_0"
              onChange={(e) => setName1(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Enter Your Email</label>
            <input
              type="email"
              name=""
              className="vi_0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Enter Your Phone Number</label>
            <input
              type="tel"
              name=""
              className="vi_0"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Select Brochure</label>
            <input
              type="file"
              accept="application/pdf"
              name=""
              className="vi_0"
              onChange={(e) => setBrochure1(e.target.files[0])}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddUploadBrochure}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {UploadBrochure === true && (
        <div>
          <div className="d-flex justify-content-between p-3">
            <h3>Brochure Upload PDF :</h3>
           {BrouchurList?.length ? (""):(<Button onClick={handleShow}>Add</Button>)} 
          </div>

          <Table>
            <thead>
              <tr>
                <th>SL. No</th>
                <th>Brochure PDF</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {BrouchurList?.map((item, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <a
                        href={`http://localhost:8989${item?.brochure}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFilePdf size={24} color="red" />
                      </a>
                    </td>
                    <td>
                      <div>
                        <AiFillDelete
                          className=""
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                            color: "red",
                          }}
                          onClick={() => {
                            DeleteUploadBrochure(item?._id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )} */}

      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Brochure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Upload PDF</label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(e) => setBrochure(e.target.files[0])}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddUploadBrochure}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default AdminDownloadBrochure;

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

const AdminSlider = () => {
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

  const [BannerImage, setBannerImage] = useState("");
  const [BaneerTitle, setBaneerTitle] = useState("");

  const AdminSlider = async () => {
    try {
      const config = {
        url: "/createHomeBanner",
        method: "post",
        baseURL: "https://dveep-backend.onrender.com/api/homeBanner",
        headers: { "content-type": "multipart/form-data" },
        data: {
          bannerImg: BannerImage,
          title: BaneerTitle,
          description: Desc,
        },
      };
      console.log("config", config);

      let res = await axios(config);
      if (res.status === 200) {
        toast.success(res.data.status);
        handleClose3();
        getHomeslider();
        setBannerImage("");
        setBaneerTitle("");
        setDesc("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  console.log("jijkok", BannerImage, BaneerTitle, Desc);

  const [Banner, setBanner] = useState([]);
  const getHomeslider = async () => {
    try {
      let res = await axios.get(
        "https://dveep-backend.onrender.com/api/homeBanner/getHomeBanner"
      );
      if (res.status === 201) {
        setBanner(res.data.data2);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  console.log("afjnas", Banner);

  const [HomeBannerId, setHomeBannerId] = useState({});
  const EditHomeSlider = async () => {
    try {
      console.log("HomeBannerId", HomeBannerId);
      const config = {
        url: "/updateHomeBanner/" + HomeBannerId,
        method: "put",
        baseURL: "https://dveep-backend.onrender.com/api/homeBanner",
        headers: { "content-type": "multipart/form-data" },
        data: {
          bannerImg: BannerImage,
          title: BaneerTitle,
          description: Desc,
        },
      };

      let res = await axios(config);
      if (res.status === 201) {
        toast.success(res.data.sucess);
        handleClose4();
        getHomeslider();
        setBannerImage("");
        setBaneerTitle("");
        setDesc("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const DeleteHomeSlider = async () => {
    try {
      let res = await axios.delete(
        `https://dveep-backend.onrender.com/api/homeBanner/deleteHomeBanner/${HomeBannerId}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getHomeslider();
        handleClose5();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getHomeslider();
  }, []);

  return (
    <div>
    <ToastContainer/>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Home Slider</h2>
          <div className="d-flex gap-3">
            <button className="admin-add-btn" onClick={handleShow3}>
              Add Home Banner
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
                <th>Banner Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Banner?.map((item, i) => {
                return (
                  <tr style={{border:"1px solid black"}}>
                    <td>{++i}</td>
                    <td>
                      <Image
                        src={`https://dveep-backend.onrender.com/homeBanner/${item?.bannerImg}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      />
                    </td>
                    <td style={{ paddingTop: "10px" }}>{item?.title}</td>
                    <td style={{ paddingTop: "10px" }}>
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
                            style={{
                              cursor: "pointer",
                              fontSize: "20px",
                              color: "rgb(101, 177, 69)",
                            }}
                            onClick={() => {
                              setHomeBannerId(item?._id);
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
                              setHomeBannerId(item?._id);
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
                <label>Add Banner Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setBannerImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Banner Title</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Banner Title"
                  onChange={(e) => setBaneerTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Banner Description</label>

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
                onClick={AdminSlider}
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
                <label>Edit Banner Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setBannerImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Banner Title</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Banner Title"
                  onChange={(e) => setBaneerTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Banner Descrption</label>
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
              onClick={EditHomeSlider}
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
              onClick={DeleteHomeSlider}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminSlider;

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
const AdminScheduleVisit = () => {
  // Ck Editor Code
  const [Desc, setDesc] = useState()

  const handleChange = (e, editor) => {
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


const [ScheduleVisit, setScheduleVisit] = useState([]);

const getScheduleVisit= async () => {
try {
 let res = await axios.get(
   "http://localhost:8989/api/ScheduleVisit/getScheduleVisit"
 );
 if (res.status === 201) {
  setScheduleVisit(res.data.data1);
 }
} catch (error) {
 toast.error(error.response.data.error);
}
};
console.log("ScheduleVisit",ScheduleVisit);


const DeleteScheduleVisit  = async (id) => {
  const deleteconfirm = window.confirm(
    "Are You Sure want to delete this item..?"
  );
  if (!deleteconfirm) {
    return;
  }
  try {
    let res = await axios.delete(
      `http://localhost:8989/api/ScheduleVisit/deleteScheduleVisit/${id}`
    );
    if (res.status === 201) {
      toast.success(res.data.sucess);
      getScheduleVisit();
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
useEffect(() => {
  getScheduleVisit();
}, []);
  return (
    <div>
       <ToastContainer/>
       <div className="customerhead p-2">
                 <div className="d-flex justify-content-between align-items-center">
            <h2 className="header-c ">Schedule Visit</h2>
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
                  <th> Name</th>
                  <th>Email Id</th>
                  <th>Phone Number</th>
                  <th>Project</th>
                  <th>Text</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {ScheduleVisit?.map((item,i)=>{
                  return(
                    <tr style={{border:"1px solid black"}}>
                    <td style={{paddingTop:"10px"}}>{i+1}</td>
                  
                    <td style={{paddingTop:"10px"}}> 
                    {item?.yourName}
                    </td>
                    <td style={{paddingTop:"10px"}}>
                 {item?.email}
                    </td>
                    <td style={{paddingTop:"10px"}}>
                  { item?.phoneNumber}
                    </td>
                    <td style={{paddingTop:"10px"}}>
                 {item?.selectProject}
                    </td>
                    <td style={{paddingTop:"10px"}}>
                  {item?.text}
                    </td>
                    <td>
                    <div>
                              <AiFillDelete
                                className=""
                                style={{ cursor: "pointer", fontSize: "20px",  color:"red" }}
                                onClick={() => {
                                  DeleteScheduleVisit(item?._id);
                                }}
                              />
                            </div>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </Table>
            </div>
      </div>
    </div>
  )
}

export default AdminScheduleVisit

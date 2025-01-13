import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const WhatOurClientSays = () => {
    
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

  return (
    <div>
      
    </div>
  )
}

export default WhatOurClientSays

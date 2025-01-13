import React, { useState } from "react";
import '../../Style/signup.css'
// import { CountrySelect, StateSelect } from "react-country-state-city";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  //   const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");
  // const [name2, setName2] = useState('');

  const [Name2, setName2] = useState("");
  const [Email, setEmail] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();


  const validatePhone = (phone) => {
    const phoneregex = /^[6789]\d{9}$/;
    if (phoneregex.test(phone)) {
      return true;
    } else {
      toast.warning("enter valid mobile number");
    }
  };

  const validateEmail = (email) => {
    const emailregex = /\S+@\S+\.\S+/;
    if (emailregex.test(email)) {
      return true;
    } else {
      toast.warning("enter valid email");
    }
  };

  const validatePassword = (password) => {
    const passwordregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;
    if (passwordregex.test(password)) {
      return true;
    } else {
      toast.warning("enter valid password");
    }
  };

  const matchPassword = (password1, password2) => {
    if (password1 === password2) {
      return true;
    } else {
      toast.warning("passwords do not match");
    }
  };

  

  const createUser = async () => {
    let formdata = new FormData();

    console.log(Name2,Email,MobileNumber)
    if (!Name2) {
      toast.warning("Please Enter Your Name");
      return;
    }
    if (!Email) {
      toast.warning("Please enter email");
      return;
    }

    if (!MobileNumber) {
      toast.warning("Please enter mobile number");
      return;
    }
    if (!PassWord || !ConfirmPassword) {
      toast.warning("Please enter password");
      return;
    }

    try {
      if (
        validateEmail(Email) &&
        validatePassword(PassWord) &&
        validatePhone(MobileNumber) &&
        matchPassword(PassWord, ConfirmPassword )
      ) {
        formdata.append("name2", Name2);
        formdata.append("email", Email);
        formdata.append("mobileno", MobileNumber);
        formdata.append("password", PassWord);
      
        console.log(formdata)
        const config = {
          url: "/register",
          method: "post",
          baseURL: "https://dveep-backend.onrender.com/api/user",
          headers: { "content-type": "application/json" },
          data: formdata,
        };
        const res = await axios(config);
        console.log(res)
        if (res.status === 200) {
          toast.success('Registration successful..');
          setTimeout(()=>{
            navigate('/login')
          },3000)
        }
     
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container-fluid mainContainer">
        <div class="card mt-3 rounded-0" style={{ width: "40rem" }}>
          <span className="mt-3">
            <h3>Register</h3>
          </span>
          <form onSubmit={createUser}>
            <div class="card-body d-flex flex-column align-items-center">
              <input
                type="text"
                name=""
             
                className="myInput"
                placeholder="Enter your Name"
                value={Name2}
                onChange={(e) => setName2(e.target.value)}
              />
              <input
                type="email"
                name=""
    
                className="myInput"
                placeholder="Email Address"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                maxLength={10}
                name=""
             
                className="myInput"
                placeholder="Mobile Number"
                value={MobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <input
                type="password"
                name=""
           
                className="myInput"
                placeholder="Password"
                value={PassWord}
                onChange={(e) => setPassWord(e.target.value)}
              />

              <input
                type="password"
                name=""
   
                className="myInput"
                placeholder="Confirm Password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* <div className="row" style={{ width: "85%", marginTop: "10px" }}>
                <CountrySelect
                  onChange={(e) => {
                    setCountryid(e.id);
                  }}
                  placeHolder="Select Country"
                  style={{ color: "gray", fontWeight: "600" }}
                />
              </div>
              <div className="row" style={{ width: "85%", marginTop: "10px" }}>
                <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                    setstateid(e.id);
                  }}
                  placeHolder="Select State"
                  style={{ color: "gray", fontWeight: "600" }}
                />
              </div> */}
              <br />

              <div>
                <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                />
                I agree to the <a href="">Terms of Service</a> and{" "}
                <a href="">Privacy Policy</a>.
              </div>
              <br />
              <small>
                Please read and accept the Terms of Service and Privacy Policy
              </small>
              <button
                type="button"
                className="registerBtn"
                onClick={createUser}
              >
                CREATE ACCOUNT
              </button>

              <br />
              <b>
                you already have an account ? <Link to="/login">Login</Link>
              </b>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp

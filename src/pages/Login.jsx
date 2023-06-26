import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { useDispatch } from "react-redux";
import { setCurrentNumber } from "../app/features/templateSlice";

function Login() {
  const [mobileNumber, setMobileNumber] = useState();
  const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate mobile number
    const mobileNumberRegex =
      /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?(?:(?:\s*,\s*)?[0-9]+)*$/;
    if (!mobileNumberRegex.test(mobileNumber)) {
      setErrorMessage("Please enter a valid mobile number.");
      return;
    }
    // If mobile number is valid, send OTP
    // TODO: Implement OTP functionality 
    
    setErrorMessage("");
        
      dispatch(setCurrentNumber(mobileNumber))
        navigate('/otp');
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };


  return (
    <div style={{ position: "relative" }} className="d-flex flex-column justify-content-center w-100 h-100">
      <p>{process.env.OTP_CODE}</p>
      <div style={{ position: "absolute", top: "20rem", left: "45rem" }}>
        <form onSubmit={handleSubmit}>
         <h2> Mobile Number </h2>{" "}
          <input
            maxlength="10"
            type="tel"
            pattern="[0-9]{10}"
            style={{borderRadius:'1rem', padding: "1rem",color:'white', outline: "none", width: "20rem" ,border:'1px solid black',backgroundColor:'transparent'}}
            value={mobileNumber}
            onChange={handleMobileNumberChange}
          />
          <br />
          {errorMessage && <p style={{ color: "black" }}>{errorMessage}</p>}
          <button

            type="submit"
            style={{ backgroundColor:'black',color:'white',marginLeft: "1rem", marginTop: "1rem",padding:'1rem',borderRadius:'1rem',border:'none',cursor:'pointer' }}
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

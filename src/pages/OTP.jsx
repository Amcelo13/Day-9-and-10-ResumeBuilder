import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../app/features/templateSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setUsers } from "../app/features/templateSlice";
import { v4 as uuid } from "uuid";
import {
  BorderBottomOutlined,
  BorderTopOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons';
import {  notification } from 'antd';

function OTP() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
     
      description:
        'Wrong OTP',
      placement,
    });
  };
  const users = useSelector((state) => state.users);
  const currentNumber = useSelector((state) => state.currentNumber);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  //Meaning if the redux has no change in number then go to login page
  useEffect(() => {
    if (currentNumber === -1) {
      navigate("/");
    }
  }, []);

  let currentUser = {};

  //Checking if current number is there in store
  let sameUser = false;

  //old user found then
  for (const user of users) {
    if (user.currentNumber === currentNumber) {
      sameUser = true;
      currentUser = user;
      break;
    }
  }

  const validate = () => {
    if (otp === process.env.REACT_APP_OTPCODE) {
      //if not same (newUser it is )user dispatch this current user in user array

      //new id
      if (!sameUser) {
        const id = uuid().slice(0, 8);
        const thisUser = { id, currentNumber };
        dispatch(setUsers(thisUser));
        dispatch(setLogin(thisUser));
      }

      //Old user
      else {
        dispatch(setLogin(currentUser));
      }
      navigate("/home");
    } else {
      // alert("Wrong OTP");
      openNotification('top')
    }
  };

  return (
    <div style={{}}>
    {contextHolder}

      <h1 style={{ paddingTop: "3rem" }}>Enter the OTP </h1>
      <div
        style={{ display: "flex", justifyContent: "center", height: "50vh" }}
      >
        <OtpInput
          inputStyle={{
            border: "none",
            outline: "none",
            padding: "20px",
            borderRadius: "5px",
          }}
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span> &nbsp; &nbsp; </span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <button   type="button" style={{ padding: "1rem", cursor: "pointer",background:'black',
    color:'white', borderRadius:'5px' ,}} onClick={validate}>
        Submit
      </button>
    </div>
  );
}

export default OTP;

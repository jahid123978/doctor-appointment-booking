import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useState } from "react";

function Login() {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [isSentMessage, setIsSentMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("values: ", values);
    try {
      // dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      // dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        setIsSentMessage(values.phoneNumber);
        setIsAuthentication(true);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  const handleOTPCode = async(values)=>{
    const actualValue = {
       otp: values.otp,
       phoneNumber: isSentMessage 
    }
    try {
      // dispatch(showLoading());
      const response = await axios.post("/api/user/verify-otp", actualValue);
      // dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
        dispatch(showLoading());
        // dispatch(hideLoading());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Wrong OTP code");
    }
  }

  return (
    <>
     { !isAuthentication?
       <div className="authentication">
       <div className="authentication-form card p-3">
         <h1 className="card-title">Welcome Back</h1>
          <Form layout="vertical" onFinish={onFinish}>
           <Form.Item label="Email" name="email">
             <Input placeholder="Email" />
           </Form.Item>
           {/* <Form.Item label="Phone Number" name="phoneNumber">
             <Input placeholder="e.g: 88017453212" />
           </Form.Item> */}
           <Form.Item label="Password" name="password">
             <Input placeholder="Password" type="password" />
           </Form.Item>
 
           
           <Button className="primary-button my-2 full-width-button" htmlType="submit">
             LOGIN
           </Button>
 
           <Link to="/register" className="anchor mt-2">
             CLICK HERE TO REGISTER
           </Link>
          
         </Form>
       </div>
     </div>
     : 
     <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
         <Form layout="vertical" onFinish={handleOTPCode}>
          <Form.Item label="Verification Code" name="otp">
            <Input placeholder="e.g: 456578" />
          </Form.Item>  
          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            Verify
          </Button>
        </Form>
      </div>
    </div>
     }
    </>
   
  );
}

export default Login;

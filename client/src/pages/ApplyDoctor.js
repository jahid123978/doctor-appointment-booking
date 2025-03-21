import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

function ApplyDoctor() {
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log("user: ", user)
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // values.img = file;
    console.log("values: ", values)
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://doctor-appointment-booking-api.vercel.app/api/user/apply-doctor-account",
        {
          ...values,
          User: user,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title text-center p-3">Apply Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDoctor;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Button, Table } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DoctorDetails from "./DoctorDetails";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [isDoctor, setIsDoctor] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("https://doctor-appointment-booking-api.vercel.app/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setDoctors((resposne.data.data).reverse());
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "https://doctor-appointment-booking-api.vercel.app/api/admin/change-doctor-account-status",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error('Error changing doctor account status');
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getDoctorsData();
  }, []);
  const handleDetails = async(record)=>{
    
    navigate(`/profile/${record.userId}`)
    console.log("record: ", record)
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      render: (text, record) => (
        <div>
       
            <h1
              className="anchor"
              onClick={() => {
                setIsDoctor(true);
                setSelectedDoctor(record);
              }}
            >
              Details
            </h1>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      {!isDoctor && <h1 className="page-header">Doctors List</h1>}
      <hr />
      {!isDoctor &&<Table columns={columns} dataSource={doctors} />}
      {isDoctor && <DoctorDetails initivalValues={selectedDoctor} setIsDoctor={setIsDoctor}></DoctorDetails>}
      {isDoctor && <Button style={{marginBottom: '10px', marginTop: '10px', marginLeft:'5rem'}} className="primary-button" onClick={()=>setIsDoctor(false)}>Back to DoctocList</Button>}
    </Layout>
  );
}

export default DoctorsList;

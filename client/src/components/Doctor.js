import React from "react";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  // console.log("doctor: ", doctor)
  return (
    <div
    style={{width: '93%', height:'98%', paddingLeft: '25px', paddingTop: '25px', paddingBottom: '10px'}}
      className="card cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 
      className="card-title">
       Dr. {doctor.firstName} {doctor.lastName} <span style={{fontSize: '15px'}}><b>{doctor?.degree}</b></span>
      </h1>
      <hr />
      <p>
        <b>Specialist : </b>
        {doctor.specialization}
      </p>
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerCunsultation}
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;

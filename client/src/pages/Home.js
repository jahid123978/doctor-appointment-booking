import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Button, Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Carousel } from 'antd';
import './Home.css'
import Footer from "./Footer";
function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get("https://doctor-appointment-booking-api.vercel.app/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-100">
    <Layout>
    <Carousel autoplay>
    <div>
      <img className="slider-home"
      src="./images/doctorgroup2.jpg"
      />
    </div>
    <div>
      <img className="slider-home"
      src="./images/doctorgroup3.jpg"
      />
    </div>
    <div>
      <img className="slider-home"
      src="./images/doctor4.jpg"
      />
    </div>
  </Carousel>
  <div>
      <div style={{backgroundColor: '#21407e', padding: '40px', marginTop:'20px', marginBottom: '0px'}}>
                <div>
                 <h1 style={{color:'white'}}>Schedule an Appointment</h1>
                 <p className="para-text">Regional One Health is home to a world-class team of primary care providers
                  <br />
                   and specialists. Our comprehensive health system offers convenient
                      locations
                  <br /> 
                  through Memphis to provide preventative and follow-up care.</p>
                </div>
                <div style={{marginTop: '40px'}} >
                  {/* <Button variant='contained'>Book by phone</Button> */}
                    {/* <button className="text-white block bg-green-700 hover:bg-teal-600 mx-auto p-4 rounded-full py-3 px-6>Book By Phone">Book By Phone</button> */}
                </div>
            </div>
            <div>
                <img src="https://regionalonehealth-valeoonlinemarke.netdna-ssl.com/wp-content/uploads/2020/01/Blog-header_home_page-1.jpg?x16063" alt="" />
       
            </div>
      </div>
  <div>
    <h1 className="mt-3 text-center">Our Doctors</h1>
  </div>
      <Row gutter={1} style={{textAlign:'left', paddingLeft: '10px'}} className="w-100 ml-4">
        {doctors.map((doctor) => (
          <Col span={6} xs={12} sm={8} lg={8} className="mt-3">
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
      {/* #21407e */}
      
            {/* <div className="margin-top">
            <Footer></Footer>
            </div> */}
            </Layout>
    </div>
  
  );
}

export default Home;

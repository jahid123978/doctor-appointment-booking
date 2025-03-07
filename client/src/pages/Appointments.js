import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Radio } from "antd";
import moment from "moment";
const CreateForm = (props) => {
  const { visible, setVisible, onCreate, record } = props;
  const [form] = Form.useForm();
  console.log("record: ", record);
  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log("check value: ", values);
        onCreate(values);
        setVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <Modal
      visible={visible}
      title={`Docotor: ${record?.doctorInfo?.firstName}  Number: ${record?.doctorInfo?.phoneNumber}` }
      okText="Ok"
      onCancel={() => {
        setVisible(false);
      }}
      onOk={handleCreate}
    >
      <Form form={form} layout="vertical">
        {/* <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input the title of collection!" }
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item name="number" label="Bkash Number">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="transaction" label="Transaction">
          <Input type="string" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
function Appointments({onChange}) {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/user/get-appointments-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const changePaymentStatus = async (record, status) =>{

  }
  const [visible, setVisible] = useState(false);
  const [recordInfo, setRecordInfo] = useState({});

  const onCreate = async (values) => {
    console.log("recodfkj: ", recordInfo._id);
    // onChange(values);
    setVisible(false);
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/doctor/change-appointment-payment",
        { appointmentId : recordInfo._id, number: values?.number, transactionId: values?.transaction, isPayment: true},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };
  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/doctor/change-appointment-status",
        { appointmentId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
        title: "Id",
        dataIndex: "_id",
    },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span>
          {record.doctorInfo.phoneNumber} 
        </span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
        title: "Status",
        dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "Cancel")}
              >
                Cancel
              </h1>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Payment",
      dataIndex: "payment",
      render: (text, record) => (
        <div className="d-flex">
            <div>
              {!record.isPayment?  
            <Button
        type="primary"
        onClick={() => {
          setVisible(true);
          setRecordInfo(record);
          console.log("record1: ", record)
        }}
      >
        payment
      </Button>: <h4>Done</h4>}
      <CreateForm
        visible={visible}
        setVisible={setVisible}
        onCreate={onCreate}
        record = {recordInfo}
      />
      
              {/* <h1
                className="anchor"
                onClick={() => changePaymentStatus(record, "Done")}
              >
                Payment
              </h1> */}
            </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return  <Layout>
  <h1 className="page-title text-center p-3">Appointments</h1>
  <hr />
  <Table columns={columns} dataSource={appointments} />
</Layout>
}

export default Appointments;

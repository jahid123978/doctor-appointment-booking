import React, { useEffect, useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import { BellOutlined } from '@ant-design/icons';
import Footer from "../pages/Footer";
import { showLoading } from "../redux/alertsSlice";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState("")
  const { user } = useSelector((state) =>state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    }
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  return (
    <div className="main">
      {/* className="main" */}
      <div className="d-flex">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">DPFS  <span className="role">{role}</span> </h1>
           
          </div>

          <div className="d-flex all-menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  {/* <i className={menu.icon}></i> */}
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div  className={`d-flex menu-item `}>
            <Badge
            className="items"
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <BellOutlined className="header-action-icon" />
              </Badge>
             {!collapsed && <Link  className="items" to="/profile">
                {user?.name}
              </Link>}
              <div
              className="items"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              {!collapsed && <Link onClick={()=>{
               localStorage.clear();
               navigate("/login");
               window.location.reload();
              }}>Logout</Link>}
              {collapsed && <Link to="/login">Login</Link>}
            </div>
            </div>        
          </div>
        </div>
      </div>
      <div className="body" style={{marginBottom:'1px'}}>{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;

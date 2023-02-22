import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { auth } from "../../../pages/ReduxToolkit/Auth";
function AdminNavbar() {
  const [click, setClick] = useState(false);
  const Close = () => setClick(false);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <img
              width="80px"
              height="50px"
              src={`${API_URL}logos/logos.png`}
              alt=""
            />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink to="/" className="nav-links">
                <i className="fa fa-home" aria-hidden="true"></i>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/user-report" className="nav-links">
                <i class="fa fa-user" aria-hidden="true"></i>
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/jobs-report" className="nav-links">
                <i className="fa-solid fa-briefcase"></i>
                Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin-payment" className="nav-links">
              <i className="fa-solid fa-sack-dollar"></i>
                Payment Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-links"
                onClick={() =>
                  dispatch(auth({ type: "UNAUTHERISED_ACCESS", details: "" }))
                }
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon">
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
}

export default AdminNavbar;
const Wrapper = styled.div`
  .active {
    color: #000000 !important;
    font-weight: bold;
  }
  .fa,
  .fa-solid {
    margin-right: 10px !important;
  }
  .pages {
    color: #316685;
    text-align: center;
    font-size: calc(1.5rem + 2vw);
    margin-top: 10%;
  }

  .navbar {
    background-color: #ffffff;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 20;
    padding:0px 0px 0px 0px;
  }

  .nav-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    max-width: 1500px;
  }

  .main-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .nav-logo {
    color: #f5b921;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    flex-grow: 1;
  }

  .nav-menu {
    display: flex;
    list-style: none;
    text-align: center;
    margin-right: 2rem;
  }

  .nav-links {
    color: #5c5c5c;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;
    border-bottom: 3px solid transparent;
    font-size: 15px;
  }
  .fa-code {
    margin-left: 1rem;
  }

  .nav-item {
    line-height: 30px;
    margin-right: 1rem;
    background-color: #f8f4ec;
    border-radius: 8px !important;
  }

  .nav-item:after {
    content: "";
    display: block;
    height: 3px;
    width: 0;
    background: transparent;
    transition: width 0.7s ease, background-color 0.5s ease;
  }

  .nav-item:hover:after {
    width: 100%;
    background: red;
  }

  .nav-icon {
    display: none;
  }

  @media screen and (max-width: 960px) {
    .nav-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-top: 1pxsolid #fff;
      position: absolute;
      top: 80px;
      left: -110%;
      opacity: 1;
      transition: all 0.5s ease;
    }

    .nav-menu.active {
      background: #ffffff;
      left: 0px;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    }

    .nav-links {
      padding: 1.5rem;
      width: 100%;
      display: table;
    }

    .nav-icon {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      cursor: pointer;
      color: #303f9f;
    }
  }
`;

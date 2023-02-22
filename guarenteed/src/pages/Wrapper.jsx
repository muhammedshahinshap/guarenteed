import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Routes as DynamicRoutes } from "./Routes";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import UserNavbar from "../components/Input/Navbars/UserNavbar";
import CompanyNavbar from "../components/Input/Navbars/CompanyNavbar";
import Navbar from "../components/Input/Navbars/Navbar";
import CommonNavbar from "../components/Input/Navbars/CommonNavbar";
import AdminNavbar from "../components/Input/Navbars/AdminNavbar";
import axiosConfig from "../config/axiosConfig";
import { setHeader } from "../utils/setHeader";
import Footer from "../components/Input/Footer/Footer";

function Wrapper() {
  const [role, setrole] = useState("");
  const updater = useSelector((state) => {
    return state.Auth.status;
  });

  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    }
  }, [updater]);
  const getUserData = async () => {
    const data = await axiosConfig.get("/chat/user-data", setHeader());
    setrole(data.data.data[0].role);
  };
  const companyRoutes = DynamicRoutes[0].protected[0].company;
  const userRoutes = DynamicRoutes[0].protected[1].user;
  const publicRoutes = DynamicRoutes[1].public[0].common;
  const noRoutes = DynamicRoutes[0].protected[2].norole;
  const adminRoutes = DynamicRoutes[0].protected[3].admin;

  const isAuthenticated = Cookies.get("authToken");
  const isRole = isAuthenticated ? role : "";

  const allRoutes =
    isRole === "user"
      ? userRoutes
      : isRole === "company"
      ? companyRoutes
      : isRole === "admin"
      ? adminRoutes
      : isRole === undefined
      ? noRoutes
      : publicRoutes;

  return (
    <StyledWrapper>
      <ChakraProvider>
        {isRole === "user" ? <UserNavbar /> : ""}
        {isRole === "company" ? <CompanyNavbar /> : ""}
        {isRole === "admin" ? <AdminNavbar /> : ""}
        {isRole === undefined ? <Navbar /> : ""}
        {isRole === "" ? <CommonNavbar /> : ""}
        <Routes>
          {allRoutes.map((item, i) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<item.component />}
              />
            );
          })}
        </Routes>
        <Footer />
      </ChakraProvider>
    </StyledWrapper>
  );
}

export default Wrapper;
const StyledWrapper = styled.div`
  overflow: hidden !important;
`;

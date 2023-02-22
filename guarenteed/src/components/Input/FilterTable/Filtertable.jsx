import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setHeader } from "../../../utils/setHeader";
import axiosConfig, { API_URL } from "../../../config/axiosConfig";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
function Filtertable() {
  const toast = useToast();
  const [data, setdata] = useState([]);
  const [tech, settech] = useState("");
  const [year, setyear] = useState("");
  useEffect(() => {
    let clear;
    if (tech || year) {
      clear = setTimeout(() => {
        FilterUsers();
      }, 500);
    } else {
      setdata([]);
    }
    return () => {
      clearTimeout(clear);
    };
  }, [tech, year]);
  const FilterUsers = async () => {
    const formData = {
      tech,
      year,
    };
    try {
      const data = await axiosConfig.post(
        "/company/filter-users",
        formData,
        setHeader()
      );
      setdata(data.data.data[0]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <Card className=" container  mt-4 mb-4 p-4">
            <div className="row ">
              <div className="col-md-3">
                <Input
                  placeholder="Search Domain"
                  value={tech}
                  onChange={(e) => settech(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <Input
                  placeholder="Search Experience"
                  value={year}
                  onChange={(e) => setyear(e.target.value)}
                />
              </div>
            </div>
            <div className="table-responsive mt-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sl no</th>
                    <th>User name</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Place</th>
                    <th>Domain</th>
                    <th>Experience</th>
                    <th>Contact</th>
                    <th>Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr>
                      <td>{++i}</td>
                      <td>{item.username}</td>
                      <td>{item.u_profile.name}</td>
                      <td>{item.u_profile.address}</td>
                      <td>{item.u_profile.place}</td>
                      <td>{item.u_profile.domain}</td>
                      <td>{item.u_profile.experience}</td>
                      <td>{item.u_profile.contact}</td>

                      <td>
                        <img
                          alt=""
                          width="100px"
                          style={{ marginLeft: "100px" }}
                          src={`${API_URL}/images/${item.u_profile.profilePicture}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}

export default Filtertable;
const Wrapper = styled.div`
  background-color: #f1ece5;
  td,
  th {
    text-align: center;
    vertical-align: middle;
  }
`;
const Card = styled.div`
  border: 1px solid #eeeeee;
  padding: 100px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 4px 0rem rgb(16 66 139 / 29%);
  @media (max-width: 850px) {
    padding: 35px;
  }
`;

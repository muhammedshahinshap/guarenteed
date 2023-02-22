import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setHeader } from "../../../utils/setHeader";
import axiosConfig, { API_URL } from "../../../config/axiosConfig";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CustAlertDialog from "../AlertDialog/CustAlertDialog";
function Jobapplicants() {
  const [data, setdata] = useState([]);
  const [user, setuser] = useState("");
  const [role, setrole] = useState("");
  const toast = useToast();
  const { id } = useParams();

  const ErrOccured = () => {
    toast({
      title: "Something went wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const getUserData = async () => {
    const data = await axiosConfig.get("/chat/user-data", setHeader());
    setrole(data.data.data[0].role);
  };

  const getData = async () => {
    try {
      const data = await axiosConfig.get(
        `/users/get-job-applications/${id}`,
        setHeader()
      );
      setuser(data.data.data[1]);
      !data.data.error
        ? setdata(data.data.data[0])
        : toast({
            title: "Try again",
            status: "error",
            isClosable: true,
          });
    } catch (error) {
      ErrOccured();
      console.log(error);
    }
  };
  const cancelApplication = async (id) => {
    try {
      const data = await axiosConfig.get(
        `/users/cancel-job-applications/${id}`,
        setHeader()
      );
      !data.data.error && getData();
      toast({
        title: `${!data.data.error ? `Successfully completed` : `Try again`} `,
        status: `${data.data.error ? `error` : `success`}`,
        isClosable: true,
      });
    } catch (error) {
      ErrOccured();
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getData();
  }, []);

  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <Card className="container mt-4 p-4 mb-4">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sl no</th>
                    {user !== "user" && <th>Applicant Name</th>}
                    {user === "user" && <th>Company Name</th>}
                    <th>Email</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Zip</th>
                    <th>Contact</th>
                    <th>Date</th>
                    <th>CV</th>
                    {role === "user" ? <th>Action</th> : ""}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr key={item._id}>
                      <td>{++i}</td>
                      {user !== "user" && (
                        <td>{item.user[0].u_profile.name}</td>
                      )}
                      {user === "user" && (
                        <td>{item.companies[0].c_profile.name}</td>
                      )}
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.city}</td>
                      <td>{item.zip}</td>
                      <td>{item.contact}</td>
                      <td>{item.createdAt.substring(0, 10)}</td>
                      <td>
                        <a href={`${API_URL}hirecv/${item.file}`} download>
                          <i className="fa-solid fa-download btn-link"></i>
                        </a>
                      </td>
                      {role === "user" ? (
                        <td>
                          <CustAlertDialog
                            label={"Cancel application"}
                            custFunction={cancelApplication}
                            id={item._id}
                          />
                        </td>
                      ) : (
                        ""
                      )}
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

export default Jobapplicants;
const Wrapper = styled.div`
  background-color: #f1ece5 !important;
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
  .btn-link {
    color: #14589d;
    :hover {
      color: #000;
    }
    text-decoration: none;
  }
`;

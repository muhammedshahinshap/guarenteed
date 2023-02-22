import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Input/Buttons/Button";
import CustAlertDialog from "../../components/Input/AlertDialog/CustAlertDialog";
import Input from "../../components/Input/Input";
import { setHeader } from "../../utils/setHeader";
import axiosConfig, { API_URL } from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { auth } from "../ReduxToolkit/Auth";
import { Link, useNavigate } from "react-router-dom";
import {
  useToast,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Text,
} from "@chakra-ui/react";
function JobHire() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [type, settype] = useState("");
  const [noOfYears, setnoOfYears] = useState("");
  const [tech, settech] = useState("");
  const [salary, setsalary] = useState("");
  const [image, setimage] = useState("");
  const [discription, setdiscription] = useState("");
  const [status, setstatus] = useState(1);
  const [id, setid] = useState("");
  const [datas, setdatas] = useState([]);
  const [rerenderer, setrerenderer] = useState("");
  const [showimage, setshowimage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const clearAll = () => {
    settype("");
    setnoOfYears("");
    settech("");
    setsalary("");
    setimage("");
    setdiscription("");
    setstatus(1);
    setid("");
    getData();
    setrerenderer(Date.now());
    setshowimage("");
  };
  const formValues = new FormData();
  formValues.append("type", type);
  formValues.append("noOfYears", noOfYears);
  formValues.append("tech", tech);
  formValues.append("salary", salary);
  formValues.append("hireImage", image);
  formValues.append("discription", discription);
  formValues.append("status", status);
  formValues.append("id", id);

  const saveData = async (e) => {
    e.preventDefault();
    try {
      let imgvalidation = id ? (!image ? true : true) : image;
      if (type && noOfYears && tech && salary && discription && imgvalidation) {
        let data = await axiosConfig.post(
          "company/job-hire",
          formValues,
          setHeader()
        );
        toast({
          title: `${data.data.message}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        dispatch(auth({ type: data.data.messege, details: "" }));
        clearAll();
      } else {
        toast({
          title: `Fill all Fields`,
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Something went wrong`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const getData = async () => {
    try {
      let data = await axiosConfig.get("company/get-hire", setHeader());
      if (data) {
        setdatas(data.data.data[0]);
        dispatch(auth({ type: data.data.messege, details: "" }));
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Something went wrong`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const editData = (data) => {
    settype(data.type);
    setnoOfYears(data.noOfYears);
    settech(data.tech);
    setsalary(data.salary);
    setshowimage(`${API_URL}images/${data.image}`);
    setdiscription(data.discription);
    setid(data._id);
    setstatus(data.status);
  };
  const deleteData = async (id) => {
    let data = await axiosConfig.get(`company/delete-hire/${id}`, setHeader());
    dispatch(auth({ type: data.data.messege, details: "" }));
    if (data.data.error) alert(data.data.message);
    getData();
  };

  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setimage(event.target.files[0]);
      setshowimage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Wrapper className="container-fluid">
      <div className="container">
        <div className=" row">
          <div className="col-md-4">
            <form onSubmit={saveData}>
              <Cards className="mt-4 mb-4">
                <H1>Hire</H1>
                <label>Type :</label>
                <select
                  onChange={(e) => settype(e.target.value)}
                  className="form-control mt-0 form-select"
                  value={type}
                  required={true}
                  disabled={id}
                >
                  <option style={{ display: "none" }} value="">
                    Select Type
                  </option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DB Administrator">DB Administrator</option>
                </select>
                <label>Years of Experience :</label>
                <Input
                  onChange={(e) => setnoOfYears(e.target.value)}
                  type="text"
                  placeholder="Years of Experience"
                  className="form-control mt-0 mt-0"
                  value={noOfYears}
                  required={true}
                  pattern="\d{1,2}-\d{1,2}"
                  title="Eg: 1-2"
                  disabled={id}
                />
                <label>Tech :</label>
                <Input
                  type="text"
                  placeholder="Tech"
                  value={tech}
                  className="form-control mt-0"
                  onChange={(e) => settech(e.target.value)}
                  required={true}
                  pattern="^[a-zA-Z_ ]*$"
                  title="Eg: MERN or Java"
                  disabled={id}
                />
                <label>Salary :</label>
                <Input
                  type="text"
                  placeholder="Salary"
                  className="form-control mt-0"
                  onChange={(e) => setsalary(e.target.value)}
                  value={salary}
                  required={true}
                  pattern="\d*-\d* LPA"
                  title="Eg: 1-8 LPA"
                  disabled={id}
                />
                <label>Discription :</label>
                <textarea
                  type="text"
                  placeholder="Discription"
                  className="form-control mt-0"
                  onChange={(e) => setdiscription(e.target.value)}
                  value={discription}
                  required={true}
                  pattern=".*"
                  disabled={id}
                ></textarea>

                <label>Image :</label>
                <Input
                  type="file"
                  onChange={(e) => onFileChange(e)}
                  className="form-control mt-0"
                  required={!id ? true : false}
                  key={rerenderer}
                  disabled={id}
                />
                <img alt="" className="mt-4" width="150px" src={showimage} />
                {id && (
                  <>
                    <label>Status :</label>
                    <select
                      onChange={(e) => {
                        setstatus(e.target.value);
                      }}
                      value={status}
                      className="form-control mt-0 form-select"
                    >
                      <option style={{ display: "none" }} value="">
                        Status
                      </option>
                      <option value="true">Active</option>
                      <option value="false">DeActivate</option>
                    </select>
                  </>
                )}
                <Button type="submit" style={{ width: "100%" }}>
                  Submit
                </Button>
              </Cards>
            </form>
          </div>
          <div className=" col-md-8 mt-4">
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {datas.map((item) => (
                <Card key={item._id} bg="#fff">
                  <CardHeader>
                    <Heading size="md"> {item.type} </Heading>
                    <Text size="md"> {item.createdAt.substring(0, 10)}</Text>
                  </CardHeader>
                  <CardBody>
                    <Text>Experience: {item.noOfYears}</Text>
                    <Text>Tech: {item.tech}</Text>
                    <Text>Salary: {item.salary}</Text>
                  </CardBody>
                  <CardFooter>
                    <i
                      onClick={() => editData(item)}
                      className="fa-solid fa-pen-to-square icon-color-blue me-2  mt-1"
                    ></i>
                    <i
                      onClick={() => {
                        navigate(`/job-applications/${item._id}`);
                      }}
                      className="fa-solid fa-eye icon-color-blue  mt-1"
                    ></i>

                    <div className="ms-2">
                      <CustAlertDialog
                        label="Delete Job Post"
                        custFunction={deleteData}
                        id={item._id}
                      />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
            {/* <Card className="mt-4 mb-4 p-4">
              <div className="table-responsive">
                <table
                  onClick={handleTableData}
                  className="table table-striped"
                >
                  <thead>
                    <tr>
                      <th>Sl no</th>
                      <th>Type</th>
                      <th>Experience</th>
                      <th>Tech</th>
                      <th>Salary</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((item, i) => {
                      return (
                        <tr key={item._id}>
                          <td>{++i}</td>
                          <td>{item.type}</td>
                          <td>{item.noOfYears}</td>
                          <td>{item.tech}</td>
                          <td>{item.salary}</td>
                          <td>
                            <img
                              width="150px"
                              alt=""
                              src={`${API_URL}/images/${item.image}`}
                            />
                          </td>
                          <td>
                            <i
                              onClick={() => editData(item)}
                              className="fa-solid fa-pen-to-square icon-color-blue me-2"
                            ></i>
                            <i
                              id={item._id}
                              className="fa-sharp fa-solid fa-trash icon-color-red ms-2"
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default JobHire;

const Wrapper = styled.div`
  td,
  th {
    text-align: center;
    vertical-align: middle;
  }
  background-color: #f8f4ec;
  .adj-left {
    margin-left: 10px;
  }
  select {
    :focus {
      box-shadow: 0 0 7px 0rem rgb(16 66 139 / 29%);
      border-color: rgb(16 66 139 / 29%);
    }
  }
  textarea {
    :focus {
      box-shadow: 0 0 7px 0rem rgb(16 66 139 / 29%);
      border-color: rgb(16 66 139 / 29%);
    }
  }
  .icon-color-blue {
    color: #909090;
    :hover {
      color: blue;
    }
  }
  .icon-color-red {
    color: #b70808;
    :hover {
      color: red;
    }
  }
`;
const Cards = styled.div`
  border: 1px solid #eeeeee;
  padding: 50px;
  background-color: #ffffff;
  border-radius: 15px;
  label {
    margin-top: 10px;
    font-size: 15px;
  }
  box-shadow: 0 0 4px 0rem rgb(16 66 139 / 29%);
  @media (max-width: 850px) {
    padding: 35px;
  }
`;

const H1 = styled.h2`
  text-align: center;
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
`;

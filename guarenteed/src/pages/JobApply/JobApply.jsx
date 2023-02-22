import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Input/Buttons/Button";
import ButtonDanger from "../../components/Input/Buttons/ButtonDanger";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosConfig from "../../config/axiosConfig";
import { setHeader } from "../../utils/setHeader";
import { useDispatch } from "react-redux";
import { auth } from "../ReduxToolkit/Auth";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";

function JobApply() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const locationData = location.state;
  const [data, setdata] = useState([locationData]);
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [zip, setzip] = useState("");
  const [contact, setcontact] = useState("");
  const [file, setfile] = useState("");
  const [renderer, setrenderer] = useState(Date.now());
  const [isLoading, setisLoading] = useState(false);

  const getData = async () => {
    try {
      const fetchedData = !location.state
        ? await axiosConfig.get(`company/get-job-data/${id}`, setHeader())
        : "";
      if (fetchedData) {
        setdata(fetchedData.data.data);
        dispatch(auth({ type: fetchedData.data.message, details: "" }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

 
  const clearAll = () => {
    setisLoading(false);
    setfullname("");
    setemail("");
    setaddress("");
    setcity("");
    setzip("");
    setcontact("");
    setfile("");
    setrenderer(Date.now());
  };
  const saveData = async (e) => {
    e.preventDefault();

    try {
      if (
        id &&
        fullname &&
        email &&
        address &&
        city &&
        zip &&
        contact &&
        file &&
        renderer
      ) {
        const formValues = new FormData();
        formValues.append("id", id);
        formValues.append("fullname", fullname);
        formValues.append("email", email);
        formValues.append("address", address);
        formValues.append("city", city);
        formValues.append("zip", zip);
        formValues.append("contact", contact);
        formValues.append("file", file);
        setisLoading(true);
        const data = await axiosConfig.post(
          "users/sent-mail",
          formValues,
          setHeader()
        );
        dispatch(auth({ type: data.data.messege, details: "" }));
        if (!data.data.error) {
          toast({
            title: `${data.data.messege}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          clearAll();
        } else {
          toast({
            title: "Try again",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setisLoading(false);
        }
      } else {
        toast({
          title: "Please fill all fields",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      setisLoading(false);
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <Wrapper>
      {!isLoading && (
        <Card className="Card mt-3 mb-3">
          <form onSubmit={saveData}>
            <H2>Get A Job</H2>
            <div className="form-group ">
              <label>Full Name</label>
              <Input
                className="form-control m-0"
                placeholder="Full Name"
                onChange={(e) => setfullname(e.target.value)}
                value={fullname}
                pattern="^[a-zA-Z ]*$"
                required={true}
                title="Please enter a valid name"
                type="text"
              />
            </div>
            <div className="form-group ">
              <label>Email address</label>
              <Input
                className="form-control m-0"
                placeholder="Email address"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                type="email"
                required={true}
                title="Please enter a valid Email"
              />
            </div>
            <div className="form-group ">
              <label>Address</label>
              <Input
                className="form-control m-0"
                placeholder="Address"
                onChange={(e) => setaddress(e.target.value)}
                value={address}
                pattern="^[a-zA-Z].*[a-zA-Z]$"
                required={true}
                title="Please enter a valid address"
              />
            </div>
            <div className="form-row row">
              <div className="form-group  col-md-6">
                <label>City</label>
                <Input
                  className="form-control m-0"
                  placeholder="City"
                  onChange={(e) => setcity(e.target.value)}
                  value={city}
                  pattern="^[a-zA-Z].*[a-zA-Z]$"
                  required={true}
                  title="Please enter a valid city"
                />
              </div>
              <div className="form-group  col-md-6">
                <label>Zip</label>
                <Input
                  className="form-control m-0"
                  placeholder="Zip"
                  onChange={(e) => setzip(e.target.value)}
                  value={zip}
                  pattern="\d{6,10}"
                  required={true}
                  title="Please enter a valid Zip"
                />
              </div>
            </div>
            <div className="form-group ">
              <label>Contact</label>
              <div className="col-12">
                <Input
                  className="form-control m-0"
                  type="number"
                  placeholder="Contact"
                  onChange={(e) => setcontact(e.target.value)}
                  value={contact}
                  pattern="\d{10}"
                  required={true}
                  title="Please enter a valid contact number"
                />
              </div>
            </div>
            <div className="form-group  ">
              <label className="mr-4">Upload your CV:</label>
              <Input
                className="form-control m-0"
                placeholder="custom placeholder"
                type="file"
                key={renderer}
                onChange={(e) => setfile(e.target.files[0])}
              />
            </div>
            <Button
              style={{ width: "100%" }}
              type="submit"
              variant="solid"
              colorScheme="blue"
            >
              Apply now
            </Button>
          </form>
          <ButtonDanger onClick={() => navigate(-1)}>Back</ButtonDanger>
        </Card>
      )}
      {isLoading && (
        <Spinner
          size="xl"
          w={100}
          h={100}
          justifyContent="center"
          display="flex"
          margin="auto"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
      )}
    </Wrapper>
  );
}

export default JobApply;
const Wrapper = styled.div`
  height: 107vh;
  label {
    margin-top: 10px;
  }
  justify-content: center;
  display: flex;
  .Card {
    padding: 25px;
    border-radius: 5px;
  }
  background-color: #f1ece5 !important;
`;
const H2 = styled.h2`
  text-align: center;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
`;

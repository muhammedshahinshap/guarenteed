import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Input/Buttons/Button";
import ButtonDanger from "../../components/Input/Buttons/ButtonDanger";
import Input from "../../components/Input/Input";
import { setHeader } from "../../utils/setHeader";
import axiosConfig, { API_URL } from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { auth } from "../ReduxToolkit/Auth";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
function CompanyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const location = useLocation();
  const profile = location.state;
  const [name, setname] = useState(
    profile ? profile?.[0]?.c_profile?.name : ""
  );
  const [address, setaddress] = useState(
    profile ? profile?.[0]?.c_profile?.address : ""
  );
  const [regno, setregno] = useState(
    profile ? profile?.[0]?.c_profile?.regno : ""
  );
  const [website, setwebsite] = useState(
    profile ? profile[0].c_profile.website : ""
  );
  const [profilePicture, setprofilePicture] = useState("");
  const [showimage, setshowimage] = useState(
    `${API_URL}images/${profile ? profile?.[0]?.c_profile?.profilePicture : ""}`
  );
  const [imgrerenderer, setimgrerenderer] = useState("");
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ErrOccured = () => {
    toast({
      title: "Something went wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const getUserProfile = async () => {
    try {
      const data = await axiosConfig.get("/users/user-data", setHeader());
      if (data.data.messege) {
        const { c_profile } = data.data.data[0];
        const { name, address, regno, website, profilePicture } = c_profile;
        setname(name);
        setaddress(address);
        setregno(regno);
        setwebsite(website);
        setshowimage(`${API_URL}images/${profilePicture}`);
      }
    } catch (error) {
      ErrOccured();
      console.log(error);
    }
  };

  const clearAll = () => {
    setname("");
    setaddress("");
    setregno("");
    setwebsite("");
    setprofilePicture("");
    setimgrerenderer(Date.now());
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const formValues = new FormData();
      formValues.append("name", name);
      formValues.append("address", address);
      formValues.append("profilePicture", profilePicture);
      formValues.append("regno", regno);
      formValues.append("website", website);
      const data = await axiosConfig.post(
        "users/company-profile",
        formValues,
        setHeader()
      );
      if (!data.data.error) {
        let token = {
          token: data.data.data[0].token,
          role: data.data.data[0].data.role,
          id: data.data.data[0].data._id,
        };
        dispatch(auth({ type: "SET_TOKEN", details: token }));
        navigate("/");
      } else {
        toast({
          title: `${data.data.messege}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        clearAll();
      }
    } catch (error) {
      ErrOccured();
      console.log(error);
    }
  };
  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setprofilePicture(e.target.files[0]);
      setshowimage(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    if (!profile && id) getUserProfile();
  }, []);
  return (
    <Wrapper className="container-fluid">
      {id ? (
        <>
          <div class="container mt-5 mb-5">
            <div className="row col-sm-12"></div>
            <div class="row mt-3 mb-3">
              <div class="col-md-6 col-lg-3" align="center">
                <img
                  src={`${API_URL}images/${
                    profile ? profile?.[0]?.c_profile.profilePicture : ""
                  }`}
                  className="img-rounded"
                  alt="Userimage"
                />
              </div>
              <div class=" col-md-6 col-lg-5 mt-3">
                <div className="row mt-3">
                  <div className="col-md-6">Name : {name}</div>
                  <div className="col-md-6">RegNo : {regno}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">Address : {address}</div>
                  <div className="col-md-6">Website : {website}</div>
                </div>
                <div className="row">
                  <div className="col-md-6"></div>
                  <div className=" col-md-6">
                    <button
                      className="edit-btn btn btn-primary mt-3"
                      onClick={onOpen}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit your profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Card>
                  <form onSubmit={saveProfile}>
                    <label>Name :</label>
                    <Input
                      onChange={(e) => setname(e.target.value)}
                      value={name}
                      type="text"
                      placeholder="Username"
                      className="form-control mt-0"
                      required={true}
                    />
                    <label>Address :</label>
                    <Input
                      type="text"
                      placeholder="Address"
                      className="form-control mt-0"
                      onChange={(e) => setaddress(e.target.value)}
                      value={address}
                      required={true}
                    />
                    <label>RegNo :</label>
                    <Input
                      type="text"
                      placeholder="Regno"
                      className="form-control mt-0"
                      onChange={(e) => setregno(e.target.value)}
                      value={regno}
                      required={true}
                    />
                    <label>Website :</label>
                    <Input
                      type="text"
                      placeholder="Website"
                      className="form-control mt-0"
                      onChange={(e) => setwebsite(e.target.value)}
                      value={website}
                      required={true}
                    />
                    <label>Profile :</label>
                    <Input
                      type="file"
                      className="form-control mt-0"
                      onChange={(e) => onFileChange(e)}
                      key={imgrerenderer}
                      required={!id ? true : false}
                    />
                    {showimage && (
                      <img
                        className="mt-4"
                        src={`${showimage}`}
                        alt=""
                        width="150px"
                        height="150px"
                      />
                    )}
                    <Button style={{ width: "100%" }} type="submit">
                      Submit
                    </Button>
                  </form>
                  <ButtonDanger
                    style={{ width: "100%" }}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </ButtonDanger>
                </Card>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Card>
          <H1>{id ? "Edit " : "Create"} Company Profile</H1>
          <form onSubmit={saveProfile}>
            <label>Name :</label>
            <Input
              onChange={(e) => setname(e.target.value)}
              value={name}
              type="text"
              placeholder="Username"
              className="form-control mt-0"
              required={true}
            />
            <label>Address :</label>
            <Input
              type="text"
              placeholder="Address"
              className="form-control mt-0"
              onChange={(e) => setaddress(e.target.value)}
              value={address}
              required={true}
            />
            <label>RegNo :</label>
            <Input
              type="text"
              placeholder="Regno"
              className="form-control mt-0"
              onChange={(e) => setregno(e.target.value)}
              value={regno}
              required={true}
            />
            <label>Website :</label>
            <Input
              type="text"
              placeholder="Website"
              className="form-control mt-0"
              onChange={(e) => setwebsite(e.target.value)}
              value={website}
              required={true}
            />
            <label>Profile :</label>
            <Input
              type="file"
              className="form-control mt-0"
              onChange={(e) => onFileChange(e)}
              key={imgrerenderer}
              required={!id ? true : false}
            />
            {showimage && (
              <img
                className="mt-4"
                src={`${showimage}`}
                alt=""
                width="150px"
                height="150px"
              />
            )}
            <Button style={{ width: "100%" }} type="submit">
              Submit
            </Button>
          </form>
          <ButtonDanger style={{ width: "100%" }} onClick={() => navigate(-1)}>
            Back
          </ButtonDanger>
        </Card>
      )}
    </Wrapper>
  );
}

export default CompanyProfile;
const Wrapper = styled.div`
  .img-rounded {
    border-radius: 15px;
  }
  label {
    margin-top: 10px;
    font-size: 15px;
  }
  .edit-btn {
    cursor: pointer;
    color: white;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    width: 100%;
    margin-top: 15px;
  }
  .panel-footer {
    padding: 5px;
    height: 40px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  .adj-left {
    margin-left: 10px;
  }
  background-color: #f8f4ec;
`;
const Card = styled.div`
  border: 1px solid #eeeeee;
  margin: 15px 0px !important;
  padding: 50px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 4px 0rem rgb(16 66 139 / 29%);
  @media (max-width: 450px) {
    padding: 35px;
  }
`;
const H2 = styled.h2`
  text-align: center;
  font-size: 30px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
const H1 = styled.h2`
  text-align: center;
  font-size: 30px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin-bottom: 10px;
`;

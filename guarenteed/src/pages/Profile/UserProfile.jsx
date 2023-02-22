import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Input/Buttons/Button";
import ButtonDanger from "../../components/Input/Buttons/ButtonDanger";
import Input from "../../components/Input/Input";
import { setHeader } from "../../utils/setHeader";
import axiosConfig, { API_URL } from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { auth } from "../ReduxToolkit/Auth";
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
function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const profile = location.state;

  const [name, setname] = useState(profile ? profile[0].u_profile.name : "");
  const [gender, setgender] = useState(
    profile ? profile[0].u_profile.gender : ""
  );
  const [address, setaddress] = useState(
    profile ? profile[0].u_profile.address : ""
  );
  const [place, setplace] = useState(profile ? profile[0].u_profile.place : "");
  const [domain, setdomain] = useState(
    profile ? profile[0].u_profile.domain : ""
  );
  const [experience, setexperience] = useState(
    profile ? profile[0].u_profile.experience : ""
  );
  const [contact, setcontact] = useState(
    profile ? profile[0].u_profile.contact : ""
  );
  const [profilePicture, setprofilePicture] = useState("");
  const [showimage, setshowimage] = useState(
    profile &&
      `${API_URL}images/${profile ? profile[0].u_profile.profilePicture : ""}`
  );
  const [imgrerenderer, setimgrerenderer] = useState("");

  const ErrOccured = () => {
    toast({
      title: "Something went wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const clearAll = () => {
    setname("");
    setgender("");
    setaddress("");
    setplace("");
    setdomain("");
    setexperience("");
    setcontact("");
    setprofilePicture("");
    setshowimage("");
    setimgrerenderer(Date.now());
  };
  useEffect(() => {
    if (!profile && id) getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const data = await axiosConfig.get("/users/user-data", setHeader());
      if (data.data.messege) {
        const { u_profile } = data.data.data[0];
        const {
          name,
          gender,
          address,
          place,
          domain,
          experience,
          contact,
          profilePicture,
        } = u_profile;
        setname(name);
        setgender(gender);
        setaddress(address);
        setplace(place);
        setdomain(domain);
        setexperience(experience);
        setcontact(contact);
        setshowimage(`${API_URL}images/${profilePicture}`);
      }
    } catch (error) {
      ErrOccured();
      console.log(error);
    }
  };
  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const formValues = new FormData();
      formValues.append("profilePicture", profilePicture);
      formValues.append("name", name);
      formValues.append("gender", gender);
      formValues.append("address", address);
      formValues.append("place", place);
      formValues.append("domain", domain);
      formValues.append("experience", experience);
      formValues.append("contact", contact);
      const data = await axiosConfig.post(
        "users/user-profile",
        formValues,
        setHeader()
      );
      if (!data.data.error) {
        let token = {
          token: data.data.data[0].token,
          role: data.data.data[0].data.role,
          id: data.data.data[0].data._id,
        };
        if (!id) {
          dispatch(auth({ type: "SET_TOKEN", details: token }));
        } else onClose();
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

  return (
    <Wrapper className="container-fluid ">
      {id ? (
        <>
          <div class="container mt-5 mb-5">
            <div className="row col-sm-12"></div>
            <div class="row mt-3 mb-3">
              <div class="col-md-6 col-lg-3" align="center">
                <img
                  src={`${API_URL}images/${
                    profile ? profile[0].u_profile.profilePicture : ""
                  }`}
                  className="img-rounded"
                  alt="Userimage"
                  width="100px"
                />
              </div>
              <div class=" col-md-6 col-lg-5 mt-3">
                <div className="row mt-3">
                  <div className="col-md-6">Name : {name}</div>
                  <div className="col-md-6">Gender : {gender}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">Address : {address}</div>
                  <div className="col-md-6">Place : {place}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">Domain : {domain}</div>
                  <div className="col-md-6">Experience : {experience}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">Contact : {contact}</div>
                  <div className="col-md-6">
                    <button
                      className="edit-btn btn btn-primary"
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
                  <form onSubmit={(e) => saveProfile(e)}>
                    <label>Name :</label>
                    <Input
                      required={true}
                      type="text"
                      placeholder="Name"
                      className="form-control mt-0"
                      onChange={(e) => setname(e.target.value)}
                      value={name}
                    />
                    <label>Gender :</label>
                    <Input
                      required={true}
                      type="text"
                      placeholder="Gender"
                      className="form-control mt-0"
                      onChange={(e) => setgender(e.target.value)}
                      value={gender}
                    />
                    <label>Address :</label>
                    <Input
                      required={true}
                      type="text"
                      placeholder="Address"
                      className="form-control mt-0"
                      onChange={(e) => setaddress(e.target.value)}
                      value={address}
                    />
                    <label>Place :</label>
                    <Input
                      required={true}
                      type="text"
                      placeholder="Place"
                      className="form-control mt-0"
                      onChange={(e) => setplace(e.target.value)}
                      value={place}
                    />
                    <label>Domain :</label>
                    <Input
                      required={true}
                      type="text"
                      placeholder="Domain"
                      className="form-control mt-0"
                      onChange={(e) => setdomain(e.target.value)}
                      value={domain}
                    />
                    <label>Experience :</label>
                    <Input
                      required={true}
                      type="text"
                      placeholder="Experience"
                      className="form-control mt-0"
                      onChange={(e) => setexperience(e.target.value)}
                      value={experience}
                    />
                    <label>Contact :</label>
                    <Input
                      required={true}
                      pattern="\d{10,10}"
                      placeholder="Contact"
                      className="form-control mt-0"
                      onChange={(e) => setcontact(e.target.value)}
                      value={contact}
                    />
                    <label>Profile :</label>
                    <Input
                      required={!id ? true : false}
                      type="file"
                      className="form-control mt-0"
                      onChange={(e) => onFileChange(e)}
                      key={imgrerenderer}
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
                </Card>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Card>
          <H1>{id ? "Edit" : "Create"} User Profile</H1>
          <form onSubmit={(e) => saveProfile(e)}>
            <label>Name :</label>
            <Input
              required={true}
              type="text"
              placeholder="Name"
              className="form-control mt-0"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
            <label>Gender :</label>
            <Input
              required={true}
              type="text"
              placeholder="Gender"
              className="form-control mt-0"
              onChange={(e) => setgender(e.target.value)}
              value={gender}
            />
            <label>Address :</label>
            <Input
              required={true}
              type="text"
              placeholder="Address"
              className="form-control mt-0"
              onChange={(e) => setaddress(e.target.value)}
              value={address}
            />
            <label>Place :</label>
            <Input
              required={true}
              type="text"
              placeholder="Place"
              className="form-control mt-0"
              onChange={(e) => setplace(e.target.value)}
              value={place}
            />
            <label>Domain :</label>
            <Input
              required={true}
              type="text"
              placeholder="Domain"
              className="form-control mt-0"
              onChange={(e) => setdomain(e.target.value)}
              value={domain}
            />
            <label>Experience :</label>
            <Input
              required={true}
              type="text"
              placeholder="Experience"
              className="form-control mt-0"
              onChange={(e) => setexperience(e.target.value)}
              value={experience}
            />
            <label>Contact :</label>
            <Input
              required={true}
              pattern="\d{10,10}"
              placeholder="Contact"
              className="form-control mt-0"
              onChange={(e) => setcontact(e.target.value)}
              value={contact}
            />
            <label>Profile :</label>
            <Input
              required={!id ? true : false}
              type="file"
              className="form-control mt-0"
              onChange={(e) => onFileChange(e)}
              key={imgrerenderer}
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

export default UserProfile;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  .adj-left {
    margin-left: 10px;
  }
  background-color: #f8f4ec;

  body {
    margin-top: 20px;
    font-family: Montserrat, sans-serif;
  }

  h4 {
    text-transform: uppercase;
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
`;
const Card = styled.div`
  margin: 15px 0px !important;
  border: 1px solid #eeeeee;
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

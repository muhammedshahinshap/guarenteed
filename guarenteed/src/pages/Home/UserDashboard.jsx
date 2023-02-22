import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Input/Buttons/Button";
import { setHeader } from "../../utils/setHeader";
import axiosConfig, { API_URL } from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { auth } from "../ReduxToolkit/Auth";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Image,
  Heading,
  ButtonGroup,
  Box,
  Flex,
  Avatar,
  Stack,
  InputLeftElement,
  InputGroup,
  Input as CInput,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner, useToast } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
function UserDashboard() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [data, setdata] = useState([]);
  const [profile, setprofile] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [limit, setlimit] = useState(10);
  const [tech, settech] = useState("");
  const [date, setdate] = useState("");
  const [premium, setpremium] = useState(true);
  let validator = false;

  const ErrOccured = () => {
    toast({
      title: "Something went wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const getDashboardData = async () => {
    try {
      gethireData();
      const userData = await axiosConfig.get(`/users/user-data`, setHeader());
      dispatch(auth({ type: userData.data.messege, details: "" }));
      setprofile(userData?.data?.data);
      setpremium(userData?.data?.data[0]?.premium);
    } catch (error) {
      ErrOccured();
      console.log(error);
    }
  };

  const gethireData = async (searchLimit) => {
    try {
      if (!validator) validator = true;
      const formData = {
        limit: !searchLimit ? limit : searchLimit,
        tech: tech,
        date: date,
      };
      const hireData = await axiosConfig.post(
        `/company/get-home-job`,
        formData,
        setHeader()
      );
      dispatch(auth({ type: hireData?.data?.messege, details: "" }));
      if (!searchLimit) setlimit(limit + 10);
      data.length !== hireData?.data?.data?.[0].length
        ? setdata(hireData?.data?.data?.[0])
        : sethasMore(false);
    } catch (error) {
      ErrOccured();
      console.log(error);
    }
  };

  const addToWishList = async (id) => {
    try {
      const Add = await axiosConfig.get(
        `/users/add-to-wishlist/${id}`,
        setHeader()
      );
      toast({
        title: `${Add.data.messege}`,
        status: `${!Add.data.error ? `success` : `error`}`,
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      ErrOccured();
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  useEffect(() => {
    let clear;
    if (tech || date) {
      clear = setTimeout(() => {
        gethireData(25);
      }, 500);
    } else {
      !validator && gethireData();
    }
    return () => {
      clearTimeout(clear);
    };
  }, [tech, date]);

  return (
    <Wrapper className="container-fluid">
      <div className="row ">
        <div className="col-md-1 mt-2"></div>
        <div className="col-md-2 mt-2">
          <ProfileCard>
            {profile.map((item, i) => {
              return (
                <div key={i} className="card">
                  <div className="card_background_img"></div>
                  <div className="card_profile_img">
                    <img
                      alt=""
                      src={`${API_URL}/images/${item?.u_profile?.profilePicture}`}
                    />
                  </div>
                  <div className="user_details">
                    <Text className="align-center mt-3" fontSize="xs">
                      {item?.u_profile?.name}
                    </Text>
                    <Text className="align-center" fontSize="xs">
                      <Link
                        to={`/user-profile/${item?._id}`}
                        state={profile}
                        className="edit-link"
                      >
                        Edit your profile
                      </Link>
                    </Text>
                    <Text className="align-center" fontSize="xs">
                      Contact : <b>{item?.u_profile?.contact}</b>
                    </Text>
                    <Text className="align-center" fontSize="xs">
                      Domain : <b>{item?.u_profile?.domain}</b>
                    </Text>
                    <Text className="align-center" fontSize="xs">
                      Experience : <b>{item?.u_profile?.experience}</b>
                    </Text>
                  </div>
                </div>
              );
            })}
          </ProfileCard>
        </div>
        <div className="col-md-6 mt-2  ">
          <div className="row mb-3">
            <div className="col-md-6">
              <Stack spacing={4} style={{ background: "#fff" }}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                  />
                  <CInput
                    type="text"
                    value={tech}
                    onChange={(e) => settech(e.target.value.trimStart())}
                    placeholder="Search By Tech"
                  />
                </InputGroup>
              </Stack>
            </div>
            <div className="col-md-6">
              <Stack spacing={4} style={{ background: "#fff" }}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <CInput
                    type="date"
                    value={date}
                    onChange={(e) => setdate(e.target.value.trimStart())}
                    placeholder="Search By Date"
                  />
                </InputGroup>
              </Stack>
            </div>
          </div>
          <WrapperCard>
            <InfiniteScroll
              dataLength={data.length}
              next={gethireData}
              hasMore={hasMore}
              loader={
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
              }
              endMessage={
                <ScrollFooter>
                  <b>YOU ARE AT THE EDGE !!</b>
                </ScrollFooter>
              }
            >
              {data.map((item, i) => {
                return (
                  <Card key={item?._id} className="mt-2  cust-card" maxW="xxl ">
                    <CardHeader>
                      <Flex spacing="4">
                        <Flex
                          flex="1"
                          gap="4"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Avatar
                            name={item?.data?.[0]?.c_profile?.name}
                            src={`${API_URL}/images/${item?.data?.[0]?.c_profile?.profilePicture}`}
                          />
                          <Box>
                            <Heading size="sm">
                              {item?.data?.[0]?.c_profile.name}
                            </Heading>
                            <Text>
                              <a
                                href={item?.data?.[0]?.c_profile.website}
                                className="edit-link"
                              >
                                {item?.data?.[0]?.c_profile.website}
                              </a>
                            </Text>
                          </Box>
                        </Flex>
                        {
                          <Text color="#14589d">
                            {new Date(item?.createdAt).toDateString()}
                          </Text>
                        }
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text className="mt-2 cust-font-style ">
                        Type: {item?.type}
                      </Text>
                      <Text className="mt-2 cust-font-style ">
                        Tech: {item?.tech}
                      </Text>
                      <Text className="mt-2 cust-font-style ">
                        Package: {item?.salary}
                      </Text>
                      <Text className="mt-2 cust-font-style ">
                        Experience: {item?.noOfYears}
                      </Text>
                      <Text className="mt-2 cust-font-style ">
                        Description : {item?.discription}
                      </Text>
                    </CardBody>
                    <Link>
                      <Image
                        objectFit="cover"
                        src={`${API_URL}images/${item?.image}`}
                        alt="Image not Found"
                        width="100%"
                      />
                    </Link>
                    <CardFooter
                      justify="space-between"
                      flexWrap="wrap"
                      sx={{
                        "& > button": {
                          minW: "136px",
                        },
                      }}
                    >
                      <ButtonGroup spacing="2">
                        <Link state={item} to={`/job-apply/${item?._id}`}>
                          <Button variant="solid" colorScheme="blue">
                            Apply now
                          </Button>
                        </Link>
                        <Button
                          onClick={() => addToWishList(item?._id)}
                          variant="solid"
                          colorScheme="blue"
                        >
                          Book Mark
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                );
              })}
            </InfiniteScroll>
          </WrapperCard>
        </div>
        <div className="col-md-3 mt-2">
          {!premium && (
            <Card className="cust-card">
              <p className="mt-2 mb-2" style={{ textAlign: "center" }}>
                <b>UPGRADE TO PREMIUM</b>
              </p>
              <p className="mt-2 mb-2" style={{ textAlign: "center" }}>
                <b>Get unlimited connection</b>
              </p>
              <p className="mt-2 mb-2" style={{ textAlign: "center" }}>
                <b>Start chatting with outhers</b>
              </p>
              <Link to="/upgrade-account" className="upgrade-btn">
                Upgrade Now
              </Link>
            </Card>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default UserDashboard;
const Wrapper = styled.div`
  .upgrade-btn {
    text-align: center;
    color: #14589d;
    font-family: Arial, Helvetica, sans-serif;
    :hover {
      color: #0e4479;
    }
  }
  .cust-font-style {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
  }
  .edit-link {
    color: #14589d;
    font-weight: bold;
    :hover {
      font-weight: bolder;
      color: #243397;
    }
  }
  background-color: #f8f4ec;
  min-height: 100vh;
  .wrapper-card {
    max-height: 100vh;
    overflow-y: hidden;
  }
  .cust-card {
    background-color: #ffffff;
    border-radius: 5px;
  }
  .align-center {
    text-align: center;
  }
`;
const ProfileCard = styled.div`
  .edit-link {
    color: #14589d;
    font-weight: bold;
    :hover {
      font-weight: bolder;
      color: #243397;
    }
  }
  .card_profile_img {
    width: 90px;
    height: 90px;
    background-color: #868d9b;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border: 2px solid #ffffff;
    border-radius: 120px;
    margin: 0 auto;
    margin-top: -60px;
    overflow: hidden;
  }
  .card_profile_img img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .card_background_img {
    width: 100%;
    height: 100px;
    background-color: #e1e7ed;
    background: url("https://source.unsplash.com/9wg5jCEPBsw");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .user_details p {
    margin-bottom: 20px;
    margin-top: -5px;
  }

  .user_details h3 {
    margin-top: 10px;
  }

  .card_count {
    padding: 30px;
    border-top: 1px solid #dde1e7;
  }

  .count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .count p {
    margin-top: -10px;
  }
`;
const WrapperCard = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(136, 136, 136, 0.281);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const ScrollFooter = styled.div`
  text-align: center;
  margin: 10px 0px;
  padding: 10px;
`;

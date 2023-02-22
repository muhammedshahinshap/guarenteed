import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react";
import styled from "styled-components";
import Button from "../Buttons/Button";
import { API_URL } from "../../../config/axiosConfig";
import { Link } from "react-router-dom";

function Wishlist({ data }) {
  const [status, setstatus] = useState(false);
  return (
    <Wrapper className="container-fluid">
      <div className="row mt-5 mb-5">
        <div className="col-sm-12 ">
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            className="cust-card"
          >
            <Image
              maxW={{ base: "100%", sm: "50%" }}
              src={`${API_URL}images/${data.image}`}
              alt="Caffe Latte"
            />
            <Stack>
              <CardBody>
                <Text py="2" className="cust-font-style">
                  Type: <b>{data.type}</b>
                </Text>
                <Text py="2" className="cust-font-style">
                  Tech: <b>{data.tech}</b>
                </Text>
                <Text py="2" className="cust-font-style">
                  Package: <b>{data.salary}</b>
                </Text>
                <Text py="2" className="cust-font-style">
                  Experience: <b>{data.noOfYears}</b>
                </Text>
                <Text py="2" className="cust-font-style">
                  Description :
                  {!status
                    ? data.discription?.length < 100
                      ? data.discription
                      : data?.discription.substring(0, 100)
                    : data.discription}
                  {!status && data?.discription?.length > 100 ? (
                    <button
                      style={{ color: "#14589d" }}
                      onClick={() => setstatus(true)}
                    >
                      Read more
                    </button>
                  ) : (
                    ""
                  )}
                  {status && (
                    <button
                      style={{ color: "#14589d" }}
                      onClick={() => setstatus(false)}
                    >
                      Minimise
                    </button>
                  )}
                </Text>
              </CardBody>
              <CardFooter>
                <Link state={data} to={`/job-apply/${data._id}`}>
                  <Button variant="solid" colorScheme="blue">
                    Apply now
                  </Button>
                </Link>
              </CardFooter>
            </Stack>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}

export default Wishlist;
const Wrapper = styled.div`
  background-color: #f1ece5 !important;

  padding: 0px !important;
  .cust-card {
    background-color: #ffffff;
  }
  .cust-font-style {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
  }
`;

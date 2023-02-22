import React from "react";
import styled from "styled-components";
import { Card } from "@chakra-ui/react";
import BarChart from "../../components/Input/Charts/BarChart";
import PieChart from "../../components/Input/Charts/PieChart";

function AdminHome() {
  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <p className="mt-3">
            <b>Welcome ADMIN</b>
          </p>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-6 adj-chat-bar">
          <Card className="cust-card mt-5 mb-5">
            <BarChart />
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="cust-card mt-5 mb-5">
            <PieChart />
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}

export default AdminHome;
const Wrapper = styled.div`
  background-color: #f8f4ec;
  .cust-card {
    background-color: #fff;
    min-height: 300px;
  }
  .adj-chat-bar {
    position: relative;
  }
  p {
    text-align: center;
    font-size: 22px;
  }
`;

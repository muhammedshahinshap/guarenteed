import React, { useEffect, useState } from "react";
import { Tabs, TabList, Tab, Input } from "@chakra-ui/react";
import { JOBS } from "./React Table Columns/Columns";
import styled from "styled-components";
import { useTable, useGlobalFilter } from "react-table";
import { useMemo } from "react";
import axiosConfig from "../../../config/axiosConfig";
import { setHeader } from "../../../utils/setHeader";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
function AdminJobsReport() {
  useEffect(() => {
    getActiveJobs();
    getReportedJobs();
    getExpiredJobs();
  }, []);

  const [activejobs, setactivejobs] = useState([]);
  const [reportedjobs, setreportedjobs] = useState([]);
  const [expired, setexpired] = useState([]);

  const [selected, setselected] = useState("active");
  const getActiveJobs = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-admin-active-jobs",
        setHeader()
      );
      setactivejobs(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getReportedJobs = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-admin-reported-jobs",
        setHeader()
      );
      setreportedjobs(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getExpiredJobs = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-admin-expired-jobs",
        setHeader()
      );
      setexpired(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(() => {
    return JOBS;
  }, []);

  const data = useMemo(() => {
    if (selected === "active") return activejobs;
    else if (selected === "reported") return reportedjobs;
    else if (selected === "expired") return expired;
  }, [selected, activejobs, reportedjobs, expired]);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["_id", "fk_id"],
      },
    },
    useGlobalFilter
  );
  const { globalFilter } = state;
  const changeStatus = async (id) => {
    try {
      const data = await axiosConfig.get(
        `/admin/report-job/${id}`,
        setHeader()
      );
      if (selected === "active") {
        getActiveJobs();
        getReportedJobs();
      } else if (selected === "expired") {
        getExpiredJobs();
        getReportedJobs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper className="container-fluid ">
      <div className="row">
        <div className="col-sm-12">
          <Tabs variant="unstyled ">
            <TabList className="mt-4 mb-4">
              <Tab
                onClick={() => {
                  setselected("active");
                }}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Active Jobs
              </Tab>
              <Tab
                onClick={() => {
                  setselected("reported");
                }}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Reported Jobs
              </Tab>
              <Tab
                onClick={() => {
                  setselected("expired");
                }}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Expired Jobs
              </Tab>
            </TabList>
          </Tabs>
          <Card className="mt-4 mb-4 p-4">
            <div className="row">
              <div className="col-md-3">
                <Input
                  placeholder="Search"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="table-responsive">
              <table {...getTableProps()} className="table table-striped">
                <thead>
                  {headerGroups.map((headerGroups) => (
                    <tr {...headerGroups.getHeaderGroupProps()}>
                      <th>Sl No</th>
                      {headerGroups.headers.map((columns) => (
                        <th {...columns.getHeaderProps()}>
                          {columns.render("Header")}
                        </th>
                      ))}
                      <th>Action</th>
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr key={row.allCells[1].value} {...row.getRowProps()}>
                        <td>{++i}</td>
                        {row.cells.map((columns) => (
                          <td {...columns.getCellProps()}>
                            {columns.render("Cell")}
                          </td>
                        ))}
                        <td>
                          {selected !== "reported" && (
                            <i
                              onClick={() =>
                                changeStatus(row.allCells[1].value)
                              }
                              className="fa fa-times"
                              aria-hidden="true"
                              title="Report"
                            ></i>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}

export default AdminJobsReport;
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
  .btn-link {
    color: #14589d;
    :hover {
      color: #000;
    }
    text-decoration: none;
  }
`;

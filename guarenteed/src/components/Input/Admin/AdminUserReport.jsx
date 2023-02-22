import React, { useEffect, useState } from "react";
import { Tabs, TabList, Tab, Input } from "@chakra-ui/react";
import { USERCOLUMNS, COMPANYCOLUMNS } from "./React Table Columns/Columns";
import styled from "styled-components";
import { useTable, useGlobalFilter } from "react-table";
import { useMemo } from "react";
import axiosConfig from "../../../config/axiosConfig";
import { setHeader } from "../../../utils/setHeader";

function AdminUserReport() {
  useEffect(() => {
    getUsers();
    getCompanies();
    getReportedUsers();
    getReportedCompanies();
    getPremiumUsers();
    getPremiumCompanies();
  }, []);

  const [users, setusers] = useState([]);
  const [companies, setcompanies] = useState([]);
  const [reportedcompanies, setreportedcompanies] = useState([]);
  const [reportedusers, setreportedusers] = useState([]);
  const [premiumusers, setpremiumusers] = useState([]);
  const [premiumcompanies, setpremiumcompanies] = useState([]);

  const [selected, setselected] = useState("users");
  const getUsers = async () => {
    try {
      const data = await axiosConfig.get("/admin/get-admin-user", setHeader());
      setusers(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getReportedUsers = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-admin-reported-user",
        setHeader()
      );
      setreportedusers(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getPremiumUsers = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-admin-premium-user",
        setHeader()
      );
      setpremiumusers(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getPremiumCompanies = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-admin-premium-companies",
        setHeader()
      );
      setpremiumcompanies(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getCompanies = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-admin-company",
        setHeader()
      );
      setcompanies(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getReportedCompanies = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-admin-reported-company",
        setHeader()
      );
      setreportedcompanies(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = useMemo(() => {
    if (
      selected === "users" ||
      selected === "reportedusers" ||
      selected === "premiumusers"
    )
      return USERCOLUMNS;
    else if (
      selected === "companies" ||
      selected === "reportedcompanies" ||
      selected === "premiumcompanies"
    )
      return COMPANYCOLUMNS;
  }, [selected]);

  const data = useMemo(() => {
    if (selected === "users") return users;
    else if (selected === "companies") return companies;
    else if (selected === "reportedusers") return reportedusers;
    else if (selected === "reportedcompanies") return reportedcompanies;
    else if (selected === "premiumusers") return premiumusers;
    else if (selected === "premiumcompanies") return premiumcompanies;
  }, [
    selected,
    users,
    companies,
    reportedusers,
    reportedcompanies,
    premiumusers,
    premiumcompanies,
  ]);

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
        hiddenColumns: ["_id", "status"],
      },
    },
    useGlobalFilter
  );
  const { globalFilter } = state;
  const changeStatus = async (id) => {
    try {
      const data = await axiosConfig.get(
        `/admin/report-user/${id}`,
        setHeader()
      );
      if (selected === "users") {
        getUsers();
        getPremiumUsers();
        getReportedUsers();
      } else if (selected === "companies") {
        getCompanies();
        getPremiumCompanies();
        getReportedCompanies();
      } else if (selected === "premiumusers") {
        getUsers();
        getPremiumUsers();
        getReportedUsers();
      } else if (selected === "premiumcompanies") {
        getCompanies();
        getPremiumCompanies();
        getReportedCompanies();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyStatus = async (id) => {
    try {
      const data = await axiosConfig.get(
        `/admin/activate-user/${id}`,
        setHeader()
      );
      if (selected === "reportedcompanies") {
        getCompanies();
        getPremiumCompanies();
        getReportedCompanies();
      } else if (selected === "reportedusers") {
        getUsers();
        getPremiumUsers();
        getReportedUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper className="container-fluid  ">
      <div className="row">
        <div className="col-sm-12">
          <Tabs className="mt-4 mb-4" variant="unstyled ">
            <TabList>
              <Tab
                onClick={() => {
                  setselected("users");
                }}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Active Users
              </Tab>
              <Tab
                onClick={() => {
                  setselected("companies");
                }}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Active Companies
              </Tab>
              <Tab
                onClick={() => {
                  setselected("reportedusers");
                }}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Reported Users
              </Tab>
              <Tab
                onClick={() => {
                  setselected("reportedcompanies");
                }}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Reported Companies
              </Tab>
              <Tab
                onClick={() => {
                  setselected("premiumusers");
                }}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Premium Users
              </Tab>
              <Tab
                onClick={() => {
                  setselected("premiumcompanies");
                }}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Premium Companies
              </Tab>
            </TabList>
          </Tabs>
          <Card className="mt-4 p-4 mb-4">
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
                    console.log(selected);
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
                          {selected !== "reportedcompanies" &&
                          selected !== "reportedusers" ? (
                            <i
                              onClick={() =>
                                changeStatus(row.allCells[1].value)
                              }
                              className="fa fa-times"
                              aria-hidden="true"
                              title="Report"
                            ></i>
                          ) : (
                            <i
                              onClick={() =>
                                verifyStatus(row.allCells[1].value)
                              }
                              className="fa fa-check"
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
export default AdminUserReport;
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

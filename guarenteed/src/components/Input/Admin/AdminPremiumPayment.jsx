import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Payment } from "./React Table Columns/Columns";
import styled from "styled-components";
import { useTable, useGlobalFilter } from "react-table";
import { useMemo } from "react";
import axiosConfig from "../../../config/axiosConfig";
import { setHeader } from "../../../utils/setHeader";

function AdminPremiumPayment() {
  const [datas, setdatas] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-payment-data",
        setHeader()
      );
      console.log(data);
      !data.data.error && setdatas(data?.data?.data?.[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = useMemo(() => {
    return Payment;
  }, []);

  const data = useMemo(() => {
    return datas;
  }, [datas]);

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
        hiddenColumns: ["_id", "userId"],
      },
    },
    useGlobalFilter
  );
  const { globalFilter } = state;

  return (
    <Wrapper className="container-fluid ">
      <div className="row">
        <div className="col-sm-12">
          <Card className="mt-4 mb-4 p-4">
            <div className="row">
              <div className="col-md-3">
                <Input
                  placeholder="Search"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </div>
              <div className="col-md-3">Total revanue is ${data.length * 15}</div>
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

export default AdminPremiumPayment;
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

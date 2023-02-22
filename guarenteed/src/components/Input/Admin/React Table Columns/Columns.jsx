import { API_URL } from "../../../../config/axiosConfig";

const USERCOLUMNS = [
  {
    Header: "User name",
    accessor: "username",
  },
  {
    Header: "uid",
    accessor: "_id",
  },
  {
    Header: "status",
    accessor: "status",
  },
  {
    Header: "Name",
    accessor: "u_profile.name",
  },
  {
    Header: "Gender",
    accessor: "u_profile.gender",
  },
  {
    Header: "Address",
    accessor: "u_profile.address",
  },
  {
    Header: "Contact",
    accessor: "u_profile.contact",
  },
  {
    Header: "Place",
    accessor: "u_profile.place",
  },
  {
    Header: "Experience",
    accessor: "u_profile.experience",
  },
  {
    Header: "Image",
    Cell: (data) => (
      <img
        width="100px"
        src={`${API_URL}/images/${data.data[0].u_profile.profilePicture}`}
        alt="userImage"
      />
    ),
  },
];
const COMPANYCOLUMNS = [
  {
    Header: "User name",
    accessor: "username",
  },
  {
    Header: "uid",
    accessor: "_id",
  },
  {
    Header: "status",
    accessor: "status",
  },
  {
    Header: "Name",
    accessor: "c_profile.name",
  },
  {
    Header: "Address",
    accessor: "c_profile.address",
  },
  {
    Header: "Reg no",
    accessor: "c_profile.regno",
  },
  {
    Header: "Website",
    accessor: "c_profile.website",
  },
  {
    Header: "Image",
    Cell: (item) => (
      <img
        width="100px"
        src={`${API_URL}/images/${item.data[0].c_profile.profilePicture}`}
        alt="userImage"
      />
    ),
  },
];
const JOBS = [
  {
    Header: "Company name",
    accessor: "data[0].c_profile.name",
  },
  {
    Header: "uid",
    accessor: "_id",
  },
  {
    Header: "fk_id",
    accessor: "fk_id",
  },
  {
    Header: "type",
    accessor: "type",
  },
  {
    Header: "Experience",
    accessor: "noOfYears",
  },
  {
    Header: "Tech",
    accessor: "tech",
  },
  {
    Header: "Package",
    accessor: "salary",
  },
  {
    Header: "Image",
    Cell: (item) => (
      <img
        width="100px"
        src={`${API_URL}/images/${item.data[0].data[0].c_profile.profilePicture}`}
        alt="userImage"
      />
    ),
  },
];

const Payment = [
  {
    Header: "uid",
    accessor: "_id",
  },
  {
    Header: "userId",
    accessor: "userId",
  },
  {
    Header: "Order Id",
    accessor: "orderId",
  },
  {
    Header: "User Name",
    accessor: "data[0].username",
  },
  {
    Header: "Role",
    accessor: "data[0].role",
  },
  {
    Header: "Purchased on",
    accessor: "createdAt",
  }
];

export { USERCOLUMNS, COMPANYCOLUMNS, JOBS, Payment };

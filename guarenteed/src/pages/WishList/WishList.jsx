import React, { useEffect, useState } from "react";
import axiosConfig from "../../config/axiosConfig";
import { setHeader } from "../../utils/setHeader";
import Wishlist from "../../components/Input/Withlist/Wishlist";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { auth } from "../ReduxToolkit/Auth";
import { useToast } from "@chakra-ui/react";

function WishList() {
  const dispatch = useDispatch();
  const toast = useToast();

  const [data, setdata] = useState([]);
  useEffect(() => {
    getWishlistData();
  }, []);
  const getWishlistData = async () => {
    try {
      const data = await axiosConfig.get(
        "users/get-wishlist-data",
        setHeader()
      );
      dispatch(auth({ type: data.data.messege, details: "" }));
      setdata(data.data.data?.[0]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Wrapper className="container-fluid">
      <div className="row">
        {data?.length >= 1 ? (
          data.map((item, i) => (
            <div key={item._id} className="col-lg-6 col-md-6 mt-2 mb-2">
              <Wishlist id={1} data={item} />
            </div>
          ))
        ) : (
          <div className="nodata">
            <p className="mt-2 mb-2" style={{ textAlign: "center" }}>
              <b>YOUR WISH LIST IS EMPTY</b>
            </p>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default WishList;
const Wrapper = styled.div`
  background-color: #eae0e0;
  .nodata{
    height: 50vh;
  }
`;

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const Auth = createSlice({
  name: "value",
  initialState: {
    status: "",
    id: "",
  },
  reducers: {
    auth: (state, action) => {
      if (action.payload.type === "UNAUTHERISED_ACCESS") {
        Cookies.remove("authToken");
        state.status = Date.now();
      } else if (action.payload.type === "SET_TOKEN") {
        Cookies.remove("authToken");
        Cookies.set("authToken", JSON.stringify(action.payload.details));
        state.status = Date.now();
      }
      return state;
    },
    extraReducers: {
      init: (state, action) => {
        return 0;
      },
    },
  },
});

export const { auth, init } = Auth.actions;
export default Auth.reducer;

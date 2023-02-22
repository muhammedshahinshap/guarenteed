import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth";

const store = configureStore({
  reducer: {
    Auth: Auth,
  },
});
export default store;

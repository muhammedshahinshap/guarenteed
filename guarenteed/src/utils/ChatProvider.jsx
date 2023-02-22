import { createContext, useContext, useState } from "react";
import axiosConfig from "../config/axiosConfig";
import { setHeader } from "./setHeader";
import { useDispatch } from "react-redux";
import { auth } from "../pages/ReduxToolkit/Auth";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [mychats, setmychats] = useState([]);
  const [selectChat, setselectChat] = useState([]);
  const [user, setuser] = useState("");

  const getChats = async () => {
    try {
      const data = await axiosConfig.get("/chat/get-chats", setHeader());
      if (!data.data.error) {
        setmychats(data.data.data[0]);
      }
      dispatch(auth({ type: data.data.message, details: "" }));
    } catch (error) {
      console.log(error);
    }
  };
  const userData = async () => {
    try {
      const data = await axiosConfig.get("/chat/user-data", setHeader());
      if (!data.data.error) {
        setuser(data.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ChatContext.Provider
      value={{ getChats, mychats, setselectChat, selectChat, userData, user }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
export const ChatState = () => {
  return useContext(ChatContext);
};

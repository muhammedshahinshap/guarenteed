import Cookies from "js-cookie";
export const setHeader = () => {
  const userToken = Cookies.get("authToken");
  const token = userToken ? JSON.parse(userToken).token : "";
  return {
    headers: {
      Authorization: `${token}`,
    },
  };
};

// inderceptor 
// axios indeceptors
// stopped due to jwt issue

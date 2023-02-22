import React from "react";
import { BrowserRouter } from "react-router-dom";
import Wrapper from "./pages/Wrapper";
import { Provider } from "react-redux";
import Store from "./pages/ReduxToolkit/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <BrowserRouter>
      <Provider store={Store}>
        <GoogleOAuthProvider clientId="1032089324911-iavs2g5720ablsagsnj525v4obh6bg9d.apps.googleusercontent.com">
          <Wrapper />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

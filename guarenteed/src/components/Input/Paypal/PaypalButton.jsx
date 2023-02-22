import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axiosConfig from "../../../config/axiosConfig";
import { setHeader } from "../../../utils/setHeader";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function PaypalButton({ premium }) {
  const toast = useToast();
  const navigate = useNavigate();
  const upGradeasPremium = async () => {
    try {
      const data = await axiosConfig.get("users/get-premium", setHeader());
      if (!data.data.error) {
        toast({
          title: "Transaction Successfully completed",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        premium(true);
        navigate("/");
      } else
        toast({
          title: "Some error occured",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
    } catch (error) {
      console.log(error);
    }
  };
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Guarenteed Premium",
            amount: {
              currency_code: "USD",
              value: 15,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      upGradeasPremium();
    });
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AaVUOhyXa-EcHoXVWvkMIdSlUymIzUFJPfeHZCPgR4D8HivbtX7fYV8A6PPEyRhkpA0-WDkTNWshE-mQ",
      }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(data, actions) => {
          toast({
            title: "Payment Failed Please Retry",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;

import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51PJig404ZzZaYcysTzSMRcLtssHoL1aBJXmz3XYBw8XT8f4PUcxYIk1Jc62QLcxEx0DnVjw5u44eUGQMcKzhdTOy00nJo3128O"
);

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);

  const handleFormSubmit = async (values, actions) => {
    makePayment(values);
    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    console.log("Request Body:", requestBody); // Log the request body to verify email

    try {
      const response = await axios.post("http://localhost:1337/api/orders", requestBody, {
        headers: { "Content-Type": "application/json" },
      });
      const session = response.data;

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error("Stripe error:", error);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order: " + error.message);
    }
  }

  return (
    <Box width="80%" m="100px auto">
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Shipping
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
            <Payment
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: shades.primary[400],
                boxShadow: "none",
                color: "white",
                borderRadius: 0,
                padding: "15px 40px",
              }}
            >
              Place Order
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = yup.object().shape({
  billingAddress: yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    country: yup.string().required("required"),
    street1: yup.string().required("required"),
    street2: yup.string(),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
    zipCode: yup.string().required("required"),
  }),
  shippingAddress: yup.object().shape({
    isSameAddress: yup.boolean(),
    firstName: yup.string().when("isSameAddress", {
      is: false,
      then: () => yup.string().required("required"),
    }),
    lastName: yup.string().when("isSameAddress", {
      is: false,
      then: () => yup.string().required("required"),
    }),
    country: yup.string().when("isSameAddress", {
      is: false,
      then: () => yup.string().required("required"),
    }),
    street1: yup.string().when("isSameAddress", {
      is: false,
      then: () => yup.string().required("required"),
    }),
    street2: yup.string(),
    city: yup.string().when("isSameAddress", {
      is: false,
      then: () => yup.string().required("required"),
    }),
    state: yup.string().when("isSameAddress", {
      is: false,
      then: () => yup.string().required("required"),
    }),
    zipCode: yup.string().when("isSameAddress", {
      is: false,
      then: () => yup.string().required("required"),
    }),
  }),
  email: yup.string().email("Invalid email").required("required"),
  phoneNumber: yup.string().required("required"),
});

export default Checkout;

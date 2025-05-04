import React, { useEffect, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../../context/AuthContext";

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  building: yup.string().required("Building is required"),
  city: yup.string().required("City is required"),
  zip: yup.string().required("ZIP code is required"),
});

function CheckoutForm({ isGuest, prefilledData = {}, children }) {
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    setValue,
    formState: { errors },
  } = methods;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!isGuest && user) {
      setValue(
        "name",
        `${user.user_firstName || ""} ${user.user_lastName || ""}`.trim()
      );
      setValue("email", user.user_email || "");

      if (user.shipment_address) {
        setValue("address", user.shipment_address.address || "");
        setValue("building", user.shipment_address.building || "");
        setValue("city", user.shipment_address.city || "");
        setValue("zip", user.shipment_address.zipCode || "");
      }
    } else if (prefilledData) {
      Object.entries(prefilledData).forEach(([key, value]) => {
        setValue(key, value || "");
      });
    }
  }, [isGuest, user, prefilledData, setValue]);

  return (
    <FormProvider {...methods}>
      <div className="checkout-form">
        <h3>{isGuest ? "Guest Checkout" : "Billing Information"}</h3>

        <label>Full Name</label>
        <input {...register("name")} />
        <span className="error">{errors.name?.message}</span>

        <label>Email</label>
        <input {...register("email")} />
        <span className="error">{errors.email?.message}</span>

        <label>Address</label>
        <input {...register("address")} />
        <span className="error">{errors.address?.message}</span>

        <label>Building</label>
        <input {...register("building")} />
        <span className="error">{errors.building?.message}</span>

        <label>City</label>
        <input {...register("city")} />
        <span className="error">{errors.city?.message}</span>

        <label>ZIP Code</label>
        <input {...register("zip")} />
        <span className="error">{errors.zip?.message}</span>

        {children}
      </div>
    </FormProvider>
  );
}

export default CheckoutForm;

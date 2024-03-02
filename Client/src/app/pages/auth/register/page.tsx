"use client";
import Alert from 'react-bootstrap/Alert';
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar/page";
import { useFormik } from "formik";
import { useRouter } from 'next/navigation'
const registerSchema = yup.object({
  name: yup.string().min(3).max(10).required("Please Enter the name "),
  email: yup.string().email().required("Please Enter the email "),
  password: yup.string().min(3).max(10).required("Please Enter the password "),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
  dateOfBirth: "",
};

export default function Register() {
  const router = useRouter()

  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { values, handleChange, touched, handleBlur, handleSubmit, errors } =
    useFormik({
      validationSchema: registerSchema,
      initialValues: initialValues,
      onSubmit: async (values) => {
        try {
          const response = await fetch("http://localhost:5000/api/auth/sendOtp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
        // console.log(response)
          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            if (response.status === 201) {
              setAlertVariant("success");
              setAlertMessage(data.message);
              setTimeout(() => {
                router.push('/pages/auth/reset/registerOtp')

              }, 1500);
            } else if (response.status === 200) {
              setAlertVariant("danger");
              setAlertMessage(data.message);
            }
          } else {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error during signup:", error);
          setAlertVariant("danger");
          setAlertMessage(
            "An error occurred during signup. Please try again later."
          );
        }
        
      },
    });

  return (
    <>
      <Navbar />
      {alertMessage && (
          <Alert className='container my-1' variant={alertVariant} onClose={() => setAlertMessage("")} dismissible>
            {alertMessage}
          </Alert>
        )}
      <div className="container my-5">
        <h1 className="mx-auto my-1" style={{ width: "200px" }}>
          Register
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Name
            </label>
            <input
              id="text"
              type="text"
              className="form-control"
              name="name"
              aria-describedby="emailHelp"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelp"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}{" "}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <div className="text-danger">{errors.password}</div>
            ) : null}
          </div>
          <label htmlFor="dateOfBirth" className="form-label">
            Date Of Birth
          </label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            id="dateOfBirth"
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-describedby="emailHelp"
          />

          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </form>

       
      </div>
    </>
  );
}

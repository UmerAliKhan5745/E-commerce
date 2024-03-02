"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation'

export default function EmailOtpInputPage() {
  const router = useRouter()

  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [formData, setFormData] = useState({
    email: "",
    OTP: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      let data = await response.json();
      console.log(data);
    
      if (response.ok) {
        // If the response is successful (status code 200-299)
        setAlertVariant("success");
        setAlertMessage(data.message);
        setTimeout(() => {
          router.push('/pages/auth/login')

        }, 500);
      } else {
        // If the response is not successful
        setAlertVariant("danger");
        setAlertMessage(data.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setAlertVariant("danger");
      setAlertMessage("An error occurred during form submission. Please try again later.");
    }
    
  };

  return (
    <div className="container d-flex flex-column my-5 align-items-center">
      <h2 className="my-5">Enter The OTP</h2>
      {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control 
            type="email" 
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="OTP">
          <Form.Control 
            type="text" 
            placeholder="Enter OTP"
            name="OTP"
            value={formData.OTP}
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button className="my-3" variant="success" type="submit">Verify</Button>
      </Form>
    </div>
  );
};

"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../middleware/protectedRoute";
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

export default function Hoddies() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState("loading");

  useEffect(() => {
    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated");
    };
    checkAuthentication();
  }, []);

  if (authenticated === "loading") {
    return <div>Loading..</div>;
  }
  if (authenticated === "accessing") {
    return (
      <>
        <Navbarr />
        <h1 style={{ textAlign: "center", margin: "15px" }}>Tshirts Verity</h1>
        <div className="m-auto row container">
          <Card
            style={{ width: "13rem", margin: "15px auto" }}
            className="shadow"
          >
            <Card.Img
              variant="top"
              src="https://m.media-amazon.com/images/I/61iN0JzTzrL._AC_UL800_FMwebp_QL65_.jpg"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quick.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card
            style={{ width: "13rem", margin: "15px auto" }}
            className="shadow"
          >
            <Card.Img
              variant="top"
              src="https://m.media-amazon.com/images/I/61iN0JzTzrL._AC_UL800_FMwebp_QL65_.jpg"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quick.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card
            style={{ width: "13rem", margin: "15px auto" }}
            className="shadow"
          >
            <Card.Img
              variant="top"
              src="https://m.media-amazon.com/images/I/61iN0JzTzrL._AC_UL800_FMwebp_QL65_.jpg"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quick.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
        <hr />
        <Footer />
      </>
    );
  } else {
   
    return   router.push("/pages/auth/login");
  }
}

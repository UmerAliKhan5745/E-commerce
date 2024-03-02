"use client";
import { useRouter } from "next/navigation";
import React, { useState, useLayoutEffect } from "react";
import { isAuthenticated } from "../../middleware/protectedRoute";
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { Card, Button } from "react-bootstrap";

export default function Stickers() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState("loading");
  useLayoutEffect(() => {
    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authentication");
    };
    checkAuthentication();
  }, []);
  if (authenticated === "loading") {
    return <div>Loading...</div>;
  }
  if (authenticated === "accessing") {
    return (
      <>
       <Navbarr/>
        <h1 style={{ textAlign: "center", margin: "15px" }}>Tshirts Verity</h1>
        <div className="m-auto row container  ">
          <Card
            style={{ width: "13rem", margin: " 15px auto" }}
            className="shadow"
          >
            <Card.Img
              variant="top"
              src="https://m.media-amazon.com/images/I/71x-r5k3qHL._AC_UL800_FMwebp_QL65_.jpg"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quic.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
        <hr />
        <Footer />
      </>
    );
  } else {
    return router.push("/pages/auth/login");
  }
}

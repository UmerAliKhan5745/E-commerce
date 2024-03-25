"use client"
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { isAuthenticated } from "@/app/middleware/protectedRoute";
import axios from "axios";
import { fetchTshirtsSuccess } from "@/app/features/tshirts/tshirtsSlice";

// Define interface for sticker
interface sticker {
  _id: number;
  name: string;
  description: string;
  imageUrl: string;
}

// Component function
export default function Tshirts() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState("loading");

  // Fetch stickers data and authenticate user on component mount
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product/sticker');
        console.log(response)
        dispatch(fetchTshirtsSuccess(response.data));
      } catch (err) {
        console.error('Failed to fetch sticker:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated"); // Fixed state value
    };

    checkAuthentication();
    //  return()=> will asked by HS
    fetchData();
  }, [dispatch]);

  // Get stickers from Redux store
  const stickers = useSelector((state: any) => state.tshirts);

  // Function to handle Buy Now button click
  const handleBuyNowClick = (productId: number) => {
    router.push(`/product-details/${productId}`);
  };

  // Render logic based on authentication state
  if (authenticated === "loading") {
    return <div>Loading...</div>;
  }
  if (authenticated === "accessing") {
    return (
      <>
        <Navbarr />
        <h1 style={{ textAlign: "center", margin: "15px" }}>stickers Variety</h1>
        <div className="m-auto row container">
          {stickers.map((sticker: sticker) => (
            <Card key={sticker._id} style={{ width: "13rem", margin: "15px auto", height: "55vh", padding: "15px" }} className="shadow">
              <Card.Img variant="top" src={sticker.imageUrl} />
              <Card.Body>
                <Card.Title>{sticker.name}</Card.Title>
                <Card.Text>{sticker.description}</Card.Text>
                <Button variant="primary" onClick={() => handleBuyNowClick(sticker._id)}>Buy Now</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
        <hr />
        <Footer />
        <style jsx>{`
          .container {
            min-height: calc(100vh - 150px);
            position: relative;
          }
        `}</style>
      </>
    );
  } else {
    return router.push("/pages/auth/login"); // Redirect user to login page if not authenticated
  }
}

// Hoodies.tsx
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
import { fetchHoodiesSuccess } from "@/app/features/hoddies/hoodiesSlice";
// Define interface for hoodie
interface Hoodie {
  _id: number;
  name: string;
  description: string;
  imageUrl: string;
}

// Component function
export default function Hoodies() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState("loading");

  // Fetch hoodies data and authenticate user on component mount
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product/hoodie');
        console.log(response )
        dispatch(fetchHoodiesSuccess(response.data)); // Dispatch the action to update the Redux store
      } catch (err) {
        console.error('Failed to fetch hoodies:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated"); // Fixed state value
    };

    checkAuthentication();
    
    fetchData();
  }, [dispatch]);

  // Get hoodies from Redux store
  const hoodies = useSelector((state: any) => state.hoodies); // Assuming you have set up hoodies reducer correctly
console.log(hoodies ,'umerali')
  // Function to handle Buy Now button click
  const handleBuyNowClick = (productId: number) => {
    router.push(`ProductDetails/${productId}`);
  };

  // Render logic based on authentication state
  if (authenticated === "loading") {
    return <div>Loading...</div>;
  }
  if (authenticated === "accessing") {
    return (
      <>
        <Navbarr />
        <h1 style={{ textAlign: "center", margin: "15px" }}>Hoodies Variety</h1>
        <div className="m-auto row container">
          {hoodies.map((hoodie: Hoodie) => (
            <Card key={hoodie._id} style={{ width: "13rem", margin: "15px auto", height: "55vh", padding: "15px" }} className="shadow">
              <Card.Img variant="top" src={hoodie.imageUrl} />
              <Card.Body>
                <Card.Title>{hoodie.name}</Card.Title>
                <Card.Text>{hoodie.description}</Card.Text>
                <Button variant="primary" onClick={() => handleBuyNowClick(hoodie._id)}>Buy Now</Button>
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

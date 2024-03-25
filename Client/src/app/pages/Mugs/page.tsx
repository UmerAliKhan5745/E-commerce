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
import { fetchmugsSuccess } from "@/app/features/mugs/mugSlice"; // Import your fetchMugsSuccess action

// Define interface for mug
interface Mug {
  _id: number;
  name: string;
  description: string;
  imageUrl: string;
}

// Component function
export default function Mugs() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState("loading");

  // Fetch mugs data and authenticate user on component mount
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product/mug');
        console.log(response )
        dispatch(fetchmugsSuccess(response.data)); // Dispatch the action to update the Redux store
      } catch (err) {
        console.error('Failed to fetch mugs:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated"); // Fixed state value
    };

    checkAuthentication();
    
    fetchData();
  }, [dispatch]);

  // Get mugs from Redux store
  const mugs = useSelector((state: any) => state.mugs); // Assuming you have set up mugs reducer correctly

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
        <h1 style={{ textAlign: "center", margin: "15px" }}>Mugs Variety</h1>
        <div className="m-auto row container">
          {mugs.map((mug: Mug) => (
            <Card key={mug._id} style={{ width: "13rem", margin: "15px auto", height: "55vh", padding: "15px" }} className="shadow">
              <Card.Img variant="top" src={mug.imageUrl} />
              <Card.Body>
                <Card.Title>{mug.name}</Card.Title>
                <Card.Text>{mug.description}</Card.Text>
                <Button variant="primary" onClick={() => handleBuyNowClick(mug._id)}>Buy Now</Button>
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

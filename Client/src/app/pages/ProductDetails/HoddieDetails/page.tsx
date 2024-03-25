"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { useSelector } from 'react-redux';
import { isAuthenticated } from "@/app/middleware/protectedRoute";

function Page() {
  const [authenticated, setAuthenticated] = useState("loading");
  const hoodiesid = useSelector((state) => state.hoodies.selectedHoodieId);
  const [hoodiesData, sethoodiesData] = useState(null); // State to store fetched t-shirt data

  // Fetch t-shirts data and authenticate user on component mount
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/hoodiedetails/:${hoodiesid}`);
        sethoodiesData(response.data);
      } catch (err) {
        console.error('Failed to fetch tshirts:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated"); // Fixed state value
    };

    checkAuthentication();
    fetchData();
  }, [hoodiesid]);

  if (authenticated === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container">
      <Navbarr />
      <div className="content">
        {authenticated === "accessing" ? (
          <>
            {/* Render t-shirt data for authenticated users */}
            <h2>T-Shirt Details</h2>
            <div>
              <p>Name: {hoodiesData && hoodiesData.name}</p>
              <p>Description: {hoodiesData && hoodiesData.description}</p>
              <img src={hoodiesData && hoodiesData.imageUrl} alt={hoodiesData && hoodiesData.name} />
            </div>
          </>
        ) : (
          <div>Please log in to view hoodies details.</div>
        )}
      </div>
      <Footer />
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .content {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export default Page;

"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { useSelector } from 'react-redux';
import { isAuthenticated } from "@/app/middleware/protectedRoute";

function Page() {
  const [authenticated, setAuthenticated] = useState("loading");
  const mugid = useSelector((state) => state.mugs.selectedMugId);
  const [mugData, setTmugData] = useState(null); // State to store fetched t-shirt data

  // Fetch t-shirts data and authenticate user on component mount
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/mugdetails/:${mugid}`);
        setTmugData(response.data);
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
  }, [mugid]);

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
            <h2>Mugs Details</h2>
            <div>
              <p>Name: {mugData && mugData.name}</p>
              <p>Description: {mugData && mugData.description}</p>
              <img src={mugData && mugData.imageUrl} alt={mugData && mugData.name} />
            </div>
          </>
        ) : (
          <div>Please log in to view Mugs details.</div>
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

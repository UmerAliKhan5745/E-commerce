"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { useSelector } from 'react-redux';
import { isAuthenticated } from "@/app/middleware/protectedRoute";

function Page() {
  const [authenticated, setAuthenticated] = useState("loading");
  const stickerid = useSelector((state) => state.stickers.selectedStickerId);
  const [stickertData, setTstickerData] = useState(null); // State to store fetched t-shirt data

  // Fetch t-shirts data and authenticate user on component mount
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/stickerdetails/:${stickerid}`);
        setTstickerData(response.data);
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
  }, [stickerid]);

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
            <h2>Sticker Details</h2>
            <div>
              <p>Name: {stickertData && stickertData.name}</p>
              <p>Description: {stickertData && stickertData.description}</p>
              <img src={stickertData && stickertData.imageUrl} alt={stickertData && stickertData.name} />
            </div>
          </>
        ) : (
          <div>Please log in to view Sticker details.</div>
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

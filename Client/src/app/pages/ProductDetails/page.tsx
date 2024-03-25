"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { useSelector } from "react-redux";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface Props {
  productId: number; // Define the productId as a prop
}

function ProductDetails({ productId }: Props) {
  const router = useRouter();

  // Get tshirts from Redux store
  const tshirts = useSelector((state: any) => state.tshirts);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        try {
          const response = await fetch(`http://localhost:5000/api/product/tshirtsdetails/${productId}`);
          if (response.ok) {
            const productData: Product = await response.json();
            setProduct(productData);
          } else {
            console.error("Failed to fetch product details");
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <Navbarr />
      <div className="container mt-5">
        {product ? (
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            {/* Add more product details here */}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
      <style jsx>{`
        .container {
          min-height: calc(100vh - 150px);
          position: relative;
        }
      `}</style>
    </>
  );
}

export default ProductDetails;

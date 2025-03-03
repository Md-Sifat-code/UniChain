import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navabr_Home from "../Home/Home_component/Navabr_Home";

const API_BASE_URL = import.meta.env.VITE_api_url;

interface FoodItem {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  quantity: string;
  imageUrl: string;
}

interface RestaurantDetails {
  id: number;
  name: string;
  description: string;
  location: string;
  contactNumber: string;
  contactNumber2: string;
  email: string;
  isOpen: string;
  imageUrl: string;
  foodItems: FoodItem[];
}

const Canteen_Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/Restaurant/${id}`)
      .then((response) => {
        setRestaurant(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
        setError("Failed to load restaurant details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <section className="min-h-screen bg-[#f0f0f0]">
      <div className="container mx-auto p-6">
        <Navabr_Home />

        {/* Restaurant Details */}
        <div className="flex flex-col lg:flex-row shadow-2xl rounded-2xl bg-white gap-12 mt-12 px-4 py-8">
          <img
            src={restaurant?.imageUrl}
            alt={restaurant?.name}
            className="w-[200px]  h-[200px] object-cover rounded-lg shadow-xl "
          />
          <div>
            <h2 className="text-3xl poppin font-semibold text-gray-800">
              {restaurant?.name}
            </h2>
            <p className="text-gray-600 mt-2">{restaurant?.description}</p>
            <p className="text-gray-600 mt-2">
              <strong>📍 Location:</strong> {restaurant?.location}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>📞 Contact:</strong> {restaurant?.contactNumber}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>✉️ Email:</strong> {restaurant?.email}
            </p>
            <p
              className={`text-lg font-semibold mt-2 ${
                restaurant?.isOpen === "open"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {restaurant?.isOpen.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Food Section */}
        <div className="mt-16">
          <h1 className="text-3xl font-bold text-gray-800">
            🍽️ Available Food Items
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
            {restaurant?.foodItems.map((food) => (
              <motion.div
                key={food.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {food.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {food.shortDescription}
                  </p>
                  <p className="text-gray-700 font-medium mt-2">
                    <strong>Quantity:</strong> {food.quantity}
                  </p>
                  <p className="text-green-600 font-semibold mt-2 text-lg">
                    ৳ {food.price.toFixed(2)}
                  </p>
                  <div className="mt-4 flex justify-between">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                      Order Now
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition">
                      Preorder
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Canteen_Details;

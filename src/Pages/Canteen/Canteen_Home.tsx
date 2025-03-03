import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Navabr_Home from "../Home/Home_component/Navabr_Home";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_api_url;
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/200";

interface Restaurant {
  id: number;
  name: string;
  imageUrl: string;
}

interface FoodItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const Canteen_Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const [featuredFoods, setFeaturedFoods] = useState<FoodItem[]>([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState<boolean>(true);
  const [loadingFoods, setLoadingFoods] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  // Fetch restaurants
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/Restaurant`)
      .then((response) => {
        const restaurantData = response.data.map((restaurant: any) => ({
          id: restaurant.id,
          name: restaurant.name,
          imageUrl: restaurant.imageUrl
            ? restaurant.imageUrl
            : PLACEHOLDER_IMAGE,
        }));

        setRestaurants(restaurantData);
        setFilteredRestaurants(restaurantData);
        setLoadingRestaurants(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants");
        setLoadingRestaurants(false);
      });
  }, []);

  // Fetch featured foods
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/FoodItem`)
      .then((response) => {
        const foods = response.data.map((food: any) => ({
          id: food.id,
          name: food.name,
          price: food.price,
          imageUrl: food.imageUrl ? food.imageUrl : PLACEHOLDER_IMAGE,
        }));

        setFeaturedFoods(foods);
        setLoadingFoods(false);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
        setError("Failed to load featured foods");
        setLoadingFoods(false);
      });
  }, []);

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter restaurants based on search query
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query)
    );
    setFilteredRestaurants(filtered);
  };
  const handleRestaurantClick = (id: number) => {
    navigate(`/canteen/restaurant/${id}`); // Navigate to restaurant details page
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <motion.div className="bg-gray-200 animate-pulse rounded-lg shadow-md overflow-hidden h-52">
      <div className="h-40 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      </div>
    </motion.div>
  );
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust scrolling distance
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bgland">
      <div className="container mx-auto p-6">
        {/* Navbar */}
        <Navabr_Home />

        {/* Search Bar */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center cancard shadow-md rounded-[18px] p-2 w-full max-w-7xl">
            <FaSearch className="text-gray-500 ml-3" />
            <input
              type="text"
              placeholder="Search for restaurants..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 outline-none text-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* Restaurants Section */}
        <div className="mt-8 relative">
          <h2 className="text-3xl poppin mb-10 font-semibold text-gray-800 roboto">
            Checkout Restaurants
          </h2>

          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {filteredRestaurants.length === 0 &&
            !loadingRestaurants &&
            !error && (
              <p className="text-center text-gray-600 mt-4">
                No restaurants found.
              </p>
            )}

          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-56 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition z-10"
          >
            <FaChevronLeft className="text-red-600" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 mt-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 no-scrollbar"
          >
            {loadingRestaurants
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : filteredRestaurants.map((restaurant) => (
                  <motion.div
                    key={restaurant.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer snap-start flex-shrink-0 
                     w-[calc(100%-1rem)] sm:w-[calc(100%/1-1rem)] md:w-[calc(100%/2-1rem)] lg:w-[calc(100%/3-1rem)]"
                    onClick={() => handleRestaurantClick(restaurant.id)}
                  >
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      className="w-full h-72 object-cover"
                    />
                  </motion.div>
                ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-56 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition z-10"
          >
            <FaChevronRight className="text-red-600" />
          </button>
        </div>

        {/* Featured Food Section */}
        <div className="mt-24">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl poppin mb-10 font-semibold text-gray-800">
              Featured Food
            </h2>
          </div>

          {/* Food Cards or Skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-4">
            {loadingFoods
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : featuredFoods.map((food) => (
                  <motion.div
                    key={food.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  >
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-start items-start">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {food.name}
                      </h3>
                      <span className="text-green-600 font-semibold">
                        {food.price.toFixed(2)}
                        <span className="text-red-600 px-1">tk</span>
                      </span>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Canteen_Home;

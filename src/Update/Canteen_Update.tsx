import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_api_url;

const Canteen_Update: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the restaurant id from the URL
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    shortDescription: "",
    ingredients: "",
    preparationMethod: "",
    quantity: "",
    available: true,  // boolean for availability
    image: null as File | null,  // file for the image
  });

  // Handle input changes (works for input, textarea, and select)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox for availability toggle (boolean)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      available: checked, // true if checked, false if unchecked
    }));
  };

  // Handle file upload (image)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      console.error("Restaurant ID is missing.");
      return;
    }

    // Create a FormData object to send the form data including file
    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price.toString());
    form.append("shortDescription", formData.shortDescription);
    form.append("ingredients", formData.ingredients);
    form.append("preparationMethod", formData.preparationMethod);
    form.append("quantity", formData.quantity);
    form.append("available", formData.available.toString());
    form.append("restaurantId", id); // Only append if id is valid
    if (formData.image) {
      form.append("image", formData.image); // Append the image file
    }

    // Send a POST request to add a new food item with form data
    axios
      .post(`${API_BASE_URL}/FoodItem/add`, form)
      .then((response) => {
        console.log("Food item added successfully:", response.data);
        // Redirect back to the restaurant details page after success
        navigate(`/canteen`);
      })
      .catch((error) => {
        console.error("Error adding food item:", error);
      });
  };

  return (
    <section className="min-h-screen bg-[#f0f0f0]">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Food Item</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-gray-700 font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price" className="block text-gray-700 font-semibold">
                Price (৳)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="form-group">
            <label htmlFor="shortDescription" className="block text-gray-700 font-semibold">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Ingredients */}
          <div className="form-group">
            <label htmlFor="ingredients" className="block text-gray-700 font-semibold">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Preparation Method */}
          <div className="form-group">
            <label htmlFor="preparationMethod" className="block text-gray-700 font-semibold">
              Preparation Method
            </label>
            <textarea
              id="preparationMethod"
              name="preparationMethod"
              value={formData.preparationMethod}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label htmlFor="quantity" className="block text-gray-700 font-semibold">
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Available (Boolean Checkbox) */}
          <div className="form-group">
            <label htmlFor="available" className="block text-gray-700 font-semibold">
              Available
            </label>
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleCheckboxChange}
              className="mt-2"
            />
            <span className="ml-2 text-gray-700">Available</span>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="image" className="block text-gray-700 font-semibold">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add Food Item
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Canteen_Update;

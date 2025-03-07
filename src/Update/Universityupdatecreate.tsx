import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Universityupdatecreate: React.FC = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    time: '',
    description: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the fields are filled
    const { time, description } = formData;
    if (!time || !description) {
      alert('Please fill in both fields');
      return;
    }

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_api_url}/universityUpdate/create`,
        {
          time,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Set the content type to application/json
          },
        }
      );

      if (response.status === 200) {
        // On successful submission, navigate to the previous page or a success page
        console.log('University update created successfully!');
        navigate('/updateandannounce'); // You can replace this with any route you want to navigate to
      }
    } catch (error) {
      console.error('Error creating university update:', error);
      alert('There was an error while creating the university update. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Create University Update</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="time">
            Time of Event
          </label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter event time"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter event description"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create University Update
        </button>
      </form>
    </div>
  );
};

export default Universityupdatecreate;

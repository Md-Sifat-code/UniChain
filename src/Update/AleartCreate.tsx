import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Import the loading spinner icon

const AleartCreate: React.FC = () => {
  const navigate = useNavigate();

  // State for the form fields
  const [formData, setFormData] = useState({
    alertType: '',
    alertDescription: '',
    time: '',
  });

  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
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
    const { alertType, alertDescription, time } = formData;
    if (!alertType || !alertDescription || !time) {
      alert('Please fill in all fields');
      return;
    }

    // Set loading state to true
    setIsLoading(true);

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_api_url}/emergencyAlert/create`,
        {
          alertType,
          alertDescription,
          time,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Set the content type to application/json
          },
        }
      );

      if (response.status === 200) {
        // On successful submission, navigate to the alert list or any other page
        console.log('Alert created successfully!');
        navigate('/updateandannounce'); // You can replace this with the route you want
      }
    } catch (error) {
      console.error('Error creating alert:', error);
      alert('There was an error while creating the alert. Please try again.');
    } finally {
      // Set loading state to false after the request completes
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Create Emergency Alert</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="alertType">
            Alert Type
          </label>
          <input
            type="text"
            id="alertType"
            name="alertType"
            value={formData.alertType}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter alert type"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="alertDescription">
            Alert Description
          </label>
          <textarea
            id="alertDescription"
            name="alertDescription"
            value={formData.alertDescription}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter alert description"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="time">
            Time of Alert
          </label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter alert time"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? (
            <FaSpinner className="animate-spin mr-2" /> // Show loading spinner if loading
          ) : (
            'Create Alert'
          )}
        </button>
      </form>
    </div>
  );
};

export default AleartCreate;

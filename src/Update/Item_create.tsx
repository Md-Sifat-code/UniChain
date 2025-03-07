import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Item_create: React.FC = () => {
  const navigate = useNavigate();

  // State for the form fields
  const [formData, setFormData] = useState({
    name: '',
    contacts: '',
    picture: null as File | null,
    description: '',
  });

  // State to manage the submission status (to disable the button while submitting)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file change for the picture input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      picture: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, contacts, picture, description } = formData;

    if (!picture) {
      alert("Please upload a picture");
      return;
    }

    // Set the submitting state to true when the request starts
    setIsSubmitting(true);

    // Create FormData to send the file and text data together
    const formPayload = new FormData();
    formPayload.append('name', name);
    formPayload.append('contacts', contacts);
    formPayload.append('description', description);
    formPayload.append('picture', picture);

    try {
      const response = await axios.post(`${import.meta.env.VITE_api_url}/LostAndFound/add/create`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for file uploads
        },
      });

      if (response.status === 200) {
        console.log('Item created successfully!');
        navigate('/lostandfound'); // Navigate to /lostandfound after success
      }
    } catch (error) {
      console.error('Error creating item:', error);
    } finally {
      // Reset the submitting state after the request is complete (either success or failure)
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Create Lost & Found Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            User Name Who Found
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter item name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="contacts">
            Contacts
          </label>
          <input
            type="text"
            id="contacts"
            name="contacts"
            value={formData.contacts}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter contact details"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="picture">
            Picture
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleFileChange}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter item description"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Creating Item...' : 'Create Item'}
        </button>
      </form>
    </div>
  );
};

export default Item_create;

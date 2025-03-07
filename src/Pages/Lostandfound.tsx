import React, { useState, useEffect } from 'react';
import Navabr_Home from './Home/Home_component/Navabr_Home';
import { useUser } from '../Authentication/Context_auth/UserContext';
import { FaPlus, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Lostandfound: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Get user details from context
  const isAdmin = user?.roles?.some(
    (role: { roleType: string }) => role.roleType === 'ADMIN'
  );

  // State to store lost and found items
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    
    const fetchLostAndFoundItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_api_url}/LostAndFound`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching Lost and Found items:', error);
      }
    };

    fetchLostAndFoundItems();
  }, []);

  return (
    <section>
      <div className='container mx-auto p-6'>
        <div>
          <Navabr_Home />
        </div>
        <div className='p-6'>
          <div className='flex flex-row items-center justify-between'>
            <h1 className='text-3xl font-bold'>Lost & Found</h1>
            {isAdmin && (
              <button
                className='bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-yellow-700 transition'
                onClick={() => navigate('/lostandfound/create')}
              >
                <FaPlus className='mr-2' /> Add Item
              </button>
            )}
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {/* Mapping through all the items */}
          {items.length === 0 ? (
            <p className='text-center text-xl'>No items found</p>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className='bg-white border rounded-lg shadow-lg overflow-hidden flex flex-col'
              >
                <img
                  src={item.picture || 'default-image-url.jpg'} // Provide a default image if none exists
                  alt={item.name}
                  className='w-full h-48 object-cover'
                />
                <div className='p-4'>
                  <h2 className='text-xl font-semibold'>{item.name}</h2>
                  <p className='text-gray-600'>{item.description}</p>
                  <div className='flex items-center justify-between mt-4'>
                    <div className='flex items-center text-gray-600'>
                      <FaPhoneAlt className='mr-2' />
                      <span>{item.contacts}</span>
                    </div>
                    <div className='flex items-center text-gray-600'>
                      <FaMapMarkerAlt className='mr-2' />
                      <span>Location</span> {/* You can add actual location info if available */}
                    </div>
                  </div>
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Lostandfound;

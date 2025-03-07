import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegCalendarAlt, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import Navabr_Home from './Home/Home_component/Navabr_Home';
import { useUser } from '../Authentication/Context_auth/UserContext';
import { useNavigate } from 'react-router-dom';

interface UniversityUpdate {
  sl: number | null;
  time: string;
  description: string;
}

interface EmergencyAlert {
  sl: number | null;
  alertType: string;
  alertDescription: string;
  time: string;
}

const UpdateandAnnounce: React.FC = () => {
  const [universityUpdates, setUniversityUpdates] = useState<UniversityUpdate[]>([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([]);
  const { user } = useUser(); // Get user details from context
  const navigate = useNavigate();
  const isAdmin = user?.roles?.some(
    (role: { roleType: string }) => role.roleType === "ADMIN"
  );

  // Fetch university updates
  const fetchUniversityUpdates = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_api_url}/universityUpdate`);
      setUniversityUpdates(response.data);
    } catch (error) {
      console.error("Error fetching university updates:", error);
    }
  };

  // Fetch emergency alerts
  const fetchEmergencyAlerts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_api_url}/emergencyAlert`);
      setEmergencyAlerts(response.data);
    } catch (error) {
      console.error("Error fetching emergency alerts:", error);
    }
  };

  useEffect(() => {
    fetchUniversityUpdates();
    fetchEmergencyAlerts();
  }, []);

  return (
    <section className="bg-gray-50 p-6">
      <div>
        <Navabr_Home />
      </div>
      
      <div className="container mx-auto p-6 flex flex-col gap-12 md:flex-row">
        
        {/* University Updates */}
        <div className="mb-12">
          <div className='flex flex-row items-center justify-between'>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">University Updates</h2>
            {isAdmin && (
              <button
                onClick={() => navigate(`/updateandannounce/create`)}
                className="bg-blue-600 text-white px-4 ml-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                ADD Update
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {universityUpdates.map((update) => (
              <div key={update.sl} className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaRegCalendarAlt className="text-gray-500 mr-2" />
                    <span className="text-lg font-medium text-gray-700">{update.time}</span>
                  </div>
                  <p className="text-gray-600">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Alerts */}
        <div>
          <div className='flex flex-row items-center justify-between'>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Alerts</h2>
            {isAdmin && (
              <button
                onClick={() => navigate(`/updateandannounce/alert/create`)}
                className="bg-blue-600 text-white px-4 ml-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                ADD Alert
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {emergencyAlerts.map((alert) => (
              <div key={alert.sl} className="bg-red-100 rounded-lg shadow-lg border border-red-200 hover:shadow-xl transition duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaExclamationTriangle className="text-red-600 mr-2" />
                    <span className="text-lg font-medium text-red-700">{alert.alertType}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{alert.alertDescription}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-2" />
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateandAnnounce;

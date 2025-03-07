import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navabr_Home from "./Home/Home_component/Navabr_Home";

const Emailme: React.FC = () => {
  const { facultyId } = useParams(); // Get facultyId from URL params
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      id,
      email,
      phone,
      text: message,
    };

    try {
      const response = await fetch(
        `https://unichain-we9e.onrender.com/Faculty/${facultyId}/sifat/4/codewithsifat4%40gmail.com/01762746646/HI`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      setSuccess(false);
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
        <div>
            <Navabr_Home/>
        </div>
      <h1 className="text-3xl font-bold text-center mb-6">Send Email</h1>

      {success !== null && (
        <div
          className={`mb-4 p-4 rounded ${
            success ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {success ? "Email sent successfully!" : "Failed to send email."}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Your ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Your Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>
    </div>
  );
};

export default Emailme;

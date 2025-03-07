import React, { useState } from "react";
import Navabr_Home from "./Home_component/Navabr_Home";
import Hero from "./Home_component/Hero";
import Home_Navigation from "./Home_component/Home_Navigation";
import { BsRobot } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa"; // Add the microphone icon
import { useUser } from "../../Authentication/Context_auth/UserContext"; // Import useUser to get logged-in user info

const Home: React.FC = () => {
  const { user } = useUser(); // Get user data from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Create a reference to SpeechRecognition
  const SpeechRecognition =
    window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.lang = "en-US"; // Set the language
    recognition.interimResults = true; // Show interim results
    recognition.maxAlternatives = 1; // Only take the first recognized speech result
  }

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" && user) {
      const userId = user.id; // Get user ID
      setMessages((prevMessages) => [...prevMessages, `You: ${newMessage}`]);
      setNewMessage("");

      // Show "AI is thinking..." message
      setMessages((prevMessages) => [...prevMessages, `AI: Thinking...`]);

      try {
        const encodedQuery = encodeURIComponent(newMessage.trim());
        const apiUrl = `https://unichain-we9e.onrender.com/ai/interest/question/${userId}/${encodedQuery}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            `Error: ${response.statusText}`,
          ]);
          return;
        }

        const data = await response.text();

        // Replace "AI is thinking..." with actual response, preserving spaces
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          const lastMessageIndex = newMessages.lastIndexOf("AI: Thinking...");
          if (lastMessageIndex !== -1) {
            newMessages[lastMessageIndex] = `AI:\n${data}`; // Keep formatting intact
          }
          return newMessages;
        });
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          "Error: Failed to get AI response.",
        ]);
      }
    }
  };

  const handleStartRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setNewMessage(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  };

  return (
    <section className="bgland relative">
      <div className="container bgland mx-auto min-h-screen">
        <div>
          <Navabr_Home />
        </div>
        <div>
          <Hero />
        </div>
        <div>
          <Home_Navigation />
        </div>

        {/* Floating Robot Button */}
        <button
          className="fixed bottom-4 right-2 bg-blue-600 text-white p-4 rounded-full flex flex-col items-center shadow-lg hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <BsRobot size={50} />
        </button>
        

        {/* Modal for Chatbot */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-[18px] shadow-xl w-full md:w-2/3 lg:w-1/2 p-6"
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="flex flex-row items-center border-b border-gray-300 py-2 gap-2">
                  <BsRobot className="text-blue-800 text-6xl" />
                  <span className="text-sm text-gray-600">
                    I know everything about your academic info. Ask me anything,
                    and I'll provide accurate answers based on your details.
                  </span>
                </h2>
                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaTimes className="bg-blue-300 rounded-full p-2" size={36} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Display messages */}
                <div className="overflow-y-auto h-[600px] p-4 rounded-[18px] mb-4 ">
                  {messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.startsWith("You:") ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg my-2 ${
                            msg.startsWith("You:") ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          <pre className="whitespace-pre-wrap">{msg}</pre>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400"></div>
                  )}
                </div>

                {/* Input for new message */}
                <div className="relative flex justify-center items-center">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full md:w-[70%] bg-[#f0f0f0] p-3 pl-4 pr-12 focus:outline-none focus:border-transparent rounded-4xl"
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-2 md:right-20 lg:right-36 bg-[#6F9EF6] font-bold px-2 text-white py-1 rounded-full top-1/2 transform -translate-y-1/2"
                  >
                    Send
                  </button>

                  {/* Microphone Button for Voice Input */}
                  <button
                    onClick={handleStartRecording}
                    className="absolute right-2 bottom-0 p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <FaMicrophone
                      size={30}
                      color={isRecording ? "#ff0000" : "#000"}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;

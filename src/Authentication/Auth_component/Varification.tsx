import React, { useState, useRef } from "react";

const Varification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle OTP input
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace key press
  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgland">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Enter Verification Code
        </h2>
        <p className="text-center text-gray-600 mb-6">
          We sent a 6-digit code to your email. Enter it below.
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el; // ✅ Correctly assigning ref
              }}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg font-semibold focus:border-bgbutton focus:outline-none"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button className="w-full bg-bgbutton text-white font-semibold py-2 rounded-md hover:opacity-90 transition">
          Verify
        </button>

        {/* Resend Code */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Didn't receive the code?{" "}
          <button className="text-blue-500 hover:underline">Resend OTP</button>
        </p>
      </div>
    </div>
  );
};

export default Varification;

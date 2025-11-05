import React, { useState } from "react";
import { forgetpassword } from "../API/UserApi";
import { useLocation } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const location = useLocation();   
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!password || !confirmPassword) {
    setError("Both fields are required.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  try {
    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    const response = await forgetpassword({ token, new_password: password });

    setSuccess("✅ Password reset successful!");
    setPassword("");
    setconfirmPassword("");
  } catch (err: any) {
    console.error("Password reset failed:", err);

    // ✅ Handle backend error object {error: "..."}
    if (err.error) {
      setError(err.error);
    } else if (err.message) {
      setError(err.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
};
    

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2
          style={{     
            background:    
              "linear-gradient(to right, var(--primary-blue), var(--secondary-teal))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="text-center text-2xl font-semibold text-purple-700 mb-6"
        >
          Reset Password
        </h2>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">{error}</p>
        )}   
        {success && (
          <p className="text-green-600 text-sm text-center mb-3">{success}</p>
        )}

        <button
          type="submit"
          style={{
            background: `linear-gradient(to right, var(--primary-blue), var(--secondary-teal))`,
          }}
          className="w-full py-3 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-500 transition-transform transform hover:-translate-y-1"
        >
          Confirm Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

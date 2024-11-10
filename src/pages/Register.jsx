import React, { useState } from "react";
import supabase from "../superbaseClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // navigate
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error message
    setError(null);

    // Attempt to sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    // Handle the response
    if (error) {
      setError(error.message);
      console.log("Error:", error);
    } else {
      console.log("Success:", data);
      alert("Registration successful");
      setFormData({ email: "", password: "" }); // Reset form
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-md mx-auto p-6">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-md font-semibold"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-md font-semibold"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
      {/* Error message */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;

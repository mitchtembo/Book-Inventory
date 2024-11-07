import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    // handle the response
    if (error) {
      setError(error.message);
      console.log(error);
    } else {
      console.log(data);
      alert("Registration successful");
    }
  };
  return (
    <form action="#">
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
          className="w-full p-2 border border-gray-300 rounded-md"
          type="password"
          id="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter your password"
          required
        />
      </div>
      <div className=" items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;

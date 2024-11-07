import React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "lucide-react";
import { LogIn } from "lucide-react";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(formData.email, formData.password);
      navigate("/"); // redirect to homepage after login
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 hidden lg:block bg-cover bg-center bg-no-repeat">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000"
          alt="Login Image Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-500">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="Please Enter your email"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                placeholder="Please Enter your password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                "
                value={FormData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-500 ">
              Don't have an Account?{" "}
              <button
                className="bg-transparent ml-1 px-7 py-1 border-none outline outline-indigo-700 rounded-sm text-gray-600 hover:text-indigo-500"
                onClick={() => navigate("/register")}
              >
                Register Here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

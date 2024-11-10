import React from "react";
import {
  BookOpen,
  Book,
  Database,
  Home,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, signOut, loading } = useAuth();
  console.log(user);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };
  return (
    <>
      <nav className="bg-white shadow-lg flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between h-16 w-full">
            <div className="flex items-center w-full">
              <div className="logo w-1/4 mr-8">
                <Link to="/" className="flex items-center">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                  <span className="text-2xl font-bold text-cyan">MyBooks</span>
                </Link>
              </div>
              <div className="flex w-full items center">
                <div className="flex w-full items-center justify-center -ml-16">
                  {/* show links if user is authenticated */}
                  {user && (
                    <>
                      <Link
                        to="/books"
                        className={`flex items-center space-x-2 pb-2 mr-3 ${
                          isActive("/") ? "border-b-[5px]  border-cyan-300" : ""
                        }`}
                      >
                        <Home className="h-8 w-8 text-indigo-600" />
                        <span className="text-lg font-bold text-cyan">
                          Home
                        </span>
                      </Link>

                      <Link
                        to="/books"
                        className={`flex items-center space-x-2 pb-2 mr-3 ${
                          isActive("/books")
                            ? "border-b-[5px]  border-cyan-300"
                            : ""
                        }`}
                      >
                        <Book className="h-8 w-8 text-indigo-600" />
                        <span className="text-lg font-bold text-cyan">
                          Books
                        </span>
                      </Link>
                      <Link
                        to="/inventory"
                        className={`flex items-center space-x-2 pb-2 mr-3 ${
                          isActive("/inventory")
                            ? "border-b-[5px]  border-cyan-300"
                            : ""
                        }`}
                      >
                        <Database className="h-8 w-8 text-indigo-600" />
                        <span className="text-lg font-bold text-cyan">
                          Inventory
                        </span>
                      </Link>
                    </>
                  )}
                </div>
                {/* if user is not authenticated */}
                {/* {!user && (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 mr-4"
                    >
                      <LogIn className="h-8 w-8 text-indigo-600" />
                      <span className="text-lg font-bold text-cyan">Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center space-x-2 mr-4"
                    >
                      <UserPlus className="h-8 w-8 text-indigo-600" />
                      <span className="text-lg font-bold text-cyan">
                        Register
                      </span>
                    </Link>
                  </>
                )} */}

                {/* if user is authenticated , show logout button */}
                {user && (
                  <button
                    className="flex items-center space-x-2 mr-4"
                    onClick={signOut}
                  >
                    <Link className="flex items-center space-x-2 mr-4">
                      <LogOut className="h-8 w-8 text-indigo-600" />
                      <span className="text-lg font-bold text-cyan">
                        Logout
                      </span>
                    </Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

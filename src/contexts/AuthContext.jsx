import React, { createContext, useEffect, useState, useContext } from "react";
//import { supabase } from "../superbaseClient";
import supabase from "../superbaseClient";

//import superbase from "../lib/superbase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //initialize session
    const initializeSession = async () => {
      const { data: sessionData, error } = supabase.auth.getSession();
      if (error) {
        alert("Error fetching session data");
        console.log("Error fetching session data: ", error);
      }
      setUser(sessionData.session?.user ?? null);
      setLoading(false);
    };

    initializeSession();

    //auth state change listener
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    initializeSession();

    // Cleanup listener on component unmount
    return () => subscription.unsubscribe();
  }, []);

  //Authentication functions
  const signIn = async (email, password) => {
    setLoading(true);
    const { user: authUser, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) throw error;
    setUser(authUser);
  };

  const signUp = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) throw error;
    setUser(data.user);
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useEffect, useState, useContext } from "react";
//import { supabase } from "../superbaseClient";
import supabase from "../superbaseClient";

//import superbase from "../lib/superbase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //implement superbase auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    //check the initial session
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
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
    const { user: authUser, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) throw error;
    setUser(authUser);
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

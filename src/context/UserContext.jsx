import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { apiService } from "../services/api";
import { checkProfileExists } from "../services/profile";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [profileExists, setProfileExists] = useState(null);

  useEffect(() => {
    async function getInitialUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setLoading(false);
        return;
      }

      setUser(data?.user ?? null);

      if (data?.user) {
        const { exists, profile } = await checkProfileExists();
        setProfileExists(exists);
        if (exists) {
          setUserProfile(profile);
        }
      }

      setLoading(false);
    }

    getInitialUser();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      const {
        data: { session },
        error: error2,
      } = await supabase.auth.getSession();
      if (error) {
        setLoading(false);
        return;
      }
      setUser(data?.user ?? null);
      const name =
        data?.user?.user_metadata?.full_name || data?.user?.email || "User";
      setUserName(name);

      if (session) {
        localStorage.setItem("access_token", session.access_token);
      }

      // Fetch or create profile from backend
      if (data?.user) {
        let profile = await apiService.getAuthProfile();
        if (profile?.error) {
          // If not found, create
          profile = await apiService.createAuthProfile({
            full_name: name,
            role: "buyer",
          });
        }
        setUserProfile(profile);
      }
      setLoading(false);
    }

    fetchUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.access_token) {
        localStorage.setItem("access_token", session.access_token);
      }
      if (session?.user) {
        const name =
          session.user.user_metadata?.full_name || session.user.email || "User";
        setUserName(name);
        let profile = await apiService.getAuthProfile();
        if (profile?.error) {
          profile = await apiService.createAuthProfile({
            full_name: name,
            role: "buyer",
          });
        }
        setUserProfile(profile);
      } else {
        setUserProfile(null);
        setUserName("User");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await apiService.getAuthProfile();
      if (data) {
        setUserProfile(data);
        return data;
      }
      return null;
    } catch (error) {
      console.error("UserContext: Exception fetching backend profile:", error);
      return null;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("access_token");
    setUser(null);
    setUserProfile(null);
  };

  const value = {
    user,
    userProfile,
    profileExists,
    userName,
    loading,
    signOut,
    isFarmer: (userProfile?.role || "").toLowerCase() === "farmer",
    isBuyer: (userProfile?.role || "").toLowerCase() === "buyer",
    fetchUserProfile,
    apiService,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserContext };

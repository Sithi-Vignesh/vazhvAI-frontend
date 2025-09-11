import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { apiService } from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    // Get initial user session
    async function getInitialUser() {
      console.log("UserContext: Starting getInitialUser");
      if (supabase) {
        try {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            console.error("Error fetching user:", error);
            setLoading(false);
            return;
          }
          const name = data?.user?.user_metadata?.full_name || "User";
          setUserName(name);
          setUser(data?.user ?? null);

          const {
            data: { session },
            error: error2,
          } = await supabase.auth.getSession();
          if (error2) {
            console.error("Error getting session:", error2);
            setLoading(false);
            return;
          }
          if (session) {
            console.log("JWT:", session.access_token);
            localStorage.setItem("access_token", session.access_token);
          }

          // Removed automatic redirect - let users navigate freely

          // Test API connectivity first
          console.log("UserContext: Testing API connectivity...");
          try {
            const testResponse = await fetch('https://vazhvai-backend.onrender.com/api/health');
            console.log("UserContext: API test response:", testResponse.status);
          } catch (apiError) {
            console.log("UserContext: API test failed:", apiError.message);
          }

          // Fetch user profile logic (optional, as before)
          if (data?.user) {
            console.log("UserContext: User found, attempting to fetch profile");
            let profile = await fetchUserProfile(data.user.id);
            // If profile still not found after both attempts, create a default one
            if (!profile && data.user.email) {
              console.log("UserContext: Profile not found by ID, trying email");
              profile = await fetchUserProfileByEmail(data.user.email);
            }
            // Final fallback - create default profile if still not found
            if (!profile) {
              console.log("UserContext: Creating default profile for user");
              const defaultProfile = {
                id: data.user.id,
                full_name: data.user.user_metadata?.full_name || "User",
                role: "Buyer", // Default role
                address: "Not specified"
              };
              setUserProfile(defaultProfile);
              console.log("UserContext: Default profile set:", defaultProfile);
            }
          }
        } catch (error) {
          console.error("Error getting user:", error);
        } finally {
          console.log("UserContext: Setting loading to false");
          setLoading(false);
        }
      } else {
        console.log("UserContext: No Supabase client");
        setLoading(false);
      }
    }

    getInitialUser();

    // Listen for auth changes
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          console.log("UserContext: Auth state change - user found:", session.user.id);
          // Try to fetch user profile by userId first, then by email as fallback
          let profile = await fetchUserProfile(session.user.id);

          // If profile not found by userId, try by email
          if (!profile && session.user.email) {
            console.log("UserContext: Auth change - trying email fetch");
            profile = await fetchUserProfileByEmail(session.user.email);
          }
          
          // Final fallback - create default profile if still not found
          if (!profile) {
            console.log("UserContext: Creating default profile for user in auth change");
            const defaultProfile = {
              id: session.user.id,
              full_name: session.user.user_metadata?.full_name || "User",
              role: "Buyer", // Default role
              address: "Not specified"
            };
            setUserProfile(defaultProfile);
            console.log("UserContext: Auth change - default profile set:", defaultProfile);
          }
        } else {
          console.log("UserContext: Auth state change - no user, clearing profile");
          setUserProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [navigate]);

  const fetchUserProfile = async (userId) => {
    try {
      console.log("UserContext: Fetching user profile for userId:", userId);
      const { data, error } = await apiService.getUserProfile(userId);

      if (error) {
        console.error(
          "UserContext: Error fetching user profile from backend:",
          error
        );
        // Return default profile if backend fails
        const defaultProfile = {
          id: userId,
          full_name: "User",
          role: "Buyer", // Default role
          address: "Not specified"
        };
        console.log("UserContext: Setting default profile due to error:", defaultProfile);
        setUserProfile(defaultProfile);
        return defaultProfile;
      }

      console.log("UserContext: User profile from backend:", data);
      if (data) {
        setUserProfile(data);
        return data;
      } else {
        // If data is null/undefined, create default profile
        const defaultProfile = {
          id: userId,
          full_name: "User",
          role: "Buyer", // Default role
          address: "Not specified"
        };
        console.log("UserContext: Setting default profile due to null data:", defaultProfile);
        setUserProfile(defaultProfile);
        return defaultProfile;
      }
    } catch (error) {
      console.error("UserContext: Error fetching user profile:", error);
      // Return default profile if backend fails
      const defaultProfile = {
        id: userId,
        full_name: "User",
        role: "Buyer", // Default role
        address: "Not specified"
      };
      console.log("UserContext: Setting default profile due to exception:", defaultProfile);
      setUserProfile(defaultProfile);
      return defaultProfile;
    }
  };

  const fetchUserProfileByEmail = async (email) => {
    try {
      console.log("UserContext: Fetching user profile for email:", email);
      const { data, error } = await apiService.getUserProfileByEmail(email);

      if (error) {
        console.error(
          "UserContext: Error fetching user profile by email from backend:",
          error
        );
        // Return default profile if backend fails
        const defaultProfile = {
          id: "temp-id",
          full_name: "User",
          role: "Buyer", // Default role
          address: "Not specified"
        };
        setUserProfile(defaultProfile);
        return defaultProfile;
      }

      console.log("UserContext: User profile from backend by email:", data);
      setUserProfile(data);
      return data;
    } catch (error) {
      console.error(
        "UserContext: Error fetching user profile by email:",
        error
      );
      // Return default profile if backend fails
      const defaultProfile = {
        id: "temp-id",
        full_name: "User",
        role: "Buyer", // Default role
        address: "Not specified"
      };
      setUserProfile(defaultProfile);
      return defaultProfile;
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
    }
  };

  const value = {
    user,
    userProfile,
    userName,
    loading,
    signOut,
    isFarmer: userProfile?.role === "Farmer",
    isBuyer: userProfile?.role === "Buyer",
    fetchUserProfile,
    fetchUserProfileByEmail,
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

// Export the context for debugging
export { UserContext };
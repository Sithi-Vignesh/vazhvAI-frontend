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

          // Fetch or create user profile via backend auth endpoints
          if (data?.user) {
            console.log("UserContext: Fetching auth profile from backend");
            let fetched = null;
            try {
              const { data: profData, error: profErr } = await apiService.getAuthProfile();
              if (profErr) {
                console.warn("UserContext: getAuthProfile error, will attempt create:", profErr);
              } else if (profData) {
                fetched = profData;
              }
            } catch (e) {
              console.warn("UserContext: getAuthProfile threw:", e);
            }

            if (!fetched) {
              console.log("UserContext: Creating backend profile (first-time or missing)");
              const payload = {
                full_name: data.user.user_metadata?.full_name || "User",
                mobile: data.user.user_metadata?.phone || "",
                address: data.user.user_metadata?.address || "",
                role: "buyer",
              };
              try {
                const { data: createData, error: createErr } = await apiService.createAuthProfile(payload);
                if (createErr) {
                  console.error("UserContext: createAuthProfile error:", createErr);
                  // fallback minimal in-memory profile
                  fetched = {
                    id: data.user.id,
                    email: data.user.email,
                    full_name: payload.full_name,
                    mobile: payload.mobile,
                    address: payload.address,
                    role: payload.role,
                  };
                } else {
                  fetched = createData;
                }
              } catch (e) {
                console.error("UserContext: createAuthProfile threw:", e);
                fetched = {
                  id: data.user.id,
                  email: data.user.email,
                  full_name: payload.full_name,
                  mobile: payload.mobile,
                  address: payload.address,
                  role: payload.role,
                };
              }
            }

            if (fetched) {
              setUserProfile(fetched);
              console.log("UserContext: Backend profile set:", fetched);
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
          // Refresh backend auth profile
          try {
            const { data: profData } = await apiService.getAuthProfile();
            if (profData) setUserProfile(profData);
          } catch (e) {
            console.warn("UserContext: onAuthStateChange getAuthProfile error", e);
          }
        } else {
          console.log("UserContext: Auth state change - no user, clearing profile");
          setUserProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [navigate]);

  const fetchUserProfile = async (_userId) => {
    try {
      console.log("UserContext: Fetching backend auth profile");
      const { data, error } = await apiService.getAuthProfile();

      if (error) {
        console.error("UserContext: getAuthProfile error:", error);
        return null;
      }

      console.log("UserContext: Backend auth profile:", data);
      if (data) {
        setUserProfile(data);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("UserContext: Exception fetching backend profile:", error);
      return null;
    }
  };

  const fetchUserProfileByEmail = async (email) => {
    try {
      console.log("UserContext: Fetching backend auth profile (ignoring email param):", email);
      const { data, error } = await apiService.getAuthProfile();
      if (error) {
        console.error("UserContext: getAuthProfile by email flow error:", error);
        return null;
      }
      if (data) setUserProfile(data);
      return data;
    } catch (error) {
      console.error("UserContext: Exception fetching backend profile (email flow):", error);
      return null;
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
    isFarmer: (userProfile?.role || "").toLowerCase() === "farmer",
    isBuyer: (userProfile?.role || "").toLowerCase() === "buyer",
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
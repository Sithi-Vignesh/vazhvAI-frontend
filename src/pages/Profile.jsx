import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {
  Star,
  Mail,
  Phone,
  MapPin,
  User,
  Shield,
  Package,
  MessageSquare,
} from "lucide-react";

export default function Profile() {
  const { user, userProfile, isFarmer, apiService, profileExists } = useUser();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [authProfile, setAuthProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [formFullName, setFormFullName] = useState("");
  const [formMobile, setFormMobile] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formRole, setFormRole] = useState("buyer");

  const [reviews, setReviews] = useState([]);
  const [crops, setCrops] = useState([]);

  // Use safe objects to prevent undefined errors
  const safeUser = user || {};
  const safeUserProfile = userProfile || {};
  const safeAuthProfile = authProfile || {};

  // Fetch any additional data if needed
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Optionally fetch reviews or crops for farmers
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userProfile, isFarmer, apiService]);

  if (profileExists === null || loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Loading profile...
      </div>
    );
  }

  const handleEditClick = () => {
    if (profileExists) {
      setFormFullName(safeAuthProfile.full_name || safeUserProfile.full_name || safeUser.user_metadata?.full_name || "");
      setFormMobile(safeAuthProfile.mobile || safeUserProfile.phone || safeUser.user_metadata?.phone || "");
      setFormAddress(safeAuthProfile.address || safeUserProfile.address || safeUser.user_metadata?.address || "");
      setFormRole(safeAuthProfile.role || (isFarmer ? "farmer" : "buyer"));
    } else {
      // Creating new profile → empty inputs
      setFormFullName("");
      setFormMobile("");
      setFormAddress("");
      setFormRole("buyer");
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    setAuthLoading(true);
    setAuthError("");

    const payload = {
      full_name: formFullName,
      mobile: formMobile,
      address: formAddress,
      role: formRole.toLowerCase(),
    };

    try {
      let data, error;
      if (profileExists) {
        ({ data, error } = await apiService.updateAuthProfile(payload));
      } else {
        ({ data, error } = await apiService.createAuthProfile(payload));
      }

      if (error) {
        setAuthError(error);
      } else {
        setAuthProfile(data || null);
        setIsEditing(false);
      }
    } catch (err) {
      setAuthError("Unexpected error occurred");
      console.error(err);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#166534", marginBottom: "8px" }}>Profile</h1>
        <p style={{ fontSize: "16px", color: "#666", margin: 0 }}>Manage your account information and view your activity</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px" }}>
        {/* Left Column */}
        <div>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb", marginBottom: "20px" }}>
            
            {/* Edit/Create Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
              {!isEditing ? (
                <button
                  style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", cursor: "pointer" }}
                  onClick={handleEditClick}
                >
                  {profileExists ? "Edit Profile" : "Create Profile"}
                </button>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    style={{ background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", cursor: "pointer" }}
                    onClick={handleSave}
                    disabled={authLoading}
                  >
                    {profileExists ? "Save Changes" : "Create Profile"}
                  </button>
                  <button
                    style={{ background: "#f3f4f6", color: "#111827", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "6px 12px", cursor: "pointer" }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Profile Picture & Name */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              {safeUser.user_metadata?.avatar_url ? (
                <img
                  src={safeUser.user_metadata.avatar_url}
                  alt="Profile"
                  style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 16px", border: "3px solid #22c55e" }}
                />
              ) : (
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "linear-gradient(135deg,#22c55e,#166534)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "48px", color: "white", fontWeight: "bold" }}>
                  {(safeAuthProfile.full_name || safeUserProfile.full_name || safeUser.user_metadata?.full_name || "User").charAt(0).toUpperCase()}
                </div>
              )}

              {!isEditing ? (
                <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>
                  {safeAuthProfile.full_name || safeUserProfile.full_name || safeUser.user_metadata?.full_name || "User"}
                </h2>
              ) : (
                <input
                  type="text"
                  value={formFullName || ""}
                  onChange={(e) => setFormFullName(e.target.value)}
                  style={{ fontSize: "20px", padding: "4px 8px", borderRadius: "6px", border: "1px solid #22c55e" }}
                  autoFocus
                />
              )}

              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: isFarmer ? "#f0fdf4" : "#f0f9ff", color: isFarmer ? "#166534" : "#0369a1", padding: "6px 12px", borderRadius: "20px", fontSize: "14px", fontWeight: "600" }}>
                <Shield size={16} /> {isFarmer ? "Farmer" : "Buyer"}
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <User size={20} /> Contact Details
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Mail size={16} color="#666" /> <span style={{ fontSize: "14px", color: "#666" }}>{safeUser.email || "Not provided"}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Phone size={16} color="#666" />
                  {!isEditing ? (
                    <span style={{ fontSize: "14px", color: "#666" }}>
                      {safeAuthProfile.mobile || safeUserProfile.phone || safeUser.user_metadata?.phone || "Not provided"}
                    </span>
                  ) : (
                    <input
                      type="text"
                      value={formMobile || ""}
                      onChange={(e) => setFormMobile(e.target.value)}
                      style={{ fontSize: "14px", padding: "4px 8px", borderRadius: "6px", border: "1px solid #22c55e" }}
                    />
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <MapPin size={16} color="#666" />
                  {!isEditing ? (
                    <span style={{ fontSize: "14px", color: "#666" }}>
                      {safeAuthProfile.address || safeUserProfile.address || safeUser.user_metadata?.address || "Not provided"}
                    </span>
                  ) : (
                    <input
                      type="text"
                      value={formAddress || ""}
                      onChange={(e) => setFormAddress(e.target.value)}
                      style={{ fontSize: "14px", padding: "4px 8px", borderRadius: "6px", border: "1px solid #22c55e" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Farmer/Buyer content) */}
        {isFarmer ? (
          <div>
            {/* Reviews & Crops sections can be added safely here */}
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb", textAlign: "center" }}>
            <User size={64} color="#e5e7eb" style={{ marginBottom: "20px" }} />
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", marginBottom: "12px" }}>Buyer Account</h3>
            <p style={{ fontSize: "16px", color: "#666", margin: 0 }}>As a buyer, you can browse and purchase crops from farmers. Switch to farmer mode to start selling your own crops!</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { Star, Mail, Phone, MapPin, User, Shield, Package, MessageSquare } from 'lucide-react'

export default function Profile() {
  const { user, userProfile, isFarmer, apiService, fetchUserProfile } = useUser()
  const [reviews, setReviews] = useState([])
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState("")
  // Test states for backend auth profile endpoints
  const [authProfile, setAuthProfile] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState("")
  const [formFullName, setFormFullName] = useState("")
  const [formMobile, setFormMobile] = useState("")
  const [formAddress, setFormAddress] = useState("")
  const [formRole, setFormRole] = useState("buyer")
  const [isEditing, setIsEditing] = useState(false)
const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    async function checkProfile() {
      if (!user) return;
      const profile = await fetchUserProfile();
      console.log(profile)
      if (!profile) {
        setIsFirstTime(true);
      } else {
        setIsFirstTime(false);
      }
      setLoading(false);
    }
    checkProfile();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome, {userProfile?.full_name || "User"}!</h2>

      {isFirstTime ? (
        <button onClick={() => createProfile()}>Create Profile</button>
      ) : (
        <button onClick={() => updateProfile()}>Update Profile</button>
      )}
    </div>
  );
  
  async function createProfile() {
    console.log("creating");
  }

  async function updateProfile() {
    // call your backend update endpoint
    console.log("updating");
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      if (userProfile?.id) {
        try {
          // Fetch reviews if user is a farmer
          if (isFarmer) {
            const reviewsResponse = await apiService.getUserReviews(userProfile.id)
            if (reviewsResponse.data) {
              setReviews(reviewsResponse.data)
            }
            
            // Fetch crops if user is a farmer
            const cropsResponse = await apiService.getFarmerCrops(userProfile.id)
            if (cropsResponse.data) {
              setCrops(cropsResponse.data)
            }
          }
        } catch (error) {
          console.error('Error fetching profile data:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchProfileData()
  }, [userProfile?.id, isFarmer, apiService])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading profile...
      </div>
    )
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '800', 
          color: '#166534',
          marginBottom: '8px'
        }}>
          Profile
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#666',
          margin: 0
        }}>
          Manage your account information and view your activity
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        {/* Left Column - Basic Info */}
        <div>
          {/* Profile Card */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e5e7eb',
            marginBottom: '20px'
          }}>
            {/* Card actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
              {!isEditing ? (
                <button
                  style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}
                  onClick={() => {
                    const currentName = authProfile?.full_name || user?.user_metadata?.full_name || userProfile?.full_name || ''
                    const currentMobile = authProfile?.mobile || user?.user_metadata?.phone || userProfile?.phone || ''
                    const currentAddress = authProfile?.address || user?.user_metadata?.address || userProfile?.address || ''
                    setFormFullName(currentName)
                    setFormMobile(currentMobile)
                    setFormAddress(currentAddress)
                    setIsEditing(true)
                  }}
                >Edit Profile</button>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{ background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}
                    onClick={async () => {
                      setAuthLoading(true)
                      setAuthError("")
                      const payload = {
                        full_name: formFullName,
                        mobile: formMobile,
                        address: formAddress,
                      }
                      const { data, error } = await apiService.updateAuthProfile(payload)
                      if (error) {
                        setAuthError(error)
                      } else {
                        setAuthProfile(data || null)
                        setIsEditing(false)
                      }
                      setAuthLoading(false)
                    }}
                  >Save</button>
                  <button
                    style={{ background: '#f3f4f6', color: '#111827', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}
                    onClick={() => setIsEditing(false)}
                  >Cancel</button>
                </div>
              )}
            </div>
            {/* Profile Picture */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 16px',
                    border: '3px solid #22c55e'
                  }}
                />
              ) : (
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #166534)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '48px',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {(user?.user_metadata?.full_name || userProfile?.full_name || 'User').charAt(0).toUpperCase()}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                {!isEditing ? (
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: '700', 
                    color: '#111827',
                    margin: 0
                  }}>
                    {authProfile?.full_name || user?.user_metadata?.full_name || userProfile?.full_name || 'User'}
                  </h2>
                ) : (
                  <input
                    type="text"
                    value={formFullName}
                    onChange={e => setFormFullName(e.target.value)}
                    style={{ fontSize: '20px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #22c55e' }}
                    autoFocus
                  />
                )}
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: isFarmer ? '#f0fdf4' : '#f0f9ff',
                color: isFarmer ? '#166534' : '#0369a1',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <Shield size={16} />
                {isFarmer ? 'Farmer' : 'Buyer'}
              </div>
            </div>

            

            {/* Contact Details */}
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#111827',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <User size={20} />
                Contact Details
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={16} color="#666" />
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {user?.email || 'Not provided'}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={16} color="#666" />
                  {!isEditing ? (
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      {authProfile?.mobile || user?.user_metadata?.phone || userProfile?.phone || 'Not provided'}
                    </span>
                  ) : (
                    <input
                      type="text"
                      value={formMobile}
                      onChange={e => setFormMobile(e.target.value)}
                      style={{ fontSize: '14px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #22c55e' }}
                    />
                  )}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={16} color="#666" />
                  {!isEditing ? (
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      {authProfile?.address || user?.user_metadata?.address || userProfile?.address || 'Not provided'}
                    </span>
                  ) : (
                    <input
                      type="text"
                      value={formAddress}
                      onChange={e => setFormAddress(e.target.value)}
                      style={{ fontSize: '14px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #22c55e' }}
                    />
                  )}
                </div>
                
                {/* Google Account Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <User size={16} color="#666" />
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    Google Account: {user?.user_metadata?.email || user?.email || 'Not available'}
                  </span>
                </div>
                
                {/* Account Created Date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Shield size={16} color="#666" />
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    Member since: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
              </div>
              {/* Role editor (separate) */}
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: '0 0 8px 0' }}>Role</h4>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                  >
                    <option value="buyer">buyer</option>
                    <option value="farmer">farmer</option>
                  </select>
                  <button
                    style={{ background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}
                    onClick={async () => {
                      const confirmed = window.confirm(`Change role to "${formRole}"?`)
                      if (!confirmed) return
                      setAuthLoading(true)
                      setAuthError("")
                      const { data, error } = await apiService.updateAuthProfile({ role: (formRole || '').toLowerCase() })
                      if (error) {
                        setAuthError(error)
                      } else {
                        setAuthProfile({ ...(authProfile || {}), ...(data || {}) })
                      }
                      setAuthLoading(false)
                    }}
                  >Update Role</button>
                  <span style={{ fontSize: '13px', color: '#666' }}>Current: {authProfile?.role || (isFarmer ? 'farmer' : 'buyer')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Backend Auth Profile (Test) */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: '0 0 12px 0' }}>Backend Auth Profile (Test)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              <input
                placeholder="Full name"
                value={formFullName}
                onChange={(e) => setFormFullName(e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
              />
              <input
                placeholder="Mobile"
                value={formMobile}
                onChange={(e) => setFormMobile(e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
              />
              <input
                placeholder="Address"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
              />
              <select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
              >
                <option value="buyer">buyer</option>
                <option value="farmer">farmer</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <button
                onClick={async () => {
                  setAuthLoading(true)
                  setAuthError("")
                  const { data, error } = await apiService.getAuthProfile()
                  if (error) setAuthError(error)
                  setAuthProfile(data || null)
                  setAuthLoading(false)
                }}
                style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' }}
              >Fetch</button>
              <button
                onClick={async () => {
                  setAuthLoading(true)
                  setAuthError("")
                  const payload = {
                    full_name: formFullName,
                    mobile: formMobile,
                    address: formAddress,
                    role: (formRole || '').toLowerCase()
                  }
                  const { data, error } = await apiService.createAuthProfile(payload)
                  if (error) setAuthError(error)
                  setAuthProfile(data || null)
                  setAuthLoading(false)
                }}
                style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' }}
              >Create/Upsert</button>
              <button
                onClick={async () => {
                  setAuthLoading(true)
                  setAuthError("")
                  const payload = {
                    ...(formFullName ? { full_name: formFullName } : {}),
                    ...(formMobile ? { mobile: formMobile } : {}),
                    ...(formAddress ? { address: formAddress } : {}),
                    ...(formRole ? { role: (formRole || '').toLowerCase() } : {})
                  }
                  const { data, error } = await apiService.updateAuthProfile(payload)
                  if (error) setAuthError(error)
                  setAuthProfile(data || null)
                  setAuthLoading(false)
                }}
                style={{ background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' }}
              >Update</button>
            </div>
            {authLoading && (
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Working...</div>
            )}
            {authError && (
              <div style={{ fontSize: '14px', color: '#dc2626', marginBottom: '8px' }}>{authError}</div>
            )}
            {authProfile && (
              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px', fontSize: '13px', color: '#111827' }}>
                <div><strong>id:</strong> {authProfile.id}</div>
                <div><strong>email:</strong> {authProfile.email}</div>
                <div><strong>full_name:</strong> {authProfile.full_name}</div>
                <div><strong>mobile:</strong> {authProfile.mobile}</div>
                <div><strong>address:</strong> {authProfile.address}</div>
                <div><strong>role:</strong> {authProfile.role}</div>
                <div><strong>updated_at:</strong> {authProfile.updated_at}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Seller-specific content */}
        {isFarmer ? (
          <div>
            {/* Reviews Section */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: '#111827',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <MessageSquare size={20} />
                Customer Reviews
              </h3>
              
              {reviews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {reviews.map((review, index) => (
                    <div key={index} style={{
                      padding: '16px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < review.rating ? "#fbbf24" : "#e5e7eb"} 
                              color={i < review.rating ? "#fbbf24" : "#e5e7eb"} 
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                          {review.customer_name}
                        </span>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          {review.date}
                        </span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 20px',
                  color: '#666'
                }}>
                  <MessageSquare size={48} color="#e5e7eb" style={{ marginBottom: '16px' }} />
                  <p style={{ margin: 0, fontSize: '16px' }}>No reviews yet</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>Start selling to get customer reviews!</p>
                </div>
              )}
            </div>

            {/* Crops Section */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: '#111827',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Package size={20} />
                Your Crops
              </h3>
              
              {crops.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                  {crops.map((crop, index) => (
                    <div key={index} style={{
                      padding: '16px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h4 style={{ 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: '#111827',
                        margin: '0 0 8px 0'
                      }}>
                        {crop.name}
                      </h4>
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#666',
                        margin: '0 0 8px 0'
                      }}>
                        {crop.category}
                      </p>
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#166534',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        {crop.price}
                      </p>
                      <div style={{
                        display: 'inline-block',
                        background: crop.status === 'Available' ? '#f0fdf4' : '#fef3c7',
                        color: crop.status === 'Available' ? '#166534' : '#d97706',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginTop: '8px'
                      }}>
                        {crop.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 20px',
                  color: '#666'
                }}>
                  <Package size={48} color="#e5e7eb" style={{ marginBottom: '16px' }} />
                  <p style={{ margin: 0, fontSize: '16px' }}>No crops listed yet</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>Start by adding your first crop listing!</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <User size={64} color="#e5e7eb" style={{ marginBottom: '20px' }} />
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#111827',
              marginBottom: '12px'
            }}>
              Buyer Account
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#666',
              margin: 0
            }}>
              As a buyer, you can browse and purchase crops from farmers. 
              Switch to farmer mode to start selling your own crops!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}



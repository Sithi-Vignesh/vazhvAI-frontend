// API service for backend communication
const API_BASE_URL = 'https://vazhvai-backend.onrender.com/'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const base = this.baseURL.endsWith('/') ? this.baseURL.slice(0, -1) : this.baseURL
    const path = typeof endpoint === 'string' && endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    const url = `${base}/${path}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Attach Authorization header if access token exists and not already provided
    try {
      const existingAuthHeader = config.headers && (config.headers.Authorization || config.headers.authorization)
      if (!existingAuthHeader) {
        const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
      }
    } catch (_) {
      // noop: localStorage may be unavailable in some environments
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      console.error('API request failed:', error)
      return { data: null, error: error.message }
    }
  }

  // Get user profile by user ID
  async getUserProfile(userId) {
    return this.request(`/api/user/profile/${userId}`)
  }

  // Get user profile by email
  async getUserProfileByEmail(email) {
    return this.request(`/api/user/profile/email/${email}`)
  }

  // Get all user profiles
  async getAllUserProfiles() {
    return this.request('/api/user/profiles')
  }

  // Update user profile
  async updateUserProfile(userId, profileData) {
    return this.request(`/api/user/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    })
  }

  // Create new user profile
  async createUserProfile(profileData) {
    return this.request('/api/user/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    })
  }

  // Get crops for farmers
  async getFarmerCrops(farmerId) {
    return this.request(`/api/crops/farmer/${farmerId}`)
  }

  // Get all available crops for buyers
  async getAllCrops() {
    return this.request('/api/crops')
  }

  // Create new crop listing
  async createCrop(cropData) {
    return this.request('/api/crops', {
      method: 'POST',
      body: JSON.stringify(cropData),
    })
  }

  // Update crop listing
  async updateCrop(cropId, cropData) {
    return this.request(`/api/crops/${cropId}`, {
      method: 'PUT',
      body: JSON.stringify(cropData),
    })
  }

  // Delete crop listing
  async deleteCrop(cropId) {
    return this.request(`/api/crops/${cropId}`, {
      method: 'DELETE',
    })
  }

  // Get orders for a user
  async getUserOrders(userId) {
    return this.request(`/api/orders/user/${userId}`)
  }

  // Create new order
  async createOrder(orderData) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  // Update order status
  async updateOrderStatus(orderId, status) {
    return this.request(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  // Get user reviews
  async getUserReviews(userId) {
    return this.request(`/api/reviews/user/${userId}`)
  }

  // Create review
  async createReview(reviewData) {
    return this.request('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    })
  }

  // ===== Auth profile endpoints (Flask backend) =====
  // Create or upsert profile
  async createAuthProfile(profileData) {
    return this.request('/auth/create', {
      method: 'POST',
      body: JSON.stringify(profileData),
    })
  }

  // Get current user's profile (uses JWT for user context)
  async getAuthProfile() {
    return this.request('/auth/profile', {
      method: 'GET',
    })
  }

  // Update current user's profile
  async updateAuthProfile(updateData) {
    return this.request('/auth/update', {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    })
  }
}

// Create and export a singleton instance
export const apiService = new ApiService()
export default apiService

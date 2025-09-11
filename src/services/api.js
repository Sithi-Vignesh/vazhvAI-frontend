// API service for backend communication
const API_BASE_URL = 'https://vazhvai-backend.onrender.com/'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
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
}

// Create and export a singleton instance
export const apiService = new ApiService()
export default apiService

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUser } from '../../context/UserContext'

function FarmerTrading({ userProfile }) {
  const { apiService } = useUser()
  const [activeTab, setActiveTab] = useState('listings')
  const [crops, setCrops] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [newCrop, setNewCrop] = useState({
    name: '',
    quantity: '',
    price: '',
    description: '',
    category: 'Vegetables'
  })

  // Fetch crops from backend when component mounts
  useEffect(() => {
    if (userProfile?.id) {
      fetchCrops()
    }
  }, [userProfile?.id])

  const fetchCrops = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await apiService.getFarmerCrops(userProfile.id)
      if (error) {
        console.error('Error fetching crops:', error)
      } else {
        setCrops(data || [])
      }
    } catch (error) {
      console.error('Error fetching crops:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCrop = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const cropData = {
        ...newCrop,
        farmer_id: userProfile.id,
        location: userProfile.address,
        status: 'Available',
        image: '/api/placeholder/300/200'
      }
      
      const { error } = await apiService.createCrop(cropData)
      
      if (error) {
        console.error('Error creating crop:', error)
        alert('Failed to create crop listing. Please try again.')
      } else {
        // Refresh crops list
        await fetchCrops()
        setNewCrop({ name: '', quantity: '', price: '', description: '', category: 'Vegetables' })
        alert('Crop listing created successfully!')
      }
    } catch (error) {
      console.error('Error creating crop:', error)
      alert('Failed to create crop listing. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="farmer-trading">
      <div className="trading-header">
        <h1>Welcome, {userProfile.full_name}!</h1>
        <p className="role-badge farmer">Farmer Dashboard</p>
      </div>

      <div className="trading-tabs">
        <button 
          className={`tab ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
        <button 
          className={`tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add New Crop
        </button>
        <button 
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      <div className="trading-content">
        {activeTab === 'listings' && (
          <div className="listings-section">
            <h2>Your Crop Listings</h2>
            <div className="crops-grid">
              {crops.map(crop => (
                <div key={crop.id} className="crop-card">
                  <div className="crop-image">
                    <img src={crop.image} alt={crop.name} />
                    <span className={`status-badge ${crop.status.toLowerCase()}`}>
                      {crop.status}
                    </span>
                  </div>
                  <div className="crop-info">
                    <h3>{crop.name}</h3>
                    <p className="quantity">{crop.quantity}</p>
                    <p className="price">{crop.price}</p>
                    <p className="location">{crop.location}</p>
                    <div className="crop-actions">
                      <button className="btn-edit">Edit</button>
                      <button className="btn-delete">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="add-crop-section">
            <h2>Add New Crop Listing</h2>
            <form onSubmit={handleAddCrop} className="crop-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="crop-name">Crop Name</label>
                  <input
                    id="crop-name"
                    type="text"
                    value={newCrop.name}
                    onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                    placeholder="e.g., Organic Tomatoes"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="crop-category">Category</label>
                  <select
                    id="crop-category"
                    value={newCrop.category}
                    onChange={(e) => setNewCrop({...newCrop, category: e.target.value})}
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Spices">Spices</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="crop-quantity">Quantity</label>
                  <input
                    id="crop-quantity"
                    type="text"
                    value={newCrop.quantity}
                    onChange={(e) => setNewCrop({...newCrop, quantity: e.target.value})}
                    placeholder="e.g., 50 kg"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="crop-price">Price per Unit</label>
                  <input
                    id="crop-price"
                    type="text"
                    value={newCrop.price}
                    onChange={(e) => setNewCrop({...newCrop, price: e.target.value})}
                    placeholder="e.g., ₹80/kg"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="crop-description">Description</label>
                <textarea
                  id="crop-description"
                  value={newCrop.description}
                  onChange={(e) => setNewCrop({...newCrop, description: e.target.value})}
                  placeholder="Describe your crop, farming methods, quality, etc."
                  rows="4"
                />
              </div>

              <button type="submit" className="btn-primary">
                Add Crop Listing
              </button>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Recent Orders</h2>
            <div className="orders-list">
              <div className="order-card">
                <div className="order-header">
                  <h3>Order #12345</h3>
                  <span className="order-status pending">Pending</span>
                </div>
                <div className="order-details">
                  <p><strong>Buyer:</strong> John Doe</p>
                  <p><strong>Crop:</strong> Organic Tomatoes - 25 kg</p>
                  <p><strong>Total:</strong> ₹2,000</p>
                  <p><strong>Date:</strong> Dec 15, 2024</p>
                </div>
                <div className="order-actions">
                  <button className="btn-accept">Accept</button>
                  <button className="btn-reject">Reject</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

FarmerTrading.propTypes = {
  userProfile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    address: PropTypes.string,
  }).isRequired,
}

export default FarmerTrading

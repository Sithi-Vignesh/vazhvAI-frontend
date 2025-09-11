import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUser } from '../../context/UserContext'

function BuyerTrading({ userProfile }) {
  const { apiService } = useUser()
  const [activeTab, setActiveTab] = useState('browse')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [availableCrops, setAvailableCrops] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])

  // Fetch crops and orders from backend when component mounts
  useEffect(() => {
    fetchCrops()
    if (userProfile?.id) {
      fetchOrders()
    }
  }, [userProfile?.id])

  const fetchCrops = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await apiService.getAllCrops()
      if (error) {
        console.error('Error fetching crops:', error)
      } else {
        setAvailableCrops(data || [])
      }
    } catch (error) {
      console.error('Error fetching crops:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchOrders = async () => {
    try {
      const { data, error } = await apiService.getUserOrders(userProfile.id)
      if (error) {
        console.error('Error fetching orders:', error)
      } else {
        setOrders(data || [])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const addToCart = (crop) => {
    setCart([...cart, { ...crop, quantity: 1 }])
  }

  const filteredCrops = availableCrops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.farmer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="buyer-trading">
      <div className="trading-header">
        <h1>Welcome, {userProfile.full_name}!</h1>
        <p className="role-badge buyer">Buyer Dashboard</p>
      </div>

      <div className="trading-tabs">
        <button 
          className={`tab ${activeTab === 'browse' ? 'active' : ''}`}
          onClick={() => setActiveTab('browse')}
        >
          Browse Crops
        </button>
        <button 
          className={`tab ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          Cart ({cart.length})
        </button>
        <button 
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
      </div>

      <div className="trading-content">
        {activeTab === 'browse' && (
          <div className="browse-section">
            <div className="search-filters">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search crops or farmers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">🔍</button>
              </div>
              <div className="category-filter">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>
            </div>

            <div className="crops-grid">
              {filteredCrops.map(crop => (
                <div key={crop.id} className="crop-card">
                  <div className="crop-image">
                    <img src={crop.image} alt={crop.name} />
                    <span className="category-badge">{crop.category}</span>
                  </div>
                  <div className="crop-info">
                    <h3>{crop.name}</h3>
                    <p className="farmer">by {crop.farmer}</p>
                    <p className="quantity">{crop.quantity}</p>
                    <p className="price">{crop.price}</p>
                    <p className="location">{crop.location}</p>
                    <div className="rating">
                      <span>⭐ {crop.rating}</span>
                    </div>
                    <button 
                      className="btn-add-cart"
                      onClick={() => addToCart(crop)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="cart-section">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <button 
                  className="btn-primary"
                  onClick={() => setActiveTab('browse')}
                >
                  Browse Crops
                </button>
              </div>
            ) : (
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <p>by {item.farmer}</p>
                      <p>{item.price}</p>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="btn-remove"
                        onClick={() => setCart(cart.filter((_, i) => i !== index))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cart-summary">
                  <h3>Total: ₹{cart.reduce((sum, item) => sum + parseInt(item.price.replace(/[₹,]/g, '')), 0)}</h3>
                  <button className="btn-checkout">Proceed to Checkout</button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Your Orders</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p><strong>Crop:</strong> {order.crop}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Farmer:</strong> {order.farmer}</p>
                    <p><strong>Total:</strong> {order.price}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                  </div>
                  <div className="order-actions">
                    <button className="btn-track">Track Order</button>
                    <button className="btn-review">Leave Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

BuyerTrading.propTypes = {
  userProfile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
  }).isRequired,
}

export default BuyerTrading

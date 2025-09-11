import React from 'react'

function TradingLoading() {
  return (
    <div className="trading-container">
      <div className="trading-card">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading trading platform...</p>
        </div>
      </div>
    </div>
  )
}

export default TradingLoading

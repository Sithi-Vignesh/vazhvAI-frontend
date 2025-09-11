import React from 'react'
import PropTypes from 'prop-types'
import './GoogleButton.css'

function GoogleButton({ onClick, disabled }) {
  const buttonStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid rgba(34,197,94,0.25)',
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    color: '#166534',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    width: '100%',
    justifyContent: 'center',
    boxShadow: '0 10px 28px rgba(22, 101, 52, 0.10)',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1
  }

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className="google-button"
      style={{
        ...buttonStyles,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none'
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <span style={{ fontSize: 0 }} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.128,6.053,28.805,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.042,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C33.128,6.053,28.805,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.281-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.093,5.57 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
      </span>
      <span>Continue with Google</span>
    </div>
  )
}

export default GoogleButton

GoogleButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}



import React from 'react'
import PropTypes from 'prop-types'

function TextInput({ label, name, type = 'text', value, onChange, placeholder, required }) {
  const id = name
  return (
    <div style={{ marginBottom: '12px' }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '6px',
          border: '1px solid #d1d5db',
          fontSize: '14px'
        }}
      />
    </div>
  )
}

export default TextInput

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
}



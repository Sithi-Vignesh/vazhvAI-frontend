import React from 'react'
import PropTypes from 'prop-types'

function Select({ label, name, value, onChange, options = [], placeholder, required }) {
  const id = name
  return (
    <div style={{ marginBottom: '12px' }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '6px',
          border: '1px solid #d1d5db',
          fontSize: '14px'
        }}
      >
        {placeholder && (
          <option value="" disabled>{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, label: PropTypes.string.isRequired })
  ),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
}



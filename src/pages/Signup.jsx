import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import Select from '../components/Select'
import { Link } from 'react-router-dom'

function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    locationType: '',
  })
  const [submitting, setSubmitting] = useState(false)

  function updateField(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => setSubmitting(false), 1000)
  }

  return (
    <div className="page-center">
      <div className="auth-card" style={{ width: '100%', maxWidth: '760px' }}>
        <h2 className="auth-title">Sign Up</h2>
        <p className="auth-subtitle">Create your account with the details below.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <TextInput label="Full Name" name="name" value={form.name} onChange={updateField} placeholder="John Doe" required />
          </div>
          <div>
            <TextInput label="Email" name="email" type="email" value={form.email} onChange={updateField} placeholder="john@example.com" required />
          </div>
          <div>
            <TextInput label="Phone Number" name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="+91 98765 43210" required />
          </div>
          <div>
            <Select
              label="Location Type"
              name="locationType"
              value={form.locationType}
              onChange={updateField}
              placeholder="Select one"
              options={[
                { value: 'urban', label: 'Urban' },
                { value: 'suburban', label: 'Suburban' },
                { value: 'rural', label: 'Rural' },
              ]}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <TextInput label="Address" name="address" value={form.address} onChange={updateField} placeholder="Street, Area" required />
          </div>
          <div>
            <TextInput label="City" name="city" value={form.city} onChange={updateField} placeholder="Chennai" required />
          </div>
          <div>
            <TextInput label="State" name="state" value={form.state} onChange={updateField} placeholder="Tamil Nadu" required />
          </div>
          <div>
            <TextInput label="Country" name="country" value={form.country} onChange={updateField} placeholder="India" required />
          </div>
          <div>
            <TextInput label="Postal Code" name="postalCode" value={form.postalCode} onChange={updateField} placeholder="600001" required />
          </div>
        </div>

        <button type="submit" disabled={submitting} className="primary-btn" style={{ marginTop: '12px', background: 'linear-gradient(180deg, #16a34a 0%, #15803d 100%)', width: '100%' }}>
          {submitting ? 'Submitting…' : 'Create Account'}
        </button>
      </form>

        <div style={{ marginTop: '16px', fontSize: '14px', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#15803d', fontWeight: 600 }}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp



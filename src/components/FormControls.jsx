import PropTypes from 'prop-types'

export function Field({ label, htmlFor, children }) {
  return (
    <div className="stack">
      <label className="label" htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}

export function Input(props) {
  return <input className="input" {...props} />
}

export function Textarea(props) {
  return <textarea className="input" rows={4} {...props} />
}

export function Select({ children, ...props }) {
  return <select className="input" {...props}>{children}</select>
}

export function Card({ children }) {
  return <div className="card-ui stack">{children}</div>
}

export function SectionTitle({ children }) {
  return <h2 style={{ margin: 0 }}>{children}</h2>
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
  children: PropTypes.node,
}

Input.propTypes = {
  // accept any native input props
}

Textarea.propTypes = {
  // accept any native textarea props
}

Select.propTypes = {
  children: PropTypes.node,
}

Card.propTypes = {
  children: PropTypes.node,
}

SectionTitle.propTypes = {
  children: PropTypes.node,
}



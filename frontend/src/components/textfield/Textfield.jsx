import './textfield.css'

const Textfield = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  required = false,
  type = "text",
}) => {
  const id = `textfield-${name}`;

  return (
    <div className="textfield">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Textfield;

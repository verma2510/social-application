import './button.css'

const Button = ({ label, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

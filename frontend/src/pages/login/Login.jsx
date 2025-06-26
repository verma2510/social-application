import { useState } from "react";
import Button from "../../components/button/Button";
import Textfield from "../../components/textfield/Textfield";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { userLogin, adminLogin } from "../../dummyData";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    if (username === userLogin.username && password === userLogin.password) {
      navigate("/cards");
    } else if (
      username === adminLogin.username &&
      password === adminLogin.password
    ) {
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <Textfield
            label="Username"
            name="username"
            value={username}
            onChange={handleChange}
            required
            type="text"
          />
          <Textfield
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            type="password"
          />
        </div>
        <Button label="Login" type="submit" />
        <Button
          label="Signup"
          type="button"
          onClick={() => navigate("/signup")}
        />
      </form>
    </div>
  );
};

export default Login;

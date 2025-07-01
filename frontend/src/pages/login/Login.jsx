import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import Textfield from "../../components/textfield/Textfield";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { userLogin, adminLogin } from "../../dummyData";
import ToggleButton from "../../components/toggleButton/ToggleButton";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    if (username === userLogin.username && password === userLogin.password) {
      navigate("/cards");
      return;
    } else if (
      username === adminLogin.username &&
      password === adminLogin.password
    ) {
      navigate("/admin");
      return;
    }

    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      navigate("/cards");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <ToggleButton/>
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

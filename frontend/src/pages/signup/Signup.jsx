import { useState } from "react";
import Button from "../../components/button/Button";
import Textfield from "../../components/textfield/Textfield";
import "./signup.css";
import ToggleButton from "../../components/toggleButton/ToggleButton";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      alert("Signup successful!");
      setFormData({ username: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Error during signup.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <ToggleButton/>
      <form onSubmit={handleSubmit} className="form-group">
        <Textfield
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          required
        />
        <Textfield
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <Textfield
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />
        <Button label="Signup" type="submit" />
      </form>
    </div>
  );
};

export default Signup;

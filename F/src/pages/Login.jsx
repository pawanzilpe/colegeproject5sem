import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      login(res.data); // res.data में accessToken और user होना चाहिए
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="text-center">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
        <Link to={"/Register"}>register</Link>
      </form>
    </div>
  );
};

export default Login;

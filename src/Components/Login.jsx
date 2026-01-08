import { useState } from "react";
import API from "../api";

const Login = ({ onLogin, goToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="card max-w-sm mx-auto mt-24">
      <h2 className="text-xl mb-4">🔐 Login</h2>

      <input
        className="input mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input mb-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login} className="btn w-full">
        Login
      </button>

      <p className="text-center text-sm mt-4 text-gray-400">
        New user?{" "}
        <span
          className="text-blue-400 cursor-pointer"
          onClick={goToRegister}
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;

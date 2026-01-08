import { useState } from "react";
import API from "../api";

const Register = ({ goToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful, now login");
      goToLogin();
    } catch (err) {
      alert(err.response?.data?.error || "Register failed");
    }
  };

  return (
    <div className="card max-w-sm mx-auto mt-20">
      <h2 className="text-xl mb-4">📝 Register</h2>

      <input
        className="input mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button onClick={register} className="btn w-full">
        Register
      </button>

      <p className="text-center text-sm mt-4 text-gray-400">
        Already have an account?{" "}
        <span
          className="text-blue-400 cursor-pointer"
          onClick={goToLogin}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;

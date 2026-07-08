import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  getUserRole,
} from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Login with Firebase Authentication
      const userCredential = await loginUser(email, password);

      const uid = userCredential.user.uid;
      console.log("Logged in UID:", uid);

      // Get role from Firestore
      const role = await getUserRole(uid);
      console.log("User Role:", role);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        alert("You are not authorized to access Admin Panel.");
      }
    } catch (error) {
      console.error("Firebase Error:", error);
      alert(error.code);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          HomeeCart Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-6 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/adminContext";
import "../styles/Login.css"; // Import the login.css file
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function AdminLogin() {
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const loginAdmin = async (e) => {
    e.preventDefault();

    const { email, password } = data;
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post(
        "https://anomaly-detection-qgwh.onrender.com/api/admin/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data?.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Admin login successful!");
        setAdmin(response.data.admin); // make sure your backend returns `admin` field
        setData({ email: "", password: "" });
        navigate("/admindashboard");
      }
    } catch (error) {
      console.error("Admin Login Error:", error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-container-form" onSubmit={loginAdmin}>
        <label className="login-container-label">Email</label>
        <input
          className="login-container-input"
          type="email"
          placeholder="Enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />

       <label className="login-container-label">Password</label>
        <div className="password-wrapper">
          <input
            className="login-container-input"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>


        <button className="login-container-button" type="submit">Login</button>
      </form>

      <p className="login-container-footer">
        Don&apos;t have an account?{" "}
        <span
          className="signup-link"
          onClick={() => navigate("/adminregister")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

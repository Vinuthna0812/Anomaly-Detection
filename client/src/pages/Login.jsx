// import { useState, useContext } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/userContext";
// import "../styles/Login.css";

// export default function Login() {
//   const { fetchProfile } = useContext(UserContext);
//   const navigate = useNavigate();

//   const [data, setData] = useState({ email: "", password: "" });

//   const loginUser = async (e) => {
//     e.preventDefault();

//     const { email, password } = data;
//     if (!email || !password) {
//       toast.error("Email and password are required!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       if (response.data.error) {
//         toast.error(response.data.error);
//       } else {
//         toast.success("Login successful!");
//         await fetchProfile();
//         setData({ email: "", password: "" });
//         navigate("/select-category");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       toast.error("Something went wrong. Please try again!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-heading">Login</h2>
//       <form onSubmit={loginUser}>
//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="Enter email..."
//           value={data.email}
//           onChange={(e) => setData({ ...data, email: e.target.value })}
//           required
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Enter password..."
//           value={data.password}
//           onChange={(e) => setData({ ...data, password: e.target.value })}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>

//       <p>
//         Don't have an account?
//         <span className="signup-link" onClick={() => navigate("/register")}>
//           Sign up
//         </span>
//       </p>
//     </div>
//   );
// }
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "../styles/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { fetchProfile } = useContext(UserContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = data;
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post(
        "https://anomaly-detection-qgwh.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Login successful!");
        await fetchProfile();
        setData({ email: "", password: "" });
        navigate("/select-category");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?
        <span className="signup-link" onClick={() => navigate("/register")}>
          Sign up
        </span>
      </p>
    </div>
  );
}

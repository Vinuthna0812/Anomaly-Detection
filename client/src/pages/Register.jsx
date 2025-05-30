// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import "../styles/Register.css";

// export default function Register() {
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const registerUser = async (e) => {
//     e.preventDefault();
//     const { name, email, password } = data;

//     if (!name || !email || !password) {
//       toast.error("All fields are required!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/api/auth/register", {
//         name,
//         email,
//         password,
//       });

//       if (response.data.error) {
//         toast.error(response.data.error);
//       } else {
//         toast.success("Registration successful! Redirecting...");
//         localStorage.setItem("token", response.data.token);
//         setData({ name: "", email: "", password: "" });
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Registration Error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.error || "Registration failed");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h1 className="register-heading">Sign Up</h1>
//       <form onSubmit={registerUser}>
//         <label>Name</label>
//         <input
//           type="text"
//           placeholder="Enter name..."
//           value={data.name}
//           onChange={(e) => setData({ ...data, name: e.target.value })}
//           required
//         />

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

//         <button type="submit">Submit</button>
//       </form>
//       <p>
//         Already have an account?{" "}
//         <span className="signup-link" onClick={() => navigate("/login")}>
//           Login
//         </span>
//       </p>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = data;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://anomaly-detection-production-7004.up.railway.app/api/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Registration successful! Redirecting...");
        localStorage.setItem("token", response.data.token);
        setData({ name: "", email: "", password: "", confirmPassword: "" });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-heading">Sign Up</h1>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter name..."
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />

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

        <label>Confirm Password</label>
        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password..."
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Submit</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="signup-link" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
}

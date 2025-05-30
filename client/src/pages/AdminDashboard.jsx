// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/AdminDashboard.css";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/admin/users", { withCredentials: true })
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error("Error fetching users:", err));
//   }, []);

//   const handleUserClick = (userId) => {
//     navigate(`/admin/user/${userId}/history`);
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>All Users</h1>
//       <div className="user-card-container">
//         {users.map((user) => (
//           <div
//             className="user-card"
//             key={user._id}
//             onClick={() => handleUserClick(user._id)}
//           >
//             <h3>{user.name}</h3>
//             <p>{user.email}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://anomaly-detection-qgwh.onrender.com/api/admin/users", { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/admin/user/${userId}/history`);
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h1>All Users</h1>
      
      <input
        type="text"
        placeholder="Search by name or email..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="user-card-container">
        {filteredUsers.length === 0 ? (
          <p>No users match your search.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              className="user-card"
              key={user._id}
              onClick={() => handleUserClick(user._id)}
            >
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

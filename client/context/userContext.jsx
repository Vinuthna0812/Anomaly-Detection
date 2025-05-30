// import axios from 'axios'
// import { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("http://localhost:8000/api/auth/profile", {
//         withCredentials: true,
//       });
//       setUser(data);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile(); // Run on initial mount
//   }, []);

//   const logout = async () => {
//     await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, loading, logout, fetchProfile }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get("https://anomaly-detection-qgwh.onrender.com/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(); // Run on initial mount
  }, []);

  const logout = async () => {
    const token = localStorage.getItem("token");
    await axios.post("https://anomaly-detection-qgwh.onrender.com/api/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout, fetchProfile }}>
      {children}
    </UserContext.Provider>
  );
}

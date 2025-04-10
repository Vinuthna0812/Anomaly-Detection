// import axios from 'axios'
// import {createContext,useState,useEffect} from 'react';

// export const UserContext =createContext({})

// export function UserContextProvider({children}){
//     const [user,setUser] =useState(null);
//     useEffect(()=> {
//         if(!user){
//             axios.get('/profile').then(({data})=>{
//                 setUser(data)
//             })
//         }
//     },[]);
//     return(
//         <UserContext.Provider value={{user,setUser}}>
//             {children}
//         </UserContext.Provider>

//     )
// }
import axios from 'axios'
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios
        .get('http://localhost:8000/api/auth/profile', { withCredentials: true })
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

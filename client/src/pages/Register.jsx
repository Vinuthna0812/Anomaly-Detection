import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = data;
      if (!name || !email || !password) {
        toast.error("All fields are required!");
        return;
      }

      //const response = await axios.post('/register', { name, email, password });
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });
      
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Registration successful! Redirecting...');
        localStorage.setItem('token', response.data.token); 
        setData({ name: '', email: '', password: '' }); // Reset form
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type="text" placeholder="Enter name..." value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />

        <label>Email</label>
        <input type="email" placeholder="Enter email..." value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />

        <label>Password</label>
        <input type="password" placeholder="Enter password..." value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

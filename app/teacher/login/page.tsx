// pages/TeacherLogin.tsx
'use client'

import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../header";

const TeacherLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/teacherlogin', { username, password });

      if (response.status === 200) {
        router.push("/teacher/dashboard");
        toast.success("Login successful!");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error("An error occurred while logging in");
    }
  };

  useEffect(() => {
    // Assume getSession is an asynchronous function that fetches the session
    async function fetchData() {
        const response = await axios.get('/api/adcheck')
        if (response.status == 200) {
            // console.log(response.data.session);
            if (response.data.session != null) {
                router.push('/teacher/dashboard');
            }
        }
    }
    fetchData();
}, []);

  return (
    <>
      <div className="container mx-auto">
        <Header></Header>
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6">Teacher Login</h1>
          <div className="mb-4">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </>

  );
};

export default TeacherLogin;
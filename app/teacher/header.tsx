'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { RxAvatar } from "react-icons/rx";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const Header: React.FC = () => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Assume getSession is an asynchronous function that fetches the session
    async function fetchData() {
      try {
        const response = await axios.get('/api/adcheck');
        if (response.status === 200) {
          setSession(response.data.session);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    }
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount


  const handleLogout = async () => {
    const response = await axios.get('/api/logout')
    if (response.status == 200) {
      // console.log(response.data.message);
      setSession(null);
      router.push('/teacher/login')
      toast.success(response.data.message);
    }
  };

  return (
    <nav className="flex justify-between items-center py-4 ">
      <div className="flex items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Education Live" className="h-10 mr-4" />
          <span className="text-xl font-bold">Education Live</span>
        </div>

      </div>
      <div className="menu flex w-full justify-end">
        <a href="/" className='ml-4 py-4 mr-4 text-gray-500 text-center'>Home</a>
        <div className="flex items-center relative">
          {session ? (
            <>
              <div className="mx-auto relative flex items-center">
                <button className="px-4 py-2 text-black ">
                  <RxAvatar size={28} />
                </button>
                <p>{session.user?.username}</p>
              </div>
              <button onClick={handleLogout} className="py-2 px-4 cursor-pointer hover:bg-gray-100 text-red-500">Logout</button>

            </>
          ) : (
            <>
              <Link href="/teacher/login" className="mr-4 px-4 py-2 text-black border bg-white hover:bg-gray-500 hover:text-white">
                Login
              </Link>
            </>
          )}
          {/* <ThemeSwitch /> */}
        </div>

      </div>
    </nav>
  );
};

export default Header;

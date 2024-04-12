import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import categoriesData from '../../utils/categories';
import { getSession } from '@/utils/auth';
import axios from 'axios';
import { RxAvatar } from "react-icons/rx";
import { toast } from 'react-toastify';
import { useRouter } from '../hooks/customRouter';


const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [session, setSession] = useState(null);
  const { categories } = categoriesData; // Extract categories from JSON data
  const router = useRouter();

  useEffect(() => {
    // Assume getSession is an asynchronous function that fetches the session
    async function fetchData() {
      const response = await axios.get('/api/check')
      if (response.status == 200) {
        // console.log(response.data.message);
        setSession(response.data.session);
      }
    }
    fetchData();
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // Adjust the delay as needed (200ms in this case)
  };

  const handleDropdownToggle2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const handleLogout = async () => {
    const response = await axios.get('/api/logout')
      if (response.status == 200) {
        // console.log(response.data.message);
        setSession(null);
        router.push('/');
        toast.success(response.data.message);
      }
  };

  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Education Live" className="h-10 mr-4" />
          <span className="text-xl font-bold">Education Live</span>
        </div>

        {/* Dropdown Menu */}
        {/* <div
          className="relative ml-4 py-2 z-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="text-gray-600 hover:text-gray-900">Categories</button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-48 py-2 mt-0 bg-white border border-gray-300 rounded shadow-md">
              {categories.map((category, index) => (
                <div key={index} className="py-2 px-4">
                  <div className="font-semibold">{category.name}</div>
                  // Render subcategories 
                  <ul>
                    {category.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex} className="text-sm text-gray-700">{subcategory}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div> */}

        {/* Search Bar */}
        {/* <div className="relative ml-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            style={{ width: '300px' }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute right-3 top-3 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l4.5 4.5M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div> */}
      </div>
      <div className="menu flex w-full justify-end">
        <a href="/" className='ml-4 py-4 text-gray-500 text-center'>Home</a>
        <div
          className="relative ml-4 mr-4 py-4 z-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="text-gray-600 hover:text-gray-900">Courses</button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 py-2 mt-0 bg-white border border-gray-300 rounded shadow-md">
                <div className="py-2 px-4">
                  <ul>
                    <li className='w-full hover:bg-gray-100'><a href='/courses' className="">Masters</a></li>
                  </ul>
                </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center relative py-2 px-2">
        {session ? (
          <>
            <div className="mx-auto relative ">
              <button onClick={handleDropdownToggle2} className="px-4 py-2 text-black ">
                <RxAvatar size={28}/>
              </button>
              {/* <p>{session.user?.username}</p> */}
              {isDropdownOpen2 && (
                <div className="absolute top-full px-4 right-0 text-sm border bg-white border-gray-300 rounded shadow-md z-10">
                  <ul>
                    <li className="py-2 px-4 cursor-pointer hover:bg-gray-100"><Link href='/dashboard'>My Dashboard</Link></li>
                    <li onClick={handleLogout} className="py-2 px-4 cursor-pointer hover:bg-gray-100 text-red-500">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/teacher/login" className="text-nowrap mr-4">
              Teacher Login
            </Link>
            <Link href="/join/login" className="mr-4 px-4 py-2 text-black border bg-white hover:bg-gray-500 hover:text-white">
              Login
            </Link>
            <Link href="/join/signup" className="mr-4 px-4 py-2 border text-white bg-gray-600 hover:bg-gray-800">
              Signup
            </Link>
          </>
        )}
        {/* <ThemeSwitch /> */}
      </div>
    </nav>
  );
};

export default Header;

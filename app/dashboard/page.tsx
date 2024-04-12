'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import './dashboard.module.css';
import { MdBook, MdDashboard, MdManageAccounts, MdOutlineChat } from 'react-icons/md';
import { FaCirclePlus, FaPeopleRoof } from 'react-icons/fa6';
// import Link from 'next/link';

// Import your page components
import Home from './ui/Home';
import Posts from '@/app/forum/Forum';
import Courses from './ui/Courses';
import AccountSettings from './ui/AccountSettings';
// import AssignStudents from './pages/AssignStudents';
// import AccountSettings from './pages/AccountSettings';

export default function Page() {
    const [session, setSession] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedPage, setSelectedPage] = useState('Home'); // State to track selected page
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/check');
                
                if (response.status === 200) {
                    setSession(response.data.session);
                    console.log(session);
                    if (!response.data.session) {
                        router.push('/join/login');
                    }
                }
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        }
        fetchData();
    }, []);

    // Function to handle sidebar option click
    const handleSidebarOptionClick = (pageName: any) => {
        setSelectedPage(pageName);
    };

    // Map of page components corresponding to sidebar options
    const pageComponents = {
        Home: <Home session={session} />,
        'My Courses': <Courses session={session} />,
        'Discussion Forum': <Posts admin={false} />,
        'Account Settings': <AccountSettings session={session} />,
    };

    const sidebarOptions = [
        { icon: <MdDashboard />, label: 'Home', link: '/dashboard/summary' },
        { icon: <MdBook />, label: 'My Courses', link: '/dashboard/courses' },
        { icon: <MdOutlineChat />, label: 'Discussion Forum', link: '/dashboard/discussion-forum' },
        { icon: <MdManageAccounts />, label: 'Account Settings', link: '/dashboard/account-settings' },
    ];

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='flex h-screen'>
            <Sidebar collapsed={collapsed} className='h-screen'>
                <div className="sidebar-header">
                    <h1 className="logo p-4 text-center">
                        <strong>Welcome</strong> <br /> <i>{session?.user?.firstName}</i>
                    </h1>
                </div>
                <Menu>
                    {sidebarOptions.map((option, index) => (
                        <MenuItem icon={option.icon} key={index} onClick={() => handleSidebarOptionClick(option.label)}>
                                {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            </Sidebar>
            <div className="page-content w-full">
                {pageComponents[selectedPage]} {/* Render the selected page component */}
            </div>
        </div>
    );
}

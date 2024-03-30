'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './sidebar.css';
import { MdDashboard, MdManageAccounts, MdOutlineChat } from 'react-icons/md';
import { FaCirclePlus, FaPeopleRoof } from 'react-icons/fa6';
import Link from 'next/link';


export default function Page() {
    const [session, setSession] = useState(null);
    const router = useRouter();
    useEffect(() => {
        // Assume getSession is an asynchronous function that fetches the session
        async function fetchData() {
            const response = await axios.get('/api/adcheck')
            if (response.status == 200) {
                setSession(response.data.session);
                // console.log(response.data.session);
                if (response.data.session == null) {
                    router.push('/teacher/login');
                }
            }
        }
        fetchData();
    }, [30]);

    const [collapsed, setCollapsed] = useState(false);

    const sidebarOptions = [
        { icon: <MdDashboard />, label: 'Home', link: '/dashboard/summary' },
        { icon: <FaCirclePlus />, label: 'Add Courses', link: '/dashboard/add-courses' },
        { icon: <FaPeopleRoof />, label: 'Assign Students', link: '/dashboard/assign-students' },
        { icon: <MdOutlineChat />, label: 'Discussion Forum', link: '/dashboard/discussion-forum' },
        { icon: <MdManageAccounts />, label: 'Account Settings', link: '/dashboard/account-settings' },
    ];

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
            <div className='h-screen'>
                <Sidebar collapsed={collapsed} className='h-screen'>
                    <div className="sidebar-header">
                        <h1 className="logo p-4 text-center"> <strong>Welcome</strong> <br /> <i>{session?.user?.full_name}</i> </h1>
                    </div>
                    <Menu>
                        {sidebarOptions.map((option, index) => (
                            <MenuItem icon={option.icon} key={index}>
                                <Link href={option.link}>{option.label}</Link>
                            </MenuItem>
                        ))}
                    </Menu>
                    
                </Sidebar>
            </div>
        </>
    );
}

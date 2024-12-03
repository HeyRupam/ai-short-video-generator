"use client"
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'
import { VideoData, VideoDataContext } from '@/app/_context/VideoDataContext'
import { UserDetailsContext } from '@/app/_context/UserDetailsContext'
import { useUser } from '@clerk/nextjs'
import db from '@/configs/db'
import { Users } from '@/configs/schema'
import { eq } from 'drizzle-orm';
import {UserDetails} from '@/app/_context/UserDetailsContext'


function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [videoData, setVideoData] = useState<VideoData>({});
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);    const {user} = useUser();

    useEffect(() => {
        user && getUserDetails();
    },[user])
    const getUserDetails = async () => {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        if (!userEmail) return; // Exit early if email is undefined
        
        const result = await db.select().from(Users).where(eq(Users.email, userEmail));
        setUserDetails(result[0]);
    }
    
    return (
        <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>
            <VideoDataContext.Provider value={{ videoData, setVideoData }}>
                <div>
                    <div className='hidden md:block h-screen bg-white fixed mt-[65px] w-64'>
                        <SideNav />
                    </div>
                    <div>
                        <Header />
                        <div className='md:ml-64 p-5'>
                            {children}
                        </div>
                    </div>
                </div>
            </VideoDataContext.Provider>
        </UserDetailsContext.Provider>
    )
}

export default DashboardLayout
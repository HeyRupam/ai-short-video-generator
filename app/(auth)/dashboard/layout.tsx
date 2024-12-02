"use client"
import React, { useState } from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'
import { VideoData, VideoDataContext } from '@/app/_context/VideoDataContext'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [videoData, setVideoData] = useState<VideoData>({});
    
    return (
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
    )
}

export default DashboardLayout
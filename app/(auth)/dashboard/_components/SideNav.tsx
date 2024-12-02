"use client"
import { CircleUser, FileVideo, PanelsTopLeft, Shield, ShieldPlus } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav() {
    const MenuOptions= [
        {
            id: 1,
            name: "Dashboard",
            path: "/dashboard",
            icon: PanelsTopLeft
        },
        {
            id: 2,
            name: "Create New",
            path: "/dashboard/create-new",
            icon: FileVideo
        },
        {
            id: 1,
            name: "Upgrade",
            path: "/dashboard/upgrade",
            icon: ShieldPlus
        },
        {
            id: 1,
            name: "Account",
            path: "/dashboard/account",
            icon: CircleUser
        }
    ]
    const path = usePathname();
  return (
    <div className='w-64 h-screen shadow-md p-5'>
         <div className='grid gap-2'>
            {MenuOptions.map((item) => (
                <Link key={item.id} href={item.path}>
                    <div key={item.id} className={`flex items-center gap-3 my-3 hover:bg-primary hover:text-white rounded-md p-3 cursor-pointer  ${path === item.path && 'bg-primary text-white'}`}>
                        <item.icon size={20}/>
                        <p>{item.name}</p>
                    </div>
                </Link>
            ))}
         </div>
    </div>
  )
}

export default SideNav
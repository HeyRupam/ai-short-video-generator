import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { UserDetailsContext } from '@/app/_context/UserDetailsContext'


function Header() {
  const {userDetails, setUserDetails} = useContext(UserDetailsContext);
  return (
    <div className='p-3 px-5 items-center justify-between shadow-md flex'>
        <div className='flex gap-3x items-center'>
            <Image className='rounded-full' src="/images/logo.png" width={30} height={30} alt="logo" />
            <h2 className='text-2xl font-bold'>Ai Shorts Generator</h2>
        </div>
        <div className='flex gap-3 items-center'>
          <div className='flex gap-2 items-center'>
            <Image className='rounded-full' src="/images/coin.png" width={20} height={20} alt="credit" />
            <h2>{userDetails?.credits}</h2>
          </div>
          <Link href="/dashboard">
              <Button>Dashboard</Button>
          </Link>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header
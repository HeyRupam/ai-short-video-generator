import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

function Header() {
  return (
    <div className='p-3 px-5 items-center justify-between shadow-md flex'>
        <div className='flex gap-3 items-center'>
            <Image className='rounded-full' src="/images/logo.png" width={30} height={30} alt="logo" />
            <h2 className='text-2xl font-bold'>Ai Shorts Generator</h2>
        </div>
        <div className='flex gap-3 items-center'>
          <Link href="/dashboard">
              <Button>Dashboard</Button>
          </Link>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header
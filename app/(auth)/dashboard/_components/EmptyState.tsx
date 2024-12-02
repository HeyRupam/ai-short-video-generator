import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function EmptyState() {
  return (
    <div className='flex p-5 mt-10 flex-col border-2 border-dashed py-24 items-center'>
        <h2>You don't have short video created</h2>
        <Link className='mt-5' href="/dashboard/create-new">
            <Button>Create New Short Video</Button>
        </Link>
    </div>
  )
}

export default EmptyState
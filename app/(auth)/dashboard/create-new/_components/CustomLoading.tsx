import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'  

function CustomLoading({loading}: {loading: boolean}) {
  return (
    <AlertDialog open={loading}>
        <AlertDialogTitle hidden>Generating your video... Do not Refresh</AlertDialogTitle>
        <AlertDialogContent className='bg-white '>
            <div className='justify-center flex flex-col items-center'>
                <Image src="/images/soon.gif" width={100} height={100} alt="loading" />
                <h2>Generating your video... Do not Refresh</h2>
            </div>
        </AlertDialogContent>
    </AlertDialog>

  )
}

export default CustomLoading
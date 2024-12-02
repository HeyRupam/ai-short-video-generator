import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface SelectTopicsProps {
  onUserSelect: (type: string, value: string) => void
}
function SelectDuration({onUserSelect}: SelectTopicsProps) {
    const options = ["15 seconds", "30 seconds", "60 seconds"];
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-primary' >Duration</h2>
        <p className='text-gray-500'>Select the duration of your video</p>
        <Select onValueChange={(value) => { onUserSelect('duration', value)
        }}>
            <SelectTrigger className="w-full mt-2 p-6 text-lg">
                <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                <SelectItem key={option} value={option}>
                    {option}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}

export default SelectDuration
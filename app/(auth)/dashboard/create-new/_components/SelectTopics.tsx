"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';

interface SelectTopicsProps {
    onUserSelect: (type: string, value: string) => void
}

function SelectTopics({onUserSelect}: SelectTopicsProps) {
    const options = ["Custom Prompt", "Random AI Story", "Scary Story", "Silly Story", "Funny Story", "Historical Facts"];
    const [selectedOptions, setSelectedOptions] = useState('');
 return (
    <div>
        <h2 className='font-bold text-2xl text-primary' >Content</h2>
        <p className='text-gray-500'>What is the topic of your video?</p>
        <Select onValueChange={(value) => {
            setSelectedOptions(value)
            value !='Custom Prompt' && onUserSelect('topic', value)
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

        {selectedOptions == "Custom Prompt" && 
        <Textarea onChange={(e) => onUserSelect('topic', e.target.value)} className='mt-3' placeholder='Write your prompt here...'/>
        }

    </div>
  )
}

export default SelectTopics
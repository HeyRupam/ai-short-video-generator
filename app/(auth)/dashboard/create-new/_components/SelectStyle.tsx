"use client"
import Image from 'next/image'
import React, { useState } from 'react'

interface SelectTopicsProps {
    onUserSelect: (type: string, value: string) => void
}
function SelectStyle({onUserSelect}: SelectTopicsProps) {
    const styleOptions = [
        {
            name: "Realistic",
            image: "/images/image (2).webp"
        },
        {
            name: "Cartoon",
            image: "/images/image (2).webp"
        },
        {
            name: "Cinematic",
            image: "/images/image (2).webp"
        },
        {
            name: "Comic",
            image: "/images/image (2).webp"
        },
        {
            name: "Fantasy",
            image: "/images/image (2).webp"
        },
        {
            name: "Sci-Fi",
            image: "/images/image (2).webp"
        },
        {
            name: "Historical",
            image: "/images/image (2).webp"
        },
        {
            name: "Mystical",
            image: "/images/image (2).webp"
        },
        {
            name: "Superhero",
            image: "/images/image (2).webp"
        },
        {
            name: "Villain",
            image: "/images/image (2).webp"
        },
        {
            name: "Action",
            image: "/images/image (2).webp"
        },
        {
            name: "Comedy",
            image: "/images/image (2).webp"
        },
        {
            name: "Drama",
            image: "/images/image (2).webp"
        },
        {
            name: "Horror",
            image: "/images/image (2).webp"
        },
        {
            name: "Romance",
            image: "/images/image (2).webp"
        },
        {
            name: "Thriller",
            image: "/images/image (2).webp"
        }
    ];
    const [selectedOptions, setSelectedOptions] = useState('');
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-primary' >Style</h2>
        <p className='text-gray-500'>Select your video style</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-5 mt-7'> 
            {styleOptions.map((option) => (
                <div key={option.name} className={`relative hover:scale-105 duration-200 cursor-pointer translate-all ${selectedOptions==option.name && 'border-4 border-primary'}`}>
                    <Image onClick={() => {setSelectedOptions(option.name); onUserSelect('imageStyle', option.name)}} className='h-80 object-cover rounded-lg w-full' src={option.image} width={1000} height={100} alt={option.name} /> 
                    <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>{option.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectStyle
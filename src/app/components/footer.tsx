import React from 'react'
import logo from '@assets/logo 1.png'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
    return (
        <div className='p-10 bg-zinc-800 text-white grid grid-cols-4 gap-4'>
            <div className='col-span-1  flex flex-col items-center justify-center gap-2'>
                <Image src={logo} alt='logo' />
                <h2 className='text-soft-pink-300 font-semibold text-lg whitespace-nowrap'>Rose E-Commerce App</h2>
                <p className='text-zinc-100 text-sm font-normal'>All rights reserved | {new Date().getFullYear()}</p>
            </div>
            <div className='col-span-2'>
                <ul className='flex flex-col items-start justify-start gap-2 text-zinc-100 text-base font-medium'>
                    <li className='text-soft-pink-300 font-semibold text-lg'>Discover our website</li>
                    <li>Home</li>
                    <li>Products</li>
                    <li>Categories</li>
                    <li>Occasions</li>
                    <li>Contact</li>
                    <li>About</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                    <li>FAQs</li>
                </ul>
            </div>
            <div className='col-span-1'>
                <p className='font-semibold text-xl text-soft-pink-300'>Get <span className='text-maroon-50'>20%</span> Off Discount Coupon</p>
                <p className='text-zinc-500 font-normal text-sm'>By subscribing to our newsletter</p>
                <div className='flex items-center justify-between gap-2 mt-4 relative'>
                    <Input placeholder='Enter your email' className='bg-zinc-600 text-white border-none ps-4 w-[375px] h-9 rounded-[30px]' />
                    <Button className='bg-maroon-50 absolute inset-y-0 h-full w-[121px] end-0 text-maroon-700 font-medium text-sm hover:bg-soft-pink-400 rounded-full px-4 py-[10px]'>Subscribe <ArrowRight /></Button>
                </div>
            </div>
        </div>
    )
}


import Image from 'next/image'
import React from 'react'
import logo from '@assets/logo 1.png'
import { SearchInput } from '@/components/ui/seach-input'
import { Bell, ClipboardList, Gift, Headset, Heart, Home, Info, LocationEdit, PartyPopper, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    // This is a header component that includes a logo, search input, user actions, and a navigation bar.
    // It displays the user's location, greeting, and icons for favorites, cart, and notifications.

    // Navbar object
    const navbar = [
        {
            name: 'Home',
            href: '/',
            icons: <Home className='w-4 h-4' />
        },
        {
            name: 'Products',
            href: '/products',
            icons: <Gift className='w-4 h-4' />
        },
        {
            name: 'Categories',
            href: '/categories',
            icons: <ClipboardList className='w-4 h-4' />
        },
        {
            name: 'Occasions',
            href: '/occasions',
            icons: <PartyPopper className='w-4 h-4' />
        },
        {
            name: 'Contact',
            href: '/contact',
            icons: <Headset className='w-4 h-4' />
        },
        {
            name: 'About',
            href: '/about',
            icons: <Info className='w-4 h-4' />
        },
    ];

    return (
        <div className=" text-black p-4 flex flex-col ">
            {/* header */}
            <div className="text-lg font-bold bg-white p-2 flex items-center justify-between gap-4 w-full">
                {/* image logo */}
                <Image src={logo} alt='Logo' className='w-[85px] h-[85px]' />

                {/* address */}
                <div className='flex-1 text-center '>
                    <p className='text-zinc-500 text-sm font-normal whitespace-nowrap'>Deliver to:</p>
                    <div className='text-maroon-700 font-medium text-base flex flex-wrap items-center gap-2'>
                        <LocationEdit />
                        <p>Cairo</p>
                    </div>
                </div>
                {/* input search */}
                <SearchInput className='w-full' placeholder='What awesome gift are you looking for?' />

                {/* action */}
                <div className='flex items-center gap-4 p-4'>
                    {/* authentication */}
                    <div className='flex-1 '>
                        <p className='text-zinc-500 text-[14px] font-normal whitespace-nowrap'>hello </p>
                        <div className='text-maroon-700 font-medium text-base flex flex-wrap items-center gap-2 ms-2'>
                            <p>mahmoud</p>
                        </div>
                    </div>

                    {/* user data */}
                    <div className='flex-1 flex items-center gap-2'>
                        <Heart />
                        <ShoppingCart />
                        <Bell />
                    </div>

                    {/* language */}
                    <div className='text-zinc-500 text-sm font-normal'>
                        <p>العربيه</p>
                    </div>
                </div>


            </div>

            {/* navbar */}
            <nav className="bg-maroon-700 text-white flex justify-center gap-2">
                {navbar.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="p-4 text-[16px] font-medium duration-100 hover:text-soft-pink-200 hover:border-b-2 transition-all"
                    >
                        <div className='flex gap-2 justify-center items-center'>
                            {item.icons}
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

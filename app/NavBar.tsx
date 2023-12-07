'use client'

import React, { useState, Key } from 'react'
import Link  from 'next/link'
import { HiMenuAlt3 } from "react-icons/hi";

interface MenuItem {
    'id' : Key,
    'title' : String,
    'route' : String,
}

const NavBar = () => {
    const menuItems: MenuItem[] = [
        {
            id: 1,
            title: 'Home',
            route: '#home', 
        },
        {
            id: 2,
            title: 'About Me',
            route: '#profile', 
        },
        {
            id: 3,
            title: 'Services',
            route: '#tools', 
        },
        {
            id: 4,
            title: 'Portfolio',
            route: '#portfolio', 
        },
        {
            id: 5,
            title: 'Post',
            route: '#', 
        },
    ];

    const [showDrawer, setShowDrawer] = useState(false);
    function drawerButtonClick () {
        setShowDrawer(!showDrawer);
    }

  return (
    <div className=' bg-white py-3 px-5 border-b sticky top-0 z-50'>
        <div className=' max-w-5xl flex gap-4 items-center justify-between mx-auto'>
            <Link href={'#'}>
                <h1 className=' font-bold text-hprimary text-2xl'>Anjar.Hariadi</h1>
            </Link>
            <div className=' gap-4 hidden lg:flex items-center'>
                <ul className=' flex gap-4'>
                {
                    menuItems.map(item => (<li key={item.id}>
                        <Link href={`${item.route}`} className=' hover:text-hprimary'>{item.title}</Link>
                    </li>))
                }
                </ul>
                <Link href={'#contact'} className=' p-3 rounded-md bg-hprimary hover:bg-hprimary-dark text-white transition-colors'>Contact Me</Link>
            </div>
            <button className=' p-3 block lg:hidden' onClick={drawerButtonClick}><HiMenuAlt3></HiMenuAlt3></button>
        </div>
        <div className={`w-[60%] h-screen bg-slate-200 fixed flex flex-col shadow-md top-0 transition-all p-4 gap-4 ${showDrawer? 'left-0' : 'left-[-100%]'}`}>
                <ul className=' mt-7 flex flex-col items-center gap-4'>
                {
                    menuItems.map(item => (<li key={item.id}>
                        <Link href={`${item.route}`} className=' hover:text-hprimary'>{item.title}</Link>
                    </li>))
                }
                </ul>
            <Link href={'#contact'}> <button className=' p-3 w-full rounded-md bg-hprimary hover:bg-hprimary-dark text-white transition-colors'>Contact Me</button></Link>
        </div>
    </div>
  )
}

export default NavBar
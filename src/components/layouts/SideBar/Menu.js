"use client"

import React from 'react';
import MenuItem from './MenuItem';
import { PiMonitorPlayFill } from "react-icons/pi";
import { SiThemoviedatabase } from "react-icons/si";
import { GiTheater } from "react-icons/gi";
import { usePathname, useRouter } from 'next/navigation';

function Menu() {
    const router = useRouter();
    const pathname = usePathname();
  
    // Hàm kiểm tra menu active dựa trên pathname
    const isActive = (menuPath) => pathname === menuPath;
    
    return (
        <div className='w-full h-auto flex flex-col space-y-1'>
            <MenuItem 
                isActive={isActive("/") || isActive("/watch")}
                icon={<PiMonitorPlayFill className='text-[25px]'/>}
                menuName="Movies"
                onClick={() => {
                    router.push("/")
                }}
            />
            <MenuItem 
                isActive={isActive("/movies")}
                icon={<SiThemoviedatabase className='text-[25px]'/>}
                menuName="Phim chiếu rạp"
                onClick={() => {
                    router.push("/movies")
                }}
            />
            <MenuItem 
                isActive={isActive("/cinemas")}
                icon={<GiTheater className='text-[25px]'/>}
                menuName="Hệ thống rạp chiếu"
                onClick={() => {
                    router.push("/cinemas")
                }}
            />
            {/* <MenuItem 
                icon={<PiMonitorPlayFill className='text-[25px]'/>}
                menuName="Dịch vụ"
            /> */}
        </div>
    );
}

export default Menu;
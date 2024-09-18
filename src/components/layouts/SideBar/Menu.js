import React from 'react';
import MenuItem from './MenuItem';
import { PiMonitorPlayFill } from "react-icons/pi";
import { SiThemoviedatabase } from "react-icons/si";
import { GiTheater } from "react-icons/gi";
function Menu() {
    return (
        <div className='w-full h-auto flex flex-col space-y-1'>
            <MenuItem 
                isActive={true}
                icon={<PiMonitorPlayFill className='text-[25px]'/>}
                menuName="Movies"
            />
            <MenuItem 
                icon={<SiThemoviedatabase className='text-[25px]'/>}
                menuName="Phim chiếu rạp"
            />
            <MenuItem 
                icon={<GiTheater className='text-[25px]'/>}
                menuName="Hệ thống rạp chiếu"
            />
            {/* <MenuItem 
                icon={<PiMonitorPlayFill className='text-[25px]'/>}
                menuName="Dịch vụ"
            /> */}
        </div>
    );
}

export default Menu;
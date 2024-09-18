import React from 'react';
import Logo from './Logo';
import CardBlur from '~/components/ui/CardBlur';
import UserInfo from './UserInfo';
import Menu from './Menu';

function SideBar() {
    return (
        <div 
            className='fixed top-0 left-0 w-[40%] md:w-[30%] lg:w-[25%] xl:w-[20%] 2xl:w-[17%] p-3 space-y-4'
        >
            {/* Logo */}
            <Logo />
            
            {/* Card User Info */}
            <CardBlur className="p-4 select-none">
                <UserInfo />

            </CardBlur>

            {/* Menu */}
            <Menu />
        </div>
    );
}

export default SideBar;
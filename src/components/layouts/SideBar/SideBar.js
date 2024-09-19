import React from 'react';
import Logo from './Logo';
import CardBlur from '~/components/ui/CardBlur';
import UserInfo from './UserInfo';
import Menu from './Menu';
import { useSelector } from 'react-redux';

function SideBar() {
    const { isMenuSideBar } = useSelector(state => state.configState)

    return (
        <div className={`fixed top-0 left-0 w-[40%] md:w-[30%] lg:w-[25%] xl:w-[20%] 2xl:w-[17%]
        max-md:z-[999] max-md:backdrop-blur-lg max-md:h-[100vh] max-md:w-[100%] max-md:transition-all max-md:duration-200
        max-md:translate-x-[-100%]
         ${isMenuSideBar && 'max-md:translate-x-[0]' || '' }
        `}
        >
            {/* Logo */}
            <Logo />
            <div 
                className='p-3 pt-0 space-y-4'
            >
                {/* Card User Info */}
                <CardBlur className="p-4 select-none">
                    <UserInfo />

                </CardBlur>

                {/* Menu */}
                <Menu />
            </div>
        </div>
    );
}

export default SideBar;
"use client"

import { usePathname, useRouter } from 'next/navigation';
import { PiMonitorPlayFill } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { configAction } from '~/redux/reducers/configReducer';
import MenuItem from './MenuItem';
import { SiSololearn } from "react-icons/si";

function Menu() {
    const router = useRouter();
    const pathname = usePathname();

    const dispatch = useDispatch()
  
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
                    dispatch(configAction.setIsMenuSideBar(false))
                }}
            />
            <MenuItem 
                isActive={isActive("/learn-english")}
                icon={<SiSololearn className='text-[25px]'/>}
                menuName="Vòcảbùlarí English"
                onClick={() => {
                    router.push("/learn-english")
                    dispatch(configAction.setIsMenuSideBar(false))
                }}
            />
            {/* <MenuItem 
                isActive={isActive("/movies")}
                icon={<SiThemoviedatabase className='text-[25px]'/>}
                menuName="Phim chiếu rạp"
                onClick={() => {
                    router.push("/movies")
                    dispatch(configAction.setIsMenuSideBar(false))
                }}
            />
            <MenuItem 
                isActive={isActive("/cinemas")}
                icon={<GiTheater className='text-[25px]'/>}
                menuName="Hệ thống rạp chiếu"
                onClick={() => {
                    router.push("/cinemas")
                    dispatch(configAction.setIsMenuSideBar(false))
                }}
            /> */}
        </div>
    );
}

export default Menu;
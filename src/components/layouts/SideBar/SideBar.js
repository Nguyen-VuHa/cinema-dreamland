import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TbLogout2 } from "react-icons/tb";
import { useSelector } from 'react-redux';
import Button from '~/components/ui/Button';
import CardBlur from '~/components/ui/CardBlur';
import { ACCESS_TOKEN, LOGIN_METHOD, REFRESH_TOKEN, USER_ID } from '~/constants/cookie';
import Logo from './Logo';
import Menu from './Menu';
import UserInfo from './UserInfo';

function SideBar() {
    const { isMenuSideBar } = useSelector(state => state.configState)

    const [isLogin, setIsLogin] = useState(0);

    useEffect(() => {
        let accessToken = Cookies.get(ACCESS_TOKEN)
        
        if(accessToken)
            setIsLogin(1)
        else
            setIsLogin(2)
    }, [isLogin]);

    return (
        <div className={`fixed top-0 left-0 w-[40%] md:w-[30%] lg:w-[25%] xl:w-[20%] 2xl:w-[17%] h-full flex flex-col justify-between
        max-md:z-[999] max-md:backdrop-blur-lg max-md:h-[100vh] max-md:w-[100%] max-md:transition-all max-md:duration-200
        max-md:translate-x-[-100%]
         ${isMenuSideBar && 'max-md:translate-x-[0]' || '' }
        `}
        >
            <div>
                {/* Logo */}
                <Logo />
                <div 
                    className='w-full space-y-4 p-3 pt-0 flex flex-col justify-between'
                >
                    {/* Card User Info */}
                    <CardBlur className="p-4 select-none">
                        {
                            isLogin == 1 && <UserInfo />
                        }
                        {
                            isLogin == 2 && <div className='flex flex-col space-y-2'>
                                <span className='text-sm font-semibold'>Trải nghiệm xem video chất lượng cao ngay hôm nay!</span>
                                <span className='text-xs text-input-place'>🌟 Tận hưởng trải nghiệm xem phim độc đáo với chất lượng HD và 4K. Đăng nhập hoặc tạo tài khoản mới để khám phá kho phim đa dạng và các chương trình độc quyền chỉ dành cho thành viên.</span>
                                <div className='flex space-x-2 text-sm text-primary/80'>
                                    <Link href={'/auth/sign-in'}>
                                        Đăng nhập
                                    </Link>
                                    <Link className='underline text-info' href={'/auth/sign-up'}>
                                        Bạn chưa có tài khoản?
                                    </Link>
                                </div>
                            </div>
                        }
                    </CardBlur>
                    {/* Menu */}
                    <Menu />
                </div>
            </div>
            <div className="p-3 mb-5">
                <Button 
                    className="space-x-2"
                    onClick={() => {
                        Cookies.remove(ACCESS_TOKEN)
                        Cookies.remove(REFRESH_TOKEN)
                        Cookies.remove(USER_ID)
                        Cookies.remove(LOGIN_METHOD)

                        window.location.reload()
                    }}
                >   
                    <TbLogout2 size={20} />
                    <span>Đăng xuất</span>
                </Button>
            </div>
        </div>
    );
}

export default SideBar;
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaMoneyCheckDollar } from "react-icons/fa6";
import Button from '~/components/ui/Button';
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { USER_ID } from '~/constants/cookie';
import { actionUser } from '~/redux/reducers/userReducer';
import { formatCurrency, formatPhoneNumber } from '~/utils/format';
import { randomResolution } from '~/utils/random';

function UserInfo() {
    const dispatch = useDispatch()
    const { userDetail } = useSelector(state => state.userState)

    useEffect(() => {
        let userID = Cookies.get(USER_ID)

        dispatch(actionUser.processFetchUserDetail({
            _user_id: userID
        }))

    }, [dispatch])
    
    return (
        <>
            <div className='w-full flex items-center space-x-2'>
                {/* Image */}
                <div className='w-[60px] h-[60px] flex-shrink-0'>
                    <Image
                        className='w-full' 
                        alt='NO LOGO'
                        src="/logo.png"
                        priority
                        width={180}
                        height={1}
                    />
                </div>
                {/* Fullname & Email */}
                <div className='flex flex-col space-y-2 w-full-name-with text-white'>
                    <span className='text-lg truncate w-full'>{ userDetail?.full_name }</span>
                    <span className='text-xs truncate w-full text-input-place'>{ formatPhoneNumber(userDetail?.phone_number) }</span>
                </div>
            </div>
            {/* Balance */}
            <div className='mt-2 flex justify-between items-end'>
                <div>
                    <span className='text-input-place text-xs'>Số dư hiện tại</span>
                    <div className='flex items-center space-x-2'>
                        <FaMoneyCheckDollar className='text-[25px] text-success'/>
                        <span className='text-success'>{formatCurrency(randomResolution())}</span>
                    </div>
                </div>
                <Button className="!w-fit h-full">
                    <FaUserEdit className='text-lg text-input-place'/>
                </Button>
            </div>
        </>
    );
}

export default UserInfo;
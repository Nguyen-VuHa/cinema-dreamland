import Image from 'next/image';
import React from 'react';
import { FaMoneyCheckDollar } from "react-icons/fa6";
import Button from '~/components/ui/Button';
import { FaUserEdit } from "react-icons/fa";

function UserInfo() {
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
                    <span className='text-lg truncate w-full'>Nguyễn Vũ Hạ</span>
                    <span className='text-xs truncate w-full text-input-place'>+84 38 831 8629</span>
                </div>
            </div>
            {/* Balance */}
            <div className='mt-2 flex justify-between items-end'>
                <div>
                    <span className='text-input-place'>Balance</span>
                    <div className='flex items-center space-x-2'>
                        <FaMoneyCheckDollar className='text-[25px] text-success'/>
                        <span className='text-success'>$1,000.00</span>
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
import Image from 'next/image';
import React from 'react';
import CardBlur from '~/components/ui/CardBlur';

function MovideItem() {

    return (
        <CardBlur
            className="p-1 w-full cursor-pointer space-y-3 hover:bg-layout-primary transition-all"
        >
            <Image
                className='w-full overflow-hidden rounded-md' 
                alt='NO THUMNAIL'
                src="http://192.168.1.121/md/image/17f4628fe7602a91478a478c7b2a753d_main.jpg"
                priority
                width={300}
                height={1}
            />
            <div className='flex flex-col p-2 space-y-3'>
                <span className=' md:text-md text-ellipsis line-clamp-2'>
                    Thập niên nhân gian - Lý Thường Siêu (Lão Can Ma) _ 十年人间 - 李常超 （老干妈）@ 花开天下
                </span>
                <div className='flex items-center space-x-1 text-input-place text-xs'>
                    <span>32 lượt xem</span>
                    <span>•</span>
                    <span>3 giờ trước</span>
                </div>
            </div>
        </CardBlur>
    );
}

export default MovideItem;
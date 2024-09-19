'use client';
import Image from 'next/image';
import CardBlur from '~/components/ui/CardBlur';

function RecommendItem({ onClick }) {
    return (
        <CardBlur
            className="
                flex justify-start p-1 
                w-full cursor-pointer space-x-2 
                lg:flex-col lg:space-y-1 lg:space-x-0 2xl:flex-row 2xl:space-x-2 2xl:space-y-0
                hover:bg-layout-primary 
                transition-all
            "
            onClick={() => {
                onClick && onClick()
            }}
        >
            <Image
                className='overflow-hidden rounded-md w-[40%] flex-shrink-0 lg:w-[100%] 2xl:w-[40%]' 
                alt='NO THUMNAIL'
                src="http://192.168.1.121/md/image/17f4628fe7602a91478a478c7b2a753d_main.jpg"
                priority
                width={300}
                height={1}
            />
            <div className='flex justify-between flex-col space-y-3'>
                <span className='text-xs text-ellipsis line-clamp-3'>
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

export default RecommendItem;
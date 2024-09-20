'use client';
import dayjs from 'dayjs';
import Image from 'next/image';
import CardBlur from '~/components/ui/CardBlur';
import { formatViewCount } from '~/utils/format';
import { getRandomNumber } from '~/utils/random';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi'; // Import locale tiếng Việt

dayjs.locale('vi');
// Cài đặt plugin relativeTime
dayjs.extend(relativeTime);


function RecommendItem({ onClick, data }) {
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
                src={`http://192.168.1.121/md/image/${data.ID}_main.jpg`}
                priority
                width={300}
                height={1}
            />
            <div className='flex justify-between flex-col space-y-3'>
                <span className='text-xs text-ellipsis line-clamp-3' title={data.title || 'NO TITLE'}>
                    {data.title || 'NO TITLE'}
                </span>
                <div className='flex items-center space-x-1 text-input-place text-xs'>
                    <span>{formatViewCount(getRandomNumber())} lượt xem</span>
                    <span>•</span>
                    <span>{dayjs(data.createTime).fromNow()}</span>
                </div>
            </div>
        </CardBlur>
    );
}

export default RecommendItem;
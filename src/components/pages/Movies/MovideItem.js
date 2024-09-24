import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import CardBlur from '~/components/ui/CardBlur';
import { formatViewCount } from '~/utils/format';
import { getRandomNumber } from '~/utils/random';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi'; // Import locale tiếng Việt
import { URL_GET_FILE } from '~/constants/url';

dayjs.locale('vi');
// Cài đặt plugin relativeTime
dayjs.extend(relativeTime);

function MovideItem({ onClick, data }) {

    return (
        <CardBlur
            className="p-1 w-full cursor-pointer space-y-3 hover:bg-layout-primary transition-all"
            onClick={() => {
                onClick && onClick()
            }}
        >
            <Image
                className='w-full h-[140px] max-sm:h-[110px] overflow-hidden rounded-md' 
                alt='NO THUMNAIL'
                src={URL_GET_FILE + `${data.ID}_main.jpg`}
                priority
                width={300}
                height={1}
            />
            <div className='flex flex-col p-2 space-y-3'>
                <span className='text-sm text-ellipsis line-clamp-2' title={data.title || 'NO TITLE'}>
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

export default MovideItem;
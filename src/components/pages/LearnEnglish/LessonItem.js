import React from 'react';
import CardBlur from '~/components/ui/CardBlur';


const LessonItem = () => {
    return (
        <CardBlur
            className="flex p-3 w-full cursor-pointer space-y-3 hover:bg-layout-primary transition-all select-none"
        >
            <span
                className='w-full text-ellipsis line-clamp-2'
            >
                Lesson 1 - (Đông x Thazh Remix) - 若把你 - Kirsty刘瑾睿 -- Nhạc Trung Hot TikTok Mới Nhất 2024
            </span>
        </CardBlur>
    );
};

export default LessonItem;
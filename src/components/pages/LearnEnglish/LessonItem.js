import React from 'react';
import CardBlur from '~/components/ui/CardBlur';

const LessonItem = ({ data }) => {
    return (
        <CardBlur
            className="flex p-3 w-full cursor-pointer space-y-3 hover:bg-layout-primary transition-all select-none"
        >
            <span
                className='w-full text-ellipsis line-clamp-2'
            >
                {data.LessonName}
            </span>
        </CardBlur>
    );
};

export default LessonItem;
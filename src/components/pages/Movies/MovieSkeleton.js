import React from 'react';
import CardBlur from '~/components/ui/CardBlur';

function SkeletonItem() {
    return <CardBlur
        className="p-1 w-full cursor-pointer"
    >
        <div className="animate-pulse w-full h-full flex flex-col space-y-3">
            <div className='w-full h-[150px] overflow-hidden rounded-md bg-input-place/40' >
                
            </div>
            <div className='space-y-1 py-2'>
                <div className="h-4 w-[90%] bg-input-place/40 rounded"></div>
                <div className="h-4 w-[60%] bg-input-place/40 rounded"></div>
            </div>
            <div className='flex space-x-1'>
                <div className="h-3 w-[20%] bg-input-place/40 rounded"></div>
                <div className="h-3 w-[5%] bg-input-place/40 rounded"></div>
                <div className="h-3 w-[10%] bg-input-place/40 rounded"></div>
            </div>
        </div>
    </CardBlur>
}

function MovieSkeleton({}) {
    
    return (
        <>
            {
                Array.from({ length: 7 }).map((_, index) => (
                    <SkeletonItem key={index}/>
                ))
            }
        </>
    );
}

export default MovieSkeleton;
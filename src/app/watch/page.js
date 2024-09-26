"use client"

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Recommend from '~/components/pages/Watch/Recommend';
import { actionMedia } from '~/redux/reducers/mediaReducer';
const ScreenView = dynamic(() => import('~/components/pages/Watch/ScreenView'), { ssr: false });

function WatchPage() {
    const dispatch = useDispatch()

    const searchParams = useSearchParams();
    // Lấy giá trị của query parameter 'm'
    const id = searchParams.get('m');

    // const movieId = searchParams.m;  // Lấy movieId từ query string
    
    // // Fetch dữ liệu từ API
    // const movieData = await fetchMovieData(movieId);

    useEffect(() => {
        if(id) {
            dispatch(actionMedia.setIsScreenView(false))

            dispatch(actionMedia.processFetchMovieDetail({
                _movie_id: id
            }))
        }
    }, [id])

    return (
        <div className='grid lg:grid-flow-row-dense lg:grid-cols-4 gap-2'>
            <div className='lg:col-span-3'>
                <ScreenView />
            </div>
            <div>
                <Recommend />
            </div>
        </div>
    );
}

export default WatchPage;
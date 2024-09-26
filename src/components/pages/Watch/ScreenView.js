"use client"

import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import locale tiếng Việt
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { v4 as uuidV4 } from 'uuid';
import CardBlur from '~/components/ui/CardBlur';
import toastConstant from '~/constants/toastify';
import { toastifyAction } from '~/redux/reducers/toastReducer';
import { formatViewCount } from '~/utils/format';
import { getRandomNumber } from '~/utils/random';
import VideoPlayer from './VideoPlayer';
import { useRouter, useSearchParams } from 'next/navigation';
import Description from './Description';
dayjs.locale('vi');
// Cài đặt plugin relativeTime
dayjs.extend(relativeTime);

function ScreenView() {
    const searchParams = useSearchParams();
    // Lấy giá trị của query parameter 'm'
    const id = searchParams.get('m');

    const router = useRouter()

    const dispatch = useDispatch()
    const { movieDetail, movieList } = useSelector(state => state.mediaState)

    const [videoSource, setVideoSource] = useState('');
    const [thumnailSource, setThumnailSource] = useState('');
    

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadVideoError, setIsLoadVideoError] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);

    useEffect(() => {
        if(isLoadVideoError) {
            setIsLoading(true)

            dispatch(toastifyAction.createToastMessage({
                uuid: uuidV4(),
                position: toastConstant.TOAST_TOP_RIGHT,
                toastText: "Video gặp sự cố, vui lòng thử lại sau.",
                duration: 3500,
                type: 'WARN',
            }))
        }
    }, [isLoadVideoError, isLoading])

    const handleViewVideo = async () => { 
        if(movieDetail) {
            const src  = process.env.NEXT_PUBLIC_API_URL + `/md/video/${movieDetail?.ID}.m3u8`
            const thumnailSource = process.env.NEXT_PUBLIC_API_URL + `/md/image/${movieDetail?.ID}.vtt`
    
            setVideoSource(src)
            setThumnailSource(thumnailSource)
    
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }

    useEffect(() => {
        setIsLoading(true)
        handleViewVideo()
    }, [movieDetail])

    useEffect(() => {
        if(videoEnded) {    
            setVideoEnded(false)

            if (movieList && !(movieList.length > 0))
                return 

            let movieClean = movieList.filter(movie => movie.ID != id)

            if (!(movieClean.length > 0))
                return

            const randomIndex = Math.floor(Math.random() * movieClean.length);
            let item = movieClean[randomIndex]
            router.push(`/watch?m=${item.ID}`)
        }
    }, [videoEnded])

    return (
        <div className='space-y-2'>
            <CardBlur className="p-2">
                <div className='w-full h-full relative rounded-md overflow-hidden min-h-[300px] space-y-3'>
                    {
                        isLoading && <div className='z-[4] absolute w-full min-h-[300px] h-full top-0 left-0 bg-layout-primary'>
                            <div className='flex flex-col justify-center items-center w-full h-full space-y-2'>
                                <BarLoader color='#f9ab00'/>
                                <span>Đang tải ...</span>
                            </div>
                        </div>
                    }
                    <VideoPlayer 
                        videoSource={videoSource}
                        isLoadVideoError={setIsLoadVideoError}
                        thumbnailSource={thumnailSource}
                        setIsLoading={setIsLoading}
                        setVideoEnded={setVideoEnded}
                    />
                    <div className='text-lg font-semibold'>{movieDetail?.title}</div>
                </div>
            </CardBlur>
            <CardBlur className="p-2 space-y-3">
                {/* thng số lượt xem + ngày đăng tải */}
                <div className='flex items-center space-x-1 text-white text-xs'>
                    <span>{formatViewCount(getRandomNumber())} lượt xem</span>
                    <span>•</span>
                    <span>{dayjs(movieDetail?.createTime).fromNow()}</span>
                </div>
                {/* description */}
                <div className='text-sm text-input-place whitespace-pre-line'>
                    <Description
                        description={movieDetail?.description} 
                    />
                </div>
            </CardBlur>
        </div>
    );
}

export default ScreenView;
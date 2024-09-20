"use client"

import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import locale tiếng Việt
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { v4 as uuidV4 } from 'uuid';
import { apiGetMediaVideo } from '~/apis/media';
import CardBlur from '~/components/ui/CardBlur';
import toastConstant from '~/constants/toastify';
import { toastifyAction } from '~/redux/reducers/toastReducer';
import { formatViewCount } from '~/utils/format';
import { getRandomNumber } from '~/utils/random';
import VideoPlayer from './VideoPlayer';
dayjs.locale('vi');
// Cài đặt plugin relativeTime
dayjs.extend(relativeTime);

function ScreenView() {
    const dispatch = useDispatch()
    const { movieDetail } = useSelector(state => state.mediaState)

    const [videoSource, setVideoSource] = useState('');
    const [thumnailSource, setThumnailSource] = useState('');
    

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadVideoError, setIsLoadVideoError] = useState(false);

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
            setIsLoadVideoError(false)
        }
    }, [isLoadVideoError, isLoading])

    const handleViewVideo = async () => { 
        const res = await apiGetMediaVideo(movieDetail?.ID) 

        if(res && res.length > 1) {
            const playlist = res.find(segment => segment.name.endsWith('.m3u8'));
            const src = process.env.NEXT_PUBLIC_API_URL_DEV + playlist.path
            const thumnailSource = process.env.NEXT_PUBLIC_API_URL_DEV + `/md/image/${movieDetail?.ID}.vtt`

            setVideoSource(src)
            setThumnailSource(thumnailSource)

            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleViewVideo()
    }, [movieDetail])

    return (
        <div className='space-y-2'>
            <CardBlur className="p-2">
                <div className='w-full relative rounded-md overflow-hidden space-y-3'>
                    {
                        isLoading &&  <div className='z-[4] absolute w-full h-full top-0 left-0 bg-layout-primary'>
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
                    {movieDetail?.description}
                </div>
            </CardBlur>
        </div>
    );
}

export default ScreenView;
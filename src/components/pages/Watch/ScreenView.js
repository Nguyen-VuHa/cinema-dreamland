"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import Hls from 'hls.js';
import { BarLoader } from 'react-spinners';
import CardBlur from '~/components/ui/CardBlur';


function ScreenView() {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const [isFirts, setIsFirts] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleViewVideo = async () => {
        fetch('http://localhost:8080/api/media/video/17f4628fe7602a91478a478c7b2a753d')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const playlist = data.find(segment => segment.name.endsWith('.m3u8'));

            if (playlist) {
                const src = `http://localhost:8080${playlist.path}`;

                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(src);
                    hls.attachMedia(videoRef.current);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        playerRef.current = new Plyr(videoRef.current, {
                            controls: [
                                'play-large', // The large play button in the center
                                'restart', // Restart playback
                                'rewind', // Rewind by the seek time (default 10 seconds)
                                'play', // Play/pause playback
                                'fast-forward', // Fast forward by the seek time (default 10 seconds)
                                'progress', // The progress bar and scrubber for playback and buffering
                                'current-time', // The current time of playback
                                'duration', // The full duration of the media
                                'mute', // Toggle mute
                                'volume', // Volume control
                                'captions', // Toggle captions
                                'settings', // Settings menu
                                'pip', // Picture-in-picture (currently Safari only)
                                'airplay', // Airplay (currently Safari only)
                                'fullscreen', // Toggle fullscreen
                            ],
                            previewThumbnails: {
                                enabled: true, // Ban đầu tắt tải thumbnail
                                src: `http://localhost:8080/md/image/17f4628fe7602a91478a478c7b2a753d.vtt`,
                            },
                        });

                        // Kiểm tra khi video bắt đầu phát
                        playerRef.current.on('play', () => {
                            setIsLoading(false)
                            // Kiểm tra xem video có đang muted không
                            if (videoRef.current.muted) {
                                console.log('Video is muted');
                            } else {
                                console.log('Video is not muted');
                            }
                        });
                    
                        // Kiểm tra khi video tạm dừng
                        playerRef.current.on('pause', () => {
                            console.log('Video is paused');
                        });
                    
                        // Bạn có thể thêm lắng nghe sự kiện cho khi tắt hoặc bật tiếng
                        playerRef.current.on('volumechange', () => {
                            if (videoRef.current.muted) {
                                console.log('Video is muted');
                            } else {
                                console.log('Video is not muted');
                            }
                        });
                    });
                } 
            }
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch request cancelled');
            } else {
                console.error('Fetch error:', error);
            }
        });
    }

    useLayoutEffect(() => { 
        handleViewVideo() 

    }, [])

    useEffect(() => {
        // Kiểm tra xem người dùng đã từng nhấn nút play trước đó chưa (lưu trong localStorage)
        const hasPlayed = localStorage.getItem('hasPlayed');
        
        console.log(hasPlayed && videoRef.current);
      
        if (hasPlayed && videoRef.current) {
            videoRef.current.muted = false
            videoRef.current.play(); 
            setIsFirts(true)
            setIsLoading(false)
        }
    }, []);

    useEffect(() => {
        if (videoRef.current && playerRef.current && isFirts) {
            videoRef.current.muted = false
            playerRef.current.play()
            setIsLoading(false)
        }
    }, [videoRef, playerRef, isFirts]);

    return (
        <div className='space-y-2'>
            <CardBlur className="p-2">
                <div className='w-full relative rounded-md overflow-hidden space-y-3'>
                    {
                        isLoading &&  <div className='z-[10] absolute w-full h-full top-0 left-0 bg-layout-primary'>
                            <div className='flex flex-col justify-center items-center w-full h-full space-y-2'>
                                <BarLoader color='#f9ab00'/>
                                <span>Đang tải ...</span>
                            </div>
                        </div>
                    }
                    <video ref={videoRef} autoPlay={true} className="plyr__video-embed w-full h-auto" controls muted={false} playsInline />
                    <div className='text-lg font-semibold'>Thập niên nhân gian - Lý Thường Siêu (Lão Can Ma) _ 十年人间 - 李常超 （老干妈）@ 花开天下</div>
                </div>
            </CardBlur>
            <CardBlur className="p-2 space-y-3">
                {/* thng số lượt xem + ngày đăng tải */}
                <div className='flex items-center space-x-1 text-input-place text-xs'>
                    <span>32 lượt xem</span>
                    <span>•</span>
                    <span>3 giờ trước</span>
                </div>
                {/* description */}
                <div className='text-sm text-input-place'>
                    Enjoy Your Day 🌻 Chill morning songs to start your day ~ English songs chill vibes playlist

                    Hello everyone! Welcome to Chill Melody  🌻
                    TRACKLIST: 
                    0:00 I Wish You Were Mine - Loving Caliber
                    3:46 For Some Time - Daniel Gunnarsson
                    9:47 I'll Get Over You - Loving Caliber
                    13:08 What Is It Like - Loving Caliber
                    16:11 Just Do It - Houses On The Hill
                    19:08 Pretty Little Liar - Candelion
                    24:07 Next to Me (Acoustic Version) - Lvly
                    28:18 Just One Kiss - Loving Caliber
                    31:34 It Really Makes Me Wonder - Loving Caliber
                    34:46 Into The Night - Bird Of Figment
                    38:02 Homesick - Loving Caliber
                    41:53 Deep Into Your Eyes - Gold Flow
                    45:24 Call It a Day - Tommy Ljungberg
                    48:04 Body to Body - Sture Zetterberg
                    51:33 Beautiful Woman - Ramin
                    54:26 Autumn Dawn - Volcan Peaks
                    58:07 Above - Mike Parr
                    1:01:49 A Little Piece of You - River Sam


                    🤩 You are looking for relaxing music for the new day?🎶🌞
                    On this channel, we bring you vibrant and refreshing indie tunes to start each day in the most positive way. Enjoy the music broadcast in the morning, making you full of energy and spirit. Let's wake up with Chill Melody and start your day with attractive melodies and the freedom of music.
                    ► Help us get 1.000.000 subscribers:   
                    🌻𝐼 ℎ𝑜𝑝𝑒 𝑡ℎ𝑎𝑡 𝑚𝑦 𝑚𝑢𝑠𝑖𝑐 𝑤𝑖𝑙𝑙 ℎ𝑒𝑙𝑝 𝑦𝑜𝑢 𝑓𝑒𝑒𝑙 𝑝𝑒𝑎𝑐𝑒 𝑎𝑛𝑑 𝑟𝑒𝑙𝑎𝑥 𝑦𝑜𝑢𝑟 𝑚𝑖𝑛𝑑. 𝑇ℎ𝑎𝑛𝑘 𝑦𝑜𝑢 𝑣𝑒𝑟𝑦 𝑚𝑢𝑐ℎ
                    #chillmusic 
                    #morningmusic 
                    #morningsongs
                </div>
            </CardBlur>
        </div>
    );
}

export default ScreenView;
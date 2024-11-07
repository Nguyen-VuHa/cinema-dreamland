import Hls from 'hls.js';
import Cookies from 'js-cookie';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useEffect, useRef, useState } from 'react';
import { ACCESS_TOKEN, LOGIN_METHOD } from '~/constants/cookie';

const VideoPlayer = ({ videoSource, isLoadVideoError, thumbnailSource, setIsLoading, setVideoEnded }) => {
    const videoContainerRef = useRef(null);  // Ref cho container

    const playerRef = useRef(null);          // Ref cho Plyr instance
    const hlsRef = useRef(null);             // Ref cho Hls instance

    const [videoElement, setVideoElement] = useState(null); // Trạng thái cho video element

    useEffect(() => {
        if (!videoSource) return;

        // Khởi tạo lại player khi videoSource thay đổi
        const initPlayer = () => {
            if (!Hls.isSupported() || !videoElement) return;

            // Hủy HLS instance cũ nếu tồn tại
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }

            // Hủy Plyr instance cũ nếu tồn tại
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }

            // Tạo Hls instance mới và load video
            const hls = new Hls({
                maxBufferLength: 30, // Giới hạn tối đa buffer 30 giây
                maxMaxBufferLength: 60, // Giới hạn buffer lớn nhất là 60 giây
                maxBufferHole: 0.5,
                maxBufferSize: 60 * 1000 * 1000, // Giới hạn buffer ở mức 60 MB (tương đương 1 phút video HD)
            });

            let accessToken = Cookies.get(ACCESS_TOKEN)

            if (accessToken) {
                let methodLogin = Cookies.get(LOGIN_METHOD)

                if(methodLogin) {
                    accessToken = `${methodLogin}.${accessToken}`
                }

                hls.config.xhrSetup = function(xhr, url) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken); // Thêm token vào header
                };
            }

            // Lưu Hls instance vào ref để hủy sau này
            hlsRef.current = hls;
            hls.loadSource(videoSource);
            hls.attachMedia(videoElement);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                const availableQualities = hls.levels.map(level => level.height);
                // Thêm 'Auto' với value = 0 vào đầu danh sách các tùy chọn chất lượng
                availableQualities.unshift(0);

                // Khởi tạo Plyr player mới
                const player = new Plyr(videoElement, {
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
                        src: thumbnailSource,
                    },
                    settings: ['quality', 'speed'], // Bật tùy chọn chất lượng (quality)
                    quality: {
                        default: 0, //Default - AUTO
                        options: availableQualities, // Các tùy chọn chất lượng video (auto, 720p, 1080p)
                        forced: true,
                        onChange: (newQuality) => {
                            if (newQuality === 0) {
                                hls.currentLevel = -1; //Enable AUTO quality if option.value = 0
                            } else {
                                hls.levels.forEach((level, levelIndex) => {
                                    if (level.height === newQuality) {
                                        hls.currentLevel = levelIndex;
                                    }
                                });
                            }
                        }
                    },
                    events: ['progress'], // Đăng ký lắng nghe sự kiện 'progress'
                    i18n: {
                        reset: 'Đặt lại',
                        quality: 'Chất lượng',
                        speed: 'Tốc độ',
                        qualityLabel: {
                            0: 'Auto',
                            1080: '1080p',
                            720: '720p',
                            480: '480p',
                        },
                    },
                });

                // Lưu Plyr instance vào ref để hủy sau này
                playerRef.current = player;

                videoElement.play(); // Play video sau khi load

                // Lắng nghe và ngăn chặn cập nhật tự động của buffer
                videoContainerRef.current.addEventListener('progress', (event) => {
                    event.stopImmediatePropagation();  // Ngăn chặn sự kiện progress được xử lý bởi Plyr
                }, true);  

                // Lắng nghe sự kiện 'ended' từ thẻ video HTML5
                videoElement.addEventListener('ended', function() {
                    setVideoEnded(true)
                });
            });

            hls.on(Hls.Events.BUFFER_APPENDING, function() {
                setIsLoading(false)
            });

            // Bắt sự kiện lỗi khi không thể load video
            hls.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    isLoadVideoError && isLoadVideoError(true)
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error('Network error: Could not load video');
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error('Media error: Corrupted media file');
                            break;
                        default:
                            console.error('Error loading video');
                            break;
                    }
                }
            });

            hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
                if(hlsRef.current.currentLevel >= 0) {
                    const totalExpected = hlsRef.current.levels[hlsRef.current.currentLevel].details.totalduration
                    const currentDuration = videoElement?.buffered?.length > 0 ? videoElement.buffered.end(videoElement?.buffered?.length - 1) : 0;
                    const preloadPercent = (currentDuration / totalExpected) * 100;
                    let progress = playerRef.current.elements.progress

                    if (preloadPercent < 100) {
                        progress.querySelector(".plyr__progress__buffer").value = preloadPercent
                    } else {
                        progress.querySelector(".plyr__progress__buffer").value = 100
                    }
                }
            });
        };

        if (videoElement) {
            initPlayer(); // Gọi hàm khởi tạo player
        }

        // Cleanup khi component unmount hoặc videoSource thay đổi
        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [videoSource, videoElement]); // Chỉ chạy lại khi videoSource hoặc videoElement thay đổi

    // Hàm tạo lại video element để reset hoàn toàn DOM
    const resetVideoElement = () => {
        const videoEl = document.createElement('video');
        videoEl.classList.add('plyr__video-embed');
        videoEl.setAttribute('controls', '');

        // Xóa video element cũ nếu có và thêm video element mới vào container
        const videoContainer = videoContainerRef.current;
        videoContainer.innerHTML = ''; // Reset container
        videoContainer.appendChild(videoEl); // Thêm video element mới

        setVideoElement(videoEl); // Cập nhật state với video element mới
    };

    // Gọi reset video element khi videoSource thay đổi
    useEffect(() => {
        if (videoSource) {
            resetVideoElement(); // Tạo lại video element mỗi khi đổi video
        }
    }, [videoSource]);

  return (
    <div>
       <div ref={videoContainerRef} />
    </div>
  );
};

export default VideoPlayer;

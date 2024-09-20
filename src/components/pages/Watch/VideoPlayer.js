import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videoSource, isLoadVideoError, thumbnailSource }) => {
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
            const hls = new Hls();
            hls.loadSource(videoSource);
            hls.attachMedia(videoElement);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.play(); // Play video sau khi load
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
            // Lưu Hls instance vào ref để hủy sau này
            hlsRef.current = hls;

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
            });

            // Lưu Plyr instance vào ref để hủy sau này
            playerRef.current = player;
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
      {videoSource ? (
        <div ref={videoContainerRef} />
      ) : <></> }
    </div>
  );
};

export default VideoPlayer;

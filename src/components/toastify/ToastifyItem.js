import React, { useEffect, useState } from 'react';
import { BiSolidError } from "react-icons/bi";
import { BsCheckCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { IoCloseOutline } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import toastConstant from '~/constants/toastify';
import { toastifyAction } from '~/redux/reducers/toastReducer';

const ToastifyItem = ({ data }) => {
    // map dữ liệu từ component cha nếu không có set default
    let durationProp = data?.duration || 3500
    let messageProp = data?.toastText
    let placementProp = data?.placement || toastConstant.TOAST_TOP_RIGHT
    let typeProp = data?.type || 'NORMAL'

    let iconType = null // icon theo type toast
    let classTextType = 'text-white' // color text theo type toast
    let classProcessType = 'bg-white' // color progress theo type toast
 
    switch (typeProp) { 
        case 'SUCCESS':
            classTextType = 'text-success'
            classProcessType = 'bg-success'
            iconType = <BsCheckCircleFill 
                size={30}
            />
            break;
        case 'INFO':
            iconType = <BsFillInfoCircleFill 
                size={25}
            />
            classTextType = 'text-info'
            classProcessType = 'bg-info'
            break;
        case 'ERROR':
            iconType = <MdError 
                size={30}
            />
            classTextType = 'text-error'
            classProcessType = 'bg-error'
            break;
        case 'WARN':
            iconType = <BiSolidError 
                size={30}
            />
            classTextType = 'text-warning'
            classProcessType = 'bg-warning'
            break;
    }

    const dispatch = useDispatch()
    
    const [process, setProcess] = useState(100)
    const [firstRender, setFirstRender] = useState(false); 

    // function remove item khi hết thời gian hoặc user click button close toast
    const handleRemoveItemToastify = () => {
        setFirstRender(false)
        setTimeout(() => {
            dispatch(toastifyAction.removeToastMessage(data?.uuid))
        }, 500);
    }

    useEffect(() => {
        let timeOut = setTimeout(() => {
            setFirstRender(true)
        }, 300);

        return () => {
            clearTimeout(timeOut)
        }
    }, [])

    useEffect(() => {
        // effect animation process count down
        if(firstRender) {
            const intervalTime = durationProp / 100;

            // Hàm để giảm giá trị thanh tiến trình
            const decreaseProgress = () => {
                setProcess((prev) => (prev > 0 ? prev - 2 : 0));
            };
        
            // Thiết lập interval để gọi hàm decreaseProgress mỗi 100ms
            const interval = setInterval(decreaseProgress, intervalTime);
        
            // Xóa interval khi component unmount
            return () => {
                clearInterval(interval)
            }
        }

    }, [durationProp, firstRender]);

    useEffect(() => { // effect khi chạy hết thời gian sẽ gọi remove item trong list
        if(process == 0) {
           
            let timeOut = setTimeout(() => {
                setFirstRender(false)
            }, 300);

            handleRemoveItemToastify()

            return () => {
                clearTimeout(timeOut)
            }
        }
    }, [process])

    let classAnimation = ''
    switch (placementProp) { // tìm class animation phù hợp theo type
        case toastConstant.TOAST_TOP_RIGHT:
            classAnimation = `${firstRender ? 'opacity-[1] right-[0]' : 'opacity-[0] right-[-50%]'}`
            break;
        case toastConstant.TOAST_BOTTOM_RIGHT:
            classAnimation = `${firstRender ? 'opacity-[1] right-[0]' : 'opacity-[0] right-[-50%]'}`
            break;
        case toastConstant.TOAST_TOP_LEFT:
            classAnimation = `${firstRender ? 'opacity-[1] left-[0]' : 'opacity-[0] left-[-50%]'}`
            break;
        case toastConstant.TOAST_BOTTOM_LEFT:
            classAnimation = `${firstRender ? 'opacity-[1] left-[0]' : 'opacity-[0] left-[-50%]'}`
            break;
        default:
            break;
    }

    return (
        <div 
            className={`relative bg-layout-second px-4 py-2 pb-3
            rounded-md select-none max-sm:w-fit
            max-w-[350px] ${classTextType} transition-all duration-500 ${classAnimation}`}
        >
            {/* button close message */}
            <div 
                className='absolute flex justify-center items-center 
                w-4 h-4 text-[black] cursor-pointer rounded-[999px] 
                top-[-5px] right-[-5px] bg-primary hover:bg-primary/80 transition-all'
                onClick={() => {
                    handleRemoveItemToastify()
                }}
            >
                <IoCloseOutline />
            </div>

            <div className='flex justify-between items-center space-x-5 w-full'>
                {
                    iconType && <div>
                        {iconType}
                    </div>
                }
                
                <span>{ messageProp || 'NO MESSAGE' }</span>
            </div>
            <div 
                className='absolute bottom-[-1%] bg-layout-second
                rounded-md left-0 w-full h-[5px] overflow-hidden'
            >
                <div style={{ width: `${process}%` }} className={`${classProcessType}  h-[5px] transition-all`}></div>
            </div>
        </div>
    );
};

export default React.memo(ToastifyItem);

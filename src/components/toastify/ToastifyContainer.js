
import toastConstant from '~/constants/toastify';
import ToastifyItem from './ToastifyItem';

// 
const positionShow = [
    {
        value: toastConstant.TOAST_TOP_RIGHT,
        className: 'top-[2%] right-[2%]'
    },
    {
        value: toastConstant.TOAST_TOP_LEFT,
        className: 'top-[2%] left-[2%]'
    },
    {
        value: toastConstant.TOAST_BOTTOM_LEFT,
        className: 'bottom-[2%] left-[2%]'
    },
    {
        value: toastConstant.TOAST_BOTTOM_RIGHT,
        className: 'bottom-[2%] right-[2%]'
    },
]

const ToastifyContainer = ({ toast, placement }) => {
    let filterType = positionShow.filter(position => position.value === placement) // tìm class name phù hợp cho các vị trí hiển thị message
    
    return (
        <div 
            className={
            `absolute ${filterType[0]?.className || 'top-[2%] right-[2%]'}
            z-[99999] max-md:flex max-md:flex-col 
            max-md:items-center max-sm:w-full max-sm:left-0`
            }
        >
            <div className='space-y-4'>
                {
                    toast && toast.length > 0 && 
                    toast.map(t => {
                        return  <ToastifyItem 
                            key={t.uuid}
                            data={t}
                        />
                    })
                }
            </div>
        </div>
    );
}

export default ToastifyContainer;

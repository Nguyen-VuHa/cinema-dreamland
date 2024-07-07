import { useSelector } from "react-redux";
import ToastifyContainer from "./ToastifyContainer";
import toastConstant from "~/constants/toastify";


const ToasitfyMessage = () => {
    // get toastify từ store 
    const toastState = useSelector(state => state.toastifyState)
    const { toastList } = toastState

    // tìm các item theo các vị trí hiển thị toast
    let topRightList = toastList.filter(toast => toast.position === toastConstant.TOAST_TOP_RIGHT).slice(0, 10) // chỉ hiển thị tối đa 10 item 
    let bottomRightList = toastList.filter(toast => toast.position === toastConstant.TOAST_BOTTOM_RIGHT).slice(0, 10)
    let topLeftList = toastList.filter(toast => toast.position === toastConstant.TOAST_TOP_LEFT).slice(0, 10)
    let bottomLeftList = toastList.filter(toast => toast.position === toastConstant.TOAST_BOTTOM_LEFT).slice(0, 10)

    return (
        <>
            { 
                topRightList && topRightList.length > 0 &&
                <ToastifyContainer 
                    toast={topRightList}
                    placement={toastConstant.TOAST_TOP_RIGHT}
                />
            }
            { 
                bottomRightList && bottomRightList.length > 0 &&
                bottomRightList.map(toastList => {
                    return <ToastifyContainer 
                        toast={toastList}
                        key={toastList.uuid}
                    />
                })
            }
            { 
                topLeftList && topLeftList.length > 0 &&
                topLeftList.map(toastList => {
                    return <ToastifyContainer 
                        toast={toastList}
                        key={toastList.uuid}
                    />
                })
            }
            { 
                bottomLeftList && bottomLeftList.length > 0 &&
                bottomLeftList.map(toastList => {
                    return <ToastifyContainer 
                        toast={toastList}
                        key={toastList.uuid}
                    />
                })
            }
        </>
    );
}

export default ToasitfyMessage;

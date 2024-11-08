import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateLesson, apiGetListLesson } from '~/apis/learnEnglish';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { configAction } from '~/redux/reducers/configReducer';
import { lessonAction } from '~/redux/reducers/lessonReducer';

const ModalEditLesson = () => {
    const dispatch = useDispatch()

    const [lessonText, setLessonText] = useState('')
    const [errLessonText, setErrlessonText] = useState('')
    const [isCreateLesson, setIsCreateLesson] = useState(false)

    const { isModalEditLesson } = useSelector(state => state.configState)

    const handleCreateLesson = async () => {
        if(!lessonText) {
            setErrlessonText("Trường này không được trống")
            return 
        }

        if(lessonText.length > 100) {
            setErrlessonText("Tên bài học không vượt quá 100 ký tự")
            return 
        }


        setIsCreateLesson(true)

        const res = await apiCreateLesson({
            _lesson: lessonText
        })

        if (res && res.code === 200) {
            let resList = await apiGetListLesson()

            if(resList && resList.code === 200) {
                dispatch(lessonAction.setLessonList(resList.data))
            }
        } else {
            alert("create failed")
        }

        setIsCreateLesson(false)
        setLessonText('')
        dispatch(configAction.setIsModalEditLesson(false))
    }

    return (
        <div
            className={`fixed flex justify-center items-center top-0 left-0 w-full h-[100vh] transition-all ${isModalEditLesson ? 'opacity-1 z-[99999]' : 'opacity-0 z-[-99999]'}  `}
        >
            {/* display background */}
            <div className='absolute w-full h-full top-0 left-0 bg-[#0000004d] z-[-1]' />

            <div
                className='max-sm:w-[350px] w-[600px] space-y-3 p-3 bg-layout-primary rounded-md'
            >
                <div className='flex justify-between items-center'>
                    <h4 className='text-lg'>Thêm bài học mới</h4>
                    <div
                        className='flex justify-center items-center 
                        cursor-pointer select-none
                        w-[35px] h-[35px] 
                        rounded-full hover:bg-layout-second transition-all'
                        onClick={() => {
                            dispatch(configAction.setIsModalEditLesson(false))
                        }}
                    >
                        <IoClose size={24} />
                    </div>
                </div>
                <div className='space-y-3'>
                    <Input
                        placeholder="Tên bài học"
                        value={lessonText}
                        onChange={(value) => {
                            setLessonText(value)  
                            setErrlessonText('')
                        }}
                        errMessage={errLessonText}
                    />
                    <Button
                        onClick={() => {
                            handleCreateLesson()
                        }}
                        loading={isCreateLesson}
                    >
                        <span>Lưu lại</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditLesson;
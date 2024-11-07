import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { configAction } from '~/redux/reducers/configReducer';

const ModalEditLesson = () => {
    const dispatch = useDispatch()

    const [lessonText, setLessonText] = useState('')
    const [errLessonText, setErrlessonText] = useState('')

    const { isModalEditLesson } = useSelector(state => state.configState)

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
                    
                    >
                        <span>Lưu lại</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditLesson;
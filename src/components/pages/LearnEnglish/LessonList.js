"use client"
import React from 'react';
import LessonItem from './LessonItem';
import CardBlur from '~/components/ui/CardBlur';
import { TiPlus } from "react-icons/ti";
import ModalEditLesson from './ModalEditLesson';
import { useDispatch } from 'react-redux';
import { configAction } from '~/redux/reducers/configReducer';

const LessonList = () => {
    const dispatch = useDispatch()


    return (
        <>
            <ModalEditLesson 
            
            />
            <div
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            >
                <LessonItem />
                <CardBlur
                    className="flex justify-center items-center p-3 w-full cursor-pointer space-x-1 hover:bg-primary/80 hover:text-white transition-all select-none"
                    onClick={() => {
                        dispatch(configAction.setIsModalEditLesson(true))
                    }}
                >
                    <span>Thêm bài học</span>
                    <TiPlus 
                    size={22}
                    />
                </CardBlur>
            </div>
        </>
    );
};

export default LessonList;
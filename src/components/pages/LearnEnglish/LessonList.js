"use client"
import React, { useEffect } from 'react';
import LessonItem from './LessonItem';
import CardBlur from '~/components/ui/CardBlur';
import { TiPlus } from "react-icons/ti";
import ModalEditLesson from './ModalEditLesson';
import { useDispatch, useSelector } from 'react-redux';
import { configAction } from '~/redux/reducers/configReducer';
import { lessonAction } from '~/redux/reducers/lessonReducer';
import { apiGetListLesson } from '~/apis/learnEnglish';
import ModelVocabulary from './ModelVocabulary';
import ModelLearnEnglish from './ModelLearning';

const LessonList = () => {
    const dispatch = useDispatch()
    const { lessons } = useSelector(state => state.lessonState)

    const handleFetchLessonList = async () => {
        let res = await apiGetListLesson()

        if(res && res.code === 200) {
            dispatch(lessonAction.setLessonList(res.data))
        } else {
            alert("Fetch list failed.")
        }
    }
    
    useEffect(() => {
        handleFetchLessonList()
    }, [dispatch])

    return (
        <>
            <ModalEditLesson />
            <ModelVocabulary />
            <ModelLearnEnglish />
            <div
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            >
                {
                    lessons.map(lesson => {
                        return <LessonItem 
                            key={lesson.LessonID}
                            data={lesson}
                        />
                    })
                }
               
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
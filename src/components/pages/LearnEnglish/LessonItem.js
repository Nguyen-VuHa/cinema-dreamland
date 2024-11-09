import React, { useState } from 'react';
import Button from '~/components/ui/Button';
import CardBlur from '~/components/ui/CardBlur';
import { LuPlus } from "react-icons/lu";
import { PiExamLight } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { configAction } from '~/redux/reducers/configReducer';
import { lessonAction } from '~/redux/reducers/lessonReducer';

const LessonItem = ({ data }) => {
    const dispatch = useDispatch()
    
    const [isHovered, setIsHovered] = useState(false);

    return (
        <CardBlur
            className="relative flex p-3 w-full min-h-[84px] cursor-pointer space-y-3 hover:bg-layout-primary transition-all select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >   
            {
                isHovered && <div className='absolute top-0 left-0 w-full h-full bg-[#0000009d] z-[10]'>
                    <div className='px-2 w-full h-full flex justify-center items-center space-x-2'>
                        <Button
                            className="w-fit"
                            title="Học bài"
                            onClick={() => {
                                dispatch(lessonAction.setLessonID(data.LessonID))
                                dispatch(configAction.setIsModalLearnEnglish(true))
                            }}
                        >
                            <PiExamLight size={15} />
                        </Button>
                        <Button
                            className="w-fit"
                            title="Thêm từ vựng"
                            onClick={() => {
                                dispatch(lessonAction.setLessonID(data.LessonID))
                                dispatch(configAction.setIsModalVocabulary(true))
                            }}
                        >
                            <LuPlus size={15} />
                        </Button>
                    </div>
                </div>  
            }
            <span
                className='w-full h-full text-ellipsis line-clamp-2'
            >
                {data.LessonName}
            </span>
        </CardBlur>
    );
};

export default LessonItem;
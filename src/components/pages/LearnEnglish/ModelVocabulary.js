import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateVocabulary, apiGetVocabulary } from '~/apis/learnEnglish';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { configAction } from '~/redux/reducers/configReducer';

const ModelVocabulary = () => {
    const dispatch = useDispatch()
    const { isModelVocabulary } = useSelector(state => state.configState)
    const { lessonID } = useSelector(state => state.lessonState)
    const [words, setWords] = useState([])

    const [englishWord, setEnglishWord] = useState('')
    const [vietnamWord, setVietNameWord] = useState('')
    const [isCreateWord, setIsCreateWord] = useState(false)
    

    const handleFetchWords = async () => {
        let res = await apiGetVocabulary({
            _lesson_id: lessonID,
        })

        if (res && res.code === 200) {
            setWords(res.data)
        } else {
            setWords([])
        }
    }

    useEffect(() => {
        if(lessonID) {
            handleFetchWords()

            return () => {
                setWords([])
            }
        }
    }, [lessonID])


    const handleCreateWord = async () => {
        if (isCreateWord || !lessonID)
            return 
        
        if(englishWord && vietnamWord) {
            setIsCreateWord(true)

            let res = await apiCreateVocabulary({
                _word_english: englishWord,
                _word_vietnamese: vietnamWord,
                _lesson_id: lessonID,
            })

            if (res && res.code === 200) {
                handleFetchWords()
                setEnglishWord('')
                setVietNameWord('')
            } else {
                alert("Thêm từ vựng thất bại.")
            }

            setIsCreateWord(false)
        } else {
            alert("Vui lòng nhập đủ thông tin trước khi thêm.")
        }
    }


    return (
        <div
            className={`fixed flex justify-center items-center top-0 left-0 w-full h-[100vh] transition-all ${isModelVocabulary ? 'opacity-1 z-[99999]' : 'opacity-0 z-[-99999]'}`}
        >
            {/* display background */}
            <div className='absolute w-full h-full top-0 left-0 bg-[#0000004d] z-[-1]' />

            <div
                className='max-sm:w-[350px] w-[600px] space-y-3 p-3 bg-layout-primary rounded-md'
            >
                <div className='flex justify-between items-center'>
                    <h4 className='text-lg'>Thêm từ vựng mới</h4>
                    <div
                        className='flex justify-center items-center 
                        cursor-pointer select-none
                        w-[35px] h-[35px] 
                        rounded-full hover:bg-layout-second transition-all'
                        onClick={() => {
                            dispatch(configAction.setIsModalVocabulary(false))
                        }}
                    >
                        <IoClose size={24} />
                    </div>
                </div>
                <div className='space-y-3'>
                    <div className='flex items-center space-x-2 max-sm:flex-col max-sm:space-y-2 max-sm:space-x-0'>
                        <Input
                            placeholder="English word"
                            value={englishWord}
                            onChange={(value) => {
                                setEnglishWord(value)
                            }}
                        />
                         <Input
                            placeholder="Nghĩa (tiếng Việt)"
                            value={vietnamWord}
                            onChange={(value) => {  
                                setVietNameWord(value)
                            }}
                        />
                    </div>
                    <Button
                        onClick={() => {
                            handleCreateWord()
                        }}
                        loading={isCreateWord}
                    >
                            <span>Thêm cụm từ</span>
                    </Button>
                    <ul className='max-h-[400px] overflow-y-auto'>
                        {
                            words && words.length > 0 ? 
                            words.map(word => {
                                return <li key={word.VocabularyLessonID} className='flex space-x-2'>
                                    <span>{word.English}: </span>
                                    <span>{word.Vietnamese}</span>
                                </li>
                            })
                            :  <li className='w-fullflex space-x-2 text-center'>
                                <span className='text-center'>Không có từ vựng</span>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ModelVocabulary;
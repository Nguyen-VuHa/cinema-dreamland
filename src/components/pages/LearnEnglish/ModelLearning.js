import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetVocabulary } from '~/apis/learnEnglish';
import { configAction } from '~/redux/reducers/configReducer';
import { lessonAction } from '~/redux/reducers/lessonReducer';

const ModelLearnEnglish = () => {
    const dispatch = useDispatch()
    const { isLearnEnglish } = useSelector(state => state.configState)
    const { lessonID } = useSelector(state => state.lessonState)
    const [words, setWords] = useState([])
    const [englishList, setEnglishList] = useState([])
    const [vietnamList, setVietnamList] = useState([])

    const [wordPlay, setWordPlay] = useState(null)
    const [wordAfter, setWordAffter] = useState([])

    const [chooseAnswer, setChooseAnswer] = useState({
        english: null,
        vietname: null,
    })

    const [isInCorrect, setIsInCorrect] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    
    function getRandomElements(arr, count) {
        // Sao chép mảng để không thay đổi mảng gốc
        const arrayCopy = [...arr];
        
        // Nếu mảng có ít hơn số lượng yêu cầu, trả về toàn bộ mảng
        if (arrayCopy.length <= count) {
          return arrayCopy;
        }
      
        // Kết quả sẽ chứa các phần tử ngẫu nhiên
        const result = [];
      
        while (result.length < count) {
          // Chọn một chỉ số ngẫu nhiên từ mảng
          const randomIndex = Math.floor(Math.random() * arrayCopy.length);
          
          // Thêm phần tử vào mảng kết quả và xóa phần tử đó khỏi mảng gốc
          result.push(arrayCopy.splice(randomIndex, 1)[0]);
        }
      
        return result;
    }

    function removeElements(arr1, arr2) {
        // Lọc ra các phần tử trong arr1 không có trong arr2
        return arr1.filter(item => !arr2.includes(item));
    }

    function separateAndShuffle(arr) {
        // Tách key và value thành hai mảng riêng biệt
        const keys = [];
        const values = [];
      
        arr.forEach(item => {
          // Lấy key và value từ mỗi đối tượng
          const key = Object.keys(item)[0];
          const value = item[key];
      
          // Thêm vào mảng keys và values
          keys.push(key);
          values.push(value);
        });
      
        // Hàm xáo trộn một mảng
        function shuffle(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Đổi chỗ hai phần tử
          }
        }
      
        // Xáo trộn mảng keys và values
        shuffle(keys);
        shuffle(values);
      
        return { keys, values };
    }
      

    const handleFetchWords = async () => {
        let res = await apiGetVocabulary({
            _lesson_id: lessonID,
        })

        if (res && res.code === 200) {
            let wordList = res.data.map(dt => {
                return {
                    [dt.English]: dt.Vietnamese
                }
            })

            setWords(wordList)

            handleSaveDataExam(wordList)
        } else {
            setWords([])
        }
    }

    const handleSaveDataExam = (wordList) => {
        let arrRandom = getRandomElements(wordList, 2)
            
        setWords(removeElements(wordList, arrRandom))
        
        const { keys, values } = separateAndShuffle(arrRandom)
        setEnglishList(keys)
        setVietnamList(values)

        const objectCombine = arrRandom.reduce((acc, item) => {
            return { ...acc, ...item };
        }, {});

        setWordPlay(objectCombine)

        setWordAffter(wordAfter.concat(arrRandom))
    }

    useEffect(() => {
        if(lessonID) {
            handleFetchWords()

            return () => {
                setWords([])
            }
        }
    }, [lessonID])


    useEffect(() => {
        if(chooseAnswer.english && chooseAnswer.vietname) {
            // handle check answer
            if(wordPlay[chooseAnswer.english] !== chooseAnswer.vietname) {
                setIsInCorrect(true)
                return
            }

            let removeItemEng = englishList.filter(elg => elg !== chooseAnswer.english)
            setEnglishList(removeItemEng)
            setVietnamList(vietnamList.filter(vnl => vnl !== chooseAnswer.vietname))
            setChooseAnswer({
                english: null,
                vietname: null,
            })

            if(removeItemEng.length === 0) {
                if (words.length > 0) {
                    handleSaveDataExam(words)
                } else {
                    setIsCompleted(true)
                }
            }
        }
    }, [chooseAnswer])

    useEffect(() => {
        if(isInCorrect) {
            setTimeout(() => {
                setIsInCorrect(false)
                setChooseAnswer({
                    english: null,
                    vietname: null,
                })
            }, 500);
        }
    }, [isInCorrect])


    const handleResetData = () => {
        setWords([])
        setEnglishList([])
        setVietnamList([])

        setWordPlay(null)
        setWordAffter([])
    
        setChooseAnswer({
            english: null,
            vietname: null,
        })

        setIsCompleted(false)

        dispatch(lessonAction.setLessonID(null))
    }

    return (
        <div
            className={`fixed flex justify-center items-center top-0 left-0 w-full h-[100vh] transition-all ${isLearnEnglish ? 'opacity-1 z-[99999]' : 'opacity-0 z-[-99999]'}`}
        >
            {/* display background */}
            <div className='absolute w-full h-full top-0 left-0 bg-[#0000004d] z-[-1]' />

            <div
                className='max-sm:w-[350px] w-[600px] space-y-3 p-3 bg-layout-primary rounded-md'
            >
                <div className='flex justify-between items-center'>
                    <h4 className='text-lg'>Học từ vựng</h4>
                    <div
                        className='flex justify-center items-center 
                        cursor-pointer select-none
                        w-[35px] h-[35px] 
                        rounded-full hover:bg-layout-second transition-all'
                        onClick={() => {
                            dispatch(configAction.setIsModalLearnEnglish(false))
                            handleResetData()
                        }}
                    >
                        <IoClose size={24} />
                    </div>
                </div>
                {
                    isCompleted && <div
                        className='text-center w-full text-success text-lg'
                    >
                        Bạn đã hoàn thành kiểm tra từ vựng
                    </div>
                }
                <div className='grid gap-3 grid-cols-2'>
                  
                    <div className='flex flex-col space-y-2'>
                        {
                            englishList.map(english => {
                                return <div 
                                    key={english} 
                                    className={`p-2 cursor-pointer w-full
                                     rounded-md bg-layout-second border-2 
                                     border-transparent transition-all hover:border-primary
                                     ${chooseAnswer.english === english ? '!border-primary' : ''}
                                     ${chooseAnswer.english === english && isInCorrect ? '!border-[red] !text-[red]' : ''}
                                    `}
                                    
                                    onClick={() => {
                                        setChooseAnswer({
                                            ...chooseAnswer,
                                            english: english
                                        })
                                    }}

                                >
                                    {english}
                                </div>
                            })
                        }
                    </div>
                    <div className='flex flex-col space-y-2'>
                        {
                            vietnamList.map(vietname => {
                                return <div 
                                    key={vietname} 
                                    className={`p-2 cursor-pointer w-full
                                    rounded-md bg-layout-second border-2 
                                    border-transparent transition-all hover:border-primary
                                    ${chooseAnswer.vietname === vietname ? '!border-primary' : ''}
                                    ${chooseAnswer.vietname === vietname && isInCorrect ? '!border-[red] !text-[red]' : ''}
                                    `}
                                    onClick={() => {
                                        setChooseAnswer({
                                            ...chooseAnswer,
                                            vietname: vietname
                                        })
                                    }}
                                >
                                    {vietname}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelLearnEnglish;
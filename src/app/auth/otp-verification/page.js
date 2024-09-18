'use client'

import { useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { actionAuth } from '~/redux/reducers/authReducer';
import { removeVietnameseTones } from '~/utils/language';

function OTPVerification() {
    const searchParams = useSearchParams();
    const email = searchParams.get('_email'); // Lấy giá trị email từ query string

    const dispatch = useDispatch()
    const length = 6 // số input nhập OTP

    const inputRefs = useRef([]); // mảng Ref Input nhập OTP

    const [messageError, setMessageError] = useState('')

    // biến này sẽ lưu giá trị input đó mỗi khi focus vào hoặc click vào input để 
    // handle user nhấn vào ký tự đặc biết để gán lại giá trị cũ
    const valueInputFocusRef = useRef(''); 

    const handleInputChange = (e, index) => {
        const { value } = e.target

        if(e.nativeEvent.data) {
            const regex = /^[a-zA-Z0-9]*$/;
            if (!regex.test(e.nativeEvent.data)) {
                e.target.value = valueInputFocusRef.current // khi rơi vào trường hợp này thì gán giá trị cũ ở biến valueInputFocusRef
                e.preventDefault();
            } else {
                let valueText = removeVietnameseTones(e.nativeEvent.data)
                valueInputFocusRef.current = valueText.toUpperCase()
                e.target.value = valueText.toUpperCase()
    
                if (e.nativeEvent.data.length > 0 && index < length - 1) { // range length của input để handle set focus cho input tiếp theo khi ng dùng typing
                    inputRefs.current[index + 1].focus();
                } else if (value.length === 0 && index > 0) {
                    inputRefs.current[index - 1].focus();
                }
            }
        } else {
            e.target.value = ''
        }
    };

    const handlePaste = (event, index) => {
        event.preventDefault(); // ngăn chặn hành vi mặc định của input

        const pastedData = event.clipboardData.getData('text'); // lấy dữ liệu từ bộ nhớ copy
        let arrayStringCopy = pastedData.split('').map(char => removeVietnameseTones(char).toUpperCase()); // làm sạch dữ liệu copy như uppercase và loại bỏ ký dấu tiếng Việt

        let indexString = 0
        // handle logic map dữ liệu vào input tại ví trí focus trong list input
        for (let i = index; i < length; i++) {
            let value = arrayStringCopy[indexString]
            const regex = /^[a-zA-Z0-9]*$/;
            if(value && regex.test(value)) { // kiểm tra dữ liệu phải là chữ và số
                inputRefs.current[i].value = arrayStringCopy[indexString]
                indexString++
            }
        }
    };

    const handleKeyDown = (event, index) => {
        const { keyCode } = event;
    
        if (keyCode === 8 || keyCode === 46) { // Backspace hoặc Delete
            event.preventDefault();
            inputRefs.current[index].value = '' // xoá ký tự hiện tại khi input đó focus

            // Di chuyển focus đến ô trước đó khi xóa ký tự
            if (keyCode === 8 && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
            if (keyCode === 46 && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleSubmitConfirmOTP = () => {
        let otpString = ''
        inputRefs.current.map(input => { // loop qua các input và lấy giá trị nó cộng vào otpString
            otpString += input.value
        })

        if(otpString.length === 6) { // kiểm tra điều kiện đủ 6 ký tự trong OTP thì thực thi process xác thực
            setMessageError('')

            let payload = {
                _otp: otpString,
                _email: email,
            }
            
            dispatch(actionAuth.processVerifyOTP(payload))
        } else {
            setMessageError('OTP phải là 6 ký tự.')
        }
    }

    return (
        <div className='space-y-2 w-full'>
            <div className='flex justify-around items-center w-full space-x-2'>
                {Array.from({ length }, (_, index) => (
                    <Input 
                        key={index}
                        classNameInput="text-center caret-transparent select-none"
                        placeholder=" "
                        type="text"
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(_, e) => {
                            handleInputChange(e, index)
                        }}
                        onClick={(e) => {
                            const regex = /^[a-zA-Z0-9]*$/;
                            if(regex.test(e.target.value)) {
                                let valueText = removeVietnameseTones(e.target.value)
                                valueInputFocusRef.current = valueText.toUpperCase()
                            }
                        }}
                        onFocus={(e) => {
                            const regex = /^[a-zA-Z0-9]*$/;
                            if(regex.test(e.target.value)) {
                                let valueText = removeVietnameseTones(e.target.value)
                                valueInputFocusRef.current = valueText.toUpperCase()
                            }
                        }}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        onPaste={(e) => handlePaste(e, index)}
                    />
                ))}
            </div>
            <div className='text-error text-xs italic'>{messageError}</div>
            <div className='flex space-x-2'>
                <span className='text-input-place'>Bạn chưa nhận được OTP?</span>
                <button className='text-primary hover:underline transition-all'>
                    Gửi lại
                </button>
            </div>
            <Button 
                className="w-full"
                onClick={() => {
                    handleSubmitConfirmOTP()
                }}
            >
                Xác Thực OTP
            </Button>
        </div>
    );
}

export default OTPVerification;
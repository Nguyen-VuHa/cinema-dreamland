'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLoginButton from '~/components/pages/SignIn/FacebookButton';
import GoogleLoginButton from '~/components/pages/SignIn/GoogleButton';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import InputDate from '~/components/ui/InputDate';
import InputEmail from '~/components/ui/InputEmail';
import InputPassword from '~/components/ui/InputPassword';
import { actionAuth } from '~/redux/reducers/authReducer';
import { signUpSchema } from '~/validations/authSchema';

function SignUpPage() {
    // khai báo dispatch sử dụng hook useDispatch để gửi các action lên Redux
    const dispatch = useDispatch()
    const router = useRouter()
    
    // access vào store Redux lấy data 
    const { formSignUp, isProcesSignUp, statusSignUp } = useSelector(state => state.authState)
    const { email, password, fullName, birthDay, phoneNumber } = formSignUp

    const errorSignUp  = useSelector(state => state.authState.errorSignUp)


    useEffect(() => { // lắng nghe sự thay đổi của trạng thái đăng ký
        // nếu ký thành công thì điều hướng về trang đăng nhập
        if(statusSignUp) {
            router.push('/auth/sign-in')

            dispatch(actionAuth.setValueStatusSignUp(false))
        }
    }, [statusSignUp, dispatch])

    // hàm kiểm tra dữ liệu form Sign Up truơc khi send request
    const validationDataFormSignUp = async () => {
        try {
            // Kiểm tra lại toàn bộ form trước khi submit
            await signUpSchema.validate(formSignUp, { abortEarly: false });
            return true
        } catch (err) {
            let objError = {};
            err.inner.forEach((error) => {
                objError[error.path] = error.message
            });

            dispatch(actionAuth.setValueErrorFormSignUp(objError))

            return false
        }
    };

    // khoởi tạo function thực hiện việc 
    const handleSubmitSignUp = async (event) => {
        event.preventDefault();
        let validate = await validationDataFormSignUp() 

        if(validate) {
            const payload = {
                email: formSignUp.email,
                password: formSignUp.password,
                full_name: formSignUp.fullName,
                birth_day: formSignUp.birthDay,
                phone_number: formSignUp.phoneNumber,
            }

            dispatch(actionAuth.processSignUpAccount(payload))
        }
    }

    return (
        <form className='w-full space-y-3'>
            <InputEmail 
                className='w-full'
                placeholder="Email"
                name="email"
                value={email}
                onChange={(value) => {
                    dispatch(actionAuth.removeKeyErrorSignUp('email'))
                    // action cập nhật email trong formSignUp
                    dispatch(actionAuth.setValueFormSignUp({
                        key: 'email',
                        value,
                    }))
                }}
                errMessage={errorSignUp?.email || ''}
            /> 
            <InputPassword 
                className='w-full'
                placeholder="Mật khẩu"
                type="password"
                name="password"
                value={password}
                onChange={(value) => {
                    dispatch(actionAuth.removeKeyErrorSignUp('password'))
                     // action cập nhật password trong formSignUp
                    dispatch(actionAuth.setValueFormSignUp({
                        key: 'password',
                        value
                    }))
                }}
                errMessage={errorSignUp?.password || ''}
            /> 
            <Input 
                className='w-full'
                placeholder="Họ & Tên"
                name="fullName"
                value={fullName}
                onChange={(value) => {
                    dispatch(actionAuth.removeKeyErrorSignUp('fullName'))
                    // action cập nhật fullname trong formSignUp
                    dispatch(actionAuth.setValueFormSignUp({
                        key: 'fullName',
                        value
                    }))
                }}
                errMessage={errorSignUp?.fullName || ''}
            />
            <InputDate 
                className='w-full'
                placeholder="Sinh nhật"
                value={birthDay}
                onChange={(value) => {
                    dispatch(actionAuth.removeKeyErrorSignUp('birthDay'))
                    // action cập nhật birthDay trong formSignUp
                    dispatch(actionAuth.setValueFormSignUp({
                        key: 'birthDay',
                        value
                    }))
                }}
                errMessage={errorSignUp?.birthDay || ''}
            />
            <Input 
                className='w-full'
                placeholder="Số điện thoại"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(value) => {
                    dispatch(actionAuth.removeKeyErrorSignUp('phoneNumber'))
                    // action cập nhật phoneNumber trong formSignUp
                    dispatch(actionAuth.setValueFormSignUp({
                        key: 'phoneNumber',
                        value
                    }))
                }}
                errMessage={errorSignUp?.phoneNumber || ''}
            />
            <div className='flex space-x-2'>
                <span className='text-input-place'>Bạn đã có tài khoản?</span>
                <Link href="/auth/sign-in" className='text-primary hover:underline transition-all'>
                    Đăng nhập
                </Link>
            </div>
            <div className='divide-y divide-primary space-y-3'>
                <Button
                    type="submit"
                    onClick={(e) => {
                        handleSubmitSignUp(e)
                    }}
                    loading={isProcesSignUp}
                >
                    Đăng Ký
                </Button>
                <div />
            </div>
            <div className='flex items-center space-x-2'>
                <GoogleLoginButton />
                <FacebookLoginButton />
            </div>
        </form>
    );
}

export default React.memo(SignUpPage);
'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLoginButton from '~/components/pages/SignIn/FacebookButton';
import GoogleLoginButton from '~/components/pages/SignIn/GoogleButton';
import Button from '~/components/ui/Button';
import InputEmail from '~/components/ui/InputEmail';
import InputPassword from '~/components/ui/InputPassword';
import { actionAuth } from '~/redux/reducers/authReducer';
import { signInSchema } from '~/validations/authSchema';

function SignInPage() {
    // khai báo dispatch sử dụng hook useDispatch để gửi các action lên Redux
    const dispatch = useDispatch()

    // access vào store Redux lấy data 
    const { formSignIn, isProcesSignIn, statusSignIn, errorSignIn } = useSelector(state => state.authState)
    const { email, password } = formSignIn

    useEffect(() => {
        // nếu ký thành công thì điều hướng về trang đăng nhập
        if(statusSignIn) {
            // handle redirect sang domain moi

            dispatch(actionAuth.setValueStatusSignIn(false))
        }
    }, [statusSignIn, dispatch])

    // hàm kiểm tra dữ liệu form Sign Up truơc khi send request
    const validationDataFormSignIn = async () => {
        try {
            // Kiểm tra lại toàn bộ form trước khi submit
            await signInSchema.validate(formSignIn, { abortEarly: false });
            return true
        } catch (err) {
            let objError = {};
            err.inner.forEach((error) => {
                objError[error.path] = error.message
            });

            dispatch(actionAuth.setValueErrorFormSignIn(objError))

            return false
        }
    };

    // khoởi tạo function thực hiện việc 
    const handleSubmitSignIn = async (event) => {
        event.preventDefault();
        let validate = await validationDataFormSignIn() 

        if(validate) {
            dispatch(actionAuth.processSignIn(formSignIn))
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
                    dispatch(actionAuth.removeKeyErrorSignIn('email'))

                    // action cập nhật email trong formSignUp
                    dispatch(actionAuth.setValueFormSignIn({
                        key: 'email',
                        value,
                    }))
                }}
                errMessage={errorSignIn?.email || ''}
            />
            <InputPassword 
                className='w-full'
                placeholder="Mật khẩu"
                name="password"
                value={password}
                onChange={(value) => {
                    dispatch(actionAuth.removeKeyErrorSignIn('password'))

                    // action cập nhật email trong formSignUp
                    dispatch(actionAuth.setValueFormSignIn({
                        key: 'password',
                        value,
                    }))
                }}
                errMessage={errorSignIn?.password || ''}
            />
            <div className='flex space-x-2'>
                <span className='text-input-place'>Bạn chưa có tài khoản?</span>
                <Link href="/auth/sign-up" className='text-primary hover:underline transition-all'>
                    Đăng ký
                </Link>
            </div>
            <div className='divide-y divide-primary space-y-3'>
                <Button
                    type="submit"
                    onClick={(e) => {
                        handleSubmitSignIn(e)
                    }}
                    loading={isProcesSignIn}
                >
                    Đăng Nhập
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

export default SignInPage;
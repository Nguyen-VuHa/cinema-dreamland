import * as yup from 'yup'

const errorPassword = {
    min: 'Mật khẩu tối tiểu 8 kí tự.',
    max: 'Mật khẩu tối đa không vượt quá 50 kí tự'
}

const isRequireErrorString = (name) => {
    return `${name} không được rỗng`
}

export const signInSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ!').required(isRequireErrorString('Email')),
    password: yup.string().min(8, errorPassword.min).max(50, errorPassword.max).required(isRequireErrorString('Mật khẩu')),
})


export const signUpSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ!').required(isRequireErrorString('Email')),
    password: yup.string().min(8, errorPassword.min).max(50, errorPassword.max).required(isRequireErrorString('Mật khẩu')),
})
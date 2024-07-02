import * as yup from 'yup'

const errEmail = {
    format: 'Email không hợp lệ!'
}

const errorPassword = {
    min: 'Mật khẩu tối tiểu 8 kí tự.',
    max: 'Mật khẩu tối đa không vượt quá 50 kí tự'
}

const errorFullName = {
    max: 'Họ & tên tối đa không vượt quá 50 kí tự'
}

const isRequireErrorString = (name) => {
    return `${name} không được rỗng`
}

const phoneRegExp = /^(03|05|07|08|09)\d{7,9}$/;

const errorPhoneNumber= {
    format: 'Số điện thoại không đúng định dạng'
}

const errorDate= {
    format: 'Ngày không đúng định dạng'
}

export const signInSchema = yup.object().shape({
    email: yup.string().email(errEmail.format).required(isRequireErrorString('Email')),
    password: yup.string().min(8, errorPassword.min).max(50, errorPassword.max).required(isRequireErrorString('Mật khẩu')),
})


export const signUpSchema = yup.object().shape({
    email: yup.string().email(errEmail.format).required(isRequireErrorString('Email')),
    password: yup.string().min(8, errorPassword.min).max(50, errorPassword.max).required(isRequireErrorString('Mật khẩu')),
    fullName: yup.string().max(50, errorFullName.max).required(isRequireErrorString('Họ & tên')),
    birthDay: yup.date().required(isRequireErrorString('Ngày sinh')).typeError(errorDate.format),
    phoneNumber: yup.string().matches(phoneRegExp, errorPhoneNumber.format).required(isRequireErrorString('Số điện thoại'))
})
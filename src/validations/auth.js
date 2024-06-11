import * as yup from 'yup'

const errorPassword = {
    min: 'Mật khẩu tối tiểu 8 kí tự.',
    max: 'Mật khẩu tối đa không vượt quá 50 kí tự'
}

const isRequireErrorString = (name) => {
    return `${name} không được rỗng`
}
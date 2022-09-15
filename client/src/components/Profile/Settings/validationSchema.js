import * as yup from "yup"

const passwordTitle = 'Пароль должен иметь от 7 до 15 символов на латинице, исключая пробелы.' +
    ' Из них должны быть хотя бы одна заглавная буква, одна прописная буква,' +
    ' одна цифра и один из спецсимволов(@$!%*#?&)'

export const nameSchema = yup.object({
    firstName: yup.string()
        .required('Поле обязательно к заполнению')
        .matches(/^[A-Za-z\d@$!%*#?&]{2,30}$/,
            'Допускаются любые символы, кроме пробелов. Не менее 2 и не более чем 30 символов.'),
    lastName: yup.string()
        .required('Поле обязательно к заполнению')
        .matches(/^[A-Za-z\d@$!%*#?&]{2,30}$/,
            'Допускаются любые символы, кроме пробелов. Не менее 2 и не более чем 30 символов.')
})

export const passwordSchema = yup.object({
    oldPassword: yup.string()
        .required('Поле обязательно к заполнению')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,15}$/, passwordTitle),
    newPassword: yup.string()
        .required('Поле обязательно к заполнению')
        .notOneOf([yup.ref('oldPassword'), null], "Новый пароль не должен совпадать со старым")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,15}$/, passwordTitle)
})

export const phoneSchema = yup.object({
    phone: yup.string()
        .required('Поле обязательно к заполнению')
        .matches(/^(?=.*\d)[\d]{10}$/, 'Введите настоящий номер телефона')
})

export const emailSchema = yup.object({
    email: yup.string()
        .required('Поле обязательно к заполнению')
        .email("Введите настоящий email")
})

export const locationSchema = yup.object({
    location: yup.string()
        .required('Поле обязательно к заполнению')
})

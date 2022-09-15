import * as yup from 'yup'

const passwordTitle = 'Пароль должен иметь от 7 до 15 символов на латинице, исключая пробелы.' +
    ' Из них должны быть хотя бы одна заглавная буква, одна прописная буква,' +
    ' одна цифра и один из спецсимволов(@$!%*#?&)'


export const signUpSchema = yup.object({
        email: yup.string()
            .required('Поле обязательно к заполнению')
            .email("Введите настоящий email"),
        password: yup.string()
            .required('Поле обязательно к заполнению')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,15}$/, passwordTitle),
        confirmPassword: yup.string()
            .required('Поле обязательно к заполнению')
            .oneOf([yup.ref('password'), null], "Пароль не совпадает"),
        firstName: yup.string()
            .required('Поле обязательно к заполнению')
            .matches(/^[A-Za-z\d@$!%*#?&]{2,30}$/,
                'Допускаются любые символы, кроме пробелов. Не менее 2 и не более чем 30 символов.'),
        lastName: yup.string()
            .required('Поле обязательно к заполнению')
            .matches(/^[A-Za-z\d@$!%*#?&]{2,30}$/,
                'Допускаются любые символы, кроме пробелов. Не менее 2 и не более чем 30 символов.')
    })

export const signInSchema = yup.object({
        email: yup.string()
            .required('Поле обязательно к заполнению')
            .email("Введите настоящий email"),
        password: yup.string()
            .required('Поле обязательно к заполнению')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,15}$/, passwordTitle)
    })
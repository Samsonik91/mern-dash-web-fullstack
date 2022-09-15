import {Router} from 'express'
import {check} from 'express-validator'
import userController from '../controllers/user.js'
import auth from '../middlewares/auth.js'

const router = new Router()

router.post('/signUp', [
    check('email', 'Введенные вами символы не являются email').isEmail(),
    check('password', 'Пароль должен иметь в себе не менее 7 и не более 15 символов, из которых хотя бы один должен быть заглавной буквой. Ещё в пароле должны быть как минимум две цифры').isStrongPassword({
            minLength: 7,
            maxLength: 15,
            minNumbers: 1,
            minUppercase: 1,
            minLowercase: 1,
            minSymbols: 1
        }).isLength({max: 15}),
    check('firstName', 'Поле "имя" не должно быть пустым и не должно начинаться или заканчиваться пробелом').trim().notEmpty(),
    check('lastName', 'Поле "фамилия" не должно быть пустым и не должно начинаться или заканчиваться пробелом').trim().notEmpty()
],userController.signUp)

router.post('/signIn', userController.signIn)
router.post('/deleteUser', auth, userController.deleteUser)
router.get('/getFavorites/:id', userController.getFavorites)
router.get('/getAvatar/:userId', userController.getAvatar)
router.patch('/changeName', auth, userController.changeName)
router.patch('/changePassword', auth, userController.changePassword)
router.patch('/changeEmail', auth, userController.changeEmail)
router.patch('/changeAvatar', auth, userController.changeAvatar)
router.patch('/changePhone', auth, userController.changePhone)
router.patch('/changeLocation', auth, userController.changeLocation)
router.get('/interlocutor/:id', userController.getInterlocutor)

export default router
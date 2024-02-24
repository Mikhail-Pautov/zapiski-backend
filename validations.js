import { body, validationResult } from 'express-validator';








export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимуи 5 символов').isLength({min: 5}),
]
 
export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимуи 5 символов').isLength({min: 5}),
    body('fullName', 'Укажите имя(минимум 3 символа)').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]

//валидация статьи
export const postCreateValidation = [
    //body('title', 'Введите заголовок').isLength({min: 3}).isString(),
    body('text', 'Введите текст записи').isLength({min: 10}).isString(),
    //body('tags', 'Неверный формат тэгов(укажите массив)').optional().isString(),
    //body('imageUrl', 'Неверная ссылка на изображения').optional().isString(),
]


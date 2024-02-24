import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt'

import UserModel from '../models/user.js';


//это вход для уже созданных пользователей
export const login = async (req, res) => {
    
    try {
        const user = await UserModel.findOne({ email: req.body.email});

        if (!user) {
           return req.status(404).json({
                message: 'Пользователь не найден', //так писать нельзя, правильно 'Неверный логин или пароль'
           })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPass){
            return res.status(400).json({
                message: 'Неверный логин или пароль', 
           })
        }


        const token = jwt.sign(
            {
            _id: user._id,
            }, 
            'secret123', 
            {
                expiresIn: '30d' //срок валидности токена
            }
        );

        const {passwordHash, ...userData} = user._doc;

         res.json({
            
             ...userData,
             token
         });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        });
    }
}


//это регистрация нового пользователя
export const register = async (req, res) => {
    try {
       

        //шифруем пароль
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)


        const doc = new UserModel({
           email: req.body.email,
           fullName: req.body.fullName,
           avatarUrl: req.body.avatarUrl,
           passwordHash: hash
        });

       
        //создаем пользователя в базе данных
        const user = await doc.save();

        //создаем токен(шифруем id)
        const token = jwt.sign(
            {
            _id: user._id,
            }, 
            'secret123', 
            {
                expiresIn: '30d' //срок валидности токена
            }
        );

            
        const {passwordHash, ...userData} = user._doc;

   //ВАЖНО ОЧЕНЬ Два ответа быть не может(будет ошибка)
        res.json({
            ...userData,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось зарегестрироваться'
        });
    }
}


export const getMe = async (req, res) => {
    console.log(req.userId);
    try {
        const user = await UserModel.findById(req.userId); //req.userId - получаем из checkAuth

    if(!user) {
        return res.status(404).json({
            message: 'Пользователь не найден'
        })
    }
    const {passwordHash, ...userData} = user._doc;

    
         res.json({userData});
    
    } catch (err) {
        
    }
}
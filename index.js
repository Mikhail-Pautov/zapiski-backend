import express from 'express';
import mongoose from 'mongoose'
//import multer from 'multer'
import cors from 'cors';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js'



import { checkAuth,  handleValidationErrors } from './utils/index.js';
import { PostController, UserController, TrashController} from './controllers/index.js';
import { getAllinTrash, addInTrash, removeAll } from './controllers/TrashController.js';

//тут
   .then(() => console.log('DB ok'))
   .catch((err) => console.log('DB error', err))

const app = express();


app.use(cors());
//делаем хранилеще для картинок
//const storage = multer.diskStorage({
//    destination: (_, __, cb) => {
//        cb(null, 'uploads');
//    },
//    filename: (_, file, cb) => {
//        cb(null, file.originalname);
//    },
//});

//const upload = multer({ storage });


app.use(express.json()); //позволяет читать json из запроса, это midllewair
//app.use('/uploads', express.static('uploads'));


//авторизация
app.post('/login', loginValidation, handleValidationErrors, UserController.login);
//регистрация
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
//checkAuth - в зависимости от того, что вернет эта функция, будет выполнен код, который идет дальше(это функция midllware)
app.get('/me', checkAuth, UserController.getMe);




//app.get('/tags', PostController.getLastTags);
//создание постов
app.get('/notes',  checkAuth,  PostController.getAll); //получаем все стать
//app.get('/notes/tags', PostController.getLastTags);
//app.get('/notes/:id', PostController.getOne); //готово
app.post('/notes', checkAuth ,  /* postCreateValidation, handleValidationErrors, */  PostController.create);  //готовы
app.delete('/notes/:id',  checkAuth,  PostController.remove);
//app.patch('/notes/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)
 

app.get('/trash', checkAuth, TrashController.getAllinTrash);
app.post('/trash', checkAuth, TrashController.addInTrash);
app.delete('/trash/:id', TrashController.removeAll);





app.listen(4444, (err) => {
    if(err){
        return console.log(err);
    }

    console.log('Server OK');
})




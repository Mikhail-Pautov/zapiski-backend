import mongoose from 'mongoose'


const NotesSchema = new mongoose.Schema({
        //title: {
        //    type: String,
        //    required: true,
        //},
        text: {
            type: String,
            required: true,
            //unique: true,
        },
        tags: {
            type: String,
            default: '',
        },
        //avatarUrl: String,
        //viewsCount: {
        //    type: Number,
        //    default: 0
        //},
        user: {
            type: mongoose.Schema.Types.ObjectId, //так делаю связь между двумя таблицами
            ref: 'User', //так делаю связь между двумя таблицами
            required: true, //не забудь включить
        },
        //imageUrl: String,

    }, 
    {
        timestamps: true,
    }
);


//'User' - это будет название в БД
export default mongoose.model('notes', NotesSchema);







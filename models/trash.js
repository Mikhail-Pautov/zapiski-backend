import mongoose from 'mongoose'



const TrashSchema = new mongoose.Schema({
       
        text: {
            type: String,
            required: true,
           
        },
        tags: {
            type: String,
            default: '',
        },
       
        user: {
            type: mongoose.Schema.Types.ObjectId, //так делаю связь между двумя таблицами
            ref: 'User', //так делаю связь между двумя таблицами
            required: true, //не забудь включить
        },
       

    }, 
    {
        timestamps: true,
    }
);


//'User' - это будет название в БД
export default mongoose.model('trash', TrashSchema);
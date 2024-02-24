import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    }, 
    {
        timestamps: true,
    }
);


//'User' - это будет название в БД
export default mongoose.model('User', UserSchema);







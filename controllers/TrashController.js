import TrashModel from '../models/trash.js';


 export const getAllinTrash = async (req, res) => {
    
    const userId = req.userId
    //const postId = req.params.id;
    //console.log(userId, 'userId');
   try {
       //populate('user').exec() - это связываем две таблици
       const posts = await TrashModel.find({user: userId}).exec();

       res.json(posts);
   } catch (err) {
       console.log(err);
       res.status(500).json({
           message: 'Не удалось получить статьи',
       });
   }
}


export const addInTrash = async (req, res) => {

    
    try {
        const doc = new TrashModel({
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
        });

        
        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью'
        });
    }
}


export const removeAll = async (req, res) => {
    try {
        
        const postId = req.params.id;
        
        await TrashModel.findByIdAndDelete(postId);
           
        

        res.json({
            message: true,
        });

             
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить запись',
        });
    }
}
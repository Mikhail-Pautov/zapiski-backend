import post from '../models/post.js';
import PostModel from '../models/post.js'


export const getLastTags = async (req, res) => {
    try {
          //populate('user').exec() - это связываем две таблици
          const posts = await PostModel.find().limit(5).exec();

          console.log(posts);
          const tags = posts.map(obj => obj.tegs).flat().slice(0, 5);
          res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
}

export const getAll = async (req, res) => {

    const userId = req.userId
    //const postId = req.params.id;
    //console.log(userId, 'userId');
    try {
        //populate('user').exec() - это связываем две таблици
        //const posts = await PostModel.find();//.populate('user').exec();

        const posts = await PostModel.find({user: userId}).exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        
        const postId = req.params.id;
        
        console.log(postId);
        
        //const postUpdate = await PostModel.findByIdAndUpdate(postId, 
        //    { $inc: {viewsCount: 1}},
        //    {returnDocument: 'after'},
        //   
        //).populate('user');
        //   
        const note = await PostModel.findById(postId)

        res.json(note);

             
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
}

export const remove = async (req, res) => {
    try {
        
        const postId = req.params.id;
        
        await PostModel.findByIdAndDelete(postId);
           
        

        res.json({
            message: true,
        });

             
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить статью',
        });
    }
}


export const create = async (req, res) => {

    console.log('req.body', req.body);
    try {
        const doc = new PostModel({
            //title: req.body.title,
            text: req.body.text,
            //imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        //console.log('doc', doc);
        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью'
        });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id; 

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tegs: req.body.tegs,
            user: req.userId,
        });

        res.json({
            success: true,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью'
        });
    }
}
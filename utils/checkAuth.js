import jwt from 'jsonwebtoken'


export const checkAuth =  (req, res, next) => {
//req.headers.authorization
    const token = (req.headers.authorization || '').replace('Bearer ', '');

    
    if(token) {
        
        try {
            const decoded = jwt.verify(token, 'secret123'); //это расшифровка токена
            
            req.userId = decoded._id;
            
            next();
           
        } catch (e) {
            
            return res.status(403).json({
                message: 'Нет доступа22',
            });
        }

    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
};







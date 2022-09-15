import config from 'config'
import jwt from 'jsonwebtoken'

const auth = async(req,res,next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }

    const token = req.headers.authorization.split(' ')[1]

    if(!token){
        return res.status(400).json({message: 'Пройдите авторизацию'})
    }

    const decoded = jwt.verify(token, config.get('secretKey'))
    req.userId = decoded.id

    next()
}

export default auth
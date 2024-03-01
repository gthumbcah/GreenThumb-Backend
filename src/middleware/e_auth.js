import jwt from 'jsonwebtoken'
import { UserModel } from '../db.js'

const e_auth = async (req, res, next) => {

  try {

      const token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const user = await UserModel.findById(decodedToken.id)

      if (user && user.admin === true || decodedToken.id === req.params.id) {
        next()
      } else {
        return res.status(403).json({ message: "Only a manager can access" })
      }

  } 
  catch (error) {
    return res.status(401).json({ message: "Invalid or missing token" })
  }
}

export default e_auth
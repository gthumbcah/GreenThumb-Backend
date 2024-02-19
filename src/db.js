import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

try {
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? "MongoDB connection successful" : "MongoDB connection failed")
}
catch(err) {
    console.log(err)
}

const closeConnection = () => {
    console.log('Mongoose disconnecting...')
    mongoose.disconnect()
}

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean
})

const UserModel = mongoose.model('User', usersSchema)


export { closeConnection, UserModel }
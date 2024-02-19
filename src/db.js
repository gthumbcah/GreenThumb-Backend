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
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    admin: { type: Boolean, required: true}
})

const UserModel = mongoose.model('User', usersSchema)

const jobsSchema = new mongoose.Schema({
    customerDetails: { type: Array, required: true},
    toolsNeeded: { type: Array },
    users: [{ type: mongoose.ObjectId, ref: 'User' }],
    tasks: { type: Array}
})

const JobModel = mongoose.model('Job', jobsSchema)


export { closeConnection, UserModel, JobModel }
import { UserModel, closeConnection } from './db.js'

const users = [
    { name: 'John', email: '<EMAIL>', password: '<PASSWORD>', admin : true },
    { name: 'David', email: '<EMAIL>', password: '<PASSWORD>', admin : false}
]

await UserModel.deleteMany()
console.log('Users deleted')
await UserModel.insertMany(users)
console.log('Users Added')

closeConnection()
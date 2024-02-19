import { UserModel, JobModel, closeConnection } from './db.js'

const users = [
    { name: 'John', email: 'john@email.com', password: 'john', admin : true },
    { name: 'David', email: 'david@email.com', password: 'david', admin : false}
]

await UserModel.deleteMany()
console.log('Users deleted')
const u = await UserModel.insertMany(users)
console.log('Users Added')

const jobs = [
    {
        customerDetails: ['Name', 'Mob', 'Address'],
        toolsNeeded: ['Mower'],
        users: [ u[1]],
        tasks: ['Task1']
    }
]

await JobModel.deleteMany()
console.log('Jobs deleted')
await JobModel.insertMany(jobs)
console.log('Jobs Added')


closeConnection()
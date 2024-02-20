import { UserModel, JobModel, TimeSheetModel, closeConnection } from './db.js'

const users = [
    { name: 'John', email: 'john@email.com', password: '$2a$10$4FHag4GzmCzN6QGwN1gRMuIp3FdaVnRnTgKsgBH0TM/hRjaOkqZKC', admin : true }, // password: john (hashed)
    { name: 'David', email: 'david@email.com', password: '$2a$10$Bavn7IONJgQRHecSW6JyWOOKkF/d2e9izscz8AVfTEyRsDpj7fF2u'} // password: david (hashed)
]

await UserModel.deleteMany()
console.log('Users deleted')
const u = await UserModel.insertMany(users)
console.log('Users Added')

const jobs = [
    {
        customerDetails: ['Name1', 'Mob', 'Address'],
        toolsNeeded: ['Mower'],
        users: [ u[1]],
        tasks: ['Task1']
    },
    {
        customerDetails: ['Name2', 'Mob', 'Address'],
        toolsNeeded: ['Mower'],
        users: [ u[1]],
        tasks: ['Task1']
    }
]

await JobModel.deleteMany()
console.log('Jobs deleted')
const j = await JobModel.insertMany(jobs)
console.log('Jobs Added')

const timeSheet = [
    { users: u[1], job: j[0], total: 6 },
    { users: u[1], job: j[1], total: 12 }
]

await TimeSheetModel.deleteMany()
console.log('TimeSheets deleted')
await TimeSheetModel.insertMany(timeSheet)
console.log('TimeSheets Added')


closeConnection()
import { UserModel, JobModel, TimeSheetModel, closeConnection } from './db.js'

const users = [
    { name: 'John', email: 'john@email.com', password: '$2a$10$4FHag4GzmCzN6QGwN1gRMuIp3FdaVnRnTgKsgBH0TM/hRjaOkqZKC', admin : true }, // password: john (hashed)
    { name: 'David', email: 'david@email.com', password: '$2a$10$Bavn7IONJgQRHecSW6JyWOOKkF/d2e9izscz8AVfTEyRsDpj7fF2u', admin: true}, // password: david (hashed)
    { name: 'Mike', email: 'mike@email.com', password: '$2a$10$f3pmAXYTgWQn0a2XorQNqexBDzDPgFnT8Qx.AM4ZDTR5TpZpzTB0G'}, // password: mike (hashed)
    { name: 'Sally', email: 'sally@email.com', password: '$2a$10$Txkjg1bcT9NxLBunlh5Pm.HSm5Nll49m9bH8tXr2YKkDdpsW5ndu2'}, // password: sally (hashed)
    { name: 'Frank', email: 'frank@email.com', password: '$2a$10$nbq11VGm7BC2qBQIVyb/iuOgREpQqQUUBOkVndPcjVWy.iD.yi1bm'}, // password: frank (hashed)

]

await UserModel.deleteMany()
console.log('Users deleted')
const u = await UserModel.insertMany(users)
console.log('Users Added')

const jobs = [
    {
        customerDetails: ['Jake Rose', '0411222333', 'https://maps.app.goo.gl/QPJXtBMv3iZsBCYd7'],
        toolsNeeded: ['Mower'],
        users: [ u[1],u[2]],
        tasks: ['Task1'],
        dates: ["2024-02-24","2024-02-25","2024-02-26"]
    },
    {
        customerDetails: ['Harold Daffodil', 'Mob', 'Address'],
        toolsNeeded: ['Mower'],
        users: [ u[1], u[4]],
        tasks: ['Task1'],
        dates: ["2024-02-16", "2024-02-17", ]
    },
    {
        customerDetails: ['Jean Waratah', 'Mob', 'Address'],
        toolsNeeded: ['Mower', 'Shovel', 'wheelbarrow'],
        users: [ u[1],u[3]],
        tasks: ['Task1', "Task 2"],
        dates: ["2024-02-24","2024-02-25","2024-02-26","2024-02-27","2024-02-28"]
    },
    {
        customerDetails: ['Sam Bindi', 'Mob', 'Address'],
        toolsNeeded: ['bobcat', 'crane'],
        users: [ u[2],u[4]],
        tasks: ['Task1', "Task2", "Task3"],
        dates: ["2024-02-24"]
    }
]

await JobModel.deleteMany()
console.log('Jobs deleted')
const j = await JobModel.insertMany(jobs)
console.log('Jobs Added')


const timeSheet = [
    { user: u[1], job: j[0],clockIn: "2024-02-24T09:00:00", total: 6 },
    { user: u[1], job: j[1],clockIn: "2024-02-16T09:00:00", total: 12 },
    { user: u[3], job: j[1],clockIn: "2024-02-16T09:00:00", total: 10 }
]


await TimeSheetModel.deleteMany()
console.log('TimeSheets deleted')
await TimeSheetModel.insertMany(timeSheet)
console.log('TimeSheets Added')


closeConnection()
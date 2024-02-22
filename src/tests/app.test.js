import app from '../app.js'
import request from 'supertest'

describe('App Test', () => {

    // test on the entry route
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toContain('json')
        expect(res.body.info).toBe('Hello!')
    })


    // Login API ---------------------------------------------------------
    describe('Login POST test', () => {

        let user

        beforeAll(async () => {
            user = await request(app).post('/users').send({
                name: 'tester',
                email: 'tester@email.com',
                password: 'tester'
            })
        })

        // User created successfully
        test('Returns JSON content', async () => {
            expect(user.status).toBe(201)
            expect(user.header['content-type']).toContain('json')
            expect(user.body.name).toBe('tester')
        })

        // invalid email
        test('/login with invalid email', async () => {
            const login = await request(app).post('/login').send({
                email: 'failtest',
                password: 'tester'
            })
            expect(login.status).toBe(404)
            expect(login.header['content-type']).toContain('json')
            expect(login.body.message).toBe('User not found')
        })

        // invalid Password
        test('/login with invalid Password', async () => {
            const login = await request(app).post('/login').send({
                email: 'tester@email.com',
                password: 'failtest'
            })
            expect(login.status).toBe(403)
            expect(login.header['content-type']).toContain('json')
            expect(login.body.message).toBe('Invalid password')
        })

        // Successful login
        test('/login', async () => {
            const login = await request(app).post('/login').send({
                    email: 'tester@email.com',
                    password: 'tester'
                })
            const token = login.body.token
            expect(login.status).toBe(200)
            expect(login.body).toHaveProperty('token')
        })        
    })

    // User API ---------------------------------------------------------
    describe('User CRUD', () => {

        let res, id

        beforeEach(async () => {
            res = await request(app).post('/users').send({
                name: 'tester',
                email: 'tester@email.com',
                password: 'tester',
            })
            id = res.body.id
        })


        // Confirms the POST is working
        test('Returns JSON content | confirms user post', () => {
            expect(res.status).toBe(201)
            expect(res.header['content-type']).toContain('json')
            expect(res.body.name).toBe('tester')
            expect(res.body.id).toBe(id)
            
        })

        // Confirms the GET by id is working
        test('READ /users/:id', async () => {
            const u = await request(app).get(`/users/${id}`)
            expect(u.status).toBe(200)
            expect(u.header['content-type']).toContain('json')
            expect(u.body.name).toBe('tester')
        })

        // Confirms the PUT by id is working
        test('UPDATE /users/:id', async () => {
            const u = await request(app).put(`/users/${id}`).send({
                name: 'tester2',
                email: 'tester2@email.com',
                password: 'tester2',
            })
            expect(u.status).toBe(200)
            expect(u.header['content-type']).toContain('json')
            expect(u.body.name).toBe('tester2')
            expect(u.body.email).toBe('tester2@email.com')
        })

        afterEach(() => {
            // Cleanup
            request(app).delete(`/users/${id}`)
        })

        // talk with team if delete is need because after each is deleting???
    })

    // Job API ----------------------------------------------------------------
    describe('Job CRUD', () => {

        let res, userId, job, jobId, currentJob, currentJobUser

        beforeEach(async () => {
            res = await request(app).post('/users').send({
                name: 'tester',
                email: 'tester@email.com',
                password: 'tester',
            })
            userId = res.body.id
            job = await request(app).post('/jobs').send({
                    customerDetails: ['Name1', 'Mob', 'Address'],
                    toolsNeeded: ['Mower'],
                    users: [ userId ],
                    tasks: ['Task1']
            })
            jobId = job.body._id
            currentJob = await request(app).get(`/jobs/${jobId}`)
            currentJobUser = currentJob.body.users
        })

        // function to check job object
        function jobTest(jobResponse, expectedDetails, expectedTools, expectedUserId, expectedTasks, expectedId) {
            expect(jobResponse.status).toBe(200)
            expect(jobResponse.header['content-type']).toContain('json')
            expect(jobResponse.body.customerDetails).toEqual(expect.arrayContaining(expectedDetails))
            expect(jobResponse.body.toolsNeeded).toEqual(expect.arrayContaining(expectedTools))
            expect(jobResponse.body.users).toEqual(expect.arrayContaining(expectedUserId))
            expect(jobResponse.body.tasks).toEqual(expect.arrayContaining(expectedTasks))
            expect(jobResponse.body._id).toBe(expectedId)
        }

        // Confirms the user POST is working
        test('confirms user post returns JSON content', () => {
            expect(res.status).toBe(201)
            expect(res.header['content-type']).toContain('json')
            expect(res.body.name).toBe('tester')
            expect(res.body.id).toBe(userId)           
        })

        // Confirms the job POST is working
        test('confirms job post returns JSON content', async () => {            
            jobTest(job, ['Name1', 'Mob', 'Address'], ['Mower'], currentJobUser, ['Task1'], jobId)
        })

        // Confirms the job GET by id is working
        test('READ /jobs/:id', async () => {
            jobTest(currentJob, ['Name1', 'Mob', 'Address'], ['Mower'], currentJobUser, ['Task1'], jobId)
        })

            

        // Confirms the jobs PUT by id is working
        test('UPDATE /jobs/:id', async () => {
            const j = await request(app).put(`/jobs/${jobId}`).send({
                customerDetails: ['changeName', 'changeMob', 'changeAddress'],
                toolsNeeded: ['changeTool'],
                users: [ userId ],
                tasks: ['changeTask']
            })
            jobTest(j, ['changeName', 'changeMob', 'changeAddress'], ['changeTool'], currentJobUser, ['changeTask'], jobId)
        })

        afterEach(() => {
            // Cleanup
            request(app).delete(`/jobs/${jobId}`)
            request(app).delete(`/users/${userId}`)
        })
    })

})


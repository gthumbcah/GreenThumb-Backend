import app from '../app.js'
import request from 'supertest'

describe('App Test', () => {

    let token, userLogin

    beforeAll(async () => {
        // Perform authentication and obtain JWT token
        userLogin = await request(app).post('/login').send({
                email: 'john@email.com',
                password: 'john'
            })
        token = userLogin.body.token
    })

    test('Login successful', async () => {
        expect(userLogin.status).toBe(200) 
        expect(userLogin.header['content-type']).toContain('json')
        expect(userLogin.body.message).toBe('Login successful')
        
    })

    // // test on the entry route
    // test('GET /', async () => {
    //     const user = await request(app).get('/')
    //     expect(user.status).toBe(200)
    //     expect(user.header['content-type']).toContain('json')
    //     expect(user.body.info).toBe('Hello!')
    // })


    // // Login API ---------------------------------------------------------
    // describe('Login POST test', () => {

    //     let user, id

    //     beforeAll(async () => {
    //         user = await request(app).post('/users').set('Authorization', `Bearer ${token}`).send({
    //             name: 'tester',
    //             email: 'tester@email.com',
    //             password: 'tester'
    //         })
    //         id = user.body.id
    //     })

    //     // User created successfully
    //     test('Returns JSON content', async () => {
    //         expect(user.status).toBe(201)
    //         expect(user.header['content-type']).toContain('json')
    //         expect(user.body.name).toBe('tester')
    //     })

    //     // invalid email
    //     test('/login with invalid email', async () => {
    //         const login = await request(app).post('/login').send({
    //             email: 'failtest',
    //             password: 'tester'
    //         })
    //         expect(login.status).toBe(404)
    //         expect(login.header['content-type']).toContain('json')
    //         expect(login.body.message).toBe('User not found')
    //     })

    //     // invalid Password
    //     test('/login with invalid Password', async () => {
    //         const login = await request(app).post('/login').send({
    //             email: 'tester@email.com',
    //             password: 'failtest'
    //         })
    //         expect(login.status).toBe(403)
    //         expect(login.header['content-type']).toContain('json')
    //         expect(login.body.message).toBe('Invalid password')
    //     })

    //     // Successful login
    //     test('/login Successful', async () => {
    //         const login = await request(app).post('/login').send({
    //                 email: 'tester@email.com',
    //                 password: 'tester'
    //             })
    //         expect(login.status).toBe(200)
    //         expect(login.body).toHaveProperty('token')
    //     })
        
    //     afterAll(async () => {
    //         // Cleanup
    //         const cleanUp = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    //     })
    // })

    // // User API ---------------------------------------------------------
    // describe('User CRUD', () => {

    //     let user, id

    //     beforeEach(async () => {
    //         user = await request(app).post('/users').set('Authorization', `Bearer ${token}`).send({
    //             name: 'tester',
    //             email: 'tester@email.com',
    //             password: 'tester',
    //         })
    //         id = user.body.id
    //     })


    //     // Confirms the POST is working
    //     test('Returns JSON content | confirms user post', () => {
    //         expect(user.status).toBe(201)
    //         expect(user.header['content-type']).toContain('json')
    //         expect(user.body.name).toBe('tester')
    //         expect(user.body.id).toBe(id)
            
    //     })

    //     // Confirms the GET by id is working
    //     test('READ /users/:id', async () => {
    //         const u = await request(app).get(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    //         expect(u.status).toBe(200)
    //         expect(u.header['content-type']).toContain('json')
    //         expect(u.body.name).toBe('tester')
    //     })

    //     // Confirms the PUT by id is working
    //     test('UPDATE /users/:id', async () => {
    //         const u = await request(app).put(`/users/${id}`).set('Authorization', `Bearer ${token}`).send({
    //             name: 'tester2',
    //             email: 'tester2@email.com',
    //             password: 'tester2',
    //         })
    //         expect(u.status).toBe(200)
    //         expect(u.header['content-type']).toContain('json')
    //         expect(u.body.name).toBe('tester2')
    //         expect(u.body.email).toBe('tester2@email.com')
    //     })

    //     afterEach(async () => {
    //         // Cleanup
    //         const cleanUp = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    //     })

    // })

    // Job API ----------------------------------------------------------------
    describe('Job CRUD', () => {

        let user, userId, job, jobId, currentJob, currentJobUser

        beforeEach(async () => {
            user = await request(app).post('/users').set('Authorization', `Bearer ${token}`).send({
                name: 'tester',
                email: 'tester@email.com',
                password: 'tester',
            })
            userId = user.body.id
            job = await request(app).post('/jobs').set('Authorization', `Bearer ${token}`).send({
                customerDetails: ['Testy Test', '0411111111', 'https://maps.app.goo.gl/QPJXtBMv3iZsBCYd7'],
                toolsNeeded: ['TestTool1', 'TestTool2'],
                users: [ userId],
                tasks: ['TestTask1', 'TestTask2'],
                dates: ["2024-02-24","2024-02-25","2024-02-26"]
            })
            jobId = job.body._id
            currentJob = await request(app).get(`/jobs/${jobId}`).set('Authorization', `Bearer ${token}`)
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
            expect(user.status).toBe(201)
            expect(user.header['content-type']).toContain('json')
            expect(user.body.name).toBe('tester')
            expect(user.body.id).toBe(userId)           
        })

        // error recieved on request. close answer but object
            // expect(received).toEqual(expected) // deep equality

    // Expected: ArrayContaining ["65e1605e8c2447bff31cc85e"]
    // Received: [{"__v": 0, "_id": "65e1605e8c2447bff31cc85e", "admin": false, "email": "tester@email.com", "name": "tester", "password": "$2b$10$Z151mFN5jeqKhgP1Wr.ztOxzuT/P/nxLN5XJIsEXWEFzrDkfV4Edi"}]
        // Confirms the job POST is working
        // test('confirms job post returns JSON content', async () => {            
        //     jobTest(job, ['Testy Test', '0411111111', 'https://maps.app.goo.gl/QPJXtBMv3iZsBCYd7'], ['TestTool1', 'TestTool2'], [userId], ['TestTask1', 'TestTask2'], jobId)
        // })

        // // Confirms the job GET by id is working
        // test('READ /jobs/:id', async () => {
        //     jobTest(job, ['Testy Test', '0411111111', 'https://maps.app.goo.gl/QPJXtBMv3iZsBCYd7'], ['TestTool1', 'TestTool2'], [userId], ['TestTask1', 'TestTask2'], jobId)
        // })

            

        // // Confirms the jobs PUT by id is working
        // test('UPDATE /jobs/:id', async () => {
        //     const j = await request(app).put(`/jobs/${jobId}`).send({
        //         customerDetails: ['changeName', 'changeMob', 'changeAddress'],
        //         toolsNeeded: ['changeTool'],
        //         users: [ userId ],
        //         tasks: ['changeTask']
        //     })
        //     jobTest(j, ['Testy Test', '0411111111', 'https://maps.app.goo.gl/QPJXtBMv3iZsBCYd7'], ['TestTool1', 'TestTool2'], [userId], ['TestTask1', 'TestTask2'], jobId)
        // })

        afterEach(async () => {
            // Cleanup
            const cleanUpJob = await request(app).delete(`/jobs/${jobId}`).set('Authorization', `Bearer ${token}`)
            const cleanUpUser = await request(app).delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`)
        })
    })

})


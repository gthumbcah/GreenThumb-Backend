import app from './app.js'
import request from 'supertest'

describe('App Test', () => {
    // test on the entry route
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toContain('json')
        expect(res.body.info).toBe('Hello!')
    })

    // tests user routes
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
        test('Returns JSON content', () => {
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
})


import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongodb-helper'
import app from '../config/app'

describe("Signup Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'savio',
        email: 'savio@mail.com',
        password: 'savio123',
        passwordConfirmation: 'savio123'

      })
      .expect(200)
  })
})
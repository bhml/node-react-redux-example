/*
 * @jest-environment node
 */

import request from 'supertest'
import app from '../../server/app'
import sampleData from '../../server/sampleData.json'
import { transformSchedules } from '../../server/api/controllers/schedules'

let agent

const extraData = {
  id: 9,
  title: 'Test Schedule',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  startTime: '1503546200000',
  endTime: '1501545600000',
  genre: 'documentary',
}

describe('Schedules API', () => {
  beforeAll((done) => {
    agent = request.agent(app)
    done()
  })

  test('GET schedules', (done) => {
    agent
      .get('/schedules')
      .end((err, result) => {
        expect(result.status).toBe(200)
        expect(result.body).toEqual(transformSchedules(sampleData))
        done()
      })
  })

  test('POST schedules', (done) => {
    const payload = JSON.stringify(extraData)
    const results = transformSchedules([...sampleData, extraData])

    agent
      .post('/schedules')
      .set('Content-Type', 'application/json')
      .send(payload)
      .end((err, result) => {
        expect(result.status).toBe(200)
        expect(result.body).toEqual(results)
        done()
      })
  })

  test('POST schedules with invalid JSON', (done) => {
    const payload = `
      {
        "id": 9,
        "title": "Test Schedule",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "startTime": "1503546200000"
        "endTime": "1501545600000",
        "genre": "documentary"
      }
    `

    agent
      .post('/schedules')
      .set('Content-Type', 'application/json')
      .send(payload)
      .end((err, result) => {
        expect(result.status).toBe(400)
        expect(result.body).toEqual({})
        expect(result.text).toEqual('Error: Invalid JSON')
        done()
      })
  })

  test('POST schedules with existing record', (done) => {
    const payload = sampleData[0]

    agent
      .post('/schedules')
      .set('Content-Type', 'application/json')
      .send(payload)
      .end((err, result) => {
        expect(result.status).toBe(400)
        expect(result.body).toEqual({})
        expect(result.text).toEqual(`Error: schedule with ID: ${payload.id} already exists`)
        done()
      })
  })
})

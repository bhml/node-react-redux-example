import { Router } from 'express'
import scheduleController from '../controllers/schedules'

export default (db) => {
  const router = Router()
  const schedules = scheduleController(db)

  router.get('/', (req, res) => schedules.list(req, res))
  router.post('/', (req, res) => schedules.create(req, res))

  return router
}

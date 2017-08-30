import { Router } from 'express'
import scheduleRoutes from './routes/schedules'

export default (db) => {
  const router = Router()

  router.use('/schedules', scheduleRoutes(db.schedules))

  return router
}

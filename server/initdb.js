import sampleData from './sampleData.json'

export default (callback) => {
  const db = {}
  db.schedules = sampleData
  callback(db)
}

import sampleData from './sampleData.json'

export default (callback) => {
  const db = {}
  // splitting the db into separate keys
  db.schedules = sampleData
  callback(db)
}

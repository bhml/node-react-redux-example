import _ from 'lodash'

export default db => ({
  list: (req, res) => {
    const payload = _.map(db, (schedule) => {
      let duration = +schedule.endTime - +schedule.startTime

      if (!duration || duration < 0) duration = '0'
      schedule.duration = duration.toString()

      return schedule
    })

    res.json(_.sortBy(payload, 'startTime'))
  },

  create: (req, res) => {
    const required = ['id', 'title', 'startTime', 'endTime']

    let invalid
    _.forEach(required, (field) => {
      if (!req.body[field]) {
        invalid = `Error: required schedule field: ${field} missing`
        return false
      }
    })

    if (invalid) {
      return res.status(400).send(invalid)
    }

    const id = req.body.id
    const found = _.find(db, { id })
    if (found) {
      return res.status(400).send(`Error: schedule with ID: ${id} already exists`)
    }

    db.push(req.body)
    res.json(req.body)
  },
})

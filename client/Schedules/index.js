import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadSchedules, saveSchedule } from './actions'
import ScheduleList from './components/ScheduleList'
import ScheduleCreate from './components/ScheduleCreate'

@connect(
  state => ({
    schedules: state.schedules,
  }),
  { loadSchedules, saveSchedule },
)
export default class Schedules extends Component {
  static propTypes = {
    schedules: PropTypes.object.isRequired,
    loadSchedules: PropTypes.func.isRequired,
    saveSchedule: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <h1>TV Program Schedules</h1>
        <ScheduleList
          schedules={this.props.schedules}
          onScheduleLoad={this.props.loadSchedules}
        />
        <ScheduleCreate
          schedules={this.props.schedules}
          onScheduleSave={this.props.saveSchedule}
        />
      </div>
    )
  }
}

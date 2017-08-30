import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ScheduleList extends Component {
  static propTypes = {
    schedules: PropTypes.object.isRequired,
    onScheduleLoad: PropTypes.func.isRequired,
  }

  state = {
    prettyPrint: true,
  }

  togglePretty = () => {
    this.setState({ prettyPrint: !this.state.prettyPrint })
  }

  render() {
    const { prettyPrint } = this.state
    const { schedules, onScheduleLoad } = this.props

    const error = schedules.errors.list
    const jsonString = _.size(schedules.items) ?
      JSON.stringify(schedules.items, null, prettyPrint ? 2 : null) : ''

    return (
      <div style={{ float: 'left', margin: 10 }}>
        <div>
          <textarea
            value={jsonString}
            rows={20}
            cols={60}
          />
        </div>
        <button
          onClick={() => onScheduleLoad()}
          disabled={schedules.loading}
        >
          Get schedules
        </button>
        <label style={{ marginLeft: 10 }}>
          Pretty print
          <input
            type="checkbox"
            checked={prettyPrint}
            onChange={this.togglePretty}
          />
        </label>
        {error &&
          <div style={{ color: 'red' }}>
            {error}
          </div>
        }
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ScheduleCreate extends Component {
  static propTypes = {
    schedules: PropTypes.object.isRequired,
    onScheduleSave: PropTypes.func.isRequired,
  }

  state = {
    text: '',
  }

  handleScheduleSave = () => {
    this.props.onScheduleSave(this.state.text, (err) => {
      if (err) return
      this.setState({ text: '' })
    })
  }

  handleInputChange = (e) => {
    this.setState({ text: e.target.value })
  }

  render() {
    const { text } = this.state
    const { schedules } = this.props

    const error = schedules.errors.create

    return (
      <div style={{ float: 'left', margin: 10 }}>
        <div>
          <textarea
            value={text}
            onChange={this.handleInputChange}
            rows={10}
            cols={60}
          />
        </div>
        <button
          onClick={this.handleScheduleSave}
          disabled={schedules.loading}
        >
          Create new schedule
        </button>
        {error &&
          <div style={{ color: 'red' }}>
            {error}
          </div>
        }
      </div>
    )
  }
}

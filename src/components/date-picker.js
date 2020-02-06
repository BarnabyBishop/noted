import React, { Component } from 'react';
import moment from 'moment';
import './date-picker.css';

class DatePicker extends Component {
    previous() {
        const previousDate = moment(this.props.currentDate)
            .subtract(1, 'days')
            .toDate();
        this.props.actions.setDate(previousDate);
    }

    next() {
        const nextDate = moment(this.props.currentDate)
            .add(1, 'days')
            .toDate();
        this.props.actions.setDate(nextDate);
    }

    setDate() {
        this.props.actions.setDate(new Date());
    }

    render() {
        const currentDate = moment(this.props.currentDate);
        if (this.props.filterType === 'date') {
            return (
                <div className="date-picker">
                    <div className="prev" onClick={this.previous.bind(this)}>
                        <i className="fas fa-arrow-left" />
                    </div>
                    <div onClick={this.setDate.bind(this)}>{currentDate.format('ddd, Do MMM')}</div>
                    <div className="next" onClick={this.next.bind(this)}>
                        <i className="fas fa-arrow-right" />
                    </div>
                </div>
            );
        }

        return (
            <div className="date-picker">
                <div className="date-picker--calendar" onClick={this.setDate.bind(this)}>
                    <i className="fas fa-calendar-alt" />
                </div>
            </div>
        );
    }
}
export default DatePicker;

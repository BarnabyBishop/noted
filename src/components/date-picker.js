import React, { Component } from "react";
import moment from "moment";
import "./date-picker.css";

class DatePicker extends Component {
    previous() {
        const previousDate = moment(this.props.currentDate)
            .subtract(1, "days")
            .toDate();
        this.props.actions.setDate(previousDate);
    }

    next() {
        const nextDate = moment(this.props.currentDate)
            .add(1, "days")
            .toDate();
        this.props.actions.setDate(nextDate);
    }

    render() {
        const currentDate = moment(this.props.currentDate);
        return (
            <div className="date-picker">
                <div className="prev" onClick={this.previous.bind(this)}>
                    👈
                </div>
                <div>{currentDate.format("ddd, Do MMM")}</div>
                <div className="next" onClick={this.next.bind(this)}>
                    👉
                </div>
            </div>
        );
    }
}

export default DatePicker;

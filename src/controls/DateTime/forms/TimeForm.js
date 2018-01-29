'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../../Component');


@pure
@bind
class TimeForm extends Component {
    static defaultProps = {

        hours: 24,
        minutes: 0,
        seconds: 0,

        time: null,
        min: null,
        max: null
    }

    constructor() {
        super();

        this._changeHandler = this._changeHandler.bind(this);
    }

    _changeHandler(e) {
        let hour = this.refs.hour.value;
        let minute = this.refs.minute ? this.refs.minute.value : 0;
        let second = this.refs.second ? this.refs.second.value : 0;

        this.props.onChange(e, new Date(1970, 0, 1, hour, minute, second));
    }

    _formatHour(hour) {
        hour = hour + '';
        return hour.length < 2 ? '0' + hour : hour;
    }

    _formatMinute(minute) {
        minute = minute + '';
        return minute.length < 2 ? '0' + minute : minute;
    }

    _formatSecond(second) {
        second = second + '';
        return second.length < 2 ? '0' + second : second;
    }

    render() {
        let min = this.props.min;
        let max = this.props.max;
        let time = this.props.time;

        let hour = time ? time.getHours() : min.getHours();
        let minute = time ? time.getMinutes() : min.getMinutes();
        let second = time ? time.getSeconds() : min.getSeconds();

        let minHour = min.getHours();
        let maxHour = max.getHours();
        let minMinute = hour === minHour ? min.getMinutes() : 0;
        let maxMinute = hour === maxHour ? max.getMinutes() : 59;
        let minSecond = (hour === minHour && minute === minMinute) ? min.getSeconds() : 0;
        let maxSecond = (hour === maxHour && minute === maxMinute) ? max.getSeconds() : 59;

        let hours = [];
        let step = Math.round(24 / (this.props.hours || 24));
        for (let h = 0; h <= maxHour; h += step) if (h >= minHour) hours.push(h);

        let minutes = [];
        if (this.props.seconds || this.props.minutes) {
            step = Math.round(60 / (this.props.minutes || 60));
            for (let m = 0; m <= maxMinute; m += step) if (m >= minMinute) minutes.push(m);
        }

        let seconds = [];
        if (this.props.seconds) {
            step = Math.round(60 / this.props.seconds);
            for (let s = 0; s <= maxSecond; s += step) if (s >= minSecond) seconds.push(s);
        }

        let type = 'hour';
        let hasSeconds = !!seconds.length;
        let hasMinutes = hasSeconds || !!minutes.length;
        if (hasSeconds) type = 'second';
        else if (hasMinutes) type = 'minute';

        return (
            <div className={'DateTime-time DateTime-time-' + type}>
                <select ref="hour" className="DateTime-time-hour" onChange={this._changeHandler} value={hour} onFocus={this.props.onFocus} onBlur={this.props.onBlur}>
                    {hours.map(function (hour) {
                        return <option key={hour} value={hour}>{this._formatHour(hour)}</option>
                    }.bind(this))}
                </select>

                {hasMinutes ? <span>:</span> : null}
                {hasMinutes ? (
                    <select ref="minute" className="DateTime-time-minute" onChange={this._changeHandler} value={minute} onFocus={this.props.onFocus} onBlur={this.props.onBlur}>
                        {minutes.map(function (minute) {
                            return <option key={minute} value={minute}>{this._formatMinute(minute)}</option>
                        }.bind(this))}
                    </select>
                ) : null}

                {hasSeconds ? <span>:</span> : null}
                {hasSeconds ? (
                    <select ref="second" className="DateTime-time-second" onChange={this._changeHandler} value={second} onFocus={this.props.onFocus} onBlur={this.props.onBlur}>
                        {seconds.map(function (second) {
                            return <option key={second} value={second}>{this._formatSecond(second)}</option>
                        }.bind(this))}
                    </select>
                ) : null}
            </div>
        );
    }
};


module.exports = TimeForm;

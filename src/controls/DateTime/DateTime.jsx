'use strict';

const React = require('react');
const dom = require('ndom');
const classNames = require('classnames');
const DayPicker = require('react-day-picker');
const DateUtils = require('react-day-picker').DateUtils;
const {Component, bind, pure, getClass} = require('../../Component');

const Moment = require('moment-timezone');

const YearMonthForm = require('./forms/YearMonthForm');
const TimeForm = require('./forms/TimeForm');

require('./DateTime.less');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);


@bind
class DateTime extends Component {
    _selectFocused = false;
    _selectTimeout = 0;

    static propTypes = {
        @pure accessoriesLeft: React.PropTypes.arrayOf(React.PropTypes.element),
        @pure accessoriesRight: React.PropTypes.arrayOf(React.PropTypes.element),
        @pure className: React.PropTypes.string,
        @pure style: React.PropTypes.object,
        @pure name: React.PropTypes.string,
        @pure tabIndex: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),

        @pure disabled: React.PropTypes.bool,
        @pure readOnly: React.PropTypes.bool,

        @pure gmt: React.PropTypes.bool,

        @pure autoFocus: React.PropTypes.bool,
        @pure placeholder: React.PropTypes.string,
        @pure clearButton: React.PropTypes.element,

        @pure value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
        @pure defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),

        @pure month: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
        @pure defaultMonth: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),

        @pure date: React.PropTypes.bool,
        @pure hours: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]),
        @pure minutes: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]),
        @pure seconds: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]),

        @pure min: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
        @pure max: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
        @pure minTime: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
        @pure maxTime: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),

        @pure locale: React.PropTypes.string,
        @pure format: React.PropTypes.string,
        @pure displayFormat: React.PropTypes.string,

        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        accessoriesLeft: [],
        accessoriesRight: [],
        className: '',
        style: {},
        name: '',
        tabIndex: null,

        placeholder: '',
        autoFocus: false,
        clearButton: null,

        gmt: false,

        value: null,
        defaultValue: null,

        month: null,
        defaultMonth: null,

        date: true,
        hours: false,
        minutes: false,
        seconds: false,

        min: null,
        max: null,
        minTime: null,
        maxTime: null,

        locale: 'en',
        format: null,
        displayFormat: null
    };

    constructor(props) {
        super(props);

        let value = (props.value !== null ? props.value : props.defaultValue) || null;
        let month = (props.month !== null ? props.month : props.defaultMonth) || new Date();

        this.state = Object.assign({
            date: null,
            time: null,
            month: null,
            value: null,
            min: null,
            max: null,
            minTimeInitial: null,
            maxTimeInitial: null,
            minDate: null,
            maxDate: null,
            minTime: null,
            maxTime: null,
            focused: false
        }, this._setup(props, value, month));
    }

    componentWillReceiveProps(nextProps) {
        let value = (nextProps.value !== null ? nextProps.value : this.state.value) || null;
        let month = (nextProps.month !== null ? nextProps.month : this.state.month) || new Date();
        this.setState(this._setup(nextProps, value, month));
    }

    componentWillUnmount() {
        if (isBrowser) dom(document).off('mouseup', this._mouseUpHandler);
        if (this._selectTimeout) clearTimeout(this._selectTimeout);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(
            this.props.className === nextProps.className &&
            JSON.stringify(this.props.style) === JSON.stringify(nextProps.style) &&
            this.props.name === nextProps.name &&
            this.props.tabIndex === nextProps.tabIndex &&
            this.props.date === nextProps.date &&
            this.props.hours === nextProps.hours &&
            this.props.minutes === nextProps.minutes &&
            this.props.seconds === nextProps.seconds &&
            this.props.locale === nextProps.locale &&
            this.props.format === nextProps.format &&
            this.props.displayFormat === nextProps.displayFormat &&

            Moment(this.props.value).unix() === Moment(nextProps.value).unix() &&
            Moment(this.props.month).unix() === Moment(nextProps.month).unix() &&
            Moment(this.props.min).unix() === Moment(nextProps.min).unix() &&
            Moment(this.props.max).unix() === Moment(nextProps.max).unix() &&
            Moment(this.props.minTime).unix() === Moment(nextProps.minTime).unix() &&
            Moment(this.props.maxTime).unix() === Moment(nextProps.maxTime).unix() &&

            this.state.date.getTime() === nextState.date.getTime() &&
            this.state.time.getTime() === nextState.time.getTime() &&
            this.state.month.getTime() === nextState.month.getTime() &&
            this.state.value.getTime() === nextState.value.getTime() &&
            this.state.min.getTime() === nextState.min.getTime() &&
            this.state.max.getTime() === nextState.max.getTime() &&
            this.state.minTimeInitial.getTime() === nextState.minTimeInitial.getTime() &&
            this.state.maxTimeInitial.getTime() === nextState.maxTimeInitial.getTime() &&
            this.state.minDate.getTime() === nextState.minDate.getTime() &&
            this.state.maxDate.getTime() === nextState.maxDate.getTime() &&
            this.state.minTime.getTime() === nextState.minTime.getTime() &&
            this.state.maxTime.getTime() === nextState.maxTime.getTime() &&
            this.state.focused === nextState.focused
        );
    }

    getValue() {
        let format = this.props.format;
        if (!format) {
            if (this.props.date) format = 'YYYY-MM-DD';
            if (this.props.hours || this.props.minutes || this.props.seconds) {
                if (this.props.date) format += ' HH:mm:ss';
                else format = 'HH:mm:ss';
                //if (this.props.minutes || this.props.seconds) format += ':mm';
                //if (this.props.seconds) format += ':ss';
            }
        }

        let value = this.state.value;
        if (value) {
            if (this.props.gmt) value = Moment(value).tz('Europe/London').format(format);
            else value = Moment(value).format(format);
        }

        return value;
    }

    render() {
        let accessoriesLeft = this._mapAccessories(this.props.accessoriesLeft);
        let accessoriesRight = this._mapAccessories(this.props.accessoriesRight);

        let format = this.props.format;
        if (!format) {
            if (this.props.date) format = 'YYYY-MM-DD';
            if (this.props.hours || this.props.minutes || this.props.seconds) {
                if (this.props.date) format += ' HH:mm:ss';
                else format = 'HH:mm:ss';
                //if (this.props.minutes || this.props.seconds) format += ':mm';
                //if (this.props.seconds) format += ':ss';
            }
        }
        let displayFormat = this.props.displayFormat || format;

        let value = this.state.value;
        if (value) {
            if (this.props.gmt) value = Moment(value).tz('Europe/London').format(format);
            else value = Moment(value).format(format);
        }

        let displayValue = this.state.value;
        if (displayValue) displayValue = Moment(displayValue).format(displayFormat);
        if (this.props.date && !this.state.date) displayValue = '';
        else if (!this.props.date && !this.state.time) displayValue = '';

        if (this.props.clearButton && (this.state.date || this.state.value)) {
            accessoriesRight.push(
                React.cloneElement(this.props.clearButton, {
                    key: 'cb',
                    onClick: this._clearClickHandler
                })
            );
        }

        return (
            <div ref="container" className={getClass(
                'DateTime', this.props.className, {
                    'DateTime-accessories': accessoriesLeft.length || accessoriesRight.length,
                    'DateTime-disabled': this.props.disabled,
                    'DateTime-readonly': this.props.readOnly,
                    'DateTime-focused': (!this.props.readOnly && !this.props.disabled && this.state.focused)
                }
            )} style={this.props.style}>
                {(accessoriesLeft.length) ? (<div className="accessories">
                    {accessoriesLeft}
                </div>) : null}

                <input type="hidden" name={this.props.name} value={value || ''}/>
                <input ref="input" autoFocus={this.props.autoFocus} readOnly tabIndex={this.props.tabIndex || 0}
                       type="text" onFocus={this._focusHandler} onBlur={this._blurHandler}
                       placeholder={this.props.placeholder} value={displayValue}/>

                {(!this.props.readOnly && !this.props.disabled) ? (
                    <div ref="picker" className="DateTime-picker" onMouseDown={this._mouseDownHandler}>
                        {this.props.date ? this._renderDate() : null}
                        {(this.props.hours || this.props.minutes || this.props.seconds) ? this._renderTime() : null}
                    </div>
                ) : null}

                {(accessoriesRight.length) ? (<div className="accessories">
                    {accessoriesRight}
                </div>) : null}
            </div>
        );
    }

    _renderDate() {
        let canChangeMonth = (!this.props.month && this.state.minDate.getTime() !== this.state.maxDate.getTime());

        let pickerProps = {
            numberOfMonths: 1,
            locale: this.props.locale,
            modifiers: {
                disabled: this._disabledFilter,
                selected: this._selectedFilter
            },
            canChangeMonth: canChangeMonth,
            captionElement: <YearMonthForm onChange={this._monthChangeHandler} onFocus={this._selectFocusHandler}
                                           onBlur={this._selectBlurHandler} readOnly={!canChangeMonth}
                                           min={this.state.min} max={this.state.max}/>,
            enableOutsideDays: canChangeMonth,
            initialMonth: this.state.month,
            onDayClick: this._dateClickHandler
        };

        if (this.state.minDate) pickerProps.fromMonth = this.state.minDate;
        if (this.state.maxDate) pickerProps.toMonth = this.state.maxDate;

        return <DayPicker {...pickerProps} />;
    }

    _renderTime() {
        return (
            <TimeForm
                hours={this.props.hours === true ? 24 : (this.props.hours || 0)}
                minutes={this.props.minutes === true ? 60 : (this.props.minutes || 0)}
                seconds={this.props.seconds === true ? 60 : (this.props.seconds || 0)}
                time={this.state.time}
                min={this.state.minTime}
                max={this.state.maxTime}
                onChange={this._timeChangeHandler}
                onFocus={this._selectFocusHandler}
                onBlur={this._selectBlurHandler}
            />
        )
    }

    _getBounds(date, min, max, minTime, maxTime) {
        let minDate = new Date(min.getFullYear(), min.getMonth(), min.getDate(), 12, 0, 0);
        let maxDate = new Date(max.getFullYear(), max.getMonth(), max.getDate(), 12, 0, 0);

        if (date) {
            if (date.getTime() <= minDate.getTime()) {
                if (min.getHours() * 3600 + min.getMinutes() * 60 + min.getSeconds() > minTime.getHours() * 3600 + minTime.getMinutes() * 60 + minTime.getSeconds()) {
                    minTime = new Date(1970, 0, 1, min.getHours(), min.getMinutes(), min.getSeconds());
                }

            }

            if (date.getTime() >= maxDate.getTime()) {
                if (max.getHours() * 3600 + max.getMinutes() * 60 + max.getSeconds() < maxTime.getHours() * 3600 + maxTime.getMinutes() * 60 + maxTime.getSeconds()) {
                    maxTime = new Date(1970, 0, 1, max.getHours(), max.getMinutes(), max.getSeconds());
                }
            }
        }

        return {
            minDate: minDate,
            maxDate: maxDate,
            minTime: minTime,
            maxTime: maxTime
        }
    }

    _normalize(date, time, minDate, maxDate, minTime, maxTime) {
        if (date && date < minDate) date = new Date(minDate.getTime());
        if (date && date > maxDate) date = new Date(maxDate.getTime());

        if (time && time < minTime) time = new Date(minTime.getTime());
        if (time && time > maxTime) time = new Date(maxTime.getTime());

        return {
            date: date,
            time: time,
            value: (date || time) ? new Date(
                date ? date.getFullYear() : 0,
                date ? date.getMonth() : 0,
                date ? date.getDate() : 1,
                time ? time.getHours() : 0,
                time ? time.getMinutes() : 0,
                time ? time.getSeconds() : 0
            ) : null
        };
    }

    _setup(props, value, month) {
        let min = props.min ? new Date(props.min.getTime()) : new Date(1970, 0, 1, 0, 0, 0);
        let max = props.max ? new Date(props.max.getTime()) : new Date(2060, 11, 31, 23, 59, 59);
        let minTime = props.minTime ? new Date(1970, 0, 1, props.minTime.getHours(), props.minTime.getMinutes(), props.minTime.getSeconds()) : new Date(1970, 0, 1, 0, 0, 0);
        let maxTime = props.maxTime ? new Date(1970, 0, 1, props.maxTime.getHours(), props.maxTime.getMinutes(), props.maxTime.getSeconds()) : new Date(1970, 0, 1, 23, 59, 59);

        let values = {
            date: value ? new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12, 0, 0) : null,
            time: value ? new Date(1970, 0, 1, value.getHours(), value.getMinutes(), value.getSeconds()) : (props.date ? new Date(1970, 0, 1, 0, 0, 0) : null)
        };
        let bounds = this._getBounds(values.date, min, max, minTime, maxTime);
        let normal = this._normalize(values.date, values.time, bounds.minDate, bounds.maxDate, bounds.minTime, bounds.maxTime);

        if (bounds.minDate.getTime() > month.getTime()) month = new Date(bounds.minDate.getTime());
        if (bounds.maxDate.getTime() < month.getTime()) month = new Date(bounds.maxDate.getTime());

        return {
            date: normal.date,
            time: normal.time,
            value: value ? normal.value : null,
            month: month,
            min: min,
            max: max,
            minTimeInitial: minTime,
            maxTimeInitial: maxTime,
            minDate: bounds.minDate,
            maxDate: bounds.maxDate,
            minTime: bounds.minTime,
            maxTime: bounds.maxTime
        };
    }

    _dateClickHandler(e, date) {
        let bounds = this._getBounds(date, this.state.min, this.state.max, this.state.minTimeInitial, this.state.maxTimeInitial);
        let normal = this._normalize(date, this.state.time, bounds.minDate, bounds.maxDate, bounds.minTime, bounds.maxTime);

        if (this.state.value && this.state.value.getTime() === normal.value.getTime()) return;

        if (this.props.value === null) this.setState({
            date: normal.date,
            time: normal.time,
            value: normal.value,
            minDate: bounds.minDate,
            maxDate: bounds.maxDate,
            minTime: bounds.minTime,
            maxTime: bounds.maxTime
        });

        this.emit('change', normal.value, normal.date, normal.time);
    }

    _timeChangeHandler(e, time) {
        let normal = this._normalize(this.state.date, time, this.state.minDate, this.state.maxDate, this.state.minTime, this.state.maxTime);

        if (this.state.value && this.state.value.getTime() === normal.value.getTime()) return;

        if (this.props.value === null) this.setState({
            value: normal.value,
            date: normal.date,
            time: normal.time
        });

        this.emit('change', normal.value, normal.date, normal.time);
    }

    _monthChangeHandler(date) {
        if (this.state.minDate.getTime() > date.getTime()) date = new Date(this.state.minDate.getTime());
        if (this.state.maxDate.getTime() < date.getTime()) date = new Date(this.state.maxDate.getTime());
        this.setState({month: date});
    }

    _focusHandler() {
        this.setState({focused: true});
    }

    _mouseDownHandler() {
        if (isBrowser) dom(document).on('mouseup', this._mouseUpHandler);
        this._mouseDown = true;
    }

    _mouseUpHandler() {
        if (!this._selectFocused) this.refs.input.focus();
        if (isBrowser) dom(document).off('mouseup', this._mouseUpHandler);
        this._mouseDown = false;
    }

    _selectFocusHandler() {
        this._selectFocused = true;
    }

    _selectBlurHandler() {
        this._selectFocused = false;

        if (this._selectTimeout) clearTimeout(this._selectTimeout);
        this._selectTimeout = setTimeout(function () {
            if (!this._mouseDown && !this._selectFocused) this._blurHandler();
        }.bind(this), 2);
    }

    _blurHandler() {
        if (!this._mouseDown) this.setState({focused: false});
    }

    _clearClickHandler() {
        this.setState({
            date: null,
            value: null
        });
    }

    _selectedFilter(day) {
        return this.state.value ? DateUtils.isSameDay(this.state.date, day) : false;
    }

    _disabledFilter(day) {
        return (
            day.getTime() < this.state.minDate.getTime() ||
            day.getTime() > this.state.maxDate.getTime()
        );
    }

    _mapAccessories(accessories) {
        return React.Children.map(accessories, (accessory, index) => {
            return React.cloneElement(accessory, {
                key: 'a-' + index
            });
        }, this);
    }
}


module.exports = DateTime;

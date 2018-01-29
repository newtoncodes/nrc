'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../../Component');

@pure
@bind
class YearMonthForm extends Component {

    constructor() {
        super();

        this._changeHandler = this._changeHandler.bind(this);
    }

    _changeHandler() {
        this.props.onChange(new Date(this.refs.year.value, this.refs.month.value));
    }

    render() {
        let year = this.props.date.getFullYear();
        let month = this.props.date.getMonth();
        let minYear = this.props.min.getFullYear();
        let maxYear = this.props.max.getFullYear();
        let minMonth = (minYear === year) ? this.props.min.getMonth() : 0;
        let maxMonth = (maxYear === year) ? this.props.max.getMonth() : 11;

        let monthsNames = this.props.localeUtils.getMonths();
        let months = [];
        let years = [];

        let i;
        for (i = minYear; i <= maxYear; i++) years.push(<option key={i} value={i}>{i}</option>);
        for (i = minMonth; i <= maxMonth; i++) months.push(<option key={i} value={i}>{monthsNames[i]}</option>);

        return (
            <div className="DateTime-caption DayPicker-Caption">
                {this.props.readOnly ? (
                    <div>
                        <span>{monthsNames[month]}</span>,
                        <span>{year}</span>
                    </div>
                ) : (
                    <div>
                        <select ref="month" name="month" onChange={this._changeHandler} onFocus={this.props.onFocus} onBlur={this.props.onBlur} value={month}>{months}</select>
                        <select ref="year" name="year" onChange={this._changeHandler} onFocus={this.props.onFocus} onBlur={this.props.onBlur} value={year}>{years}</select>
                    </div>
                )}
            </div>
        );
    }
};


module.exports = YearMonthForm;

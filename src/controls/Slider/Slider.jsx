'use strict';

const React = require('react');
const dom = require('ndom');
const classNames = require('classnames');
const {Component, bind, pure, getClass} = require('../../Component');

require('./Slider.less');

let range = (value, min, max) => {
    return Math.max(min, Math.min(value, max));
};

let round = (value, precision) => {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
};

let sorting =  (a, b) => {
    return a - b;
};

@pure
@bind
class Slider extends Component {
    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure defaultValue: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.array]),
        @pure disabled: React.PropTypes.bool,
        @pure max: React.PropTypes.number,
        @pure min: React.PropTypes.number,
        @pure minusInfinity: React.PropTypes.bool,
        @pure name: React.PropTypes.string,
        @pure plusInfinity: React.PropTypes.bool,
        @pure precision: React.PropTypes.number,
        @pure readOnly: React.PropTypes.bool,
        @pure steps: React.PropTypes.number,
        @pure style: React.PropTypes.object,
        @pure tabIndex: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        @pure value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.array]),
        @pure values: React.PropTypes.number,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        defaultValue: null,
        disabled: false,
        max: 100,
        min: 0,
        minusInfinity: false,
        name: '',
        plusInfinity: false,
        precision: 0,
        readOnly: false,
        steps: null,
        style: {},
        tabIndex: null,
        value: null,
        values: 1
    };

    constructor(props) {
        super(props);

        let value = (props.value !== null ? props.value : props.defaultValue) || [];
        if (typeof value === 'number' || typeof value === 'string') value = [value];

        this.state = Object.assign({
            max: 100,
            min: 0,
            steps: null,
            values: []
        }, this._setup(props, value));

        this._input = null;
    }

    componentWillReceiveProps(nextProps) {
        let value = (nextProps.value !== null ? nextProps.value : this.state.values) || [];
        if (typeof value === 'number' || typeof value === 'string') value = [value];
        this._setup(nextProps, value);
    }

    render() {
        let {onBlur, onFocus, ...events} = this.wrapEvents(true, ['onMouseDown', 'onMouseUp']);

        let name = this.props.name;
        let multiple = (name && name.substr(-2) === '[]');
        let values = this.state.values;
        values.sort(sorting);

        let fillLeft = 0;
        let fillRight = 0;

        if (values.length > 1) {
            fillLeft = this._calculateOffset(values[0]);
            fillRight = 100 - this._calculateOffset(values[values.length - 1]);
        }
        else {
            fillLeft = 0;
            fillRight = 100 - this._calculateOffset(values[0]);
        }

        let handles = values.map((value, index) => {
            return (
                <div
                    className="Slider-handle"
                    key={index}
                    onMouseDown={this._handleMouseDownHandler}
                    style={{left: this._calculateOffset(value) + '%'}}
                ></div>
            );
        });

        return (
            <div
                className={getClass(
                    'Slider', this.props.className, {
                        'Slider-disabled': this.props.disabled === true,
                        'Slider-readonly': this.props.readOnly === true,
                    }
                )}
                 ref="slider" style={this.props.style}
                 {...events}
            >
                <div className="Slider-track">
                    <div style={{left: fillLeft + '%', right: fillRight + '%'}}></div>
                </div>

                {handles}

                {multiple ? this.getValues().map((value, index) => {
                    return <input ref={input => this._input = input} disabled={this.props.disabled} name={name} key={'input-' + index} readOnly={this.props.readOnly} tabIndex={this.props.tabIndex} type="hidden" value={value} onFocus={onFocus} onBlur={onBlur}/>
                }).bind(this) : (
                    <input ref={input => this._input = input} disabled={this.props.disabled} name={name} readOnly={this.props.readOnly} tabIndex={this.props.tabIndex} type="hidden" value={this.getValues().join(',')} onFocus={onFocus} onBlur={onBlur}/>
                )}
            </div>
        );
    }

    _setup(props, value) {
        let min = props.min;
        let max = props.max;
        let steps = props.steps;
        let values = [];

        if (!props.steps) {
            if (props.minusInfinity || props.plusInfinity) {
                console.error('Cannot set minus and/or plus infinity without steps.');
            }
        }
        else if (props.minusInfinity || props.plusInfinity) {
            let increaseSteps = 1;
            if (props.minusInfinity && props.plusInfinity) increaseSteps = 2;

            let size = props.max - props.min;
            let interval = size / (props.steps - 1);

            steps = props.steps + increaseSteps;

            if (props.minusInfinity) min = props.min - interval;
            if (props.plusInfinity) max = props.max + interval;
        }

        for (let i = 0; i < props.values; i++) {
            values.push(value[i] || 0);

            if (props.minusInfinity && values[i] === '-') values[i] = min;
            else if (props.plusInfinity && values[i] === '+') values[i] = max;
            else values[i] = range(values[i], min, max);
        }

        values.sort(sorting);

        return {
            max: max,
            min: min,
            steps: steps,
            values: values
        };
    }

    _calculateValue(offset) {
        let props = this.props;
        let size = this.state.max - this.state.min;

        if (!this.state.steps) return round((offset / 100) * size + this.state.min, props.precision);

        let intervals = this.state.steps - 1;
        let interval = 100 / intervals;
        let step = Math.round(offset / interval);

        return step * size / intervals + this.state.min;
    }

    _calculateOffset(value) {
        let offset;
        let size = this.state.max - this.state.min;

        if (!this.state.steps) {
            if (value === '-') offset = 0;
            else if (value === '+') offset = 100;
            else offset = Math.round(((value - this.state.min) / (this.state.max - this.state.min)) * 1000) / 10;
            return offset;
        }

        let intervals = this.state.steps;
        let interval = 100 / intervals;
        intervals -= this.state.steps;

        return ((value - this.state.min) / size) * (100 - intervals * interval);
    }

    _handleMouseDownHandler(e) {
        if (this.props.disabled || this.props.readOnly) return;

        e.preventDefault();

        let slider = dom(this.refs['slider']);
        let width = slider.size.width;
        let offsetLeft = slider.offset.left;

        let handleValue = this._calculateValue(100 * (range(e.pageX, offsetLeft, offsetLeft + width) - offsetLeft) / width);
        let values = this.state.values.concat([]);

        let handleIndex = 0;
        let minDiff = Infinity;

        values.forEach((value, index) => {
            let diff = Math.abs(value - handleValue);
            if (diff < minDiff) {
                handleIndex = index;
                minDiff = diff;
            }
        });

        values.splice(handleIndex, 1);

        this._mouseMoveHandlerBound = this._handleMouseMoveHandler.bind(this, width, offsetLeft, values);

        dom('html').addClass('Slider-handle-cursor');
        dom(document).on('mousemove', this._mouseMoveHandlerBound);
        dom(document).once('mouseup', this._handleMouseUpHandler);

        this.emit('mousedown');
    }

    _handleMouseMoveHandler(width, offsetLeft, values, e) {
        values = values.concat();
        values.push(this._calculateValue(100 * (range(e.pageX, offsetLeft, offsetLeft + width) - offsetLeft) / width));
        values.sort(sorting);

        if (JSON.stringify(values) === JSON.stringify(this.state.values)) return;
        if (this.props.value === null) this.setState({values: values});

        this.emit('change', values, this.props.name);
    }

    _handleMouseUpHandler() {
        if (this._mouseMoveHandlerBound) {
            dom('html').removeClass('Slider-handle-cursor');
            dom(document).off('mousemove', this._mouseMoveHandlerBound);
            this._mouseMoveHandlerBound = null;
        }
    }

    _formatValues(rawValues) {
        let values = rawValues.map((v) => {
            if (this.props.minusInfinity && v === this.state.min) return '-';
            if (this.props.plusInfinity && v === this.state.max) return '+';
            return v;
        });

        values.sort((a, b) => {
            if (a === b) return 0;
            if (a == '-') return -1;
            if (b == '-') return 1;
            if (a == '+') return 1;
            if (b == '+') return -1;

            return a - b;
        });

        return values;
    }

    getName() {
        return this.props.name;
    }

    getValues() {
        return this._formatValues(this.state.values);
    }

}


module.exports = Slider;

'use strict';

const React = require('react');
const classNames = require('classnames');
const {Component, bind, pure, getClass} = require('../../Component');

require('./Checkbox.less');

@pure
@bind
class Checkbox extends Component {
    static propTypes = {
        @pure checked: React.PropTypes.bool,
        @pure className: React.PropTypes.string,
        @pure defaultChecked: React.PropTypes.bool,
        @pure disabled: React.PropTypes.bool,
        @pure label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),
        @pure name: React.PropTypes.string,
        @pure native: React.PropTypes.bool,
        @pure readOnly: React.PropTypes.bool,
        @pure style: React.PropTypes.object,
        @pure tabIndex: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        @pure value: React.PropTypes.any,

        onChange: React.PropTypes.func
    };

    static defaultProps = {
        checked: null,
        className: '',
        defaultChecked: false,
        disabled: false,
        label: null,
        name: '',
        native: false,
        readOnly: false,
        style: {},
        tabIndex: null,
        value: 1
    };

    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked !== null ? props.checked : props.defaultChecked
        };

        this._input = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== null) this.setState({checked: nextProps.checked});
    }

    render() {
        let {onFocus, onBlur, ...events} = this.wrapEvents(true, ['onChange']);
        let style = {};
        if (!this.props.native) style.display = 'none';

        return (
            <label
                className={getClass(
                    'Checkbox', this.props.className, {
                        'Checkbox-checked': this.state.checked === true,
                        'Checkbox-disabled': this.props.disabled === true,
                        'Checkbox-readonly': this.props.readOnly == true
                    }
                )}
                style={this.props.style}
                   {...events}
            >
                <input
                    ref={input => this._input = input}

                    type="checkbox"
                    style={style}
                    name={this.props.name}
                    value={this.props.value}

                    checked={this.state.checked}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    tabIndex={this.props.tabIndex}

                    onFocus={onFocus || null}
                    onBlur={onBlur || null}
                    onChange={this._changeHandler}
                />

                {!this.props.native ? <div className="Checkbox-input"></div> : null}
                {this.props.label ? this.props.label : null}
            </label>
        );
    }

    _changeHandler(event) {
        if (this.props.readOnly) return;

        let checked = !this.state.checked;
        if (this.props.checked === null) this.setState({checked: checked});

        this.emit('change', this.getValue(checked), checked, event);
    }

    isChecked() {
        return this.state.checked;
    }

    getValue(checked) {
        if (typeof checked === 'undefined') checked = this.state.checked;
        return checked ? this.props.value : null;
    }
}


module.exports = Checkbox;

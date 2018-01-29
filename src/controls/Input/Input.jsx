'use strict';

const React = require('react');
const classNames = require('classnames');
const {Component, bind, pure, getClass} = require('../../Component');

require('./Input.less');

@pure
@bind
class Input extends Component {

    static propTypes = {
        @pure accessoriesLeft: React.PropTypes.arrayOf(React.PropTypes.element),
        @pure accessoriesRight: React.PropTypes.arrayOf(React.PropTypes.element),
        @pure autoComplete: React.PropTypes.bool,
        @pure autoFocus: React.PropTypes.bool,
        @pure className: React.PropTypes.string,
        @pure defaultValue: React.PropTypes.any,
        @pure disabled: React.PropTypes.bool,
        @pure formatter: React.PropTypes.any,
        @pure maxLength: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]),
        @pure name: React.PropTypes.string,
        @pure passwordRevealButton: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),
        @pure pattern: React.PropTypes.any,
        @pure placeholder: React.PropTypes.any,
        @pure readOnly: React.PropTypes.bool,
        @pure style: React.PropTypes.object,
        @pure tabIndex: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        @pure type: React.PropTypes.string,
        @pure validator: React.PropTypes.any,
        @pure value: React.PropTypes.any,
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func
    };

    static defaultProps = {
        accessoriesLeft: [],
        accessoriesRight: [],
        autoComplete: true,
        autoFocus: false,
        autoSelect: false,
        className: '',
        defaultValue: '',
        disabled: false,
        formatter: null,
        maxLength: false,
        name: '',
        passwordRevealButton: false,
        pattern: null,
        placeholder: null,
        readOnly: false,
        style: {},
        tabIndex: null,
        type: 'text',
        validator: null,
        value: null
    };

    constructor(props) {
        super(props);

        this.state = {
            passwordRevealed: false,
            value: props.value !== null ? props.value : props.defaultValue
        };

        this._input = null;
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            this._input.focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== null) this.setState({value: nextProps.value});
    }

    render() {
        let {onFocus, onBlur, onKeyPress, ...otherEvents} = this.wrapEvents(true, ['onChange', 'onFocus']);
        let inputType = this.props.type;
        if (inputType === 'phone') inputType = 'tel';
        if (inputType === 'password' && this.state.passwordRevealed) inputType = 'text';

        let accessoriesLeft = this._mapAccessories(this.props.accessoriesLeft);
        let accessoriesRight = this._mapAccessories(this.props.accessoriesRight);

        let passwordRevealButton = this.props.type === 'password' && this.props.passwordRevealButton;
        let passwordRevealButtonStyles = {};
        if (!passwordRevealButton) passwordRevealButtonStyles.display = 'none';

        if (passwordRevealButton) {
            accessoriesRight.push(
                <div className={getClass(
                    'Input-reveal-button', {
                        'Input-reveal-button-on': this.state.passwordRevealed
                    }
                )} key="rb" onClick={this._revealButtonClickHandler} style={passwordRevealButtonStyles}>
                    {this.props.passwordRevealButton}
                </div>
            );
        }

        return (
            <div
                className={
                    getClass(
                        'Input', 'Input-' + this.props.type, this.props.className, {
                        'Input-accessories': accessoriesLeft.length || accessoriesRight.length,
                        'Input-disabled': this.props.disabled,
                        'Input-readonly': this.props.readOnly
                    }
                )}
                style={this.props.style}
                 {...otherEvents}
            >
                {(accessoriesLeft.length) ? (<div className="accessories">
                    {accessoriesLeft}
                </div>) : null}

                <input
                    ref={input => this._input = input}

                    autoComplete={this.props.autoComplete === true ? 'on' : 'off'}
                    disabled={this.props.disabled}
                    maxLength={this.props.maxLength}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    tabIndex={this.props.tabIndex}
                    type={inputType}
                    value={this.state.value}

                    onChange={this._changeHandler}
                    onFocus={this._focusHandler}
                    onBlur={onBlur || null}
                    onKeyPress={onKeyPress || null}
                />

                {(accessoriesRight.length) ? (<div className="accessories">
                    {accessoriesRight}
                </div>) : null}
            </div>
        );
    }

    _mapAccessories(accessories) {
        return React.Children.map(accessories, (accessory, index) => {
            return React.cloneElement(accessory, {
                key: 'a-' + index
            });
        }, this);
    }

    _changeHandler(e) {
        if (this.props.value === null) this.setState({value: this._input.value});
        this.emit('change', this._input.value);
    }

    _focusHandler(e) {
        if (this.props.autoSelect && (this.props.type !== 'password' || this.state.passwordRevealed)) this._input.select();
        if (this.props.onFocus) this.emit('focus', e);
    }

    _revealButtonClickHandler(e) {
        this.setState({passwordRevealed: !this.state.passwordRevealed});

        if (this.props.autoSelect && !this.state.passwordRevealed) {
            setTimeout(function () {
                if (this.props.autoSelect && (this.props.type !== 'password' || this.state.passwordRevealed)) this._input.select();
            }.bind(this), 2);
        }
    }

    getValue() {
        return this.state.value;
    }

    setValue(value) {
        this.setState({
            value: value
        });
    }
}


module.exports = Input;

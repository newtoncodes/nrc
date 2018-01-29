'use strict';

const React = require('react');

const {Component, bind, pure, getClass} = require('../../Component');

@pure
@bind
class Radio extends Component {
    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure disabled: React.PropTypes.bool,
        @pure label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),
        @pure name: React.PropTypes.string.isRequired,
        @pure native: React.PropTypes.bool,
        @pure style: React.PropTypes.object,
        @pure tabIndex: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        @pure value: React.PropTypes.any.isRequired,
        @pure checked: React.PropTypes.bool,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        disabled: false,
        label: null,
        name: null,
        native: false,
        style: {},
        checked: null,
        tabIndex: null
    };

    constructor(props) {
        super(props);

        this._radio = null;
    }

    render() {
        let {onFocus, onBlur, ...events} = this.wrapEvents(true, ['onChange']);

        let style = {};
        if (!this.props.native) style.display = 'none';

        return (
            <label
                className={getClass(
                    'Radio', this.props.className, {
                        'Radio-checked': this.props.checked === true,
                        'Radio-disabled': this.props.disabled === true,
                        'Radio-readonly': this.props.readOnly === true
                    }
                )}
                   style={this.props.style}
                   {...events}
            >
                <input
                    ref={radio => this._radio = radio}
                    type="radio"
                    style={style}
                    name={this.props.name}
                    value={this.props.value}

                    defaultChecked={this.props.defaultChecked}
                    checked={this.props.checked}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    tabIndex={this.props.tabIndex}

                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={this._changeHandler}
                />

                {!this.props.native ? <div className="Radio-input"></div> : null}
                {this.props.label ? this.props.label : null}
            </label>
        );
    }

    _changeHandler(e) {
        if (this.props.readOnly) return;
        this.emit('change', this.props.value, this.props.checked);
    }
}


module.exports = Radio;

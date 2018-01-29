'use strict';

const React = require('react');
const classNames = require('classnames');
const {Component, bind, pure, getClass} = require('../../Component');

require('./Captcha.less');

@pure
@bind
class Captcha extends Component {
    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure disabled: React.PropTypes.bool,
        @pure href: React.PropTypes.string.isRequired,
        @pure name: React.PropTypes.string,
        @pure placeholder: React.PropTypes.string,
        @pure readOnly: React.PropTypes.bool,
        @pure refreshButton: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),
        @pure styles: React.PropTypes.object,
        @pure tabIndex: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
    };

    static defaultProps = {
        className: '',
        disabled: false,
        href: null,
        name: '',
        placeholder: '',
        readOnly: false,
        refreshButton: true,
        styles: {},
        tabIndex: null
    };

    constructor(props) {
        super(props);

        this._input = null;
        this._image = null;
    }

    componentWillReceiveProps(props) {
        if (props.href !== this.props.href) this._input.value = '';
    }

    render() {
        let {onBlur, onFocus, ...otherEvents} = this.wrapEvents(true, ['onChange']);
        return (
            <div
                className={getClass(
                    'Captcha', this.props.className, {
                        'Captcha-disabled': this.props.disabled === true,
                        'Captcha-readonly': this.props.readOnly === true
                    }
                )}
                style={this.props.style}
                 {...otherEvents}
            >
                <img alt="" ref={image => this._image = image} src={this.props.href} />
                <input
                    ref={input => this._input = input}
                    autoComplete="off"
                    autoCorrect="off"
                    disabled={this.props.disabled}
                    name={this.props.name}
                    onChange={this._inputChangeHandler}
                    onFocus={onFocus || null}
                    onBlur={onBlur || null}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    tabIndex={this.props.tabIndex}
                    type="text"
                />
                {this.props.refreshButton ? (
                    <div className="Captcha-refresh" onClick={this._refreshButtonClickHandler}>
                        {this.props.refreshButton !== true ? this.props.refreshButton : null}
                    </div>
                ) : null}
            </div>
        );
    }

    _inputChangeHandler(e) {
        this.emit('change', this._input.value, this);
    }

    _refreshButtonClickHandler(e) {
        this._image.src = '';
        this._image.src = this.props.href + '?' + Math.random();
        this._input.value = '';
        this._input.focus();
    }

    getValue() {
        return this._input;
    }
}


module.exports = Captcha;

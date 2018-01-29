'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');

const Icon = require('../Icon/Icon.jsx');

require('./Button.less');

@pure
@bind
class Button extends Component {
    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure disabled: React.PropTypes.bool,
        @pure href: React.PropTypes.string,
        @pure icon: React.PropTypes.string,
        @pure label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),
        @pure reset: React.PropTypes.bool,
        @pure skin: React.PropTypes.string,
        @pure size: React.PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
        @pure style: React.PropTypes.object,
        @pure submit: React.PropTypes.bool,
        @pure target: React.PropTypes.string,
        onClick: React.PropTypes.func,
        onMouseDown: React.PropTypes.func,
        onMouseEnter: React.PropTypes.func,
        onMouseLeave: React.PropTypes.func,
        onMouseMove: React.PropTypes.func,
        onMouseOver: React.PropTypes.func,
        onMouseOut: React.PropTypes.func,
        onMouseUp: React.PropTypes.func
    };

    static defaultProps = {
            className: '',
            disabled: false,
            href: null,
            icon: null,
            label: null,
            reset: false,
            size: null,
            skin: null,
            style: {},
            submit: false,
            target: null
    };

    render() {
        let events = this.wrapEvents(true, ['onClick', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOver', 'onMouseOut', 'onMouseUp']);
        let config = this._setup(this.props);

        let content = [];

        if (this.props.children) {
            content = this.props.children;
        }
        else {
            config.content.forEach((item, index) => {
                if (item.icon) content.push(<Icon key={index} name={item.icon} />);
                if (item.label) content.push(item.label);
            });
        }

        if (config.href) {
            return (
                <a
                    className={
                        getClass(
                            'Button', this.props.className, config.classes, {
                                'Button-disabled': this.props.disabled
                            }
                        )}
                    href={config.href}
                    onClick={this.props.onClick ? this._buttonClickHandler : null}
                    onMouseDown={this.props.onMouseDown ? this._buttonMouseDownHandler : null}
                    onMouseEnter={this.props.onMouseEnter ? this._buttonMouseEnterHandler : null}
                    onMouseLeave={this.props.onMouseLeave ? this._buttonMouseLeaveHandler : null}
                    onMouseMove={this.props.onMouseMove ? this._buttonMouseMoveHandler : null}
                    onMouseOver={this.props.onMouseOver ? this._buttonMouseOverHandler : null}
                    onMouseOut={this.props.onMouseOut ? this._buttonMouseOutHandler : null}
                    onMouseUp={this.props.onMouseUp ? this._buttonMouseUpHandler : null}
                    style={this.props.style}
                    target={config.hrefTarget}
                    {...events}
                >{content}</a>
            );
        }

        return (
            <button
                className={
                    getClass(
                        'Button', this.props.className, config.classes, {
                            'Button-disabled': this.props.disabled
                        }
                    )}
                disabled={this.props.disabled}
                onClick={this.props.onClick ? this._buttonClickHandler : null}
                onMouseDown={this.props.onMouseDown ? this._buttonMouseDownHandler : null}
                onMouseEnter={this.props.onMouseEnter ? this._buttonMouseEnterHandler : null}
                onMouseLeave={this.props.onMouseLeave ? this._buttonMouseLeaveHandler : null}
                onMouseMove={this.props.onMouseMove ? this._buttonMouseMoveHandler : null}
                onMouseOver={this.props.onMouseOver ? this._buttonMouseOverHandler : null}
                onMouseOut={this.props.onMouseOut ? this._buttonMouseOutHandler : null}
                onMouseUp={this.props.onMouseUp ? this._buttonMouseUpHandler : null}
                style={this.props.style}
                type={config.type}
                {...events}
            >{content}</button>
        );
    }

    _setup(props) {
        let config = {
            classes: [],
            content: [],
            href: null,
            hrefTarget: null,
            type: null,
        };

        Object.keys(props).forEach(key => {
            let value = props[key];

            switch (key) {
                case 'href':
                    if (value) config.href = value;
                    break;

                case 'target':
                    if (value) config.hrefTarget = value;
                    break;

                case 'icon':
                case 'label':
                    if (value) config.content.push(key === 'icon' ? {icon: value} : {label: value});
                    break;

                case 'reset':
                case 'submit':
                    if (value) config.type = key;
                    break;

                case 'size':
                case 'skin':
                    if (value) config.classes.push((value.length <= 2 ? 'Button-size-' : 'Button-skin-') + value);
                    break;
            }
        });

        if (config.href && config.type) {
            console.error('Cannot set href and submit/reset simultaneously');
            config.type = null;
        } else if (!config.type) {
            config.type = 'button';
        }

        config.classes = config.classes.join(' ');
        return config;
    }

    _buttonClickHandler(e) {
        if (this.props.disabled) e.preventDefault();
        else  this.emit('click', e);

        // this.props.onClick(e);
    }

    _buttonMouseDownHandler(e) {
        if (this.props.disabled) e.preventDefault();
        else this.emit('mouseDown', e);

        // this.props.onMouseDown(e);
    }

    _buttonMouseEnterHandler(e) {
        if (this.props.disabled) e.preventDefault();
        else this.emit('mouseEnter', e);

        // this.props.onMouseEnter(e);
    }

    _buttonMouseLeaveHandler(e) {
        if (this.props.disabled) e.preventDefault();
        else this.emit('mouseLeave', e);

        // this.props.onMouseLeave(e);
    }

    _buttonMouseMoveHandler(e) {
        if (this.props.disabled) e.preventDefault();
        else this.emit('mouseMove', e);

        // this.props.onMouseMove(e);
    }

    _buttonMouseOverHandler(e) {
        if (this.props.disabled) e.preventDefault();
        else this.emit('mouseOver', e);

        this.props.onMouseOver(e);
    }

    _buttonMouseOutHandler(e) {
        if (this.props.disabled) e.preventDefault();
        else this.emit('mouseOut', e);

        this.props.onMouseOut(e);
    }

    _buttonMouseUpHandler(e) {
        if (this.props.disabled) e.preventDefault();
        else this.emit('mouseUp', e);

        this.props.onMouseUp(e);
    }
}


module.exports = Button;

'use strict';

const React = require('react');
const Radio = require('./Radio.jsx');

const {Component, bind, pure, getClass} = require('../../Component');

require('./Radio.less');

@pure
@bind
class RadioGroup extends Component {

    static propTypes = {
        @pure checked: React.PropTypes.any,
        @pure className: React.PropTypes.string,
        @pure defaultChecked: React.PropTypes.any,
        @pure disabled: React.PropTypes.bool,
        @pure name: React.PropTypes.string,
        @pure native: React.PropTypes.bool,
        @pure style: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        checked: null,
        className: '',
        defaultChecked: false,
        disabled: null,
        name: '',
        native: false,
        style: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked !== null ? props.checked : props.defaultChecked
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== null) this.setState({checked: nextProps.checked});
    }

    render() {
        let events = this.wrapEvents(true, ['onChange']);
        let children = this._mapChildren(this.props.children);

        return (
            <div className={getClass(
                'Radio-group', this.props.className
            )}
                 style={this.props.style}
                 {...events}
            >
                {children}
            </div>
        );
    }

    _changeHandler(value, checked) {
        if (value === this.state.checked) return;
        if (this.props.checked === null || this.props.checked !== value) this.setState({checked: value});
        this.emit('change', value);
    }

    _mapChildren(children) {
        return React.Children.map(children, function (child) {
            if (!child) {
                return null;
            }

            if (child.type === Radio && child.props.name === this.props.name) {
                return React.cloneElement(child, {
                    className: child.props.className,
                    checked: child.props.value === this.state.checked,
                    native: this.props.native || child.props.native,
                    disabled: this.props.disabled || child.props.disabled,
                    onChange: this._changeHandler
                });
            } else {
                if (child.props && child.props.children) {
                    return React.cloneElement(child, {
                        children: this._mapChildren(child.props.children)
                    });
                } else {
                    return child;
                }
            }
        }, this);
    }

    getValue() {
        return this.state.checked;
    }

}


module.exports = RadioGroup;

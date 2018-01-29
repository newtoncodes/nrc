'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');

const Icon = require('../Icon/Icon.jsx');

require('./Alert.less');

@pure
@bind
class Alert extends Component {
    @pure static propTypes = {
        className: React.PropTypes.string,
        hidden: React.PropTypes.bool,
        icon: React.PropTypes.bool,
        style: React.PropTypes.object,
        type: React.PropTypes.oneOf(['', 'success', 'warning', 'error'])
    };

    static defaultProps = {
            className: '',
            hidden: false,
            icon: false,
            style: {},
            type: ''
    };

    render() {
        let events = this.wrapEvents(true);
        let icon = null;

        if (this.props.icon) {
            if (this.props.type === 'success') icon = <Icon name="check" />;
            if (this.props.type === 'warning') icon = <Icon name="warning" />;
            if (this.props.type === 'error') icon = <Icon name="times" />;
        }

        return (
            <div
                className={
                    getClass(
                        'Alert', this.props.className, {
                            'Alert-success': this.props.type === 'success',
                            'Alert-warning': this.props.type === 'warning',
                            'Alert-error': this.props.type === 'error',
                            'Alert-hidden': this.props.hidden === true
                        }
                )}
                 style={this.props.style}
                 {...events}
            >
                {icon}
                {this.props.children}
            </div>
        );
    }
}


module.exports = Alert;

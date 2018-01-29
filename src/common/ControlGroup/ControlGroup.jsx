'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');

require('./ControlGroup.less');

@pure
@bind
class ControlGroup extends Component {
    @pure static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        vertical: React.PropTypes.bool
    };

    static defaultProps = {
        className: '',
        style: {},
        vertical: false
    };

    render() {
        let events = this.wrapEvents(true);
        return (
            <div
                className={
                    getClass(
                        'ControlGroup', this.props.className, {
                            'ControlGroup-horizontal': !this.props.vertical,
                            'ControlGroup-vertical': this.props.vertical
                        }
                )}
                style={this.props.style}
                {...events}
            >
                {this.props.children}
            </div>
        );
    }
}


module.exports = ControlGroup;

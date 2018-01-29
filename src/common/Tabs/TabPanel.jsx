'use strict';

const React = require('react');
const classNames = require('classnames');
const {Component, bind, pure, getClass} = require('../../Component');

@pure
@bind
class TabPanel extends Component {
    @pure static propTypes = {
        className: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        style: React.PropTypes.object,
        visible: React.PropTypes.bool
    };

    static defaultProps = {
        className: '',
        style: {},
        visible: false
    };

    render() {
        let events = this.wrapEvents(true);
        return (
            <div
                className={getClass(
                    'Tab-panel', {
                        'Tab-panel-visible': this.props.visible
                    }, this.props.className
                )}
                 style={this.props.style}
                 {...events}
            >
                {this.props.children}
            </div>
        );
    }
}


module.exports = TabPanel;

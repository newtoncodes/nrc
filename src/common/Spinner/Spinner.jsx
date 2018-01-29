'use strict';

const React = require('react');
const classNames = require('classnames');
const {Component, bind, pure, getClass} = require('../../Component');
require('./Spinner.less');

@pure
@bind
class Spinner extends Component {
    @pure static propTypes = {
        centered: React.PropTypes.bool,
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        visible: React.PropTypes.bool
    };

    static defaultProps = {
        centered: false,
        className: '',
        style: {},
        visible: false
    };

    render() {
        let events = this.wrapEvents(true);
        return (
            <div
                className={getClass(
                    'Spinner', this.props.className, {
                        'Spinner-centered': this.props.centered,
                        'Spinner-visible': this.props.visible
                    }
                )}
                 style={this.props.style}
                 {...events}
            ></div>
        );
    }

}


module.exports = Spinner;

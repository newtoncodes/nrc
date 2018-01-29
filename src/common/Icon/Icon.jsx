'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');

require('./Icon.less');
require('./styles/FontAwesome.less');

const Prefixes = {
    'FontAwesome': 'fa fa-'
};

@pure
@bind
class Icon extends Component {
    @pure static propTypes = {
        className: React.PropTypes.string,
        library: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        style: React.PropTypes.object
    };

    static defaultProps = {
        className: '',
        library: 'FontAwesome',
        name: null,
        style: {}
    };

    render() {
        return (
            <i
                className={
                    getClass(
                        'Icon', this.props.className, Prefixes[this.props.library] + this.props.name
                    )}
               style={this.props.style}
            ></i>
        );
    }
}


module.exports = Icon;

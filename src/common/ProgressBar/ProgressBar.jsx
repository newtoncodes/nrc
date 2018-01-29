'use strict';

const React = require('react');
const classNames = require('classnames');
const {Component, bind, pure, getClass} = require('../../Component');
require('./ProgressBar.less');

@pure
@bind
class ProgressBar extends Component {
    @pure static propTypes = {
        className: React.PropTypes.string,
        label: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
        progress: React.PropTypes.number,
        style: React.PropTypes.object
    };

    static defaultProps = {
        className: '',
        label: true,
        progress: 0,
        style: {}
    };

    render() {
        let events = this.wrapEvents(true);
        let progress = Math.max(0, Math.min(this.props.progress, 100));

        let label = this.props.label;
        if (label === true) label = <div className="ProgressBar-label">{this.props.progress + '%'}</div>;
        if (typeof label === 'string') label = <div className="ProgressBar-label">{label.replace(/%/, this.props.progress + '%')}</div>;

        return (
            <div
                className={getClass(
                    'ProgressBar', this.props.className
                )}
                style={this.props.style}
                 {...events}
            >
                <div className="ProgressBar-bar" style={{width: progress + '%'}}>
                    {label}
                </div>
            </div>
        );
    }
}


module.exports = ProgressBar;

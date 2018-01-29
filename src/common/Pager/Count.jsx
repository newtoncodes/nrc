'use strict';

const React = require('react');
const {Component, bind, pure} = require('../../Component');

@pure
@bind
class Count extends Component {

    @pure static propTypes = {
        type: React.PropTypes.oneOf(['pages', 'page', 'limit', 'total', 'shown', 'start', 'end']),
        pages: React.PropTypes.number,
        page: React.PropTypes.number,
        limit: React.PropTypes.number,
        total: React.PropTypes.number,
        shown: React.PropTypes.number,
        start: React.PropTypes.number,
        end: React.PropTypes.number
    };

    render() {
        return (
            <div className={'Pager-count Pager-count-' + this.props.type + ' ' + this.props.className} style={this.props.style}>{this.props[this.props.type]}</div>
        );
    }
}


module.exports = Count;
module.exports.Pages = React.createClass({
    render() {
        return <div className={'Pager-count Pager-count-pages ' + this.props.className} style={this.props.style}>{this.props.pages}</div>;
    }
});

module.exports.Page = React.createClass({
    render() {
        return <div className={'Pager-count Pager-count-page ' + this.props.className} style={this.props.style}>{this.props.page}</div>;
    }
});

module.exports.Limit = React.createClass({
    render() {
        return <div className={'Pager-count Pager-count-limit ' + this.props.className} style={this.props.style}>{this.props.limit}</div>;
    }
});

module.exports.Total = React.createClass({
    render() {
        return <div className={'Pager-count Pager-count-total ' + this.props.className} style={this.props.style}>{this.props.total}</div>;
    }
});

module.exports.Shown = React.createClass({
    render() {
        return <div className={'Pager-count Pager-count-shown ' + this.props.className} style={this.props.style}>{this.props.shown}</div>;
    }
});

module.exports.Start = React.createClass({
    render() {
        return <div className={'Pager-count Pager-count-start ' + this.props.className} style={this.props.style}>{this.props.start}</div>;
    }
});

module.exports.End = React.createClass({
    render() {
        return <div className={'Pager-count Pager-count-end ' + this.props.className} style={this.props.style}>{this.props.end}</div>;
    }
});

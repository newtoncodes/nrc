'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');
const Buttons = require('./Buttons.jsx');
const Limit = require('./Limit.jsx');
const Jumper = require('./Jumper.jsx');
const Count = require('./Count.jsx');

require('./Pager.less');

@pure
@bind
class Pager extends Component {

    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure style: React.PropTypes.object,
        @pure count: React.PropTypes.number,
        @pure limits: React.PropTypes.array,
        @pure limit: React.PropTypes.number,
        @pure defaultLimit: React.PropTypes.number,
        @pure page: React.PropTypes.number,
        @pure defaultPage: React.PropTypes.number,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        style: {},

        count: 0,
        limits: [],

        limit: null,
        defaultLimit: 10,

        page: null,
        defaultPage: 1
    };

    constructor(props) {
        super(props);

        let page = (props.page !== null ? props.page : props.defaultPage) || 1;
        let limit = (props.limit !== null ? props.limit : props.defaultLimit) || 10;

        this.state = Object.assign({
            page: 1,
            limit: 10,
            count: 0,
            pages: 1
        }, this._calcState(props, page, limit));
    }

    componentWillReceiveProps(nextProps) {
        let page = (nextProps.page !== null ? nextProps.page : this.state.page) || 1;
        let limit = (nextProps.limit !== null ? nextProps.limit : this.state.limit) || 10;
        this.setState(this._calcState(nextProps, page, limit));
    }

    render() {
        let children = this.props.children;
        if (!children) children = [<Buttons />];
        children = this._mapChildren(children);

        return (
            <div className={'Pager ' + this.props.className} style={this.props.style}>{children}</div>
        );
    }

    _calcState(props, page, limit) {
        if (props.limits.indexOf(limit) === -1) limit = props.limits[0] || 10;

        let count = props.count || 0;
        let pages = Math.ceil(count / limit);
        if (page < 1) page = 1;
        if (page > pages) page = pages;

        let start = (page - 1) * limit;
        let end = Math.min(count - 1, start + limit - 1);

        return {
            page: page,
            pages: pages,
            count: count,
            limit: limit,
            start: start,
            end: end
        };
    }

    _changeHandler(page, limit) {
        if (page === this.state.page && limit === this.state.limit) return;

        let state = this._calcState(this.props, page, limit);
        if (this.props.page === null) this.setState(state);

        this.emit('change', state, this);

    }

    _buttonClickHandler(page) {
        this._changeHandler(page, this.state.limit);
    }

    _jumperChangeHandler(page) {
        this._changeHandler(page, this.state.limit);
    }

    _limitChangeHandler(limit) {
        this._changeHandler(this.state.page, limit);
    }

    _mapChildren(children) {
        return React.Children.map(children,(child) => {
            if (!child) {
                return null;
            }

            if (child.type === Buttons) {
                return React.cloneElement(child, {
                    page: this.state.page,
                    pages: this.state.pages,
                    onClick: this._buttonClickHandler
                });
            } else if (child.type === Jumper) {
                return React.cloneElement(child, {
                    page: this.state.page,
                    pages: this.state.pages,
                    onChange: this._jumperChangeHandler
                });
            } else if (child.type === Limit) {
                return React.cloneElement(child, {
                    limit: this.state.limit,
                    options: this.props.limits,
                    onChange: this._limitChangeHandler
                });
            } else if (
                child.type === Count ||
                child.type === Count.Pages ||
                child.type === Count.Page ||
                child.type === Count.Limit ||
                child.type === Count.Total ||
                child.type === Count.Shown ||
                child.type === Count.Start ||
                child.type === Count.End
            ) {
                return React.cloneElement(child, {
                    pages: this.state.pages,
                    page: this.state.page,
                    limit: this.state.limit,
                    total: this.state.count,
                    shown: this.state.end - this.state.start + 1,
                    start: this.state.start,
                    end: this.state.end
                });
            } else {
                if (child.props && child.props.children) return React.cloneElement(child, {
                    children: this._mapChildren(child.props.children)
                });
                else return child;
            }
        }, this);
    }
}


module.exports = Pager;
module.exports.Buttons = Buttons;
module.exports.Limit = Limit;
module.exports.Jumper = Jumper;
module.exports.Count = Count;

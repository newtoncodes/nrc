'use strict';

const React = require('react');
const Icon = require('../../common/Icon');
const {Component, bind, pure} = require('../../Component');

@pure
@bind
class Buttons extends Component {

    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure style: React.PropTypes.object,
        @pure page: React.PropTypes.number,
        @pure pages: React.PropTypes.number,
        @pure split: React.PropTypes.number,
        onClick: React.PropTypes.func
    };

    static defaultProps = {
            className: '',
            style: {},
            page: 1,
            pages: 1,
            split: 9
    };

    render() {
        let count = this.props.pages;
        let page = this.props.page;
        let split = this.props.split;
        if (split % 2 === 0) split += 1;
        let offset = Math.round((split - 5) / 2);
        let pages = [];
        let prev = null;
        let next = null;
        let first = null;
        let last = null;
        let i;

        if (count <= split) {
            for (i = 1; i <= count; i++) pages.push(this._renderButton(i, page === i));
        }

        else {
            prev = (<li key="prev" className={'Pager-button Pager-buttons-group-prev'} onClick={this._prevGroupHandler}>
                        <Icon className="angle" name="angle-double-left"/>
                        <Icon className="ellipsis" name="ellipsis-h"/>
                    </li>);
            next = (<li key="next" className={'Pager-button Pager-buttons-group-next'} onClick={this._nextGroupHandler}>
                        <Icon className="angle" name="angle-double-right"/>
                        <Icon className="ellipsis" name="ellipsis-h"/>
                    </li>);

            first = this._renderButton(1, false);
            last = this._renderButton(count, false);

            let left = Math.max(1, page - offset);
            let right = Math.min(page + offset, count);

            if (page - 1 <= offset) right = 1 + split - 5;
            if (count - page <= offset) left = count - split + 5;

            for (i = left; i <= right; i++) pages.push(this._renderButton(i, page === i));

            if (page - 1 >= Math.round((split - 1) / 2)) pages.unshift(prev);
            if (count - page >= Math.round((split - 1) / 2)) pages.push(next);

            if (left !== 1) pages.unshift(first);
            if (right !== count) pages.push(last);
        }

        return (
            <ul className={'Pager-buttons ' + this.props.className} style={this.props.style}>
                <li onClick={this._prevHandler} className={'Pager-button Pager-buttons-prev' + (this.props.page === 1 ? ' Pager-buttons-disabled' : '')}>
                    <Icon name="angle-left" />
                </li>
                {pages}
                <li onClick={this._nextHandler} className={'Pager-button Pager-buttons-next' + (this.props.page === this.props.pages ? ' Pager-buttons-disabled' : '')}>
                    <Icon name="angle-right"/>
                </li>
            </ul>
        );
    }

    _renderButton(page, active) {
        return (
            <li key={'page-' + page} className={'Pager-button Pager-buttons-page' + (active ? ' Pager-buttons-page-active' : '')} onClick={this._pageHandler.bind(this, page)}>
                <span>{page}</span>
            </li>
        );
    }

    _prevHandler() {
        this._pageHandler(this.props.page - 1);
    }

    _nextHandler() {
        this._pageHandler(this.props.page + 1);
    }

    _prevGroupHandler() {
        let split = this.props.split;
        if (split % 2 === 0) split += 1;
        this._pageHandler(Math.max(1, this.props.page - split + 4));
    }

    _nextGroupHandler() {
        let split = this.props.split;
        if (split % 2 === 0) split += 1;
        this._pageHandler(Math.min(this.props.pages, this.props.page + split - 4));
    }

    _pageHandler(page) {
        if (page < 1) page = 1;
        if (page > this.props.pages) page = this.props.pages;

        this.emit('click', page);
    }
}


module.exports = Buttons;

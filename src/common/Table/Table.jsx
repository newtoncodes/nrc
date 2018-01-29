'use strict';

const React = require('react');
const dom = require('ndom');
const {Component, bind, pure, getClass} = require('../../Component');

const Pager = require('../Pager');
const Column = require('./Column');

require('./Table.less');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);


@pure
@bind
class Table extends Component {
    static propTypes = {
        rowClassName: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        style: {},

        columns: [],

        data: [],
        href: null,
        dataProvider: null,

        sorting: true,
        sortingMulti: true,
        sort: null,
        defaultSort: [],

        paging: true,
        limits: null,
        page: null,
        defaultPage: 1,
        limit: null,
        defaultLimit: 10,
        noDataMessage: null,

        rowClassName: null
    };

    constructor(props) {
        super(props);

        let page = (props.page !== null ? props.page : props.defaultPage) || 1;
        let limit = (props.limit !== null ? props.limit : props.defaultLimit) || 10;
        let sort = (props.sort !== null ? props.sort : props.defaultSort) || [];
        if (!Array.isArray(sort)) sort = [sort];

        this.state = Object.assign({
            columns: {},

            sort: [],

            page: 1,
            start: 0,
            limit: Infinity,
            count: Infinity,

            data: []
        }, this._setup(props, sort, page, limit));
    }

    componentDidMount() {
        if (isBrowser) dom(window).on('resize', this._windowResizeHandler);
        this._updateWidth();
        //this._updateData();
    }

    componentWillReceiveProps(nextProps) {
        let page = (nextProps.page !== null ? nextProps.page : this.state.page) || 1;
        let limit = (nextProps.limit !== null ? nextProps.limit : this.state.limit) || 10;
        let sort = (nextProps.sort !== null ? nextProps.sort : this.state.sort) || [];
        if (!Array.isArray(sort)) sort = [sort];

        this.setState(this._setup(nextProps, sort, page, limit));
    }

    //noinspection JSUnusedLocalSymbols,JSUnusedLocalSymbols
    componentDidUpdate(prevProps, prevState) {
        this._updateWidth();
        //this._updateData();

        // Update data if prevState was different
    }

    componentWillUnmount() {
        if (isBrowser) dom(window).off('resize', this._windowResizeHandler);
    }

    render() {
        let events = this.wrapEvents(true, ['onClick']);
        let data = this.state.data;
        let dataLength = data.length;
        let columns = Object.keys(this.state.columns).map((key) => {
            return this.state.columns[key];
        });

        return (
            <div
                className={getClass(
                    'Table', this.props.className
                )}
                 onClick={this._tableClickHandler} ref="container" style={this.props.style}
                 {...events}
            >
                <div className="Table-header">
                    <table ref="headerTable" style={{float: 'left'}}>
                        <thead>
                        <tr>{columns.map(this._renderHeader)}</tr>
                        </thead>
                    </table>
                    <div className="Table-header-padding" ref="headerPadding" style={{float: 'left'}}></div>
                    <div style={{clear: 'both'}}></div>
                </div>
                <div className="Table-body" ref="body">
                    <table ref="bodyTable" style={{height: dataLength ? null : '100%'}}>
                        <colgroup>{columns.map(function (column, i) {
                            return <col ref={'col-' + i} key={i} data-index={i + ''} data-width={column.width}/>;
                        })}</colgroup>
                        <thead ref="bodyThead">
                        <tr>{columns.map(this._renderFakeHeader)}</tr>
                        </thead>
                        <tbody>{dataLength ? data.map(this._renderRow) : this._renderNoDataRow()}</tbody>
                    </table>
                </div>
                {this.props.paging ? (
                    <div className="Table-footer">
                        <Pager count={this.state.count} limits={this.props.limits ? this.props.limits : [this.state.limit]} limit={this.state.limit} page={this.state.page} onChange={this._pageChangeHandler} children={this.props.children}/>
                    </div>
                ) : null}
            </div>
        );
    }

    _setup(props, sort, page, limit) {
        let columns = {};

        if (!props.sorting && !props.sortingMulti) sort = [];
        if (sort.length > 1 && !props.sortingMulti) sort = [sort[0]];
        if (!props.paging) page = 1;

        props.columns.forEach((column) => {
            columns[column.key] = new Column(column.key, column.header, column.width, column.sorting, column.render, column.sort, column.className);
        });

        sort.forEach((s) => {
            if (!columns[s.key]) return;
            columns[s.key].sorted = s.type.toLowerCase();
        });

        if (props.limits && props.limits.indexOf(limit) === -1) limit = props.limits[0] || 10;

        let count = props.data ? props.data.length : 0;
        let pages = Math.ceil(count / limit);
        if (page < 1) page = 1;
        if (page > pages) page = pages;
        let start = (page - 1) * limit;

        let state = {
            columns: columns,
            count: count,
            sort: sort,
            page: page,
            limit: limit,
            start: start
        };

        if (props.data) {
            state.data = this._normalizeData(columns, props.data, sort, page, start, limit, count);
        }

        return state;
    }

    //noinspection JSUnusedLocalSymbols
    _normalizeData(columns, data, sort, page, start, limit, count) {
        data = this._sortData(data, columns, sort);
        data = this._sliceData(data, start, limit, count);
        return data;
    }

    _sorter(columns, sort, depth, row1, row2) {
        sort = sort[depth];
        let column = columns[sort.key];

        let diff = column.sort(row1, row2);
        if (sort.type.toLowerCase() === 'desc') diff *= -1;

        if (!diff && sort.length > depth + 1) return this._sorter(columns, sort, depth + 1, row1, row2);
        return diff;
    }

    _sortData(data, columns, sort) {
        if (!sort || !sort[0]) return data;

        let sorted = [].concat(data);
        sorted.sort(this._sorter.bind(this, columns, sort, 0));

        return sorted;
    }

    _sliceData(data, start, limit, count) {
        return data.slice(start, Math.min(count, start + limit));
    }

    _updateWidth() {
        this.refs['bodyThead'].style.display = 'table-header-group';
        this.refs['body'].style.width = '';
        this.refs['bodyTable'].style.width = '';

        this.props.columns.forEach((column, i) => {
            this.refs['col-' + i].style.width = '';
            let width = this.refs['col-' + i].dataset['width'];
            if (width) this.refs['col-' + i].style.width = width;
        });

        let width = dom(this.refs['container']).size.width;
        let contentWidth = dom(this.refs['bodyTable']).size.width;
        if (contentWidth > width) width = contentWidth;

        this.refs['body'].style.width = width + 'px';

        let paddingWidth = width - contentWidth;
        this.refs['headerPadding'].style.width = paddingWidth + 'px';

        this.refs['headerTable'].style.width = contentWidth + 'px';
        this.props.columns.forEach((column, i) => {
            this.refs['header-' + i].style.width = dom(this.refs['fake-header-' + i]).size.width + 'px';
            this.refs['col-' + i].style.width = dom(this.refs['fake-header-' + i]).size.width + 'px';
        });

        this.refs['headerPadding'].style.height = paddingWidth ? dom(this.refs['headerTable']).size.height + 'px' : '0px';

        this.refs['bodyThead'].style.display = 'none';
    }

    //noinspection JSUnusedLocalSymbols,JSUnusedLocalSymbols
    _headerClickHandler(column, i, e) {
        this.toggleSort(column.key);
    }

    _tableClickHandler(e) {
        this.props.onClick && this.props.onClick(e);
        this.emit('click', e);
    }

    _rowClickHandler(data, e) {
        this.emit('rowClick', e, data);
    }

    _rowMouseOverHandler(data, e) {
        this.emit('rowMouseOver', e, data);
    }

    _rowMouseOutHandler(data, e) {
        this.emit('rowMouseOut', e, data);
    }

    _cellClickHandler(e) {
        this.emit('click', e);
    }

    _windowResizeHandler() {
        this._updateWidth();
    }

    _pageChangeHandler(pager) {
        let page = pager.page;
        let limit = pager.limit;

        if (this.props.limits && this.props.limits.indexOf(limit) === -1) limit = this.props.limits[0] || 10;

        let count = this.props.data ? this.props.data.length : 0;
        let pages = Math.ceil(count / limit);
        if (page < 1) page = 1;
        if (page > pages) page = pages;
        let start = (page - 1) * limit;

        let state = {
            page: page,
            limit: limit,
            start: start
        };

        if (this.props.data) {
            state.data = this._normalizeData(
                this.state.columns,
                this.props.data,
                this.state.sort,
                page,
                start,
                limit,
                count
            );
        }

        this.setState(state);
    }

    _renderHeader(column, i) {

        return (
            <th ref={'header-' + i}
                key={'header-' + i}
                className={getClass(
                    {
                        'Table-cell-first': 0 === i,
                        'Table-cell-last': this.props.columns.length === i + 1,
                        'Table-cell-sortable': (column.sorting && (this.props.sorting || this.props.sortingMulti)),
                        'Table-cell-sorted-asc': column.sorted === 'asc' && (this.props.sorting || this.props.sortingMulti),
                        'Table-cell-sorted-desc': column.sorted === 'desc' && (this.props.sorting || this.props.sortingMulti)
                    }, column.className
                )}
                onClick={this._headerClickHandler.bind(this, column, i)}>{column.header}</th>
        )
    }

    _renderFakeHeader(column, i) {

        return (
            <th ref={'fake-header-' + i}
                key={'header-' + i}
                className={getClass(
                    {
                        'Table-cell-first': 0 === i,
                        'Table-cell-last': this.props.columns.length === i + 1,
                        'Table-cell-sorted-asc': column.sorted === 'asc' && (this.props.sorting || this.props.sortingMulti),
                        'Table-cell-sorted-desc': column.sorted === 'desc' && (this.props.sorting || this.props.sortingMulti)
                    }, column.className
                )}>{column.header}</th>
        )
    }

    _renderRow(data, i) {
        let cells = [];
        let columns = this.state.columns;

        Object.keys(columns).forEach((key, i) => {
            let column = columns[key];
            let cell = data.hasOwnProperty(key) ? data[key] : null;
            cell = column.render(cell, data, column.key);

            cells.push(<td key={'cell-' + i} className={getClass({
                'Table-cell-first': 0 === i,
                'Table-cell-last': this.props.columns.length === i + 1,
                'Table-cell-sorted': !!column.sorted && (this.props.sorting || this.props.sortingMulti)
            }, column.className)} onClick={this._cellClickHandler} data-key={column.key} data-index={i + ''}>{cell}</td>);
        });

        let className = (this.props.rowClassName) ? this.props.rowClassName(data) : null;

        return <tr
            className={className}
            onClick={this._rowClickHandler.bind(this, data)}
            onMouseOver={this._rowMouseOverHandler.bind(this, data)}
            onMouseOut={this._rowMouseOutHandler.bind(this, data)}

            key={'row-' + i}
        >{cells}</tr>;
    }

    _renderNoDataRow() {
        if (this.props.noDataMessage) {
            return <tr><td className="no-data" colSpan={Object.keys(this.state.columns).length}>{this.props.noDataMessage}</td></tr>;
        }

        return null;
    }

    setSort(key, type) {
        if (!this.props.sorting && !this.props.sortingMulti) return;
        if (this.props.sort) return;

        let columns = this.state.columns;
        let sort = this.state.sort;
        if (!this.props.sortingMulti) {
            //noinspection JSUnusedLocalSymbols
            sort.forEach((s, i) => {
                if (columns[s.key]) columns[s.key].sorted = false;
            });
            sort = [];
        }

        let column = columns[key];
        if (!column || !column.sorting) return;

        if (column.sorted === type) return;

        column.sorted = type;

        let found = false;
        sort.forEach((s, i) => {
            if (s.key === key) {
                found = true;
                if (type) s.type = type;
                else sort.splice(i, 1);
                return false;
            }
        });

        if (type && !found) sort.push({key: key, type: type});

        let state = {
            columns: columns,
            sort: sort
        };

        if (this.props.data) {
            state.data = this._normalizeData(
                columns,
                this.props.data,
                sort,
                this.state.page,
                this.state.start,
                this.state.limit,
                this.state.count
            );
        }

        this.setState(state);
    }

    toggleSort(key) {
        let column = this.state.columns[key];
        if (!column) return;

        if (column.sorted === 'asc') this.setSort(key, 'desc');
        else if (column.sorted === 'desc') this.setSort(key, null);
        else this.setSort(key, 'asc');
    }
}


module.exports = Table;

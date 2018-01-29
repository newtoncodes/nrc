 'use strict';

const React = require('react');
const {Component, bind, pure} = require('../../Component');

@pure
@bind
class Table extends Component {

    @pure static defaultProps = {
        className: '',
        style: {},

        data: [],
        href: null,
        dataProvider: null
    };

    render() {
        let data = this.props.data;
        let nameKey = this.props.nameKey || null;
        let reversed = this.props.reversed || false;

        let keys = this.props.keys;
        if (!keys) {
            keys = [];

            if (data[0]) for (let key in data[0]) {
                if (!data[0].hasOwnProperty(key) || key === nameKey) continue;
                keys.push(key);
            }
        }

        let className = 'table';
        if (nameKey) className += '-keys';

        if (reversed) return (
            <table className={className + '-reversed'}>
                <thead>
                    {nameKey ?
                        <tr>
                            <th>&nbsp;</th>
                            {data.map((column, i) => {
                                return <th key={'th-' + i}>{column[nameKey]}</th>
                            })}
                        </tr> :
                    null}
                </thead>
                <tbody>
                    {keys.map((key) => {
                        return (
                            <tr key={'tr-' + key}>
                                <th>{key}</th>

                                {data.map((column, i) => {
                                    return <td key={'td-' + i}>{column[key]}</td>
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );

        else return (
            <table className={className}>
                <thead>
                    <tr>
                        {nameKey ? <th>&nbsp;</th> : null}
                        {keys.map((key) => {
                            return <th key={'th-' + key}>{key}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => {
                        return (
                            <tr key={'tr-' + i}>
                                {nameKey ? <th>{row[nameKey]}</th> : null}
                                {keys.map((key) => {
                                    return <td key={'td-' + key}>{row[key]}</td>
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}


module.exports = Table;

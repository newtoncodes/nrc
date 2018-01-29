'use strict';

var React = require('react');
var Table = require('../../../src/common/Table/Table.jsx');


class Demo extends React.Component {

    render() {
        return (
            <div>
                <Table
                    columns={[{
                        header: 'K1',
                        key: 'k1',
                        width: '10%',
                        sorting: false
                    }, {
                        header: 'K2',
                        key: 'k2',
                        width: '10%'
                    }, {
                        header: <em>key 3</em>,
                        key: 'k3',
                        width: '10%',
                    }, {
                        header: <b>WTF!</b>,
                        key: 'k4',
                        width: '10%'
                    }, {
                        header: 'No key',
                        key: 'nokey',
                        width: '10%',
                        render: function (cell, row, key) {
                            return <b>{row.k1 + row.k2}</b>;
                        },
                        sort: function (row1, row2) {
                            return (row1.k1 + row1.k2) - (row2.k1 + row2.k2);
                        }
                    }]}

                    paging={true}
                    sorting={true}
                    sortingMulti={false}

                    //limit={5}
                    defaultLimit={5}

                    //page={2}
                    defaultPage={12}

                    //sort={[{key: 'k2', type: 'desc'}]}
                    defaultSort={[{key: 'k2', type: 'desc'}]}

                    onRowClick={(e, row) => {
                        console.log('click', e, row);
                    }}

                    onRowMouseOver={(e, row) => {
                        console.log('over', e, row);
                    }}

                    onRowMouseOut={(e, row) => {
                        console.log('out', e, row);
                    }}

                    rowClassName={(data) => 'row-class-name-' + data.k1}

                    data={[
                        {k1: 1, k2: 1, k3: 1, k4: 1},
                        {k1: 1, k2: 2, k3: 1, k4: 1},
                        {k1: 1, k2: 3, k3: 1, k4: 1},
                        {k1: 1, k2: 4, k3: 1, k4: 1},
                        {k1: 1, k2: 5, k3: 1, k4: 1},
                        {k1: 1, k2: 6, k3: 1, k4: 1},
                        {k1: 1, k2: 0, k3: 1, k4: 1},
                        {k1: 1, k2: 7, k3: 1, k4: 1},
                        {k1: 1, k2: 8, k3: 1, k4: 1},
                        {k1: 1, k2: 9, k3: 1, k4: 1},
                        {k1: 1, k2: 10, k3: 1, k4: 1},
                        {k1: 1, k2: 11, k3: 1, k4: 1},
                        {k1: 1, k2: 12, k3: 1, k4: 1},
                        {k1: 1, k2: 13, k3: 1, k4: 1},
                        {k1: 1, k2: 14, k3: 1, k4: 1},
                        {k1: 1, k2: 15, k3: 1, k4: 1},
                        {k1: 1, k2: 16, k3: 1, k4: 1},
                        {k1: 1, k2: 17, k3: 1, k4: 1},
                        {k1: 1, k2: 18, k3: 1, k4: 1},
                        {k1: 1, k2: 19, k3: 1, k4: 1},
                        {k1: 1, k2: 20, k3: 1, k4: 1},
                        {k1: 1, k2: 1, k3: 1, k4: 1},
                        {k1: 1, k2: 2, k3: 1, k4: 1},
                        {k1: 1, k2: 3, k3: 1, k4: 1},
                        {k1: 1, k2: 4, k3: 1, k4: 1},
                        {k1: 1, k2: 5, k3: 1, k4: 1},
                        {k1: 1, k2: 6, k3: 1, k4: 1},
                        {k1: 1, k2: 0, k3: 1, k4: 1},
                        {k1: 1, k2: 7, k3: 1, k4: 1},
                        {k1: 1, k2: 8, k3: 1, k4: 1},
                        {k1: 1, k2: 9, k3: 1, k4: 1},
                        {k1: 1, k2: 10, k3: 1, k4: 1},
                        {k1: 1, k2: 11, k3: 1, k4: 1},
                        {k1: 1, k2: 12, k3: 1, k4: 1},
                        {k1: 1, k2: 13, k3: 1, k4: 1},
                        {k1: 1, k2: 14, k3: 1, k4: 1},
                        {k1: 1, k2: 15, k3: 1, k4: 1},
                        {k1: 1, k2: 16, k3: 1, k4: 1},
                        {k1: 1, k2: 17, k3: 1, k4: 1},
                        {k1: 1, k2: 18, k3: 1, k4: 1},
                        {k1: 1, k2: 19, k3: 1, k4: 1},
                        {k1: 1, k2: 20, k3: 1, k4: 1},
                        {k1: 1, k2: 1, k3: 1, k4: 1},
                        {k1: 1, k2: 2, k3: 1, k4: 1},
                        {k1: 1, k2: 3, k3: 1, k4: 1},
                        {k1: 1, k2: 4, k3: 1, k4: 1},
                        {k1: 1, k2: 5, k3: 1, k4: 1},
                        {k1: 1, k2: 6, k3: 1, k4: 1},
                        {k1: 1, k2: 0, k3: 1, k4: 1},
                        {k1: 1, k2: 7, k3: 1, k4: 1},
                        {k1: 1, k2: 8, k3: 1, k4: 1},
                        {k1: 1, k2: 9, k3: 1, k4: 1},
                        {k1: 1, k2: 10, k3: 1, k4: 1},
                        {k1: 1, k2: 11, k3: 1, k4: 1},
                        {k1: 1, k2: 12, k3: 1, k4: 1},
                        {k1: 1, k2: 13, k3: 1, k4: 1},
                        {k1: 1, k2: 14, k3: 1, k4: 1},
                        {k1: 1, k2: 15, k3: 1, k4: 1},
                        {k1: 1, k2: 16, k3: 1, k4: 1},
                        {k1: 1, k2: 17, k3: 1, k4: 1},
                        {k1: 1, k2: 18, k3: 1, k4: 1},
                        {k1: 1, k2: 19, k3: 1, k4: 1},
                        {k1: 1, k2: 20, k3: 1, k4: 1},
                        {k1: 1, k2: 1, k3: 1, k4: 1},
                        {k1: 1, k2: 2, k3: 1, k4: 1},
                        {k1: 1, k2: 3, k3: 1, k4: 1},
                        {k1: 1, k2: 4, k3: 1, k4: 1},
                        {k1: 1, k2: 5, k3: 1, k4: 1},
                        {k1: 1, k2: 6, k3: 1, k4: 1},
                        {k1: 1, k2: 0, k3: 1, k4: 1},
                        {k1: 1, k2: 7, k3: 1, k4: 1},
                        {k1: 1, k2: 8, k3: 1, k4: 1},
                        {k1: 1, k2: 9, k3: 1, k4: 1},
                        {k1: 1, k2: 10, k3: 1, k4: 1},
                        {k1: 1, k2: 11, k3: 1, k4: 1},
                        {k1: 1, k2: 12, k3: 1, k4: 1},
                        {k1: 1, k2: 13, k3: 1, k4: 1},
                        {k1: 1, k2: 14, k3: 1, k4: 1},
                        {k1: 1, k2: 15, k3: 1, k4: 1},
                        {k1: 1, k2: 16, k3: 1, k4: 1},
                        {k1: 1, k2: 17, k3: 1, k4: 1},
                        {k1: 1, k2: 18, k3: 1, k4: 1},
                        {k1: 1, k2: 19, k3: 1, k4: 1},
                        {k1: 1, k2: 20, k3: 1, k4: 1}
                    ]}
                />
            </div>
        );
    }

}


module.exports = Demo;

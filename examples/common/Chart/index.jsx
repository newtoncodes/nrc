'use strict';

var React = require('react');
var Chart = require('../../../src/common/Chart/Chart.jsx');


class Demo extends React.Component {

    render() {
        var config = {
            chart: {
                polar: true
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [{
                type: 'pie',
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }]
        };

        return (
            <Chart config={config} />
        );
    }

}


module.exports = Demo;

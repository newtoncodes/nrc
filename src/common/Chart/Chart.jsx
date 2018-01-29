'use strict';

const React = require('react');
global.Highcharts = require('highcharts');
const HighchartsMore = require('highcharts-more');
HighchartsMore(global.Highcharts);
const {Component, bind, pure} = require('../../Component');

const ReactHighcharts = require('react-highcharts');

require('./Chart.less');

@pure
@bind
class Chart extends Component {

     @pure static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        config: React.PropTypes.object.isRequired
    };

    static defaultProps = {
        className: '',
        style: {}
    };

    render() {
        let events = this.wrapEvents(true);
        return (
            <div className={'Chart Chart-highcharts ' + this.props.className} style={this.props.style} {...events}>
                <ReactHighcharts config={this.props.config} />
            </div>
        );
    }

}

module.exports = Chart;

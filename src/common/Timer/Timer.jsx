'use strict';

require('./Timer.less');

const React = require('react');
const Moment = require('moment');
const {Component, bind, pure, getClass} = require('../../Component');


@pure
@bind
class Timer extends Component {
    static propTypes = {
        @pure timestamp: React.PropTypes.number.isRequired,
        format: React.PropTypes.func
    };

    static defaultProps = {
        timestamp: 0
    };

    _interval = null;

    constructor(props) {
        super(props);

        this.state = {
            text: _getText(props.timestamp, props.format)
        }
    }

    componentDidMount() {
        this._interval = setInterval(() => this.setState({text: _getText(this.props.timestamp, this.props.format)}), 1000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        return <div className="Timer">{this.state.text}</div>;
    }
}

function _getText(timestamp, format) {
    let text = '';

    if (format) text = format(parseInt(Math.floor(Date.now() / 1000) - timestamp));
    else text = Moment(timestamp * 1000).fromNow();

    return text;
}


module.exports = Timer;
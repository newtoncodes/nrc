'use strict';

const React = require('react');
const {Component, bind, pure} = require('../../Component');
const Select = require('../../controls/Select');

@pure
@bind
class Limit extends Component {

    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure style: React.PropTypes.object,
        @pure page: React.PropTypes.number,
        @pure pages: React.PropTypes.number,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        style: {},
        limit: 10,
        options: []
    };

    render() {
        return (
            <Select
                className={'Pager-limit'}
                style={this.props.style}

                clearButton={false}

                options={this.props.options.map((option) => {
                    return {label: option, value: option};
                })}

                selected={this.props.limit}
                onChange={this._changeHandler}
            />
        );
    }

    _changeHandler(option) {
        this.emit('change', option.value)
    }
}


module.exports = Limit;

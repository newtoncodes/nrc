'use strict';

const React = require('react');

const Select = require('../../controls/Select');
const {Component, bind, pure} = require('../../Component');

@pure
@bind
class Jumper extends Component {

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
            page: 1,
            pages: 1
    };

    render() {
        let options = [];
        for (let i = 1; i <= this.props.pages; i ++) options.push(i);

        return (
            <Select
                className={'Pager-jumper'}
                style={this.props.style}

                clearButton={false}

                options={options.map((option) => {
                    return {label: option, value: option};
                })}

                selected={this.props.page}
                onChange={this._changeHandler}
            />
        );
    }

    _changeHandler(option) {
        this.emit('change', option.value)
    }

}


module.exports = Jumper;

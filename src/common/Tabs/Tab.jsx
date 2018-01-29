'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');

@pure
@bind
class Tab extends Component {
    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure name: React.PropTypes.string.isRequired,
        @pure selected: React.PropTypes.bool,
        @pure style: React.PropTypes.object,
        onClick: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        selected: false,
        style: {}
    };

    constructor(props) {
        super(props);

        this._tab = null;
    }

    render() {
        let events = this.wrapEvents(true, ['onClick', 'onChange']);
        return (
            <div
                ref={tab => this._tab = tab}
                className={getClass(
                    'Tab', {
                        'Tab-selected': this.props.selected
                    }, this.props.className
                )}
                 style={this.props.style}
                 onClick={this._buttonClickHandler}
                 {...events}
            >
                {this.props.children}
            </div>
        );
    }

    _buttonClickHandler() {
        this.emit('click', this.getName(), this);
    }

    getName() {
        return this.props.name;
    }
}


module.exports = Tab;

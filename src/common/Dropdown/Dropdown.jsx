'use strict';

const React = require('react');
const dom = require('ndom');
const classnames = require('classnames');
const {Component, bind, pure, getClass} = require('../../Component');

require('./Dropdown.less');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);


@pure
@bind
class Dropdown extends Component {
    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure autoClose: React.PropTypes.bool,
        @pure label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),
        @pure trigger: React.PropTypes.oneOf(['click', 'hover']),
        @pure style: React.PropTypes.object,
        callback: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        label: '',
        trigger: 'hover',
        style: {},
        autoClose: false
    };

    constructor(props) {
        super(props);

        this.state = {
            shown: false
        }
    }

    componentWillUnmount() {
        if (isBrowser) dom(document).off('click', this._documentClickHandler);
    }

    render() {
        let events = this.wrapEvents(true, ['onMouseOver', 'onMouseOut', 'onClick']);
        return (
            <div
                className={
                    getClass(
                            'Dropdown', this.props.className, {
                                'Dropdown-open': this.state.shown
                            }
                    )}
                style={this.props.style}
                onMouseOver={this._mouseOverHandler}
                onMouseOut={this._mouseOutHandler}
                {...events}
            >
                <div className="label" onClick={this._clickHandler}>{this.props.label}</div>
                <div className="body" ref="dropdown">
                    {this.props.children}
                </div>
            </div>
        );
    }

    _clickHandler() {
        if (this.props.trigger !== 'click') return;
        if (this.state.shown === true) return;

        this.setState({shown: true});
        if (this.props.callback) this.props.callback({ open: true });

        dom(document).on('click', this._documentClickHandler);
    }

    _documentClickHandler(e) {
        if (!this.props.autoClose && dom(e.target).queryParents(this.refs.dropdown).length) return;

        this.setState({shown: false});
        if (this.props.callback) this.props.callback({ open: false });

        dom(document).off('click', this._documentClickHandler);
        this.emit('click', e);
    }

    _mouseOverHandler() {
        if (this.props.trigger !== 'hover') return;

        this.setState({shown: true});
        if (this.props.callback) this.props.callback({ open: true });
    }

    _mouseOutHandler() {
        if (this.props.trigger !== 'hover') return;

        this.setState({shown: false});
        if (this.props.callback) this.props.callback({ open: false });
    }
}


module.exports = Dropdown;

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Dom = require('ndom');
const {Component, bind, pure, getClass} = require('../../Component');

require('./Modal.less');


@pure
@bind
class Modal extends Component {
    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure style: React.PropTypes.object,
        @pure closeButton: React.PropTypes.bool,
        @pure closeOutside: React.PropTypes.bool,
        @pure open: React.PropTypes.bool,
        @pure header: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
        @pure footer: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
        onButton: React.PropTypes.func,
        onClose: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        style: {},
        closeButton: true,
        closeOutside: true,
        header: null,
        footer: null,
        open: false
    };

    constructor(props) {
        super(props);

        this._modal = null;
    }

    render() {
        let buttons = this.props.buttons;
        let header = this.props.header;
        let footer = this.props.footer;

        if (!buttons) buttons = [];
        if (!buttons.forEach) buttons = [buttons];
        buttons = buttons.map((button) => {
            return React.cloneElement(button, {
                onClick: this._buttonHandler.bind(this, button)
            });
        });

        return (
            <div className={getClass('Modal-overlay', this.props.className, {'Modal-open': this.props.open, 'Modal-closed': !this.props.open})}>
                <div
                    className={getClass('Modal', this.props.className, {'Modal-open': this.props.open})}
                    style={this.props.style}
                    ref={modal => this._modal = modal}
                >
                    {this.props.closeButton ? <a className="Modal-close" href="#" onClick={this._closeHandler}></a> : null}

                    {header ? <div className="Modal-header">{header}</div> : null}

                    <div className="Modal-body">{this.props.children}</div>

                    {((buttons && buttons.length) || footer) ? <div className="Modal-footer">
                        {footer}
                        {(buttons && buttons.length) ? <div className="Modal-buttons">{buttons}</div> : null}
                    </div> : null}
                </div>
            </div>
        );
    }

    _buttonHandler(button, e) {
        this.emit('button', button.key, e);
    }

    _closeHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.emit('close');
    }
}


module.exports = Modal;

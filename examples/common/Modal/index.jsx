'use strict';

var React = require('react');
var Modal = require('../../../src/common/Modal/Modal.jsx');


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open1: true
        };

        this._modal = null;
    }

    _openHandler1() {
        this.setState({
            open1: true
        })
    }

    _closeHandler1() {
        this.setState({
            open1: false
        })
    }

    render() {
        return (
            <div>

                <Modal ref={modal => this._modal = modal} style={{}} onClose={this._closeHandler1.bind(this)} open={this.state.open1}>
                    <h2>Hello</h2>

                    <div>I am a modal</div>

                </Modal>
                <button onClick={this._openHandler1.bind(this)}>Open</button>

            </div>
        );
    }

}


module.exports = Demo;

'use strict';

var React = require('react');
var Tooltip = require('../../../src/common/Tooltip/Tooltip.jsx');

class Demo extends React.Component {

    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Tooltip</h2>

                    <Tooltip content="Tooltip">
                        <a href="#">Hover me</a>
                    </Tooltip>
                </div>

                <div className="example">
                    <h2>Click / Focus Triggers</h2>

                    <Tooltip trigger="click" content="Tooltip">
                        <a href="#">Click me</a>
                    </Tooltip>

                    <br /><br />

                    <Tooltip trigger="focus" content="Tooltip" visible>
                        <input placeholder="Focus me" />
                    </Tooltip>
                </div>

                <div className="example">
                    <h2>Placement</h2>

                    <Tooltip content="Tooltip" placement="left">
                        <a href="#">Left</a>
                    </Tooltip><br />

                    <Tooltip content="Tooltip" placement="right">
                        <a href="#">Right</a>
                    </Tooltip><br />

                    <Tooltip content="Tooltip" placement="top">
                        <a href="#">Top</a>
                    </Tooltip><br />

                    <Tooltip content="Tooltip" placement="bottom">
                        <a href="#">Bottom</a>
                    </Tooltip><br />

                    <Tooltip content="Tooltip" placement="topLeft">
                        <a href="#">Top Left</a>
                    </Tooltip><br />

                    <Tooltip content="Tooltip" placement="topRight">
                        <a href="#">Top Right</a>
                    </Tooltip><br />

                    <Tooltip content="Tooltip" placement="bottomLeft">
                        <a href="#">Bottom Left</a>
                    </Tooltip><br />

                    <Tooltip content="Tooltip" placement="bottomRight">
                        <a href="#">Bottom Right</a>
                    </Tooltip>
                </div>
            </div>
        );
    }

}


module.exports = Demo;

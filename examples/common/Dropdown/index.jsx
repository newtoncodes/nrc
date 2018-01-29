'use strict';

var React = require('react');
var Dropdown = require('../../../src/common/Dropdown/Dropdown.jsx');
var Button = require('../../../src/common/Button/Button.jsx');


class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Dropdown (Hover Trigger)</h2>

                    <Dropdown label={<Button label="Dropdown (Hover) ▾" />}>
                        <a href="javascript: //">Profile</a>
                        <a href="javascript: //">Settings</a>
                        <a href="javascript: //">Sign Out</a>
                    </Dropdown>
                </div>

                <div className="example">
                    <h2>Basic Dropdown (Click Trigger)</h2>

                    <Dropdown label={<Button label="Dropdown (Click) ▾" />} trigger="click">
                        <a href="javascript: //">Profile</a>
                        <a href="javascript: //">Settings</a>
                        <a href="javascript: //">Sign Out</a>
                    </Dropdown>
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Dropdown className="custom-class"
                        style={{border: '1px solid red', padding: '10px 5px 5px 10px'}}
                        label={<Button label="Styled Dropdown ▾" />}
                    >
                        <a href="javascript: //">Profile</a>
                        <a href="javascript: //">Settings</a>
                        <a href="javascript: //">Sign Out</a>
                    </Dropdown>
                </div>
            </div>
        );
    }
}


module.exports = Demo;

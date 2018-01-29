'use strict';

var React = require('react');
var ControlGroup = require('../../../src/common/ControlGroup/ControlGroup.jsx');

var Button = require('../../../src/common/Button/Button.jsx');
var Input = require('./../../../src/controls/Input/Input.jsx');

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic ControlGroup (Buttons) + Vertical</h2>

                    <ControlGroup>
                        <Button label="Button 1" />
                        <Button label="Button 2" />
                        <Button label="Button 3" />
                    </ControlGroup>

                    <br /><br />

                    <ControlGroup vertical>
                        <Button label="Button 1" />
                        <Button label="Button 2" />
                        <Button label="Button 3" />
                    </ControlGroup>
                </div>

                <div className="example">
                    <h2>Basic ControlGroup (Inputs) + Vertical</h2>

                    <ControlGroup>
                        <Input name="input-1" defaultValue="Value 1" />
                        <Input name="input-2" defaultValue="Value 2" />
                    </ControlGroup>

                    <br /><br />

                    <ControlGroup vertical>
                        <Input name="input-1" defaultValue="Value 1"/>
                        <Input name="input-2" defaultValue="Value 2"/>
                    </ControlGroup>
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <ControlGroup className="custom-class" style={{border: '1px solid red', padding: '10px'}}>
                        <Button label="Button 1"/>
                        <Button label="Button 2"/>
                        <Button label="Button 3"/>
                    </ControlGroup>
                </div>
            </div>
        );
    }

}


module.exports = Demo;

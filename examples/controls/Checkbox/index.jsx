'use strict';

var React = require('react');
var Checkbox = require('../../../src/controls/Checkbox/Checkbox.jsx');

class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: true
        }
    }

    _checkboxChangeHandler(checked, value, event) {
        console.log('Checkbox checked:', checked);
        console.log('Checkbox value:', value);
    }

    _controlledCheckboxChangeHandler(value, checked, e) {
        this.setState({checked: checked});
    }

    render () {
        function asdasd() {

        }

        return (
            <div>
                <div className="example">
                    <h2>Basic Checkbox + Native</h2>

                    <Checkbox name="checkbox-1" label={<span>Checkbox 1</span>} value="on" /><br />
                    <Checkbox name="checkbox-2" label={<span>Checkbox 2</span>} value="on" />
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Checkbox className="custom-class" style={{color: 'red'}} name="checkbox-3" label={<span>Checkbox 1</span>} value="on" />
                </div>

                <div className="example">
                    <h2>Native Input</h2>

                    <Checkbox name="checkbox-4" label={<span>Checkbox 1</span>} value="on" native />
                </div>

                <div className="example">
                    <h2>Default Checked + Disabled + Readonly</h2>

                    <Checkbox name="checkbox-5" label={<span>Checked</span>} value="on" defaultChecked/><br />
                    <Checkbox name="checkbox-6" label={<span>Disabled</span>} value="on" disabled /><br />
                    <Checkbox name="checkbox-7" label={<span>Readonly</span>} value="on" readOnly /><br />
                </div>

                <div className="example">
                    <h2>onChange Callback</h2>

                    <Checkbox name="checkbox-8" label={<span>Checkbox with callback</span>} value="on" onChange={this._checkboxChangeHandler.bind(this)} />
                </div>

                <div className="example">
                    <h2>Controlled Checkbox</h2>

                    <Checkbox name="checkbox-9" label={<span>Controlled checkbox</span>} value="on" onChange={this._controlledCheckboxChangeHandler.bind(this)} checked={this.state.checked} />
                </div>
            </div>
        );
    }
}

function asd() {

}


module.exports = Demo;

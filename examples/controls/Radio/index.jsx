'use strict';

var React = require('react');
var Radio = require('../../../src/controls/Radio');
var RadioGroup = require('../../../src/controls/Radio/RadioGroup.jsx');


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: 'v1'
        }
    }

    _radioGroupChangeHandler(value) {
        console.log('Radio group value:', value);

    }

    _controlledRadioGroupChangeHandler (value) {
        this.setState({checked: value});
    }

    render () {
        return (
            <div>
                <div className="example">
                    <h2>Basic Radio Group</h2>

                    <RadioGroup name="radios-1">
                        <Radio name="radios-1" label={<span>Radio 1</span>} value="v1" /><br />
                        <Radio name="radios-1" label={<span>Radio 2</span>} value="v2" />
                    </RadioGroup>
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <RadioGroup className="styled" name="radios-2">
                        <Radio className="styled" style={{color: 'red'}} name="radios-2" label={<span>Radio 1</span>} value="v1" /><br />
                        <Radio className="styled" style={{color: 'green'}} name="radios-2" label={<span>Radio 2</span>} value="v2" />
                    </RadioGroup>
                </div>

                <div className="example">
                    <h2>Native Input</h2>

                    <RadioGroup name="radios-3">
                        <Radio name="radios-3" label={<span>Radio 1</span>} value="v1" native /><br />
                        <Radio name="radios-3" label={<span>Radio 2</span>} value="v2" native />
                    </RadioGroup>
                </div>

                <div className="example">
                    <h2>Default Checked + Disabled</h2>

                    <RadioGroup name="radios-4" defaultChecked="v1">
                        <Radio name="radios-4" label={<span>Checked</span>} value="v1" /><br />
                        <Radio name="radios-4" label={<span>Disabled</span>} value="v2" disabled /><br />
                        <Radio name="radios-4" label={<span>Readonly</span>} value="v3" readOnly />
                    </RadioGroup>
                </div>

                <div className="example">
                    <h2>onChange Callback</h2>

                    <RadioGroup name="radios-5" onChange={this._radioGroupChangeHandler.bind(this)}>
                        <Radio name="radios-5" label={<span>Radio 1</span>} value="v1" /><br />
                        <Radio name="radios-5" label={<span>Radio 2</span>} value="v2" />
                    </RadioGroup>
                </div>

                <div className="example">
                    <h2>Controlled Radio Group</h2>

                    <RadioGroup name="radios-6" checked={this.state.checked} onChange={this._controlledRadioGroupChangeHandler.bind(this)}>
                        <Radio name="radios-6" label={<span>Radio 1</span>} value="v1" /><br />
                        <Radio name="radios-6" label={<span>Radio 2</span>} value="v2" />
                    </RadioGroup>
                </div>

                <div className="example">
                    <h2>Alternative Syntax</h2>

                    <Radio.Group name="radios-7">
                        <Radio.Radio name="radios-7" label={<span>Radio 1</span>} value="v1" /><br />
                        <Radio.Radio name="radios-7" label={<span>Radio 2</span>} value="v2" />
                    </Radio.Group>
                </div>
            </div>
        );
    }
}


module.exports = Demo;

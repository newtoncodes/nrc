'use strict';

var React = require('react');
var Input = require('../../../src/controls/Input/Input.jsx');
var Button = require('../../../src/common/Button/Button.jsx');


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 'Controlled value'
        }
    }

    _inputChangeHandler(value, e) {
        console.log('Input value:', value);
    }

    _controlledInputChangeHandler(e) {
        this.setState({value: e.value});
    }

    render () {
        return (
            <div>
                <div className="example">
                    <h2>Basic Input</h2>

                    <Input name="input-1" placeholder="Input" />
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Input className="custom-class" style={{borderColor: 'red'}} name="input-2" placeholder="Input"/>
                </div>

                <div className="example">
                    <h2>Default Value + Disabled + Readonly + Max Length</h2>

                    <Input name="input-3" defaultValue="Default value" /><br />
                    <Input name="input-4" defaultValue="Disabled input" disabled /><br />
                    <Input name="input-5" defaultValue="Readonly input" readOnly /><br />
                    <Input name="input-6" placeholder="Max 20 characters" maxLength={20}/>
                </div>

                <div className="example">
                    <h2>Autofocus + Disabled Autocomplete</h2>

                    <Input name="input-7" placeholder="Auto focused input" autoFocus /><br />
                    <Input name="input-8" placeholder="Autocomplete off" autocomplete={false} />
                </div>

                <div className="example">
                    <h2>Password Input + Reveal Password Toggle</h2>

                    <Input name="input-9" type="password" defaultValue="password" /><br />
                    <Input name="input-10" type="password" passwordRevealButton={<Button label="Reveal" />} defaultValue="password" />
                </div>

                <div className="example">
                    <h2>Input + Accessories</h2>

                    <Input
                        name="input-11"
                        accessoriesLeft={[<strong>Label:</strong>]}
                        accessoriesRight={[<Button label="Button" />]}
                    />
                </div>

                <div className="example">
                    <h2>onChange + onFocus + onBlur</h2>

                    <Input
                        name="input-12"
                        onChange={this._inputChangeHandler.bind(this)}
                        onFocus={function() {console.log('focus');}}
                        onBlur={function() {console.log('blur');}}
                    />
                </div>

                <div className="example">
                    <h2>Controlled Input</h2>

                    <Input name="input-13" value={this.state.value} onChange={this._controlledInputChangeHandler.bind(this)} />
                </div>
            </div>
        );
    }

}


module.exports = Demo;

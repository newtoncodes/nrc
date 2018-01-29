'use strict';

var React = require('react');
var Button = require('../../../src/common/Button/Button.jsx');


class Demo extends React.Component {

    _buttonEventHandler(e) {
        console.log(e.type);
    }

    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Button Types + Disabled</h2>

                    <Button label="Link" href="https://google.com" target="_blank" /><br />
                    <Button label="This label is ignored because of the component children">
                        <span style={{fontWeight:'bold'}}>Bold text</span> + Normal Text
                    </Button><br />
                    <Button label="Normal button" /><br />
                    <Button label="Submit button" submit /><br />
                    <Button label="Reset button" reset /><br />
                    <Button label="Disabled button" disabled /><br />
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Button className="custom-class" style={{color: 'red'}} label="Button" />
                </div>

                <div className="example">
                    <h2>Icon and Label Combinations</h2>

                    <Button icon="edit" /><br />
                    <Button icon="edit" label="Close" /><br />
                    <Button label="Expand" icon="edit" />
                </div>

                <div className="example">
                    <h2>Sizes</h2>

                    <Button label="XS Button" size="xs" /><br />
                    <Button label="SM Button" size="sm" /><br />
                    <Button label="MD Button" size="md" /><br />
                    <Button label="LG Button" size="lg" /><br />
                    <Button label="XL Button" size="xl" />
                </div>

                <div className="example">
                    <h2>Skins</h2>

                    <Button label="Primary Button" skin="primary" /><br />
                    <Button label="Secondary Button" skin="secondary" />
                </div>

                <div className="example">
                    <h2>Events</h2>

                    <Button label="Click Event" onClick={this._buttonEventHandler.bind(this)} /><br />
                    <Button label="Mouse Move Event" onMouseMove={this._buttonEventHandler.bind(this)}/><br />
                    <Button label="Mouse Down Event" onMouseDown={this._buttonEventHandler.bind(this)} /><br />
                    <Button label="Mouse Up Event" onMouseUp={this._buttonEventHandler.bind(this)}/><br />
                    <Button label="Mouse Enter Event" onMouseEnter={this._buttonEventHandler.bind(this)} /><br />
                    <Button label="Mouse Leave Event" onMouseLeave={this._buttonEventHandler.bind(this)} /><br />
                    <Button label="Mouse Over Event" onMouseOver={this._buttonEventHandler.bind(this)} /><br />
                    <Button label="Mouse Out Event" onMouseOut={this._buttonEventHandler.bind(this)} />
                </div>
            </div>
        );
    }

}


module.exports = Demo;

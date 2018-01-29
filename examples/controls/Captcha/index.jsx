'use strict';

var React = require('react');
var Captcha = require('../../../src/controls/Captcha/Captcha.jsx');
var Button = require('../../../src/common/Button/Button.jsx');


class Demo extends React.Component {

    _captchaChangeHandler(e) {
        console.log(e);
    }

    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Captcha</h2>

                    <Captcha href="https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg" name="captcha-1" />
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Captcha
                        className="custom-class"
                        style={{border: '1px solid red', padding: '10px'}}
                        href="https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg"
                        name="captcha-2"
                    />
                </div>

                <div className="example">
                    <h2>Disabled + Readonly</h2>

                    <Captcha href="https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg" name="captcha-3" disabled /><br />
                    <Captcha href="https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg" name="captcha-4" readOnly />
                </div>

                <div className="example">
                    <h2>Refresh Button</h2>

                    <Captcha
                        href="https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg"
                        name="captcha-5"
                        refreshButton={<Button label="Refresh" />}
                    />
                </div>

                <div className="example">
                    <h2>onChange + onFocus + onBlur</h2>

                    <Captcha
                        href="https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg"
                        name="captcha-6"
                        onChange={this._captchaChangeHandler.bind(this)}
                        onFocus={function() {console.log('focus');}}
                        onBlur={function() {console.log('blur');}}
                    />
                </div>
            </div>
        );
    }
}

module.exports = Demo;

//
//

'use strict';

var React = require('react');
var Form = require('../../../src/controls/Form/Form.jsx');
var ExtendedForm = require('../../../src/controls/Form/ExtendedForm');

var Button = require('../../../src/common/Button');
var Checkbox = require('../../../src/controls/Checkbox/Checkbox');
var Input = require('../../../src/controls/Input/Input');
var Radio = require('../../../src/controls/Radio/Radio');
var Slider = require('../../../src/controls/Slider/Slider');
var Textarea = require('../../../src/controls/Textarea/Textarea');
var Captcha = require('../../../src/controls/Captcha/Captcha');

var ProgressBar = require('../../../src/common/ProgressBar');

class Demo extends  React.Component {
    _demoSubmitHandler(e) {
        console.log('submit');
    }

    _demoProgressHandler(type, loaded, total) {
        console.log('progress:', type, loaded, total);
    }

    _demoLoadHandler(error, result) {
        console.log('loaded:', error, result);
    }

    render () {
        return (
            <div>
                <div className="example">
                    <h2>Basic Form</h2>

                    <Form action="" onSubmit={this._demoSubmitHandler.bind(this)} onProgress={this._demoProgressHandler.bind(this)} onLoad={this._demoLoadHandler.bind(this)}>
                        <Input name="input" placeholder="Input" />
                        <br /><br />
                        <Checkbox label="Checkbox" name="checkbox" />
                        <br /><br />
                        <Radio.Group name="radios" defaultChecked="v1">
                            <Radio.Radio name="radios" label={<span>Radio 1</span>} value="v1" /><br />
                            <Radio.Radio name="radios" label={<span>Radio 2</span>} value="v2" />
                        </Radio.Group>
                        <br /><br />
                        <Slider name="slider" defaultValue={50} />
                        <br /><br />
                        <Textarea name="textarea" placeholder="Textarea" />
                        <br /><br />
                        <Captcha href="https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg" name="captcha" />
                        <br /><br />
                        <Button label="Submit" submit />
                    </Form>
                </div>

                <div className="example">
                    <h2>Extended Form</h2>

                    <ExtendedForm status="error" message="Error message">
                        <Input name="input" placeholder="Input" />
                    </ExtendedForm>
                </div>
            </div>
        );
    }
}


module.exports = Demo;

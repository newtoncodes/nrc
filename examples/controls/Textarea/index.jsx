'use strict';

var React = require('react');
var Textarea = require('../../../src/controls/Textarea/Textarea.jsx');


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 'Controlled value',
            onFocus: () => console.log('FOCUS'),
            onBlur: () => console.log('BLUR')
        }
    }

    _textareaChangeHandler(value) {
        console.log('Textarea value:', value);
    }

    _controlledTextareaChangeHandler(e) {
        this.setState({value: e.value});
    }

    componentDidMount() {
        let i = 1;

        setInterval(() => {
            this.setState({
                onFocus: () => console.log('FOCUS', i ++),

                onBlur: () => console.log('BLUR', i ++)
            });
        }, 3000);
    }

    render() {
        return (
            <div>
                <div className="example">
                    <h2>onChange + onFocus + onBlur</h2>

                    <br /><br /><br /><br /><br /><br />
                    <Textarea
                        name="textarea-9"
                        onChange={this._textareaChangeHandler.bind(this)}
                        onFocus={this.state.onFocus}
                        onBlur={this.state.onBlur}
                    /><br /><br /><br /><br /><br />
                </div>


                {/*
                 <div className="example">
                 <h2>Basic Textarea</h2>

                 <Textarea name="textarea-1" placeholder="Textarea" />
                 </div>

                 <div className="example">
                 <h2>Custom Class Name + Style Attribute</h2>

                 <Textarea className="custom-class" style={{border: '1px solid red', padding: '10px 10px 3px 10px'}} name="textarea-1" placeholder="Textarea" />
                 </div>

                 <div className="example">
                 <h2>Default Value + Disabled + Readonly + Max Length</h2>

                 <Textarea name="textarea-3" defaultValue="Default Value" /><br />
                 <Textarea name="textarea-4" defaultValue="Disabled" disabled /><br />
                 <Textarea name="textarea-5" defaultValue="Readonly" readOnly /><br />
                 <Textarea name="textarea-6" defaultValue="Max 20 chars" maxLength={20} />
                 </div>

                 <div className="example">
                 <h2>Autofocus + Autosize</h2>

                 <Textarea name="textarea-7" defaultValue="Autofocus" autoFocus /><br />
                 <Textarea name="textarea-8" defaultValue="Autosize" autoSize />
                 </div>

                 <div className="example">
                 <h2>Controlled Textarea</h2>

                 <Textarea onMouseOver={e => console.log('OVER')} name="textarea-10" value={this.state.value} onChange={this._controlledTextareaChangeHandler} />
                 </div>*/}
            </div>

        );
    }

}


module.exports = Demo;

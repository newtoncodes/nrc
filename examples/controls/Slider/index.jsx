'use strict';

var React = require('react');
var dom = require('ndom');
var Slider = require('../../../src/controls/Slider/Slider.jsx');


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 50
        }
    }

    _sliderChangeHandler(values, name) {
        dom('#values-' + name).html = values.join(', ');
    }

    _controlledSliderChangeHandler(values, name) {
        this.setState({value: values});
        this._sliderChangeHandler(values, name);
    }

    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Slider + onChange Callback</h2>

                    <Slider name="slider-1" onChange={this._sliderChangeHandler.bind(this)} />
                    <div className="slider-values" id="values-slider-1">&nbsp;</div>
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Slider
                        className="custom-class"
                        style={{border: '1px solid red'}}
                        name="slider-2"
                        onChange={this._sliderChangeHandler.bind(this)}
                    />
                    <div className="slider-values" id="values-slider-2">&nbsp;</div>
                </div>

                <div className="example">
                    <h2>Default Value + Custom Min and Max Values + Precision</h2>

                    <Slider
                        name="slider-3"
                        defaultValue={5}
                        min={0}
                        max={10}
                        precision={2}
                        onChange={this._sliderChangeHandler.bind(this)}
                    />

                    <div className="slider-values" id="values-slider-3">&nbsp;</div>
                </div>

                <div className="example">
                    <h2>Disabled + Readonly</h2>

                    <Slider name="slider-3.1" defaultValue="50" disabled /><br />
                    <Slider name="slider-3.2" defaultValue="50" readOnly />
                </div>

                <div className="example">
                    <h2>Multiple Values + Default Values</h2>

                    <Slider
                        name="slider-4"
                        defaultValue={[10, 90]}
                        values={2}
                        onChange={this._sliderChangeHandler.bind(this)}
                    />

                    <div className="slider-values" id="values-slider-4">&nbsp;</div>
                </div>

                <div className="example">
                    <h2>Steps + Minus Infinity/Plus Infinity</h2>

                    <Slider
                        name="slider-5"
                        defaultValue={['-', '+']}
                        minusInfinity={true}
                        min={-10}
                        max={10}
                        plusInfinity={true}
                        steps={21}
                        values={2}
                        onChange={this._sliderChangeHandler.bind(this)}
                    />

                    <div className="slider-values" id="values-slider-5">&nbsp;</div>
                </div>

                <div className="example">
                    <h2>Controlled Slider</h2>

                    <Slider
                        name="slider-6"
                        value={this.state.values}
                        onChange={this._controlledSliderChangeHandler.bind(this)}
                    />

                    <div className="slider-values" id="values-slider-6">&nbsp;</div>
                </div>
            </div>
        );
    }
}


module.exports = Demo;

//value={[10, 80]}
//values={2}

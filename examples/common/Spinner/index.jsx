'use strict';

var React = require('react');
var Spinner = require('../../../src/common/Spinner/Spinner.jsx');

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Spinner + Visible</h2>

                    <Spinner visible />
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Spinner className="custom-class" style={{border: '1px solid red'}} visible />
                </div>

                <div className="example">
                    <h2>Centered in Container</h2>

                    <div style={{width: '200px', height: '200px', position: 'relative', border: '1px solid lightgray'}}>
                        <Spinner visible centered />
                    </div>
                </div>
            </div>
        );
    }

}


module.exports = Demo;

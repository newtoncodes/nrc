'use strict';

var React = require('react');
var Alert = require('../../../src/common/Alert/Alert.jsx');


class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Alert</h2>

                    <Alert>Default Alert Box</Alert>
                    <Alert type="success">Success Alert Box</Alert>
                    <Alert type="warning">Warning Alert Box</Alert>
                    <Alert type="error">Error Alert Box</Alert>
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Alert className="custom-class" style={{color: 'red'}}>Default Alert Box</Alert>
                </div>

                <div className="example">
                    <h2>Default Icon</h2>

                    <Alert icon type="success">Success Alert Box</Alert>
                    <Alert icon type="warning">Warning Alert Box</Alert>
                    <Alert icon type="error">Error Alert Box</Alert>
                </div>
            </div>
        );
    }
}


module.exports = Demo;

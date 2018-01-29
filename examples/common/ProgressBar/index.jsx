'use strict';

var React = require('react');
var ProgressBar = require('../../../src/common/ProgressBar/ProgressBar.jsx');


class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic ProgressBar</h2>

                    <ProgressBar />
                </div>

                <div className="example">
                    <h2>Progress</h2>

                    <ProgressBar progress={40} />
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <ProgressBar className="custom-class" style={{width: '400px' }} />
                </div>

                <div className="example">
                    <h2>Hidden Label</h2>

                    <ProgressBar label={false} progress={18} />
                </div>

                <div className="example">
                    <h2>Custom Label</h2>

                    <ProgressBar label="Loading (%)" progress={60} />
                </div>
            </div>
        );
    }

}


module.exports = Demo;

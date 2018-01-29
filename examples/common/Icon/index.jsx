'use strict';

var React = require('react');
var Icon = require('../../../src/common/Icon/Icon.jsx');


class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Icon</h2>
                    <Icon name="edit" />
                </div>
            </div>
        );
    }

}


module.exports = Demo;

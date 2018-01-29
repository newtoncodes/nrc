'use strict';

const React = require('react');
const YouTube = require('./YouTube');
const {Component, bind, pure, getClass} = require('../../Component');

require('./Video.less');


@pure
@bind
class Video extends Component {

    render() {
        return (
            <YouTube {...this.props} />
        );
    }

}


module.exports = Video;

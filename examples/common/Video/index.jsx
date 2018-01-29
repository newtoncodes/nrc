'use strict';

var React = require('react');
var Video = require('../../../src/common/Video/Video.jsx');


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fullscreen: true
        }
    }

    render() {
        return (
            <div>
                <Video
                    id="d39xmPZs3P0"

                    //playlist="RD6QXh3oa-WFM"
                    //search=""
                    //channel=""
                    //origin=""

                    end={null}
                    start={10}

                    width={640}
                    height={480}
                    //color="white"
                    logo={true}
                    language={'en'}

                    autoplay={true}
                    controls={true}
                    keyboard={true}
                    fullscreen={this.state.fullscreen}
                    related={false}
                    info={false}

                    onReady={function () {
                        console.log('onReady');
                    }.bind(this)}

                    onError={function () {
                        console.log('onError');
                    }.bind(this)}

                    onPlay={function () {
                        console.log('onPlay');
                    }.bind(this)}

                    onPause={function () {
                        console.log('onPause');
                    }.bind(this)}

                    onEnd={function () {
                        console.log('onEnd');
                    }.bind(this)}

                    onStateChange={function () {
                        console.log('onStateChange');
                    }.bind(this)}

                    onQualityChange={function () {
                        console.log('onQualityChange');
                    }.bind(this)}
                />

                <br />

                <a className="btn" href="#" onClick={function(e) {
                    e.preventDefault();
                    this.setState({fullscreen: !this.state.fullscreen})
                }.bind(this)}>Toggle fullscreen</a>
            </div>
        );
    }

}


module.exports = Demo;

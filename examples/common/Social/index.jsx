'use strict';

var React = require('react');
var Facebook = require('../../../src/common/Social/Facebook');
var Google = require('../../../src/common/Social/Google');
var Twitter = require('../../../src/common/Social/Twitter');


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            googlePlus: {
                count: false
            },
            googleHangout: {
                size: 150
            },
            facebookLike: {
                theme: 'light',
                count: false,
                share: false
            },
            facebookShare: {
                count: false
            },
            facebookSend: {
                theme: 'light'
            },
            twitterTweet: {
                size: 'small'
            }
        }
    }

    render() {
        var url = window.location.href;
        url = 'http://google.com';

        return (
            <div>
                <div>
                    <h2>Google Plus</h2>

                    <Google.Plus href={url} annotation={this.state.googlePlus.count ? 'inline' : 'none'} width={200} />

                    <div style={{marginTop: '10px'}}>
                        <a className="btn" href="#" onClick={function(e) {
                            e.preventDefault();
                            this.setState({googlePlus: {count: !this.state.googlePlus.count}})
                        }.bind(this)}>Toggle count</a>
                    </div>
                </div>

                <div>
                    <h2>Google Hangout</h2>

                    <Google.Hangout width={this.state.googleHangout.size}/>

                    <div style={{marginTop: '10px'}}>
                        <a className="btn" href="#" onClick={function(e) {
                            e.preventDefault();
                            this.setState({googleHangout: {size: this.state.googleHangout.size === 72 ? 150 : 72}})
                        }.bind(this)}>Toggle size</a>
                    </div>
                </div>

                <div>
                    <h2>Facebook Like</h2>
                    <Facebook.Like href={url} theme={this.state.facebookLike.theme} layout={this.state.facebookLike.count ? 'button_count' : 'button'} share={this.state.facebookLike.share} />

                    <div style={{marginTop: '10px'}}>
                        <a className="btn" href="#" onClick={function(e) {
                            e.preventDefault();
                            this.setState({facebookLike: {theme: this.state.facebookLike.theme === 'dark' ? 'light' : 'dark', count: this.state.facebookLike.count, share: this.state.facebookLike.share}})
                        }.bind(this)}>Toggle theme</a>

                        <a className="btn" href="#" onClick={function(e) {
                            e.preventDefault();
                            this.setState({facebookLike: {theme: this.state.facebookLike.theme, count: !this.state.facebookLike.count, share: this.state.facebookLike.share}})
                        }.bind(this)}>Toggle count</a>

                        <a className="btn" href="#" onClick={function(e) {
                            e.preventDefault();
                            this.setState({facebookLike: {theme: this.state.facebookLike.theme, count: this.state.facebookLike.count, share: !this.state.facebookLike.share}})
                        }.bind(this)}>Toggle share</a>
                    </div>
                </div>

                <div>
                    <h2>Facebook Share</h2>
                    <Facebook.Share href={url} layout={this.state.facebookShare.count ? 'button_count' : 'button'} />

                    <div style={{marginTop: '10px'}}>
                        <a className="btn" href="#" onClick={function(e) {
                            e.preventDefault();
                            this.setState({facebookShare: {count: !this.state.facebookShare.count}})
                        }.bind(this)}>Toggle count</a>
                    </div>
                </div>

                <div>
                    <h2>Facebook Send</h2>
                    <Facebook.Send href={url} theme={this.state.facebookSend.theme} />

                    <div style={{marginTop: '10px'}}>
                        <a className="btn" href="#" onClick={function(e) {
                                e.preventDefault();
                                this.setState({facebookSend: {theme: this.state.facebookSend.theme === 'dark' ? 'light' : 'dark'}})
                            }.bind(this)}>Toggle theme</a>
                    </div>
                </div>

                <div>
                    <h2>Twitter Tweet</h2>
                    <Twitter.Tweet href={url} text="This page is cool" size={this.state.twitterTweet.size} />

                    <div style={{marginTop: '10px'}}>
                        <a className="btn" href="#" onClick={function(e) {
                            e.preventDefault();
                            this.setState({twitterTweet: {size: this.state.twitterTweet.size === 'small' ? 'large' : 'small'}})
                        }.bind(this)}>Toggle size</a>
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = Demo;

'use strict';

const React = require('react');
const dom = require('ndom');
const {Component, bind, pure, getClass} = require('../../Component');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);

@bind
class YouTube extends Component {
    _currentId = 0;

    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure style: React.PropTypes.object,

        @pure id: React.PropTypes.string.isRequired,

        @pure width: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        @pure height: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        @pure list: React.PropTypes.arrayOf(React.PropTypes.string),
        @pure search: React.PropTypes.string,
        @pure playlist: React.PropTypes.string,
        @pure channel: React.PropTypes.string,
        @pure origin: React.PropTypes.string,
        @pure autoplay: React.PropTypes.bool,
        @pure color: React.PropTypes.oneOf(['red', 'white']),
        @pure controls: React.PropTypes.bool,
        @pure keyboard: React.PropTypes.bool,
        @pure end: React.PropTypes.number,
        @pure start: React.PropTypes.number,
        @pure fullscreen: React.PropTypes.bool,
        @pure language: React.PropTypes.string,
        @pure logo: React.PropTypes.bool,
        @pure related: React.PropTypes.bool,
        @pure info: React.PropTypes.bool,

        onReady: React.PropTypes.func,
        onError: React.PropTypes.func,
        onPlay: React.PropTypes.func,
        onPause: React.PropTypes.func,
        onEnd: React.PropTypes.func,
        onStateChange: React.PropTypes.func,
        onQualityChange: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        style: {},

        width: 640,
        height: 480,
        list: null,
        search: null,
        playlist: null,
        channel: null,
        origin: null,
        autoplay: false,
        color: 'red',
        controls: true,
        keyboard: true,
        end: null,
        start: null,
        fullscreen: true,
        language: 'en',
        logo: false,
        related: false,
        info: false
    };

    componentDidMount() {
        if (!isBrowser) return;

        if (this._isLoaded()) return this._renderPlayer();

        let script = dom('script[src="https://www.youtube.com/player_api"]').node;

        if (!script) {
            script = document.createElement('script');
            script.src = 'https://www.youtube.com/player_api';
            script.async = true;
            script.defer = true;

            dom('body').append(script);
        }

        script.onload = function () {
            setTimeout(function () {
                if (!this._isLoaded()) return setTimeout(function () {
                    if (!this._isLoaded()) return setTimeout(function () {
                        if (!this._isLoaded()) return setTimeout(function () {
                            if (!this._isLoaded()) return setTimeout(function () {
                                if (this._isLoaded()) this._renderPlayer();
                            }.bind(this), 250);
                            this._renderPlayer();
                        }.bind(this), 50);
                        this._renderPlayer();
                    }.bind(this), 50);
                    this._renderPlayer();
                }.bind(this), 50);
                this._renderPlayer();
            }.bind(this), 10);
        }.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.className !== nextProps.className ||
            JSON.stringify(this.props.style) !== JSON.stringify(nextProps.style) ||

            this.props.id !== nextProps.id ||
            this.props.width !== nextProps.width ||
            this.props.height !== nextProps.height ||
            JSON.stringify(this.props.list) !== JSON.stringify(nextProps.list) ||
            this.props.search !== nextProps.search ||
            this.props.playlist !== nextProps.playlist ||
            this.props.channel !== nextProps.channel ||
            this.props.origin !== nextProps.origin ||
            this.props.autoplay !== nextProps.autoplay ||
            this.props.color !== nextProps.color ||
            this.props.controls !== nextProps.controls ||
            this.props.keyboard !== nextProps.keyboard ||
            this.props.end !== nextProps.end ||
            this.props.start !== nextProps.start ||
            this.props.fullscreen !== nextProps.fullscreen ||
            this.props.language !== nextProps.language ||
            this.props.logo !== nextProps.logo ||
            this.props.related !== nextProps.related ||
            this.props.info !== nextProps.info ||
            this.props.onReady !== nextProps.onReady ||
            this.props.onError !== nextProps.onError ||
            this.props.onPlay !== nextProps.onPlay ||
            this.props.onPause !== nextProps.onPause ||
            this.props.onEnd !== nextProps.onEnd ||
            this.props.onStateChange !== nextProps.onStateChange ||
            this.props.onQualityChange !== nextProps.onQualityChange
        );
    }

    componentDidUpdate() {
        if (!isBrowser) return;

        this._renderPlayer();
    }

    render() {
        if (!isBrowser) return <div></div>;

        this._currentId ++;
        let html = this._generateHtml();

        return (
            <div className={'Video Video-youtube ' + this.props.className} style={this.props.style} ref="player" dangerouslySetInnerHTML={{__html: html}} ></div>
        );
    }

    _readyHandler(e) {
        this.emit('ready', e);
    }

    _errorHandler(e) {
        this.emit('error', e);
    }

    _stateChangeHandler(e) {
        this.emit('stateChange', e);

        switch (e.data) {
            case window['YT']['PlayerState']['ENDED']:
                this.props.onEnd(e);
                break;

            case window['YT']['PlayerState']['PLAYING']:
                this.props.onPlay(e);
                break;

            case window['YT']['PlayerState']['PAUSED']:
                this.props.onPause(e);
                break;

            default:
                return;
        }
    }

    _qualityChangeHandler(e) {
        // this.props.onQualityChange(e);
        this.emit('qualityChange', e);
    }

    _isLoaded() {
        return !!window['YT'] && !!window['YT']['Player'];
    }

    _generateHtml() {
        return (
            '<div id="Youtube-player-' + this._currentId + '"></div>'
        );
    }

    _renderPlayer() {
        if (!isBrowser) return;
        
        let options = {
            videoId: this.props.id,

            width: this.props.width,
            height: this.props.height,

            playerlets: {
                enablejsapi: '1',
                hl: this.props.language,
                color: this.props.color,
                autoplay: this.props.autoplay ? '1' : '0',
                controls: this.props.controls ? '2' : '0',
                disablekb: this.props.keyboard ? '0' : '1',
                fs: this.props.fullscreen ? '1' : '0',
                modestbranding: this.props.logo ? '0' : '1',
                rel: this.props.related ? '1' : '0',
                showinfo: this.props.info ? '1' : '0'
            },

            events: {
                'onReady': this._readyHandler,
                'onPlaybackQualityChange': this._qualityChangeHandler,
                'onStateChange': this._stateChangeHandler,
                'onError': this._errorHandler
            }
        };

        if (this.props.origin !== null) options.playerlets.origin = this.props.origin;
        if (this.props.list) options.playerlets.playlist = this.props.list.join(',');
        if (this.props.start !== null) options.playerlets.start = this.props.start.toString();
        if (this.props.end !== null) options.playerlets.end = this.props.end.toString();
        if (this.props.playlist || this.props.search || this.props.channel) {
            if (this.props.playlist) {
                options.playerlets.listType = 'playlist';
                options.playerlets.list = this.props.playlist;
            } else if (this.props.channel) {
                options.playerlets.listType = 'user_uploads';
                options.playerlets.list = this.props.channel;
            } else if (this.props.search) {
                options.playerlets.listType = 'search';
                options.playerlets.list = this.props.search;
            }
        }

        let player = new window['YT']['Player']('Youtube-player-' + this._currentId, options);
    }
}


module.exports = YouTube;

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const dom = require('ndom');
const {Component, bind, pure, getClass} = require('../../../Component');

require('../Social.less');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);


/**
 * Tweet Button component
 */
class Tweet extends Component {
    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,

        href: React.PropTypes.string,
        text: React.PropTypes.string,
        language: React.PropTypes.string,

        url: React.PropTypes.string,
        via: React.PropTypes.string,

        size: React.PropTypes.oneOf([
            'small', 'large'
        ]),
        hashtags: React.PropTypes.arrayOf(React.PropTypes.string),
        related: React.PropTypes.arrayOf(React.PropTypes.string)
    }

    static defaultProps = {
        className: '',
        style: {},

        href: null,
        text: null,
        size: 'small',

        language: 'en',
        url: null,
        via: null,

        hashtags: null,
        related: null
    }

    componentDidMount() {
        if (!isBrowser) return;

        if (this._isLoaded()) return this._renderButton();

        let script = dom('script[src="https://platform.twitter.com/widgets.js"]').node;

        if (!script) {
            script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            script.defer = true;

            dom('body').append(script);
        }

        script.onload = function () {
            setTimeout(function () {
                this._renderButton();
            }.bind(this), 50);
        }.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.className !== nextProps.className ||
            JSON.stringify(this.props.style) !== JSON.stringify(nextProps.style) ||
            this.props.href !== nextProps.href ||
            this.props.text !== nextProps.text ||
            this.props.size !== nextProps.size ||
            this.props.language !== nextProps.language ||
            this.props.url !== nextProps.url ||
            this.props.via !== nextProps.via ||
            JSON.stringify(this.props.hashtags) !== JSON.stringify(nextProps.hashtags) ||
            JSON.stringify(this.props.related) !== JSON.stringify(nextProps.related)
        );
    }

    componentDidUpdate() {
        if (!isBrowser) return;

        this._renderButton();
    }

    _isLoaded() {
        return !!window['twttr'];
    }

    _generateHtml() {
        return (
            '<a class="twitter-share-button"' +
            (this.props.href ? ' data-href="' + this.props.href + '"' : '') +
            (this.props.text ? ' data-text="' + this.props.text + '"' : '') +
            (this.props.size ? ' data-size="' + this.props.size + '"' : '') +
            (this.props.language ? ' data-lang="' + this.props.language + '"' : '') +
            (this.props.url ? ' data-url="' + this.props.url + '"' : '') +
            (this.props.via ? ' data-via="' + this.props.via + '"' : '') +
            (this.props.hashtags ? ' data-hashtags="' + this.props.hashtags.join(',') + '"' : '') +
            (this.props.related ? ' data-related="' + this.props.related.join(',') + '"' : '') +
            '></a>'
        );
    }

    _renderButton() {
        if (!isBrowser) return;

        let options = {};

        if (this.props.text) options.text = this.props.text;
        if (this.props.size) options.size = this.props.size;
        if (this.props.language) options.lang = this.props.language;
        if (this.props.url) options.url = this.props.url;
        if (this.props.via) options.via = this.props.via;
        if (this.props.hashtags) options.hashtags = this.props.hashtags.join(',');
        if (this.props.related) options.related = this.props.related.join(',');

        window['twttr']['widgets']['createShareButton'](this.props.href, ReactDOM.findDOMNode(this.refs['button']).childNodes[0], options);
    }

    render() {
        if (!isBrowser) return <div></div>;

        let html = this._generateHtml();

        return (
            <div className={'Social-button Social-button-twitter-tweet ' + this.props.className} style={this.props.style} ref="button" dangerouslySetInnerHTML={{__html: html}}></div>
        );
    }
};


module.exports = Tweet;

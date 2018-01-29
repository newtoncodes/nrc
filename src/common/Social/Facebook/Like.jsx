'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const dom = require('ndom');
const {Component, bind, pure, getClass} = require('../../../Component');

require('../Social.less');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);


/**
 * Like Button component
 */
class Like extends Component {
    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,

        href: React.PropTypes.string,
        ref: React.PropTypes.string,
        width: React.PropTypes.number,
        faces: React.PropTypes.bool,
        share: React.PropTypes.bool,

        action: React.PropTypes.oneOf([
            'like', 'recommend'
        ]),
        theme: React.PropTypes.oneOf([
            'light', 'dark'
        ]),
        layout: React.PropTypes.oneOf([
            'standard', 'button_count', 'button', 'box_count'
        ])
    }

    static defaultProps = {
        className: '',
        style: {},

        href: null,
        ref: null,
        width: null,

        action: 'like',
        theme: 'light',
        layout: 'button',

        faces: false,
        share: false
    }

    componentDidMount() {
        if (!isBrowser) return;

        if (this._isLoaded()) return this._renderButton();

        let script = dom('script[src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5"]').node;

        if (!script) {
            script = document.createElement('script');
            script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5';
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
            this.props.action !== nextProps.action ||
            this.props.href !== nextProps.href ||
            this.props.ref !== nextProps.ref ||
            this.props.width !== nextProps.width ||
            this.props.theme !== nextProps.theme ||
            this.props.layout !== nextProps.layout ||
            this.props.faces !== nextProps.faces ||
            this.props.share !== nextProps.share
        );
    }

    componentDidUpdate() {
        this._renderButton();
    }

    _isLoaded() {
        return !!window['FB'] && !!window['FB']['XFBML'];
    }

    _generateHtml() {
        return (
            '<a class="fb-like"' +
            (this.props.href ? ' data-href="' + this.props.href + '"' : '') +
            (this.props.action ? ' data-action="' + this.props.action + '"' : '') +
            (this.props.ref ? ' data-ref="' + this.props.ref + '"' : '') +
            (this.props.width ? ' data-width="' + this.props.width + '"' : '') +
            (this.props.layout ? ' data-layout="' + this.props.layout + '"' : '') +
            (this.props.theme ? ' data-colorscheme="' + this.props.theme + '"' : '') +
            ' data-show-faces="' + (this.props.faces ? 'true' : 'false') + '"' +
            ' data-share="' + (this.props.share ? 'true' : 'false') + '"' +
            '></a>'
        );
    }

    _renderButton() {
        if (!isBrowser) return;
        window['FB']['XFBML'].parse(ReactDOM.findDOMNode(this.refs['button']));
    }

    render() {
        if (!isBrowser) return <div></div>;

        let html = this._generateHtml();

        return (
            <div className={'Social-button Social-button-facebook-like ' + this.props.className} style={this.props.style} ref="button" dangerouslySetInnerHTML={{__html: html}}></div>
        );
    }
};


module.exports = Like;

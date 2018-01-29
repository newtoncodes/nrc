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

        layout: React.PropTypes.oneOf([
            'box_count', 'button_count', 'button', 'link', 'icon_link', 'icon'
        ])
    }

    static defaultProps = {
        className: '',
        style: {},

        href: null,
        ref: null,
        layout: 'button'
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
            this.props.href !== nextProps.href ||
            this.props.ref !== nextProps.ref ||
            this.props.layout !== nextProps.layout
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
            '<a class="fb-share-button"' +
            (this.props.href ? ' data-href="' + this.props.href + '"' : '') +
            (this.props.ref ? ' data-ref="' + this.props.ref + '"' : '') +
            (this.props.layout ? ' data-layout="' + this.props.layout + '"' : '') +
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
            <div className={'Social-button Social-button-facebook-share ' + this.props.className} style={this.props.style} ref="button" dangerouslySetInnerHTML={{__html: html}}></div>
        );
    }
};


module.exports = Like;

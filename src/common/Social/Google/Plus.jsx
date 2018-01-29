'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const dom = require('ndom');
const {Component, bind, pure, getClass} = require('../../../Component');

require('../Social.less');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);


/**
 * Plus Button component
 */
class Plus extends Component {
    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,

        href: React.PropTypes.string,
        width: React.PropTypes.number,
        recommendations: React.PropTypes.bool,

        expandTo: React.PropTypes.oneOf([
            'top', 'right', 'bottom', 'left'
        ]),
        size: React.PropTypes.oneOf([
            'small', 'medium', 'standard', 'tall'
        ]),
        annotation: React.PropTypes.oneOf([
            'none', 'bubble', 'inline'
        ]),
        align: React.PropTypes.oneOf([
            'left', 'right'
        ])
    }

    static defaultProps = {
        className: '',
        style: {},

        expandTo: 'top',
        href: null,
        size: 'medium',
        annotation: 'none',
        width: null,
        align: null,
        recommendations: false
    }

    componentDidMount() {
        if (!isBrowser) return;

        if (this._isLoaded()) return this._renderButton();

        let script = dom('script[src="https://apis.google.com/js/platform.js"]').node;

        if (!script) {
            script = document.createElement('script');
            script.src = 'https://apis.google.com/js/platform.js';
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
            this.props.expandTo !== nextProps.expandTo ||
            this.props.href !== nextProps.href ||
            this.props.size !== nextProps.size ||
            this.props.annotation !== nextProps.annotation ||
            this.props.width !== nextProps.width ||
            this.props.align !== nextProps.align ||
            this.props.recommendations !== nextProps.recommendations
        );
    }

    componentDidUpdate() {
        if (!isBrowser) return;

        this._renderButton();
    }

    _isLoaded() {
        return !!window['gapi'];
    }

    _generateHtml() {
        return (
            '<a class="g-plusone"' +
            (this.props.expandTo ? ' expandTo="' + this.props.expandTo + '"' : '') +
            (this.props.href ? ' data-href="' + this.props.href + '"' : '') +
            (this.props.size ? ' data-size="' + this.props.size + '"' : '') +
            (this.props.annotation ? ' data-annotation="' + this.props.annotation + '"' : '') +
            (this.props.width ? ' data-width="' + this.props.width + '"' : '') +
            (this.props.align ? ' data-align="' + this.props.align + '"' : '')+
            ' data-recommendations="' + (this.props.recommendations ? 'true' : 'false') + '"' +
            '></a>'
        );
    }

    _renderButton() {
        if (!isBrowser) return;

        let options = {};

        if (this.props.expandTo) options.expandTo = this.props.expandTo;
        if (this.props.href) options.href = this.props.href;
        if (this.props.size) options.size = this.props.size;
        if (this.props.annotation) options.annotation = this.props.annotation;
        if (this.props.width) options.width = this.props.width;
        if (this.props.align) options.align = this.props.align;
        options.recommendations = (this.props.recommendations ? 'true' : 'false');

        window['gapi']['plusone'].render(ReactDOM.findDOMNode(this.refs['button']).childNodes[0], options);
    }

    render() {
        if (!isBrowser) return <div></div>;

        let html = this._generateHtml();

        return (
            <div className={'Social-button Social-button-google-plus ' + this.props.className} style={this.props.style} ref="button" dangerouslySetInnerHTML={{__html: html}}></div>
        );
    }
};


module.exports = Plus;

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const dom = require('ndom');
const {Component, bind, pure, getClass} = require('../../../Component');

require('../Social.less');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);


/**
 * Hangout Button component
 */
class Hangout extends Component {
    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,

        topic: React.PropTypes.string,
        width: React.PropTypes.number,
        type: React.PropTypes.oneOf([
            'normal', 'onair', 'party', 'moderated'
        ]),
        invites: React.PropTypes.arrayOf(React.PropTypes.object),
        apps: React.PropTypes.arrayOf(React.PropTypes.object)
    }

    static defaultProps = {
        className: '',
        style: {},

        type: 'normal',
        topic: null,
        width: null,
        invites: null,
        apps: null
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
            this.props.topic !== nextProps.topic ||
            this.props.width !== nextProps.width ||
            this.props.type !== nextProps.type ||
            JSON.stringify(this.props.invites) !== JSON.stringify(nextProps.invites) ||
            JSON.stringify(this.props.apps) !== JSON.stringify(nextProps.apps)
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
            '<a class="g-plusone" data-render="createhangout"' +
            (this.props.topic ? ' data-topic="' + this.props.topic + '"' : '') +
            (this.props.type ? ' data-type="' + this.props.type + '"' : '') +
            (this.props.width ? ' data-widget_size="' + this.props.width + '"' : '') +
            (this.props.invites ? ' data-invites="' + JSON.stringify(this.props.invites) + '"' : '') +
            (this.props.apps ? ' data-invites="' + JSON.stringify(this.props.apps) + '"' : '') +
            '></a>'
        );
    }

    _renderButton() {
        if (!isBrowser) return;

        let options = {render: 'createhangout'};

        if (this.props.topic) options.topic = this.props.topic;
        if (this.props.type) options.type = this.props.type;
        if (this.props.width) options.widget_size = this.props.width;
        if (this.props.invites) options.invites = this.props.invites;
        if (this.props.apps) options.apps = this.props.apps;

        window['gapi']['hangout'].render(ReactDOM.findDOMNode(this.refs['button']).childNodes[0], options);
    }

    render() {
        if (!isBrowser) return <div></div>;

        let html = this._generateHtml();

        return (
            <div className={'Social-button Social-button-google-hangout ' + this.props.className} style={this.props.style} ref="button" dangerouslySetInnerHTML={{__html: html}}></div>
        );
    }
};


module.exports = Hangout;

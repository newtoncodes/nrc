'use strict';

const React = require('react');
const classNames = require('classnames');
const Fetch = require('isomorphic-fetch');
const {Component, bind, pure, getClass} = require('../../Component');
require('./Form.less');

@pure
@bind
class Form extends Component {

    static propTypes = {
        @pure action: React.PropTypes.string,
        @pure className: React.PropTypes.string,
        @pure encType: React.PropTypes.oneOf(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']),
        @pure method: React.PropTypes.oneOf(['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT']),
        @pure style: React.PropTypes.object,
        onSubmit: React.PropTypes.func
    };

    static defaultProps = {
        action: null,
        className: '',
        encType: 'application/x-www-form-urlencoded',
        method: 'POST',
        style: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    render() {
        let events = this.wrapEvents(true, ['onSubmit']);

        return (
            <form
                ref="form"
                action={this.props.action}
                className={
                    getClass(
                        'Form', this.props.className, {
                            'Form-loading': this.state.loading === true
                        }
                    )}
                encType={this.props.encType}
                method={this.props.method}
                onSubmit={this._formSubmitHandler}
                style={this.props.style}
                {...events}
            >
                {this.props.children}
            </form>
        );
    }

    _formSubmitHandler(e) {
        this.emit('submit', e);
    }

    _formProgressHandler(type, loaded, total) {
        this.props.onProgress(type, loaded, total);
        this.emit('progress', type, loaded, total);
    }

    _formLoadHandler(error, result, response) {
        this.setState({loading: false});
        this.props.onLoad(error, result || null, response);
        this.emit('load', error, result || null, response);
    }

    getData(asObject) {
        let form = this.refs.form;
        let method = form.getAttribute('method') || 'get';

        if (asObject || method.toUpperCase() === 'GET' || form.getAttribute('enctype') !== 'multipart/form-data') {
            let field, s = [], len, i, j, object = {};
            len = form.elements.length;
            for (i = 0; i < len; i++) {
                field = form.elements[i];
                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                            if (field.options[j].selected) {
                                s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                                object[field.name] = field.options[j].value;
                            }
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                        object[field.name] = field.value;
                    }
                }
            }

            return asObject ? object : s.join('&').replace(/%20/g, '+');
        }

        return new FormData(form);
    }

}


module.exports = Form;
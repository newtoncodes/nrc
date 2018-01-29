'use strict';

const React = require('react');
const Alert = require('../../common/Alert');
const Spinner = require('../../common/Spinner');
const Form = require('./Form');
const {Component, bind, pure, getClass} = require('../../Component');


@pure
@bind
class ExtendedForm extends Component {
    static propTypes = {
        @pure encType: React.PropTypes.oneOf(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']),
        @pure method: React.PropTypes.oneOf(['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT']),
        @pure className: React.PropTypes.string,
        @pure disabled: React.PropTypes.bool,
        @pure error: React.PropTypes.any,
        @pure loading: React.PropTypes.bool,
        @pure message: React.PropTypes.string,
        @pure status: React.PropTypes.oneOf(['error', 'warning', 'success', null, undefined]),
        @pure style: React.PropTypes.object,
        @pure asObject: React.PropTypes.bool,
        @pure autoHide: React.PropTypes.number,
        submit: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        encType: 'application/x-www-form-urlencoded',
        method: 'POST',
        className: '',
        disabled: false,
        error: null,
        loading: false,
        message: 'Success!',
        status: null,
        asObject: true,
        autoHide: 5000,
        style: {},
        submit: () => {}
    };

    _submitHandler(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.props.submit(this._form.getData(this.props.asObject), e);
    }

    _getMessage() {
        let error = this.props.error;
        let status = this.props.status;

        if (!status) return '';
        if (!error) return this.props.message;
        if (!error.data || !Array.isArray(error.data)) return error.message || 'Unknown error.';

        return error.data.map((msg, i) => <div key={i}>{msg}</div>);
    }

    _hideAlert() {
        this.setState({hidden: true});
    }

    constructor(props, context) {
        super(props, context);

        if (props.autoHide && props.status) this.state = {
            hidden: true
        };

        else this.state = {
            hidden: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.status !== nextProps.status || this.props.autoHide !== nextProps.autoHide) {
            this.setState({hidden: false});

            if (nextProps.status) {
                let timeout = 5000;
                if (typeof nextProps.autoHide === 'number') timeout = nextProps.autoHide;
                if (this._timeout) clearTimeout(this._timeout);
                this._timeout = setTimeout(this._hideAlert, timeout);
            }
        }
    }

    componentWillUnmount() {
        if (this._timeout) clearTimeout(this._timeout);
    }

    render() {
        return (
            <Form
                ref={c => this._form = c}
                encType={this.props.encType || 'application/x-www-form-urlencoded'}
                method={this.props.method || 'POST'}
                className={this.props.className}
                style={this.props.style}
                onSubmit={this._submitHandler}
                action="#"
            >
                <Spinner visible={this.props.loading} />
                <Alert type={this.props.status} hidden={this.state.hidden || !this.props.status}>{this._getMessage()}</Alert>

                {this.props.children}
            </Form>
        );
    };
}


module.exports = ExtendedForm;
